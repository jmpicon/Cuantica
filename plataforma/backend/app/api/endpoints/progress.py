from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import Progress
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

router = APIRouter()


class ProgressUpdate(BaseModel):
    week_number: int
    item_type: str
    item_key: str
    completed: bool
    score: Optional[float] = None
    notes: Optional[str] = None


@router.get("/{user_id}/summary")
def get_progress_summary(user_id: int, db: Session = Depends(get_db)):
    rows = db.query(Progress).filter(Progress.user_id == user_id).all()
    summary = {}
    for row in rows:
        week = f"semana_{row.week_number:02d}"
        if week not in summary:
            summary[week] = {"total": 0, "completed": 0}
        summary[week]["total"] += 1
        if row.completed:
            summary[week]["completed"] += 1
    for week, data in summary.items():
        data["pct"] = round(data["completed"] / data["total"] * 100) if data["total"] else 0
    return summary


@router.post("/{user_id}/update")
def update_progress(user_id: int, update: ProgressUpdate, db: Session = Depends(get_db)):
    item = db.query(Progress).filter(
        Progress.user_id == user_id,
        Progress.week_number == update.week_number,
        Progress.item_key == update.item_key,
    ).first()
    if item:
        item.completed = update.completed
        item.score = update.score
        item.notes = update.notes
        item.completed_at = datetime.utcnow() if update.completed else None
    else:
        item = Progress(
            user_id=user_id,
            week_number=update.week_number,
            item_type=update.item_type,
            item_key=update.item_key,
            completed=update.completed,
            score=update.score,
            notes=update.notes,
            completed_at=datetime.utcnow() if update.completed else None,
        )
        db.add(item)
    db.commit()
    return {"ok": True}


@router.get("/{user_id}/week/{week_number}")
def get_week_progress(user_id: int, week_number: int, db: Session = Depends(get_db)):
    return db.query(Progress).filter(
        Progress.user_id == user_id,
        Progress.week_number == week_number,
    ).all()
