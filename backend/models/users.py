from database import Base
from sqlalchemy import Column,Integer,String
from sqlalchemy.orm import relationship
class User(Base):
    __tablename__="users"
    id=Column(Integer,primary_key=True,index=True)
    username=Column(String,index=True,nullable=False)
    email=Column(String,index=True,nullable=False)
    hashed_password=Column(String,nullable=False)
    favorites=relationship("Favorites",back_populates="user",cascade="all,delete")
    history=relationship("History",back_populates="user",cascade="all, delete")
