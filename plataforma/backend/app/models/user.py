from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, Float
from sqlalchemy.sql import func
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Progress(Base):
    __tablename__ = "progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    week_number = Column(Integer, nullable=False)       # 1-12
    item_type = Column(String, nullable=False)          # "checklist" | "exercise" | "milestone"
    item_key = Column(String, nullable=False)           # identificador único del item
    completed = Column(Boolean, default=False)
    score = Column(Float, nullable=True)                # para evaluaciones
    notes = Column(Text, nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    filename = Column(String, nullable=False)
    original_name = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    file_type = Column(String, nullable=False)         # "pdf" | "txt" | "md" | "ipynb"
    size_bytes = Column(Integer, nullable=False)
    status = Column(String, default="pending")         # "pending" | "processing" | "ready" | "error"
    chunk_count = Column(Integer, nullable=True)
    collection_name = Column(String, nullable=True)    # nombre en ChromaDB
    summary = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Podcast(Base):
    __tablename__ = "podcasts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    document_id = Column(Integer, nullable=True)       # documento fuente (opcional)
    title = Column(String, nullable=False)
    style = Column(String, nullable=False)             # "magistral" | "conversacion" | "tutor" | "repaso" | "qa"
    script = Column(Text, nullable=True)
    audio_path = Column(String, nullable=True)
    duration_seconds = Column(Integer, nullable=True)
    status = Column(String, default="pending")         # "pending" | "generating" | "ready" | "error"
    created_at = Column(DateTime(timezone=True), server_default=func.now())
