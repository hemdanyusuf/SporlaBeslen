from flask import Blueprint, jsonify, request
from backend.database.init import SessionLocal
from backend.models.user import User

users_bp = Blueprint('users', __name__)


@users_bp.route('/users', methods=['GET'])
def list_users():
    """Return all users as JSON."""
    session = SessionLocal()
    try:
        users = session.query(User).all()
        data = [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
            }
            for user in users
        ]
        return jsonify(data)
    finally:
        session.close()


@users_bp.route('/users', methods=['POST'])
def create_user():
    """Create a new user with name and email."""
    data = request.get_json() or {}
    name = data.get('name')
    email = data.get('email')
    if not name or not email:
        return jsonify({'error': 'name and email required'}), 400

    session = SessionLocal()
    try:
        user = User(name=name, email=email)
        session.add(user)
        session.commit()
        return jsonify({
            'id': user.id,
            'name': user.name,
            'email': user.email,
        }), 201
    finally:
        session.close()
