from database import Base
from sqlalchemy import Column,Integer,String,JSON,DateTime,ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
class History(Base):
    __tablename__="history"
    id=Column(Integer,primary_key=True,index=True)
    user_id=Column(Integer,ForeignKey("users.id"),index=True)
    recipe_id=Column(Integer,ForeignKey("recipe_details.id"),index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    user=relationship("User",back_populates="history")
    recipe=relationship("Recipes",back_populates="history")