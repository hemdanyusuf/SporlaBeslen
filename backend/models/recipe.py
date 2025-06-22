from sqlalchemy import Column, Integer, String

from backend.database.init import Base

class Recipe(Base):
    """Recipe model representing available recipes."""

    __tablename__ = "recipes"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    ingredients = Column(String)
    kcal_from_ingredients = Column(Integer)
    NER = Column(String)


