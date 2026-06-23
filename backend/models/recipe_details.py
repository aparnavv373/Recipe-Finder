from database import Base
from sqlalchemy import Column,Integer,String,JSON,DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
class Recipes(Base):
    __tablename__="recipe_details"
    id=Column(Integer,primary_key=True,index=True)
    recipe_name=Column(String,index=True,unique=True,nullable=False)
    recipe_data=Column(JSON,nullable=True)
    image_url=Column(String,nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    favorites=relationship("Favorites",back_populates="recipe",cascade="all, delete")
    history=relationship("History",back_populates="recipe",cascade="all, delete")