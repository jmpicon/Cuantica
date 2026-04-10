from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, BackgroundTasks
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.config import settings
from app.models.user import Document
from app.services.rag import process_document, query_document
import os, shutil, uuid

router = APIRouter()
ALLOWED_TYPES = {"pdf", "txt", "md", "ipynb"}


@router.post("/{user_id}/upload")
async def upload_document(
    user_id: int,
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=503, detail="OPENAI_API_KEY no configurada. Añádela al .env.")

    ext = (file.filename or "").split(".")[-1].lower()
    if ext not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail=f"Tipo no soportado: .{ext}. Acepta: {', '.join(ALLOWED_TYPES)}")

    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    safe_name = f"{uuid.uuid4().hex}.{ext}"
    file_path = os.path.join(settings.UPLOAD_DIR, safe_name)

    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    size = os.path.getsize(file_path)
    if size > settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024:
        os.remove(file_path)
        raise HTTPException(status_code=413, detail=f"Archivo supera el límite de {settings.MAX_UPLOAD_SIZE_MB} MB")

    doc = Document(
        user_id=user_id,
        filename=safe_name,
        original_name=file.filename,
        file_path=file_path,
        file_type=ext,
        size_bytes=size,
        status="pending",
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)

    # Procesar en background (extraer texto, embeds, ChromaDB)
    background_tasks.add_task(process_document, doc.id)

    return {
        "id": doc.id,
        "nombre": file.filename,
        "tipo": ext.upper(),
        "tamaño": _fmt_size(size),
        "estado": "procesando",
        "fecha": doc.created_at.strftime("%Y-%m-%d") if doc.created_at else "",
    }


@router.get("/{user_id}")
def list_documents(user_id: int, db: Session = Depends(get_db)):
    docs = db.query(Document).filter(Document.user_id == user_id).order_by(Document.created_at.desc()).all()
    return [
        {
            "id": d.id,
            "nombre": d.original_name,
            "tipo": d.file_type.upper(),
            "tamaño": _fmt_size(d.size_bytes),
            "estado": _map_status(d.status),
            "fecha": d.created_at.strftime("%Y-%m-%d") if d.created_at else "",
            "chunks": d.chunk_count,
            "resumen": d.summary,
        }
        for d in docs
    ]


@router.delete("/{user_id}/{doc_id}")
def delete_document(user_id: int, doc_id: int, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == doc_id, Document.user_id == user_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Documento no encontrado")
    if doc.file_path and os.path.exists(doc.file_path):
        os.remove(doc.file_path)
    # Eliminar colección de ChromaDB si existe
    if doc.collection_name:
        try:
            import chromadb
            client = chromadb.PersistentClient(path=settings.CHROMA_PERSIST_DIR)
            client.delete_collection(doc.collection_name)
        except Exception:
            pass
    db.delete(doc)
    db.commit()
    return {"ok": True}


class QueryRequest(BaseModel):
    pregunta: str


@router.post("/{user_id}/{doc_id}/query")
def query_doc(user_id: int, doc_id: int, body: QueryRequest, db: Session = Depends(get_db)):
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=503, detail="OPENAI_API_KEY no configurada")

    # Verificar que el doc pertenece al usuario
    doc = db.query(Document).filter(Document.id == doc_id, Document.user_id == user_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Documento no encontrado")
    if doc.status != "ready":
        raise HTTPException(status_code=409, detail="El documento aún se está procesando")

    respuesta = query_document(doc_id, body.pregunta)
    return {"respuesta": respuesta}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _fmt_size(size_bytes: int) -> str:
    if size_bytes >= 1024 * 1024:
        return f"{size_bytes / 1024 / 1024:.1f} MB"
    return f"{size_bytes // 1024} KB"


def _map_status(status: str) -> str:
    return {"pending": "procesando", "processing": "procesando", "ready": "listo", "error": "error"}.get(status, status)
