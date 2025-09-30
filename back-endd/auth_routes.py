from fastapi import APIRouter, Depends, HTTPException
from models import Student
from dependencies import join_session, verify_token
from main import bcrypt_context, ALGORITHM, ACESS_TOKEN_EXPIRE_MINUTES, SECRET_KEY
from schemas import Student_schema, Login_schema
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone
from fastapi.security import OAuth2PasswordRequestForm
#depends diz que n eh algo que o user vai executar, e sim uma dependencia
#todas as rotas dependem de uma sesssao

auth_router = APIRouter(prefix="/auth", tags=["auth"]) #precisa passar em qual caminho existe a rota de autenticacao
#dominio/prefixo que eu defini/ 
# #tags eh uma lista - que sao as tags que vao estar dentro da sua rota

#funcao para gerar o token jwt para login
def create_token(id_student, duration_token = timedelta(minutes=ACESS_TOKEN_EXPIRE_MINUTES) ):
    expiration_date = datetime.now(timezone.utc) + duration_token #marca de expiracao (30 minutos)
    dict_info = {"sub": str(id_student), "exp": expiration_date} #dicionario com informacoes
    encoded_jwt = jwt.encode(dict_info, SECRET_KEY, ALGORITHM)
    return encoded_jwt
#-----------------------------------------------------------------------------



def authenticate_student(email: str, password: str, session: Session = Depends(join_session)):
    student = session.query(Student).filter(Student.email== email).first() 
    if not student:
        return False
    elif not bcrypt_context.verify(password, student.password):
        #o verify do bcrypt recebe uma senha, e uma hash, e ai ele verifica se sao iguais
        #nesse caso, a senha que o usuario passa e verifica se a do banco eh igual
        return False
    return student
#-----------------------------------------------------------------------------


@auth_router.get("/")
async def home():   
    """
    essa é a rota padrao de autenticacao do sistema
    """
    return {"mensagem": "vc acessou a rota padrao de autenticacao", "autenticado": False}
#-----------------------------------------------------------------------------

#do tipo post para criar alguma coisa
@auth_router.post("/register")
async def register(student_schema: Student_schema, session: Session = Depends(join_session)):
    #tenho que pesquisar na tabela se existe ja alguem com esse email
    #restricoes de quantidades de conexoes que se pode fazer no banco de dados
    #obrigatoriamente tem que finalizar 
    #em nenhum momento a sessao eh fechada
    #deveria retornar codigos, 200, etc
    #por padrao deveria mandar as instancias da classe de usuario
    #criar a sessao dentro da rota traz dois problemas: se tiver varias rotas que editam o banco de dados - segundo erro: em momento algum fecha a sessao

    student = session.query(Student).filter(Student.email == student_schema.email).first()
    if student:
        raise HTTPException(status_code=400, detail="E-mail do usuário já cadastrado.") #levanta um erro
    else:
        encrypted_password = bcrypt_context.hash(student_schema.password) #hash é o processo de criar um codioggg
        new_student = Student(student_schema.name, student_schema.ra, student_schema.email, encrypted_password, student_schema.active, student_schema.admin)
        session.add(new_student)
        #so edita o banco de dados depois de ja ter feito 
        session.commit()
        return {"mensagem": "Usuário cadastrado com sucesso."}
#-----------------------------------------------------------------------------


#Login
@auth_router.post("/login")
async def login(login_schema:Login_schema, session: Session = Depends(join_session)):
    student = authenticate_student(login_schema.email, login_schema.password, session)
    if not student:
        raise HTTPException(status_code=400, detail="Usuário não encontrado ou credencias inválidas.")
    else:
        access_token = create_token(student.id) #duracao de 30 minutos
        refresh_token = create_token(student.id, duration_token=timedelta(days=7)) #sao dois tokens diferentes, e o que muda eh a duracao do token - agora dura 7 dias
        #passado de 7 dias, obriga o usuario a fazer login de novo
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "Bearer"
        }
#-----------------------------------------------------------------------------

@auth_router.post("/login-form")
async def login_form(data_form: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(join_session)):
    student = authenticate_student(data_form.username, data_form.password, session)
    if not student:
        raise HTTPException(status_code=400, detail="Usuário não encontrado ou credencias inválidas.")
    else:
        access_token = create_token(student.id) #duracao de 30 minutos
        #passado de 7 dias, obriga o usuario a fazer login de novo
        return {
            "access_token": access_token,
            "token_type": "Bearer"
        }
#-----------------------------------------------------------------------------

#funcao para usar o refresh token
#dependencia no verificar token eh pra garantir que o usuario esta logado para acessar determinado endpoint
@auth_router.get("/refresh")
async def use_refresh_token(student: Student = Depends(verify_token)):
    access_token = create_token(student.id)
    return {
            "access_token": access_token,
            "token_type": "Bearer" #nao tem que ser enviado como param, tem que ser enviado como header - OAuth2
        }
#-----------------------------------------------------------------------------