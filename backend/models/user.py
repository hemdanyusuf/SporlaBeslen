from sqlalchemy import Column, Integer, String
from database.init import Base
from sqlalchemy.schema import Table
from database.init import Base


class User(Base):
    """SQLAlchemy model for application users."""

    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}  # 👈 Bu satır çözüm getirir

    __table_args__ = {"extend_existing": True}


    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
