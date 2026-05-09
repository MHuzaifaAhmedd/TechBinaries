from datetime import datetime, timezone
from typing import Literal

from pydantic import BaseModel, Field, field_validator


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=2_000)

    @field_validator("content")
    @classmethod
    def clean_content(cls, value: str) -> str:
        return " ".join(value.strip().split())


class ChatRequest(BaseModel):
    session_id: str | None = None
    messages: list[ChatMessage] = Field(default_factory=list, max_length=16)


class ChatLeadCaptureRequest(BaseModel):
    session_id: str | None = None
    name: str = Field(min_length=1, max_length=200)
    email: str = Field(min_length=3, max_length=320)
    phone: str = Field(min_length=3, max_length=64)
    messages: list[ChatMessage] = Field(default_factory=list, max_length=16)


class LeadPayload(BaseModel):
    name: str
    email: str
    phone: str | None = None
    summary: str
    intent: Literal["hot", "warm", "cold"]
    services_interested: str
    timeline: str
    company: str | None
    source: str = "website-chat"

    @field_validator("*", mode="before")
    @classmethod
    def clean_strings(cls, value: object) -> object:
        if isinstance(value, str):
            return " ".join(value.strip().split())
        return value

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        email = value.lower()
        if "@" not in email or "." not in email.rsplit("@", 1)[-1]:
            raise ValueError("Invalid lead email.")
        return email

    @field_validator("source", mode="before")
    @classmethod
    def validate_source(cls, value: object) -> str:
        allowed_values = {"website-chat"}
        if not isinstance(value, str):
            return "website-chat"
        source = value.strip()
        return source if source in allowed_values else "website-chat"

    def to_document(self) -> dict:
        now = datetime.now(timezone.utc)
        return {
            **self.model_dump(by_alias=True),
            "status": "new",
            "createdAt": now,
            "updatedAt": now,
        }
