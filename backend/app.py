from flask import Flask, jsonify
from backend.routes.inventory import inventory_bp
from backend.routes.predict import predict_bp
from backend.routes.users import users_bp
from backend.routes.recommend import recommend_bp
from backend.routes.activity_log import activity_log_bp
from backend.database.init import init_db
from flask_cors import CORS

# Gerekli blueprint'leri al
from routes.inventory import inventory_bp
from routes.predict import predict_bp
from routes.users import user_bp

# Veritabanı başlatıcı
from database.init import init_db

# Modeli içeri al (oluşması için)
from models import user, inventory

app = Flask(__name__)
CORS(app)

# Tabloları oluştur
init_db()

# Blueprint'leri kaydet
app.register_blueprint(inventory_bp, url_prefix='/api')
app.register_blueprint(predict_bp, url_prefix='/api')
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(users_bp, url_prefix='/api')
app.register_blueprint(recommend_bp, url_prefix='/api')
app.register_blueprint(activity_log_bp, url_prefix='/api')

@app.route('/')
def index():
    return jsonify({'message': 'Backend is up and running'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
