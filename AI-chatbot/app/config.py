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


def _read_required(name: str, missing: list[str]) -> str:
    raw = os.getenv(name)
    if raw is None or raw.strip() == "":
        missing.append(name)
        return ""
    return raw.strip()


_missing: list[str] = []
_mongodb_uri = _read_required("MONGODB_URI", _missing)
_mongodb_db_name = _read_required("MONGODB_DB_NAME", _missing)


def _normalize_mongodb_uri(uri: str) -> str:
    """Strip whitespace and accidental outer quotes from docker / shell env."""
    u = uri.strip()
    if len(u) >= 2 and ((u[0] == u[-1] == '"') or (u[0] == u[-1] == "'")):
        u = u[1:-1].strip()
    return u


if not _missing:
    _mongodb_uri = _normalize_mongodb_uri(_mongodb_uri)
    if not (
        _mongodb_uri.startswith("mongodb://") or _mongodb_uri.startswith("mongodb+srv://")
    ):
        raise RuntimeError(
            "MONGODB_URI must begin with 'mongodb://' or 'mongodb+srv://'. "
            "Fix the AI chatbot container env (same Atlas URI as backend). "
            f"First 80 chars received: {_mongodb_uri[:80]!r}"
        )

if _missing:
    raise RuntimeError(
        "Missing required environment variable(s): "
        + ", ".join(_missing)
        + ". Set them in AI-chatbot/.env for local development, or pass them via "
        + "--env-file in docker run for production."
    )


@dataclass(frozen=True)
class Settings:
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
    openai_model: str = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

    mongodb_uri: str = _mongodb_uri
    mongodb_db_name: str = _mongodb_db_name

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
