import os
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import re

# Load env variables
load_dotenv()

# Create OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Create FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {"status": "Stress Buster Chatbot running"}

@app.post("/chat")
def chat(request: ChatRequest):

    # Crisis keywords/phrases
    crisis_keywords = [
        "suicide", "kill myself", "end my life",
        "self harm", "cut myself",
        "no reason to live"
    ]

    user_message = request.message.lower()

    # 🚨 Improved crisis detection using regex word boundaries
    triggered = False
    for keyword in crisis_keywords:
        if re.search(r'\b' + re.escape(keyword) + r'\b', user_message):
            triggered = True
            break

    if triggered:
        return {
            "reply": (
                "I'm really sorry you're feeling this way. "
                "You are not alone, and help is available. "
                "I’m not able to help with this safely, but I strongly encourage you "
                "to reach out to a mental health professional or a trusted person right now.\n\n"
                "📞 If you are in India, call **AASRA: 91-9820466726**\n"
                "🌍 If you're elsewhere, please contact your local emergency number or "
                "visit findahelpline.com"
            ),
            "crisis": True
        }

    # Normal chatbot response
    system_prompt = (
        "You are a calm, empathetic mental health stress-buster assistant. "
        "Offer grounding techniques, breathing exercises, and emotional support. "
        "Do NOT provide medical advice. "
        "Keep responses gentle and supportive."
    )

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.message}
        ],
        temperature=0.7,
        max_tokens=250
    )

    return {
        "reply": response.choices[0].message.content,
        "crisis": False
    }
