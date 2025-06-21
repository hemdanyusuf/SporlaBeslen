from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config import DATABASE_URL

# SQLAlchemy Base tanımı
Base = declarative_base()

# PostgreSQL bağlantısı
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# DB'yi başlatan fonksiyon
def init_db():
    Base.metadata.create_all(bind=engine)
