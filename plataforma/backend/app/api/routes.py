from fastapi import APIRouter
from app.api.endpoints import auth, progress, documents, podcasts, quantum

api_router = APIRouter()

api_router.include_router(auth.router,      prefix="/auth",      tags=["auth"])
api_router.include_router(progress.router,  prefix="/progress",  tags=["progress"])
api_router.include_router(documents.router, prefix="/documents", tags=["documents"])
api_router.include_router(podcasts.router,  prefix="/podcasts",  tags=["podcasts"])
api_router.include_router(quantum.router,   prefix="/quantum",   tags=["quantum"])
