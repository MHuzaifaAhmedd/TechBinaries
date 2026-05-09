import json
from collections.abc import AsyncGenerator

from openai import AsyncOpenAI

from app.config import settings
from app.lead_service import capture_qualified_lead
from app.models import ChatMessage
from app.prompt import SYSTEM_PROMPT

client = AsyncOpenAI(api_key=settings.openai_api_key)

LEAD_TOOL = {
    "type": "function",
    "function": {
        "name": "capture_qualified_lead",
        "description": (
            "Capture a qualified Tech Binaries lead after name and email are confirmed, with "
            "a sales-ready context summary and intent classification."
        ),
        "parameters": {
            "type": "object",
            "additionalProperties": False,
            "required": [
                "name",
                "email",
                "summary",
                "intent",
                "services_interested",
                "timeline",
                "company",
            ],
            "properties": {
                "name": {"type": "string", "description": "The visitor's name exactly as shared."},
                "email": {"type": "string", "description": "The visitor's email exactly as shared."},
                "summary": {
                    "type": "string",
                    "description": "2-3 sentence sales-ready summary of needs, urgency, and context.",
                },
                "intent": {
                    "type": "string",
                    "enum": ["hot", "warm", "cold"],
                    "description": "Internal lead intent classification.",
                },
                "services_interested": {
                    "type": "string",
                    "description": "Inferred service interest, e.g. SaaS platform, mobile app, AI system.",
                },
                "timeline": {"type": "string", "description": "Expected start or launch timeline."},
                "company": {
                    "type": ["string", "null"],
                    "description": "Company name if mentioned, else null.",
                },
                "source": {"type": "string", "description": "Use website-chat unless a better source is known."},
            },
        },
    },
}


def _model_messages(messages: list[ChatMessage]) -> list[dict]:
    trimmed = messages[-16:]
    return [{"role": message.role, "content": message.content[:2000]} for message in trimmed]


def _collect_tool_delta(tool_calls: dict[int, dict], delta_tool_call: object) -> None:
    index = getattr(delta_tool_call, "index", 0)
    stored = tool_calls.setdefault(
        index,
        {"id": "", "type": "function", "function": {"name": "", "arguments": ""}},
    )

    if getattr(delta_tool_call, "id", None):
        stored["id"] += delta_tool_call.id

    function = getattr(delta_tool_call, "function", None)
    if function is None:
        return

    if getattr(function, "name", None):
        stored["function"]["name"] += function.name
    if getattr(function, "arguments", None):
        stored["function"]["arguments"] += function.arguments


async def _execute_tool_call(tool_call: dict) -> dict:
    if tool_call["function"]["name"] != "capture_qualified_lead":
        return {"success": False, "message": "Unknown tool call."}

    try:
        payload = json.loads(tool_call["function"]["arguments"] or "{}")
    except json.JSONDecodeError:
        return {"success": False, "message": "Tool arguments were invalid JSON."}

    return await capture_qualified_lead(payload)


async def stream_chat_response(messages: list[ChatMessage]) -> AsyncGenerator[str, None]:
    if not settings.openai_api_key:
        yield "Chat is not configured yet. Please contact TechBinaries directly."
        return

    model_messages = [{"role": "system", "content": SYSTEM_PROMPT}, *_model_messages(messages)]
    tool_calls: dict[int, dict] = {}
    assistant_text = ""

    first_stream = await client.chat.completions.create(
        model=settings.openai_model,
        messages=model_messages,
        tools=[LEAD_TOOL],
        tool_choice="auto",
        temperature=0.35,
        max_tokens=700,
        stream=True,
    )

    async for chunk in first_stream:
        delta = chunk.choices[0].delta
        if delta.content:
            assistant_text += delta.content
            yield delta.content
        if delta.tool_calls:
            for tool_delta in delta.tool_calls:
                _collect_tool_delta(tool_calls, tool_delta)

    if not tool_calls:
        return

    ordered_tool_calls = [tool_calls[index] for index in sorted(tool_calls)]
    model_messages.append(
        {
            "role": "assistant",
            "content": assistant_text or None,
            "tool_calls": ordered_tool_calls,
        }
    )

    for tool_call in ordered_tool_calls:
        result = await _execute_tool_call(tool_call)
        model_messages.append(
            {
                "role": "tool",
                "tool_call_id": tool_call["id"],
                "name": tool_call["function"]["name"],
                "content": json.dumps(result),
            }
        )

    final_stream = await client.chat.completions.create(
        model=settings.openai_model,
        messages=model_messages,
        temperature=0.35,
        max_tokens=400,
        stream=True,
    )

    async for chunk in final_stream:
        delta = chunk.choices[0].delta
        if delta.content:
            yield delta.content
