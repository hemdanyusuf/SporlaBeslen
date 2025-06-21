from flask import Blueprint, jsonify, request
from datetime import datetime
from database.init import SessionLocal
from models.user import User

user_bp = Blueprint('user', __name__)

@user_bp.route('/users', methods=['GET'])
def list_users():
    session = SessionLocal()
    try:
        users = session.query(User).all()
        data = [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "height": user.height,
                "weight": user.weight,
                "birthdate": user.birthdate.isoformat() if user.birthdate else None,
                "gender": user.gender,
                "goal": user.goal,
            }
            for user in users
        ]
        return jsonify(data)
    finally:
        session.close()

@user_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json() or {}
    name = data.get('name')
    email = data.get('email')
    if not name or not email:
        return jsonify({'error': 'name and email required'}), 400

    height = data.get('height')
    weight = data.get('weight')
    birthdate_str = data.get('birthdate')
    gender = data.get('gender')
    goal = data.get('goal')

    birthdate = None
    if birthdate_str:
        try:
            birthdate = datetime.fromisoformat(birthdate_str).date()
        except ValueError:
            return jsonify({'error': 'Invalid birthdate format. Use YYYY-MM-DD'}), 400

    session = SessionLocal()
    try:
        user = User(
            name=name,
            email=email,
            height=height,
            weight=weight,
            birthdate=birthdate,
            gender=gender,
            goal=goal,
        )
        session.add(user)
        session.commit()
        session.refresh(user)
        return jsonify({
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'height': user.height,
            'weight': user.weight,
            'birthdate': user.birthdate.isoformat() if user.birthdate else None,
            'gender': user.gender,
            'goal': user.goal,
        }), 201
    finally:
        session.close()
