from flask import Flask, jsonify

from backend.routes.inventory import inventory_bp
from backend.routes.predict import predict_bp
from backend.routes.users import users_bp
from backend.database.init import init_db
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

init_db()

app.register_blueprint(inventory_bp, url_prefix='/api')
app.register_blueprint(predict_bp, url_prefix='/api')
app.register_blueprint(users_bp, url_prefix='/api')

@app.route('/')
def index():
    return jsonify({'message': 'Backend is up and running'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
