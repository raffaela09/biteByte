from pydantic import BaseModel
from typing import Optional
#classes do pydantic - forca a tipagem do python
#o objetivo de utilizar isso eh deixar mais rapido 

class Student_schema(BaseModel):
    name: str
    ra: int
    email: str
    password: str
    active: Optional[bool] = True
    admin: Optional[bool] = False

    class Config:
        from_attributes = True
#-----------------------------------------------------------------------------

class Menu_schema(BaseModel):
    date: str
    main_course: str

    class Config: 
        from_attributes = True #converte para json
#-----------------------------------------------------------------------------

class Marking_schema(BaseModel):
    student: Student_schema
    date: str
    presence: bool

    class Config:
        orm_mode = True  # 
#-----------------------------------------------------------------------------

class Login_schema(BaseModel):
    email: str
    password: str

    class Config:
        from_attributes = True
#-----------------------------------------------------------------------------