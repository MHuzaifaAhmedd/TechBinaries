from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from app.ai_service import stream_chat_response
from app.config import settings
from app.db import close_client
from app.models import ChatRequest
from app.rate_limit import check_rate_limit

app = FastAPI(title="TechBinaries AI Chatbot", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=False,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict:
    return {"ok": True, "service": "techbinaries-ai-chatbot"}


@app.post("/api/chat")
async def chat(payload: ChatRequest, request: Request) -> StreamingResponse:
    client_ip = request.headers.get("x-forwarded-for", "").split(",")[0].strip()
    if not client_ip:
        client_ip = request.client.host if request.client else "unknown"
    allowed, retry_after = check_rate_limit(client_ip)

    if not allowed:
        raise HTTPException(
            status_code=429,
            detail="Too many chat requests. Please try again shortly.",
            headers={"Retry-After": str(retry_after)},
        )

    if not payload.messages or payload.messages[-1].role != "user":
        raise HTTPException(status_code=400, detail="Please send a user message.")

    return StreamingResponse(
        stream_chat_response(payload.messages),
        media_type="text/plain; charset=utf-8",
        headers={"Cache-Control": "no-store", "X-Accel-Buffering": "no"},
    )


@app.options("/api/chat")
async def chat_options() -> Response:
    return Response(status_code=204)


@app.on_event("shutdown")
def shutdown() -> None:
    close_client()
