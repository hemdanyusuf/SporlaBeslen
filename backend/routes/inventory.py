from flask import Blueprint, jsonify, request
from database.init import SessionLocal
from models.inventory import Inventory

inventory_bp = Blueprint('inventory', __name__)

@inventory_bp.route('/inventory', methods=['GET'])
def list_items():
    session = SessionLocal()
    try:
        items = session.query(Inventory).all()
        data = [{'id': i.id, 'user_id': i.user_id, 'item_name': i.item_name, 'quantity': i.quantity} for i in items]
        return jsonify(data)
    finally:
        session.close()

@inventory_bp.route('/inventory', methods=['POST'])
def create_item():
    data = request.get_json()
    user_id = data.get('user_id')
    item_name = data.get('item_name')
    quantity = data.get('quantity')
    if not user_id or not item_name or quantity is None:
        return jsonify({'error': 'user_id, item_name and quantity required'}), 400

    session = SessionLocal()
    try:
        item = Inventory(user_id=user_id, item_name=item_name, quantity=quantity)
        session.add(item)
        session.commit()
        session.refresh(item)
        return jsonify({'id': item.id, 'user_id': item.user_id, 'item_name': item.item_name, 'quantity': item.quantity}), 201
    finally:
        session.close()

@inventory_bp.route('/inventory/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    session = SessionLocal()
    try:
        item = session.get(Inventory, item_id)
        if not item:
            return jsonify({'error': 'Item not found'}), 404

        session.delete(item)
        session.commit()
        return jsonify({'message': 'Item deleted'})
    finally:
        session.close()
