from fastapi import APIRouter, HTTPException, Depends
from models import Marking
from dependencies import join_session, verify_token
from sqlalchemy.orm import Session
from datetime import date

marking_router = APIRouter(prefix="/marking", tags=["marking"])

@marking_router.post("/")
async def marking_presence(session: Session = Depends(join_session), student = Depends(verify_token)):
    today = str(date.today())
    

    existing = session.query(Marking).filter(Marking.student == student.id, Marking.date == today).first()

    if existing:
        raise HTTPException(status_code=400, detail="Você já marcou hoje.")
    

    new_marking = Marking(student=student.id, date=today, presence=True)
    session.add(new_marking)
    session.commit()
#-----------------------------------------------------------------------------