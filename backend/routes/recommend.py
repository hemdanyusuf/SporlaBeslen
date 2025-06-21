from flask import Blueprint, jsonify
from backend.database.init import SessionLocal
from backend.models.user import User
from backend import utils

recommend_bp = Blueprint('recommend', __name__)


@recommend_bp.route('/recommend/<int:user_id>', methods=['GET'])
def recommend_calories(user_id: int):
    session = SessionLocal()
    try:
        user = session.query(User).get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        calories = utils.calculate_calories(user)
        return jsonify({'calories': calories})
    finally:
        session.close()
