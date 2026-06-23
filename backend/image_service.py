import httpx
import os
from dotenv import load_dotenv

load_dotenv()



API_KEY = os.getenv("PEXEL_API_KEY")
API_URL = os.getenv("PEXEL_API_URL")



async def search(recipe_name: str):

    params = {
        "query": f"{recipe_name} food",
        "per_page": 1
    }

    headers = {
        "Authorization": f"{API_KEY}"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(API_URL, params=params, headers=headers)
        data = response.json()

    if data["photos"]:
        return data["photos"][0]["src"]["medium"]

    return None