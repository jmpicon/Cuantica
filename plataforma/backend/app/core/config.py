from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    APP_NAME: str = "Cuántica API"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False

    # Database
    DATABASE_URL: str = "postgresql://cuantica:cuantica@localhost:5432/cuantica"

    # Auth
    SECRET_KEY: str = "change-this-secret-key-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 días

    # IBM Quantum
    IBM_QUANTUM_TOKEN: Optional[str] = None
    IBM_QUANTUM_CHANNEL: str = "ibm_quantum"

    # LLM
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None

    # Storage
    UPLOAD_DIR: str = "./uploads"
    MAX_UPLOAD_SIZE_MB: int = 50

    # ChromaDB (vector store)
    CHROMA_PERSIST_DIR: str = "./chroma_db"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
