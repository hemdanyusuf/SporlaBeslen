from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from database.init import SessionLocal
from models.user import User

user_bp = Blueprint('user', __name__)

@user_bp.route('/users', methods=['GET'])
def get_users():
    db: Session = SessionLocal()
    users = db.query(User).all()
    db.close()
    return jsonify([{"id": u.id, "username": u.username} for u in users])

@user_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    db: Session = SessionLocal()
    new_user = User(username=data["username"])
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    db.close()
    return jsonify({"id": new_user.id, "username": new_user.username})
