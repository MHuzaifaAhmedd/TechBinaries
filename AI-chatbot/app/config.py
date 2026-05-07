import os
from dataclasses import dataclass, field

from dotenv import load_dotenv

load_dotenv()


def _int_env(name: str, default: int) -> int:
    try:
        value = int(os.getenv(name, str(default)))
    except ValueError:
        return default

    return value if value > 0 else default


def _list_env(name: str, default: str) -> list[str]:
    raw = os.getenv(name, default)
    return [item.strip() for item in raw.split(",") if item.strip()]


@dataclass(frozen=True)
class Settings:
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
    openai_model: str = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

    mongodb_uri: str = os.getenv("MONGODB_URI", "")
    mongodb_db_name: str = os.getenv("MONGODB_DB_NAME", "techbinaries")

    lead_notification_email: str = os.getenv("LEAD_NOTIFICATION_EMAIL", "")
    resend_api_key: str = os.getenv("RESEND_API_KEY", "")
    resend_from_email: str = os.getenv("RESEND_FROM_EMAIL", "TechBinaries <onboarding@resend.dev>")

    whatsapp_access_token: str = os.getenv("WHATSAPP_ACCESS_TOKEN", "")
    whatsapp_phone_number_id: str = os.getenv("WHATSAPP_PHONE_NUMBER_ID", "")
    whatsapp_lead_alert_to: str = os.getenv("WHATSAPP_LEAD_ALERT_TO", "")

    allowed_origins: list[str] = field(default_factory=list)
    rate_limit_max: int = _int_env("CHAT_RATE_LIMIT_MAX", 20)
    rate_limit_window_ms: int = _int_env("CHAT_RATE_LIMIT_WINDOW_MS", 60_000)

    def __post_init__(self) -> None:
        object.__setattr__(
            self,
            "allowed_origins",
            _list_env(
                "CHAT_ALLOWED_ORIGINS",
                "http://localhost:3000,https://techbinaries.com,https://www.techbinaries.com",
            ),
        )


settings = Settings()
