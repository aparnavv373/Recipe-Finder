from fastapi import FastAPI,Depends,HTTPException
from database import Base,engine,get_db
from models.users import User
from models.recipe_details import Recipes
from models.history import History
from models.favorites import Favorites
from schemas import UserCreate,LoginData,Recipe,Ingredients
from security import hash_password,verify_passsword
import logging
import json

from auth import create_access_token,get_current_user
from fastapi.middleware.cors import CORSMiddleware
from image_service import search
from math import ceil
from ai_service import getrecipe_info


app=FastAPI()
Base.metadata.create_all(bind=engine)
origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
app.add_middleware( 
     CORSMiddleware,
     allow_origins=origins,
     allow_credentials=True,
     allow_methods=["*"],
     allow_headers=["*"],
)


@app.post("/signup")
def create_user(user:UserCreate,db=Depends(get_db)):
    userEmail=db.query(User).filter(User.email==user.email).first()
    print("DEBUG SIGNUP:", userEmail)
    if userEmail:
        raise HTTPException(status_code=409,detail="Email already registered")
    
    password=hash_password(user.password)
    new_user=User(
            username=user.username,
            email=user.email,
            hashed_password=password
            )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return{
         "message":"Signup successfull"
    }
@app.post("/login")
def login_user(user:LoginData,db=Depends(get_db)):
    valid_user=db.query(User).filter(User.email==user.email).first()
    if not valid_user:
        raise HTTPException(status_code=401,detail="Invalid credentials")
    verified=verify_passsword(user.password,valid_user.hashed_password)
    if not verified:
        raise HTTPException(status_code=401,detail="Invalid credintials")
    access_token=create_access_token(
    data={"sub":valid_user.email}
    )
    return{
        "access_token":access_token,
        "token_type":"bearer"
     }
        
        
               
    
@app.post("/generate-recipe")
async def get_recipe(recipe_name:Recipe,current_user:User=Depends(get_current_user),db=Depends(get_db)):
    print("recipe request received")
    name=recipe_name.recipe_name.lower()

    if not current_user:
         raise HTTPException(status_code=401,detail="unauthorized")
    print("Checking database")
    existing_recipe=db.query(Recipes).filter(Recipes.recipe_name==name).first()
    if existing_recipe:
        existing_favorites=db.query(Favorites).filter(Favorites.user_id==current_user.id,Favorites.recipe_id==existing_recipe.id).first()
        new_history=History(
            user_id=current_user.id,
            recipe_id=existing_recipe.id
            )
        db.add(new_history)
        db.commit()
        db.refresh(new_history)


        return{
             "recipe":existing_recipe.recipe_data,
             "image":existing_recipe.image_url,
             "recipe_id":existing_recipe.id,
             "is_favorite":existing_favorites is not None
         }
      
    
    recipe = json.loads(await getrecipe_info(name))


    image=await search(f"{name} food")

    new_recipe=Recipes(
            recipe_name=name,
            recipe_data=recipe,
            image_url=image
            )
    print("Saving recipe")
    db.add(new_recipe)
    db.commit()
    db.refresh(new_recipe)

    new_history=History(
            user_id=current_user.id,
            recipe_id=new_recipe.id
            )
    db.add(new_history)
    db.commit()
    db.refresh(new_history)
    return{
         "recipe":recipe,
         "image":image,
         "recipe_id":new_recipe.id,
         "is_favorite":False


    }

@app.post("/favorites/{recipe_id}")
async def post_favorite(recipe_id:int,current_user:User=Depends(get_current_user),db=Depends(get_db)):
 
   existing_recipe=db.query(Recipes).filter(Recipes.id==recipe_id).first()
   existing_favorites=db.query(Favorites).filter(Favorites.user_id==current_user.id,Favorites.recipe_id==recipe_id).first()
   if not existing_recipe:
        raise HTTPException(status_code=404,detail="recipe not found")
   if existing_favorites:
        raise HTTPException(status_code=409,detail="recipe already exists in favorites")
   
   new_favorite=Favorites(
        user_id=current_user.id,
        recipe_id=recipe_id
   )
   db.add(new_favorite)
   db.commit()
   db.refresh(new_favorite)
   return{
         "message":"Recipe added to favorites"
    }
@app.get("/favorites")
def get_favorites(page:int=1,limit:int=8,current_user:User=Depends(get_current_user),db=Depends(get_db)):
    total_items = (db.query(Favorites).filter(Favorites.user_id == current_user.id).count())
    total_pages = ceil(total_items / limit)
    offset=(page-1)*limit
    existing_favorites=db.query(Favorites).filter(Favorites.user_id==current_user.id).order_by(Favorites.created_at.desc()).offset(offset).limit(limit).all()
    if existing_favorites: 
        favorite_list=[]
        for  favorite in existing_favorites:
             details= {
                  "recipe_id":favorite.recipe_id,
                  "name":favorite.recipe.recipe_name,
                  "image":favorite.recipe.image_url
              }
             favorite_list.append(details)
        return {
          "page":page,
          "limit":limit,
          "total_pages":total_pages,
          "favorites":favorite_list
          }
    return{
          "page":page,
          "limit":limit,
          "total_pages":total_pages,
          "favorites":[]
     }
@app.delete("/favorites/{recipe_id}")
async def delete_favorite(recipe_id:int,current_user:User=Depends(get_current_user),db=Depends(get_db)):
        
        existing_favorites=db.query(Favorites).filter(Favorites.user_id==current_user.id,Favorites.recipe_id==recipe_id).first()
        if existing_favorites:
               db.delete(existing_favorites)
               db.commit()
               return{
                    "message":"Favorite removed successfully"
               }
        
        raise HTTPException(status_code=404,detail="not found")
@app.get("/history")
async def get_history(page:int=1,limit:int=8,current_user:User=Depends(get_current_user),db=Depends(get_db)):
     total_items = (db.query(History).filter(History.user_id == current_user.id).count())
     total_pages = ceil(total_items / limit)
     offset=(page-1)*limit
     existing_history=db.query(History).filter(History.user_id==current_user.id).order_by(History.created_at.desc()).offset(offset).limit(limit).all()
     if existing_history:
        history_list=[]
        for  history in existing_history:
             details= {
                  "recipe_id":history.recipe_id,
                  "name":history.recipe.recipe_name,
                  "image":history.recipe.image_url
              }
             history_list.append(details)
        return {
             "history":history_list,
             "page":page,
             "limit":limit,
             "total_pages":total_pages
          }
     return{
          "history":[],
          "page":page,
          "limit":limit,
          "total_pages":total_pages
     } 
@app.get("/details/{recipe_id}")
async def get_recipe_details(recipe_id:int,current_user:User=Depends(get_current_user),db=Depends(get_db)):
     exisiting_recipe=db.query(Recipes).filter(Recipes.id==recipe_id).first()
     if not  exisiting_recipe:
         raise HTTPException(status_code=404,detail="recipe not found")
     existing_favorite = db.query(Favorites).filter(Favorites.user_id == current_user.id,Favorites.recipe_id == recipe_id).first()


     return{
               "recipe_id":exisiting_recipe.id,
               "recipe":exisiting_recipe.recipe_data,
               "image":exisiting_recipe.image_url,
               "is_favorite":existing_favorite is not None
          }
     