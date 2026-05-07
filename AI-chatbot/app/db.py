from datetime import datetime, timezone
from typing import Any

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorCollection

from app.config import settings
from app.models import LeadPayload

_client: AsyncIOMotorClient | None = None
_indexes_ready = False


def _get_client() -> AsyncIOMotorClient:
    global _client

    if not settings.mongodb_uri:
        raise RuntimeError("MONGODB_URI is not configured.")

    if _client is None:
        _client = AsyncIOMotorClient(settings.mongodb_uri)

    return _client


async def lead_collection() -> AsyncIOMotorCollection:
    global _indexes_ready

    db = _get_client()[settings.mongodb_db_name]
    collection = db["chat_leads"]

    if not _indexes_ready:
        await collection.create_index("createdAt")
        await collection.create_index("email")
        _indexes_ready = True

    return collection


async def insert_lead(lead: LeadPayload) -> str:
    collection = await lead_collection()
    result = await collection.insert_one(lead.to_document())
    return str(result.inserted_id)


async def mark_lead_notified(lead_id: str, notification_results: dict[str, Any]) -> None:
    from bson import ObjectId

    collection = await lead_collection()
    all_sent = bool(notification_results.get("email", {}).get("ok")) and bool(
        notification_results.get("whatsapp", {}).get("ok")
    )

    await collection.update_one(
        {"_id": ObjectId(lead_id)},
        {
            "$set": {
                "status": "notified" if all_sent else "notification_failed",
                "notificationResults": notification_results,
                "updatedAt": datetime.now(timezone.utc),
            }
        },
    )


def close_client() -> None:
    global _client

    if _client is not None:
        _client.close()
        _client = None
