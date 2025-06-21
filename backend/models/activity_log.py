from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

from backend.database.init import Base


class ActivityLog(Base):
    """User activity log."""

    __tablename__ = "activity_log"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    activity_type = Column(String, nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    calories_burned = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)

    user = relationship("User", backref="activity_logs")
