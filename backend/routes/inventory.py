from flask import Blueprint, jsonify

inventory_bp = Blueprint('inventory', __name__)


@inventory_bp.route('/inventory', methods=['GET'])
def inventory_home():
    """Return a test JSON response for the inventory endpoint."""

    return jsonify({"items": ["item1", "item2"]})
