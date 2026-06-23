from database import Base
from sqlalchemy import Column,Integer,String,JSON,DateTime,ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy import UniqueConstraint
class Favorites(Base):
    __tablename__="favorites"
    __table_args__ = (UniqueConstraint('user_id', 'recipe_id', name='_user_favorite_uc'),)
    id=Column(Integer,primary_key=True,index=True)
    user_id=Column(Integer,ForeignKey("users.id"))
    recipe_id=Column(Integer,ForeignKey("recipe_details.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    user=relationship("User",back_populates="favorites")
    recipe=relationship("Recipes",back_populates="favorites") 