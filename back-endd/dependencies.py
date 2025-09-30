from fastapi import Depends, HTTPException
from models import db
from sqlalchemy.orm import sessionmaker, Session
from models import Student
from jose import jwt, JWTError
from main import SECRET_KEY, ALGORITHM, oauth2_schema

#Acessa o banco, e garente que o banco vai ser fechado
def join_session():
#cria a estrutura de seguranca
#cria a sessao do banco de dados
#pra garantir que a 
    try:
        Session = sessionmaker(bind=db)
        session = Session() #por padrao eh um generator do python - uma lista
        yield session #nao encerrar a sessao, ele retorna o valor, mas nao encerra a execucao da sessao
        #so fecha a sessao se ja estiver tudo 
    finally:
        #executa independente das circunstancias
        session.close()
#-----------------------------------------------------------------------------

def verify_token(token: str = Depends(oauth2_schema), session=Depends(join_session)):
    try: 
        dict_info = jwt.decode(token, SECRET_KEY, ALGORITHM)
        id_student = int(dict_info.get("sub"))
    except JWTError as erro:
        print(erro)
        raise HTTPException(status_code=401, detail="Acesso negado, verifique a válidade do token.")
    #verifica se o token eh valido 
    student = session.query(Student).filter(Student.id==id_student).first()
    if not student:
        raise HTTPException(status_code=401, detail="Acesso inválido.")
    return student
#-----------------------------------------------------------------------------