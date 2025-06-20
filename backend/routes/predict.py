from flask import Blueprint, jsonify, request

predict_bp = Blueprint('predict', __name__)


@predict_bp.route('/predict', methods=['POST'])
def predict_home():
    """Return a dummy response for the posted text."""

    data = request.get_json() or {}
    text = data.get("text", "")
    return jsonify({"prediction": f"Processed: {text}"})
