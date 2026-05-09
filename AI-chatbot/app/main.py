import re

from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse

from app.ai_service import stream_chat_response
from app.config import settings
from app.db import close_client
from app.lead_service import capture_qualified_lead
from app.models import ChatLeadCaptureRequest, ChatRequest
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


def _infer_service_interest(text: str) -> str:
    lower = text.lower()
    if "ecommerce" in lower or "e-commerce" in lower or "store" in lower:
        return "eCommerce platform"
    if "mobile" in lower or "android" in lower or "ios" in lower or "app" in lower:
        return "mobile app"
    if "saas" in lower:
        return "SaaS platform"
    if "ai" in lower or "chatbot" in lower:
        return "AI system"
    if "website" in lower or "web" in lower:
        return "custom web application"
    return "custom software solution"


def _infer_timeline(text: str) -> str:
    lowered = text.lower()
    month_match = re.search(r"\b\d+\s*(month|months)\b", lowered)
    week_match = re.search(r"\b\d+\s*(week|weeks)\b", lowered)
    if month_match:
        return month_match.group(0)
    if week_match:
        return week_match.group(0)
    if "asap" in lowered or "urgent" in lowered:
        return "asap"
    return "not specified"


def _infer_intent(text: str, timeline: str) -> str:
    lowered = text.lower()
    if timeline == "asap" or "week" in timeline:
        return "hot"
    if "month" in timeline:
        return "warm"
    if any(word in lowered for word in ["exploring", "research", "just checking", "not sure"]):
        return "cold"
    return "warm"


@app.post("/api/chat/capture-lead")
async def capture_lead(payload: ChatLeadCaptureRequest, request: Request) -> JSONResponse:
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

    text_blob = " ".join(msg.content for msg in payload.messages if msg.role == "user")
    timeline = _infer_timeline(text_blob)
    lead_payload = {
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "summary": (
            f"Lead captured via chat form. Visitor wants {_infer_service_interest(text_blob)}. "
            f"Timeline shared as {timeline}."
        ),
        "intent": _infer_intent(text_blob, timeline),
        "services_interested": _infer_service_interest(text_blob),
        "timeline": timeline,
        "company": None,
        "source": "website-chat",
    }
    try:
        result = await capture_qualified_lead(lead_payload)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Lead capture server error: {exc}") from exc
    if not result.get("success"):
        raise HTTPException(status_code=400, detail=result.get("message", "Lead capture failed."))
    return JSONResponse({"ok": True, "message": "Lead captured successfully.", "leadId": result.get("leadId")})


@app.options("/api/chat")
async def chat_options() -> Response:
    return Response(status_code=204)


@app.options("/api/chat/capture-lead")
async def chat_capture_options() -> Response:
    return Response(status_code=204)


@app.on_event("shutdown")
def shutdown() -> None:
    close_client()
