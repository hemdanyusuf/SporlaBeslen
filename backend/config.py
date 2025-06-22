import os

class Config:
    """Application configuration."""

    DEBUG = True
    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:postgres@localhost/postgres",
    )
