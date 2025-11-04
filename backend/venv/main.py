from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

# Load environment variables (your API key)
load_dotenv()

app = FastAPI()

# CORS setup to allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Model ---
class CodeRequest(BaseModel):
    code: str
    language: str

# --- API Key (you’ll put it in .env file) ---
openai.api_key = os.getenv("OPENAI_API_KEY")

# --- Route: Check server status ---
@app.get("/")
def root():
    return {"message": "AI Code Corrector backend is running 🚀"}

# --- Route: Correct code ---
@app.post("/correct")
async def correct_code(request: CodeRequest):
    try:
        prompt = f"Correct this {request.language} code and explain any improvements:\n\n{request.code}"

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # you can change to gpt-4 if available
            messages=[
                {"role": "system", "content": "You are a helpful coding assistant that corrects code."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
        )

        corrected_code = response["choices"][0]["message"]["content"]
        return {"corrected_code": corrected_code}

    except Exception as e:
        return {"error": str(e)}
