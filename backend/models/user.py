from sqlalchemy import Column, Integer, String

from backend.database.init import Base

class User(Base):
    __tablename__ = "users"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
