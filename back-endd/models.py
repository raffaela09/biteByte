from sqlalchemy import create_engine, Column, String, Integer, Boolean, ForeignKey, UniqueConstraint
from sqlalchemy.orm import declarative_base

#create engine eh quem permite que voce crie o banco de dados
#choice
db = create_enginedb = create_engine('sqlite:///database.db') #dentro do parenteses passa o link do banco de dados 
Base = declarative_base()#cria a base do banco de dados, quem permite que a tabela seja criada no banco
#-----------------------------------------------------------------------------
#Users - alunos
#Cardapio
#Se marcou ou nao

#cria as classes/tabelas do banco de dados
#Alunos
class Student(Base):
    __tablename__ = "students"
    #restricoes da tabela do banco de dados
    id = Column("id", Integer, autoincrement=True, primary_key=True) #primeira coisa que se passa eh o nome que essa coluna vai ter no banco de dados
    name = Column("name", String, nullable=False)
    ra = Column("ra", Integer, unique=False, nullable=False)
    email = Column("email", String, unique=True)   
    password = Column("password", String)
    active = Column("active", Boolean)
    admin = Column("admin", Boolean, default=False)

    def __init__(self, name, ra, email, password, active=True, admin=False):
        #sempre que inicializar a criacao de um novo usuario
        self.name = name
        self.ra = ra
        self.email = email
        self.password = password
        self.active = active #para permitir que possa ser personalizado
        self.admin = admin
#-----------------------------------------------------------------------------

#Cardapio
class Menu(Base):
    __tablename__ = "menus"
    id = Column("id", Integer, autoincrement=True, primary_key=True)
    date = Column("date", String)
    main_course = Column("course", String)

    def __init__(self, date, main_course):
        self.date = date
        self.main_course = main_course
#-----------------------------------------------------------------------------

#Marcacao 
class Marking(Base):
    __tablename__ = "markings"
    __table_args__ = (UniqueConstraint('student', 'date', name='unique_student_date'),) #para garantir que o aluno marque apenas uma vez por dia
    id = Column("id", Integer, autoincrement=True, primary_key=True)
    student = Column("student", ForeignKey("students.id"))
    date = Column("date", String)
    presence = Column("presence", Boolean, default=False)

    def __init__(self, student, date, presence=False):
        self.student = student
        self.date = date
        self.presence = presence
#-----------------------------------------------------------------------------
#nullable - nao permite criar a tabela sem aquele item
#executa a criacao dos metadados do seu banco (cria efetivamente o banco de dados)
#migracao do banco de dados - a ferramenta para isso eh utiliza a alembic
#para fazer esse processo de migracao - alembic
#alembic init alembic - cria u
#env.py - precisa importa do meu models o Base -  que permite fazer a criacao do banco de dados
#para criar o banco de dados: roda no terminal alembic revision --autogenerate -m "Initial Migration" 
# RODAR PARA FAZER MIGRACOES
#autogenerate - gera pra voce o arquivo de migracao 
#para de fato criar o banco de dados : alembic upgrade head