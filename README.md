## Mental Health Chatbot 

A real-time, empathetic mental health chatbot built with React and FastAPI, leveraging OpenAI’s GPT-4o-mini for generative AI responses. The chatbot listens, understands, and responds while ensuring user safety through a built-in crisis detection system.

** Features

Real-time Chat: Instant responses with typing indicators, avatars, timestamps, and local chat history.

Empathetic AI Responses: GPT-4o-mini generates context-aware, supportive answers.

Safety Layer: Detects crisis keywords like “suicide”, “self-harm”, etc., returning safe messages and emergency resources.

Prompt Engineering: Guides AI tone to ensure responses are empathetic and safe.

Frontend & Backend:

React for UI

FastAPI for backend API handling

** Tech Stack
Layer	Technology
Frontend	React, Axios, CSS
Backend	FastAPI, Pydantic
AI Model	OpenAI GPT-4o-mini
Storage	Local Storage (chat history)
** Architecture
React UI
   ↓ (Axios POST)
FastAPI Backend
   ↓ (Crisis Filter)
Prompt Engineering
   ↓
OpenAI LLM
   ↓
Generated Response
   ↓
React UI (Chat Bubble)

** How It Works

User Input: User types a message → React captures input and sends it to FastAPI.

Crisis Detection: Backend scans for high-risk keywords.

Prompt Engineering: If safe, the message is combined with system instructions for AI guidance.

AI Response: GPT-4o-mini generates an empathetic, context-aware reply.

Frontend Rendering: React updates the chat dynamically for a smooth, real-time experience.

** Setup & Installation

Clone the repository

git clone <your-repo-url>
cd mental-health-chatbot


Backend setup

cd backend
pip install -r requirements.txt
uvicorn main:app --reload


Frontend setup

cd frontend
npm install
npm start


Open in browser: http://localhost:3000

** Usage

Type your message → Press Enter/Send

Chatbot responds in real-time

Crisis detection ensures safety by returning predefined support messages if high-risk keywords are detected

** Future Enhancements

User authentication and profiles

Database storage for chat history

Multi-language support

Advanced sentiment analysis for personalized responses

S
