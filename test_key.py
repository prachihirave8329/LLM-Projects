import os
from dotenv import load_dotenv

load_dotenv()  # reads .env file

api_key = os.getenv("OPENAI_API_KEY")

if api_key:
    print(" API Key loaded successfully:", api_key[:5] + "*****")
else:
    print(" API Key NOT loaded")
