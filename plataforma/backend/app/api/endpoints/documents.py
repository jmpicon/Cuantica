from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.config import settings
from app.models.user import Document
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
    ext = file.filename.split(".")[-1].lower()
    if ext not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail=f"Tipo no soportado: .{ext}")
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    safe_name = f"{uuid.uuid4().hex}.{ext}"
    file_path = os.path.join(settings.UPLOAD_DIR, safe_name)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    size = os.path.getsize(file_path)
    if size > settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024:
        os.remove(file_path)
        raise HTTPException(status_code=413, detail="Archivo demasiado grande")
    doc = Document(
        user_id=user_id, filename=safe_name, original_name=file.filename,
        file_path=file_path, file_type=ext, size_bytes=size, status="pending",
    )
    db.add(doc); db.commit(); db.refresh(doc)
    return {"id": doc.id, "filename": file.filename, "status": "pending"}


@router.get("/{user_id}")
def list_documents(user_id: int, db: Session = Depends(get_db)):
    return db.query(Document).filter(Document.user_id == user_id).all()


@router.delete("/{user_id}/{doc_id}")
def delete_document(user_id: int, doc_id: int, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == doc_id, Document.user_id == user_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Documento no encontrado")
    if os.path.exists(doc.file_path):
        os.remove(doc.file_path)
    db.delete(doc); db.commit()
    return {"ok": True}
