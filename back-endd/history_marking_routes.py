from fastapi import APIRouter, HTTPException, Depends
from models import Menu, Student, Marking
from dependencies import join_session, verify_token
from sqlalchemy.orm import Session
from datetime import date, timedelta

history_marking_router = APIRouter(prefix="/history_marking", tags=["history_marking"])

@history_marking_router.get("/")
async def get_history(session: Session = Depends(join_session), student: Student = Depends(verify_token)):
    #pega a data
    today = date.today()
    #calcula a data de 7 dias
    last_week = today - timedelta(days=7)

    #busca o cardapio dos ultimnos 7 dias, contando hoje
    menus = (
        session.query(Menu)
        .filter(Menu.date >= last_week.strftime("%Y-%m-%d"), Menu.date <= today.strftime("%Y-%m-%d"))
        .order_by(Menu.date.desc())
        .all()
    )

    history = []

    for menu in menus:
        #verifica se o aluno marcou presença nesse cardápio
        marking = (
            session.query(Marking)
            .filter(Marking.student == student.id, Marking.date == menu.date)
            .first()
        )
        #adiciona as informacoes numa lista, pra retornar o json
        history.append({
            "date": menu.date,
            "prato_principal": menu.main_course,
            "presenca": bool(marking)  # True se marcou, False se não
        })

    #caso não houver nenhum resultado
    if not history:
        raise HTTPException(status_code=404, detail="Nenhum histórico encontrado.")

    return history
