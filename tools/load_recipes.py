import os
import sys
from pathlib import Path
import pandas as pd

# Ensure the project root is on the import path when executed directly
sys.path.append(str(Path(__file__).resolve().parents[1]))

# Allow models that expect 'database' package to be imported
import backend.database as _database
sys.modules.setdefault("database", _database)

from backend.database.init import SessionLocal, init_db
from backend.models.recipe import Recipe


def load_recipes_from_csv(csv_path: str) -> None:
    """Load recipes from a CSV file into the database."""
    df = pd.read_csv(csv_path)

    session = SessionLocal()
    try:
        for _, row in df.iterrows():
            recipe = Recipe(
                title=row.get("title"),
                ingredients=row.get("ingredients"),
                kcal_from_ingredients=row.get("kcal_from_ingredients"),
                NER=row.get("NER"),
            )
            session.add(recipe)
        session.commit()
    finally:
        session.close()


def main():
    csv_path = os.path.join("backend", "data", "full_dataset_with_kcal_v2.csv")
    init_db()
    load_recipes_from_csv(csv_path)


if __name__ == "__main__":
    main()
