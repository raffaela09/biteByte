from fastapi import APIRouter, HTTPException, Depends
from models import Menu, Student
from dependencies import join_session, verify_token
from sqlalchemy.orm import Session
from datetime import date, timedelta

menu_router = APIRouter(prefix="/menu", tags=["menu"])

#pra assim, deixar automatico pra pegar sempre o dia de amanha
#pega a data de hoje




#para criar rotas, se usa decorator
#todo caminho que se cria, comeca com /
#e depois cria uma funcao pra quem vai associar esse decorator
#retorna json
@menu_router.get("/")
async def menu(session: Session = Depends(join_session), student: Student = Depends(verify_token)):
    #pega o dia de hoje
    today = date.today()

    #verifica se é sexta feira (dia 4), pra caso seja, retorna o cardapio de segunda
    if today.weekday() == 4:
        #soma a data de hoje com mais tres dias (pra devolver o cardapio de segunda)
        target_date = (today + timedelta(days=3)).strftime("%Y-%m-%d")
    #se for sabado ou domingo, ele pula pra segunda
    elif today.weekday() in [5, 6]:
        #faz o calculo de quantos dias faltam ate segunda
        days_until_monday = 7 - today.weekday()
        #pega o cardapio de segunda
        target_date = (today + timedelta(days_until_monday)).strftime("%Y-%m-%d")
    else:
        #pega o dia de hoje, e soma mais um, pra devolver sempre o cardapio de amanha
        target_date = (today + timedelta(days=1)).strftime("%Y-%m-%d")
    
    #faz a consulta no banco de dados
    menu = session.query(Menu).filter(Menu.date == target_date).all()
    #caso nao tenha nada no menu
    if not menu:
        raise HTTPException(status_code=400, detail="Nada foi encontrado para hoje.")
    return menu
#-----------------------------------------------------------------------------