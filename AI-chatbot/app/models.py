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


class LeadPayload(BaseModel):
    name: str
    email: str
    phone: str
    project_type: str = Field(alias="projectType")
    goals: str
    timeline: str
    budget_range: str = Field(alias="budgetRange")
    qualification_score: int = Field(alias="qualificationScore", ge=1, le=10)
    conversation_summary: str = Field(alias="conversationSummary")
    company: str | None = None
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

    def to_document(self) -> dict:
        now = datetime.now(timezone.utc)
        return {
            **self.model_dump(by_alias=True),
            "status": "new",
            "createdAt": now,
            "updatedAt": now,
        }
