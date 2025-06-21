"""Model package initialization with SQLAlchemy Base."""

from backend.database.init import Base

from .user import User
from .inventory import Inventory

__all__ = ["User", "Inventory", "Base"]
