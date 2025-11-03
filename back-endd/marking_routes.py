from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from models import Marking
from dependencies import join_session, verify_token
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, time
from schemas import MarkingRequest

marking_router = APIRouter(prefix="/marking", tags=["marking"])

#horario permitido para marcar ou alterar a presença
START_HOUR = time(6, 0)
END_HOUR = time(18, 0)



@marking_router.post("/")
async def marking_presence(
    data: MarkingRequest,
    session: Session = Depends(join_session),
    student = Depends(verify_token)
):
    #pega a hora atual
    now = datetime.now().time()

    #verifica se está dentro do horário permitido
    if not (START_HOUR <= now <= END_HOUR):
        raise HTTPException(
            status_code=400,
            detail=f"Você só pode marcar ou alterar entre {START_HOUR.strftime('%H:%M')} e {END_HOUR.strftime('%H:%M')}"
        )

    #pega a data de amanhã para marcar o cardápio de amanhã
    tomorrow = (datetime.now() + timedelta(days=1)).date().isoformat()

    #verifica se já existe marcação
    existing = session.query(Marking).filter(
        Marking.student == student.id,
        Marking.date == tomorrow
    ).first()

    #atualiza se já existe
    if existing:
        existing.presence = data.presence
        msg = "Marcação atualizada com sucesso."
    else:
        # cria nova marcação
        new_marking = Marking(
            student=student.id,
            date=tomorrow,
            presence=data.presence
        )
        session.add(new_marking)
        msg = "Marcação registrada com sucesso."

    session.commit()
    return {"mensagem": msg}
