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
