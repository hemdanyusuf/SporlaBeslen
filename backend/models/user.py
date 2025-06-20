
from sqlalchemy import Column, Integer, String, Date

from datetime import date

from database.init import Base


class User(Base):
    """SQLAlchemy model for application users."""

    __tablename__ = "users"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    height = Column(Integer)
    weight = Column(Integer)
    birthdate = Column(Date)
    gender = Column(String)
    goal = Column(String)
from sqlalchemy import Column, Integer, String
from database.init import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)

class User:
    def __init__(self, user_id, username):
        self.id = user_id
        self.username = username
