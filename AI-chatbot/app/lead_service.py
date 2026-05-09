from app.db import insert_lead, mark_lead_notified
from app.models import LeadPayload
from app.notifications import notify_qualified_lead


async def capture_qualified_lead(payload: dict) -> dict:
    try:
        lead = LeadPayload.model_validate(payload)
    except Exception as exc:
        return {"success": False, "message": f"Lead details are incomplete: {exc}"}

    try:
        lead_id = await insert_lead(lead)
    except Exception as exc:
        return {"success": False, "message": f"Lead could not be saved to database: {exc}"}

    try:
        notification_results = await notify_qualified_lead(lead)
        await mark_lead_notified(lead_id, notification_results)
    except Exception as exc:
        return {
            "success": True,
            "leadId": lead_id,
            "message": f"Lead saved, but notifications failed: {exc}",
        }

    any_notification_sent = notification_results["email"]["ok"] or notification_results["whatsapp"]["ok"]
    return {
        "success": True,
        "leadId": lead_id,
        "message": (
            "Lead saved and team notification attempted."
            if any_notification_sent
            else "Lead saved. Team notification needs manual review."
        ),
    }
