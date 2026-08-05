import os

class Settings:
    PROJECT_NAME: str = "CivicAI - AI Powered Crowdsourced Civic Issue Reporting System"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "civicai_super_secret_jwt_key_sih_2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # Database URL
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:///./civic_ai.db"
    )

settings = Settings()
