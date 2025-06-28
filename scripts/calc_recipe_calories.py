# coding: utf-8
"""Pipeline to calculate total calories for each recipe.

This script reads the large ``recipe_raw.csv`` file in manageable chunks to
avoid exhausting RAM. Each chunk is processed to parse and normalize
ingredients, merge with calorie information, and sum the calories per recipe.
The final result is written as a Parquet file ``data/recipe_with_calories.parquet``.
"""

from __future__ import annotations

import json
import re
from collections import defaultdict
from dataclasses import dataclass
from typing import Dict, List, Tuple

import pandas as pd
from dotenv import load_dotenv

# ---------------------------------------------------------------------------
# Configuration and constant definitions
# ---------------------------------------------------------------------------

# Load environment variables from a .env file if present. This allows the user
# to configure file locations or other options without hardcoding them.
load_dotenv()

# Patterns used to normalize raw ingredient names to canonical food keys.
# Each tuple is (regex_pattern, normalized_key)
NORMALIZATION_PATTERNS: List[Tuple[re.Pattern, str]] = [
    (re.compile(r"\bgreen\s+onions?\b|\bscallions?\b", re.I), "onion"),
    (re.compile(r"\bchilli?\b", re.I), "chili"),
    (re.compile(r"\btomatoes?\b", re.I), "tomato"),
    (re.compile(r"\bgarlic\s*cloves?\b", re.I), "garlic"),
    # Add more domain specific patterns here as needed
]

# Conversion factors from common units to grams. These are approximate and can
# be extended. They are used to convert ingredient quantities to a standard
# weight basis so we can apply per-100 g calorie data.
UNIT_MAP: Dict[str, float] = {
    "g": 1.0,
    "gram": 1.0,
    "grams": 1.0,
    "kg": 1000.0,
    "kilogram": 1000.0,
    "kilograms": 1000.0,
    "oz": 28.3495,
    "ounce": 28.3495,
    "ounces": 28.3495,
    "lb": 453.592,
    "pound": 453.592,
    "pounds": 453.592,
    # Liquid measures (very approximate; may vary by ingredient)
    "ml": 1.0,
    "milliliter": 1.0,
    "milliliters": 1.0,
    "l": 1000.0,
    "liter": 1000.0,
    "liters": 1000.0,
    "cup": 240.0,
    "cups": 240.0,
    "tbsp": 15.0,
    "tablespoon": 15.0,
    "tablespoons": 15.0,
    "tsp": 5.0,
    "teaspoon": 5.0,
    "teaspoons": 5.0,
}

# Regex used to parse quantity and unit from an ingredient string. This is a
# simple heuristic and may not cover all cases, but it works for many common
# formats like "2 cups chopped tomatoes" or "1.5 kg chicken".
QUANTITY_RE = re.compile(
    r"(?P<qty>[\d\.]+)\s*(?P<unit>[a-zA-Z]+)?\s*(?P<name>.*)", re.I
)


@dataclass
class ParsedIngredient:
    """Structured representation of an ingredient."""

    food_key: str
    grams: float


# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------

def normalize_food(raw_name: str) -> str:
    """Normalize a raw ingredient name to a canonical food key.

    Parameters
    ----------
    raw_name : str
        The raw ingredient description (e.g. "Green onions sliced").

    Returns
    -------
    str
        Normalized food key used to join with the calorie dataset.
    """
    name = raw_name.lower()
    for pattern, replacement in NORMALIZATION_PATTERNS:
        if pattern.search(name):
            return replacement
    # Default: use the first two words as a crude key
    return " ".join(name.split()[:2])


def parse_ingredient(raw: str) -> ParsedIngredient | None:
    """Parse quantity, unit, and name from a raw ingredient string.

    If the string cannot be parsed, ``None`` is returned so the caller can
    decide how to handle the failure.
    """
    m = QUANTITY_RE.match(raw)
    if not m:
        return None
    qty = float(m.group("qty"))
    unit = (m.group("unit") or "").lower()
    name = m.group("name")
    factor = UNIT_MAP.get(unit, None)
    if factor is None:
        # Unknown unit; we cannot compute calories reliably
        return None
    grams = qty * factor
    key = normalize_food(name)
    return ParsedIngredient(food_key=key, grams=grams)


# ---------------------------------------------------------------------------
# Main processing functions
# ---------------------------------------------------------------------------

def process_chunk(df: pd.DataFrame, kcal_lookup: pd.DataFrame) -> Dict[str, float]:
    """Process a DataFrame chunk and return calorie totals per recipe title."""
    totals: Dict[str, float] = defaultdict(float)

    # Expand the ingredient lists so each row corresponds to one ingredient
    records = []
    for _, row in df.iterrows():
        title = row["title"]
        try:
            ing_list = json.loads(row["ingredients"])
        except Exception:
            continue  # skip rows with invalid JSON
        for raw_ing in ing_list:
            parsed = parse_ingredient(raw_ing)
            if parsed is None:
                continue
            records.append(
                {
                    "title": title,
                    "food_key": parsed.food_key,
                    "grams": parsed.grams,
                }
            )

    if not records:
        return totals

    ing_df = pd.DataFrame.from_records(records)
    merged = ing_df.merge(kcal_lookup, on="food_key", how="left")
    merged.dropna(subset=["kcal_per_100g"], inplace=True)
    merged["kcal_from_ing"] = merged["grams"] * merged["kcal_per_100g"] / 100.0
    grouped = merged.groupby("title")["kcal_from_ing"].sum()
    for title, kcal in grouped.items():
        totals[title] += kcal
    return totals


def main() -> None:
    """Entry point for the calorie calculation pipeline."""

    # Load the per-100 g calorie dataset once. The dataset is expected to
    # contain columns: ``food_key`` and ``kcal_per_100g``.
    kcal_lookup = pd.read_parquet("data/food_dataset.parquet")

    # ``recipe_raw.csv`` can be very large, so we read it in chunks of 5000
    # rows at a time. This keeps memory usage low even if the CSV has hundreds
    # of thousands of rows.
    reader = pd.read_csv(
        "data/recipe_raw.csv",
        chunksize=5000,
        usecols=["title", "ingredients"],
    )

    all_totals: Dict[str, float] = defaultdict(float)

    for chunk in reader:
        totals = process_chunk(chunk, kcal_lookup)
        for title, kcal in totals.items():
            all_totals[title] += kcal

    # Convert the accumulated totals to a DataFrame and write to Parquet.
    result_df = (
        pd.DataFrame.from_dict(all_totals, orient="index", columns=["total_calories"])
        .reset_index()
        .rename(columns={"index": "title"})
    )
    result_df.to_parquet("data/recipe_with_calories.parquet", index=False)


if __name__ == "__main__":
    main()
