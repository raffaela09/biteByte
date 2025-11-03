from fastapi import Depends, HTTPException
from sqlalchemy.orm import sessionmaker, Session
from models import db, Student
from jose import jwt, JWTError
from main import SECRET_KEY, ALGORITHM, oauth2_schema
from datetime import datetime, timezone

# Cria a sessão do banco de dados
def join_session():
    try:
        SessionLocal = sessionmaker(bind=db)
        session = SessionLocal()
        yield session
    finally:
        session.close()

# Verifica se o token é válido e retorna o usuário
def verify_token(token: str = Depends(oauth2_schema), session: Session = Depends(join_session)):
    try:
        payload = jwt.decode(token, SECRET_KEY, ALGORITHM)
        user_id = int(payload.get("sub"))
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")

    student = session.query(Student).filter(Student.id == user_id).first()
    if not student:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")

    return student