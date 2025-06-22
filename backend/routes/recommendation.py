from flask import Blueprint, jsonify, request
import pandas as pd
import os
import ast

recommendation_bp = Blueprint('recommendation', __name__)


def parse_ner_cell(cell):
    """Parse NER cell into a list of lower-case ingredients."""
    if cell is None or (isinstance(cell, float) and pd.isna(cell)):
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

    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'full_dataset_with_kcal_v2.csv')

    try:
        df = pd.read_csv(data_path)
    except Exception as exc:
        return jsonify({'error': f'Failed to read dataset: {exc}'}), 500

    filtered = df[(df['kcal_from_ingredients'] >= min_kcal) & (df['kcal_from_ingredients'] <= max_kcal)].copy()
    filtered['ner_list'] = filtered['NER'].apply(parse_ner_cell)
    filtered = filtered[filtered['ner_list'].apply(lambda ner: all(item in inventory_items for item in ner))]

    result = filtered[['title', 'ingredients', 'kcal_from_ingredients']].to_dict(orient='records')
    return jsonify(result)
