from flask import Blueprint, jsonify, request

inventory_items = []

inventory_bp = Blueprint('inventory', __name__)

@inventory_bp.route('/inventory', methods=['GET', 'POST'])
def inventory_home():
    if request.method == 'POST':
        data = request.get_json() or {}
        inventory_items.append(data)
        return jsonify({'status': 'success'}), 201
    return jsonify(inventory_items)
