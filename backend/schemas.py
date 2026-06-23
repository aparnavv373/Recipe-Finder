from pydantic import BaseModel,EmailStr
class UserCreate(BaseModel):
    username:str
    email:EmailStr
    password:str
class LoginData(BaseModel):
    email:EmailStr
    password:str
class Token(BaseModel):
    access_token:str
    token_type:str
class Recipe(BaseModel):
    recipe_name:str
class Ingredients(BaseModel):
    ingredients:list[str]
class ImageResponse(BaseModel):
    recipe_name:str
    url:str
    model_config = {
        "from_attributes": True
        }