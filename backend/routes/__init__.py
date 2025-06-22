
"""Blueprint package exports."""

from .inventory import inventory_bp
from .predict import predict_bp
from .users import users_bp
from .recommend import recommend_bp
from .recommendation import recommendation_bp
from .activity_log import activity_log_bp

__all__ = [
    "inventory_bp",
    "predict_bp",
    "users_bp",
    "recommend_bp",
    "recommendation_bp",
    "activity_log_bp",
]
