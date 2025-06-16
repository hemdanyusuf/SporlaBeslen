from flask import Blueprint

predict_bp = Blueprint('predict', __name__)

@predict_bp.route('/predict')
def predict_home():
    return {'message': 'Predict route'}
