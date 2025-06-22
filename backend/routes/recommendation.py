from flask import Blueprint, jsonify, request
import ast

from backend.database.init import SessionLocal
from backend.models.recipe import Recipe

recommendation_bp = Blueprint('recommendation', __name__)


def parse_ner_cell(cell):
    """Parse NER cell value from the database into a list of lower-case ingredients."""
    if cell is None:
        return []
    if isinstance(cell, list):
        return [str(item).strip().lower() for item in cell]
    if isinstance(cell, str):
        cell = cell.strip()
        try:
            parsed = ast.literal_eval(cell)
            if isinstance(parsed, list):
                return [str(item).strip().lower() for item in parsed]
        except Exception:
            pass
        return [s.strip().lower() for s in cell.split(',') if s.strip()]
    return []


@recommendation_bp.route('/suggest', methods=['GET'])
def suggest_recipes():
    """Suggest recipes based on inventory and calorie range."""
    envanter = request.args.get('envanter', '')
    min_kcal = request.args.get('min', type=int)
    max_kcal = request.args.get('max', type=int)

    if min_kcal is None or max_kcal is None:
        return jsonify({'error': 'min and max parameters are required'}), 400

    inventory_items = [item.strip().lower() for item in envanter.split(',') if item.strip()]

    session = SessionLocal()
    try:
        recipes = (
            session.query(Recipe)
            .filter(Recipe.kcal_from_ingredients >= min_kcal)
            .filter(Recipe.kcal_from_ingredients <= max_kcal)
            .all()
        )

        result = []
        for recipe in recipes:
            ner_items = parse_ner_cell(recipe.NER)
            if all(item in inventory_items for item in ner_items):
                result.append(
                    {
                        'title': recipe.title,
                        'ingredients': recipe.ingredients,
                        'kcal_from_ingredients': recipe.kcal_from_ingredients,
                    }
                )

        return jsonify(result)
    finally:
        session.close()
