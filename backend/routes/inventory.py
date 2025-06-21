from flask import Blueprint, jsonify, request

from backend.database.init import SessionLocal
from backend.models.inventory import Inventory

inventory_bp = Blueprint('inventory', __name__)


@inventory_bp.route('/inventory', methods=['GET'])
def list_items():
    """Return all inventory items."""
    session = SessionLocal()
    try:
        items = session.query(Inventory).all()
        data = [
            {
                'id': item.id,
                'user_id': item.user_id,
                'item_name': item.item_name,
                'quantity': item.quantity,
            }
            for item in items
        ]
        return jsonify(data)
    finally:
        session.close()


@inventory_bp.route('/inventory', methods=['POST'])
def create_item():
    """Create a new inventory item."""
    data = request.get_json() or {}
    user_id = data.get('user_id')
    item_name = data.get('item_name')
    quantity = data.get('quantity')
    if user_id is None or not item_name or quantity is None:
        return jsonify({'error': 'user_id, item_name and quantity required'}), 400

    session = SessionLocal()
    try:
        item = Inventory(user_id=user_id, item_name=item_name, quantity=quantity)
        session.add(item)
        session.commit()
        return (
            jsonify(
                {
                    'id': item.id,
                    'user_id': item.user_id,
                    'item_name': item.item_name,
                    'quantity': item.quantity,
                }
            ),
            201,
        )
    finally:
        session.close()


@inventory_bp.route('/inventory/<int:item_id>', methods=['DELETE'])
def delete_item(item_id: int):
    """Delete an inventory item by id."""
    session = SessionLocal()
    try:
        item = session.query(Inventory).get(item_id)
        if not item:
            return jsonify({'error': 'Item not found'}), 404

        session.delete(item)
        session.commit()
        return jsonify({'message': 'Item deleted'})
    finally:
        session.close()
