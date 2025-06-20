DATABASE_URL = "postgresql://postgres:12345678@localhost:5432/diyetdb"

class Config:
    DEBUG = True
    # Database connection string, defaulting to a local PostgreSQL database
    import os

    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:postgres@localhost/postgres",
    )
