from fastapi import FastAPI
from passlib.context import CryptContext
from dotenv import load_dotenv
import os
from fastapi.security import OAuth2PasswordBearer

load_dotenv() #carrega as variaveis de ambiente que estao no mesmo lugar que o seu codigo

SECRET_KEY = os.getenv("SECRET_KEY") #procura e ao achar carrega ela
ALGORITHM = os.getenv("ALGORITHM")
ACESS_TOKEN_EXPIRE_MINUTES  = int(os.getenv("ACESS_TOKEN_EXPIRE_MINUTES"))

app = FastAPI()

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto") #passa qual schema que ele vai utiliza (do bcrypt), e o deprecater="auto"
oauth2_schema = OAuth2PasswordBearer(tokenUrl="auth/login-form")
#nos schemas de criptografia voce pode passar mais de um 
#as ordem de importacao importam
#eh necessario que o fastapi exista
#roteador de rotas - estrutara que ta sendo criada
from auth_routes import auth_router
from menu_routes import menu_router
from marking_routes import marking_router

#path - caminho da rota

#para rodar o codigo, executa no terminal: uvicorn main:app --reload

#para o app incluir
#inclui um roteador
app.include_router(auth_router)
app.include_router(menu_router)
app.include_router(marking_router)




#get - leitura
#post - enviar/criar
#put - atuliazar - editar
#delete - apagar

#api que seguem esse padrao sao chamadas de restapi

