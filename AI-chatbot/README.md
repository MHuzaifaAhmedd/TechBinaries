# TechBinaries AI Chatbot

Separate FastAPI backend for the TechBinaries website chatbot.

## Folder Structure

```text
AI-chatbot/
  app/
    ai_service.py       # OpenAI streaming + tool-calling loop
    config.py           # Environment config
    db.py               # MongoDB lead persistence
    knowledge.py        # Structured company knowledge
    lead_service.py     # Lead capture workflow
    main.py             # FastAPI app and routes
    models.py           # Request and lead schemas
    notifications.py    # Email + WhatsApp alerts
    prompt.py           # System prompt
    rate_limit.py       # Simple in-memory rate limiting
  .env.example
  requirements.txt
```

## Local Setup

```bash
cd AI-chatbot
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8008
```

The frontend widget should point to:

```bash
NEXT_PUBLIC_AI_CHATBOT_API_URL=http://localhost:8008/api/chat
```

## Production Notes

- Keep all chatbot secrets in the backend service environment, not in the Next.js frontend.
- Put the FastAPI service behind Nginx/Caddy and reverse proxy `/api/chat` or a dedicated subdomain such as `https://chat.techbinaries.com/api/chat`.
- The current rate limiter is in-memory. It is simple and fine for MVP single-instance deployment. Use Redis later if you run multiple chatbot instances.
