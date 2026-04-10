from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.core.config import settings
from app.models.user import Podcast, Document
from app.services.podcast_service import generate_script

router = APIRouter()


class PodcastRequest(BaseModel):
    titulo: str
    documento_id: Optional[int] = None
    tema: Optional[str] = None
    estilo: str = "conversacional"
    duracion_minutos: int = 15


@router.post("/{user_id}/generate")
def generate_podcast(user_id: int, req: PodcastRequest, db: Session = Depends(get_db)):
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=503, detail="OPENAI_API_KEY no configurada. Añádela al .env.")

    # Contexto del documento si se proporciona
    context = ""
    if req.documento_id:
        doc = db.query(Document).filter(
            Document.id == req.documento_id, Document.user_id == user_id
        ).first()
        if doc:
            if doc.status != "ready":
                raise HTTPException(status_code=409, detail="El documento aún se está procesando")
            context = doc.summary or ""

    # Usar tema libre si no hay documento
    if not context and req.tema:
        context = req.tema

    try:
        script = generate_script(
            titulo=req.titulo,
            estilo=req.estilo,
            duracion_minutos=req.duracion_minutos,
            context=context,
        )
    except ValueError as e:
        raise HTTPException(status_code=503, detail=str(e))

    podcast = Podcast(
        user_id=user_id,
        document_id=req.documento_id,
        title=req.titulo,
        style=req.estilo,
        script=script,
        status="ready",
    )
    db.add(podcast)
    db.commit()
    db.refresh(podcast)

    return _serialize(podcast)


@router.get("/{user_id}")
def list_podcasts(user_id: int, db: Session = Depends(get_db)):
    podcasts = (
        db.query(Podcast)
        .filter(Podcast.user_id == user_id)
        .order_by(Podcast.created_at.desc())
        .all()
    )
    return [_serialize(p) for p in podcasts]


@router.get("/{user_id}/{podcast_id}")
def get_podcast(user_id: int, podcast_id: int, db: Session = Depends(get_db)):
    p = db.query(Podcast).filter(Podcast.id == podcast_id, Podcast.user_id == user_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Podcast no encontrado")
    return _serialize(p)


@router.delete("/{user_id}/{podcast_id}")
def delete_podcast(user_id: int, podcast_id: int, db: Session = Depends(get_db)):
    p = db.query(Podcast).filter(Podcast.id == podcast_id, Podcast.user_id == user_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Podcast no encontrado")
    db.delete(p)
    db.commit()
    return {"ok": True}


def _serialize(p: Podcast) -> dict:
    return {
        "id": p.id,
        "titulo": p.title,
        "estilo": p.style,
        "guion": p.script,
        "estado": p.status,
        "fecha": p.created_at.strftime("%Y-%m-%d") if p.created_at else "",
        "duracion": p.duration_seconds,
    }
