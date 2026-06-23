import os
from dotenv import load_dotenv
from groq import Groq
from schemas import Recipe
load_dotenv()

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)


async def getrecipe_info(recipe_name:str):
 chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
           "content": f"""
Generate a detailed recipe for {recipe_name}.

IMPORTANT:
Return ONLY raw JSON.
Do not include explanations.
Do not include markdown.
Do not include text before or after JSON.

Format:

{{
"recipe": "",
"description": "",
"ingredients": [],
"steps": [],
"servings": "",
"cooking_time": "",
"difficulty": ""
}}
""",
        }
    ],
    model="llama-3.3-70b-versatile",
)

 return chat_completion.choices[0].message.content