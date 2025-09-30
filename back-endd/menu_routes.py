from fastapi import APIRouter, HTTPException, Depends
from models import Menu, Student
from dependencies import join_session, verify_token
from sqlalchemy.orm import Session


menu_router = APIRouter(prefix="/menu", tags=["menu"])

#para criar rotas, se usa decorator
#todo caminho que se cria, comeca com /
#e depois cria uma funcao pra quem vai associar esse decorator
#retorna json
@menu_router.get("/")
async def menu(session: Session = Depends(join_session), student: Student = Depends(verify_token)):
    menu = session.query(Menu).all() #nao sei como os cardapios vao funcionar, ao certo - entao ta essa coisa meia bomba aqui
    if menu:
        #ou seja se encontrou alguma coisa, devolve o q foi encontrado
        return menu
    else:
        raise HTTPException(status_code=400, detail="Nada foi encontrado para hoje.")
                     