from flask import Blueprint

inventory_bp = Blueprint('inventory', __name__)

@inventory_bp.route('/inventory')
def inventory_home():
    return {'message': 'Inventory route'}
