from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date, timedelta

from dependencies import join_session, verify_token
from models import Marking, Student

marking_today_router = APIRouter(prefix="/marking", tags=["marking"])

@marking_today_router.get("/today")
async def check_today_marking(
    session: Session = Depends(join_session),
    student: Student = Depends(verify_token)
):
    # Verifica a marcação de amanhã (mesma data que o POST)
    target_date = (date.today() + timedelta(days=1)).isoformat()

    marking = session.query(Marking).filter_by(student=student.id, date=target_date).first()

    return {
        "marked": bool(marking),
        "message": "Você já marcou a presença para amanhã!" if marking else ""
    }