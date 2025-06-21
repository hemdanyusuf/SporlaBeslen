from flask import Flask, jsonify
from routes.inventory import inventory_bp
from routes.predict import predict_bp
from flask_cors import CORS
from database.init import init_db
from models import user  # kullanıcı modelini yüklemiş olduk
from sqlalchemy import Column, Integer, String
from database.init import Base  # Base, declarative_base() ile tanımlanmış olmalı

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False)


app = Flask(__name__)
CORS(app)

init_db()  # modeller yüklendikten sonra çağrılmalı

app.register_blueprint(inventory_bp, url_prefix='/api')
app.register_blueprint(predict_bp, url_prefix='/api')

@app.route('/')
def index():
    return jsonify({'message': 'Backend is up and running'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
