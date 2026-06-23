import os
from dotenv import load_dotenv
from datetime import datetime ,timedelta,timezone
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError,jwt
from database import get_db
from models.users import User
load_dotenv()
from fastapi import Depends,HTTPException
oauth2_scheme=OAuth2PasswordBearer(tokenUrl="token")
SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30

def create_access_token(data:dict,expires_delta:timedelta|None=None):
    to_encode=data.copy()
    if expires_delta:
        expire=datetime.now(timezone.utc)+expires_delta
    else:
        expire=datetime.now(timezone.utc)+timedelta(minutes=15)
    to_encode.update({"exp":expire})
    encoded_jwt=jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)
    return encoded_jwt
def get_current_user(token:str=Depends(oauth2_scheme),db=Depends(get_db)):
    try:
        payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        email=payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401,detail="unauthorized")
    except JWTError:
              raise HTTPException(status_code=401,detail="unauthorized")
        
    user=db.query(User).filter(User.email==email).first()
    if user is None:
         
          raise HTTPException(status_code=401,detail="unauthorized")
    return user