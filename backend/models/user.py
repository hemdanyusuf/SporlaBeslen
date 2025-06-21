from sqlalchemy import Column, Integer, String
from database.init import Base
from sqlalchemy.schema import Table

class User(Base):
    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}  # 👈 Bu satır çözüm getirir

    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False)
