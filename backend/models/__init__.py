"""Model package initialization with SQLAlchemy Base."""

from backend.database.init import Base

from .user import User

__all__ = ["User", "Base"]
