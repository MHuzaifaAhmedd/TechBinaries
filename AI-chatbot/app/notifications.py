import html

import httpx

from app.config import settings
from app.models import LeadPayload


def _lead_text(lead: LeadPayload) -> str:
    data = lead.model_dump(by_alias=True)
    return "\n".join(
        [
            "New qualified chatbot lead",
            f"Name: {data['name']}",
            f"Email: {data['email']}",
            f"Phone: {data['phone']}",
            f"Company: {data.get('company') or 'Not shared'}",
            f"Project: {data['projectType']}",
            f"Goals: {data['goals']}",
            f"Timeline: {data['timeline']}",
            f"Budget: {data['budgetRange']}",
            f"Score: {data['qualificationScore']}/10",
            f"Summary: {data['conversationSummary']}",
        ]
    )


def _lead_html(lead: LeadPayload) -> str:
    data = lead.model_dump(by_alias=True)
    rows = [
        ("Name", data["name"]),
        ("Email", data["email"]),
        ("Phone", data["phone"]),
        ("Company", data.get("company") or "Not shared"),
        ("Project", data["projectType"]),
        ("Goals", data["goals"]),
        ("Timeline", data["timeline"]),
        ("Budget", data["budgetRange"]),
        ("Score", f"{data['qualificationScore']}/10"),
        ("Summary", data["conversationSummary"]),
    ]
    rendered_rows = "".join(
        f"""
        <tr>
          <td style="border:1px solid #e5e5e5;padding:10px;font-weight:700;width:150px">{html.escape(label)}</td>
          <td style="border:1px solid #e5e5e5;padding:10px">{html.escape(str(value))}</td>
        </tr>
        """
        for label, value in rows
    )

    return f"""
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.5">
      <h2 style="margin:0 0 16px">New qualified chatbot lead</h2>
      <table style="border-collapse:collapse;width:100%;max-width:720px">{rendered_rows}</table>
    </div>
    """


async def send_lead_email(lead: LeadPayload) -> dict:
    if not settings.resend_api_key or not settings.lead_notification_email:
        return {"ok": False, "provider": "resend", "error": "Email env vars are not configured."}

    async with httpx.AsyncClient(timeout=12) as client:
        try:
            response = await client.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {settings.resend_api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "from": settings.resend_from_email,
                    "to": settings.lead_notification_email,
                    "subject": f"Qualified chatbot lead: {lead.name}",
                    "text": _lead_text(lead),
                    "html": _lead_html(lead),
                },
            )
            response.raise_for_status()
            return {"ok": True, "provider": "resend"}
        except Exception as exc:
            return {"ok": False, "provider": "resend", "error": str(exc)}


async def send_lead_whatsapp(lead: LeadPayload) -> dict:
    if (
        not settings.whatsapp_access_token
        or not settings.whatsapp_phone_number_id
        or not settings.whatsapp_lead_alert_to
    ):
        return {"ok": False, "provider": "whatsapp", "error": "WhatsApp env vars are not configured."}

    async with httpx.AsyncClient(timeout=12) as client:
        try:
            response = await client.post(
                f"https://graph.facebook.com/v21.0/{settings.whatsapp_phone_number_id}/messages",
                headers={
                    "Authorization": f"Bearer {settings.whatsapp_access_token}",
                    "Content-Type": "application/json",
                },
                json={
                    "messaging_product": "whatsapp",
                    "to": settings.whatsapp_lead_alert_to,
                    "type": "text",
                    "text": {"preview_url": False, "body": _lead_text(lead)},
                },
            )
            response.raise_for_status()
            return {"ok": True, "provider": "whatsapp"}
        except Exception as exc:
            return {"ok": False, "provider": "whatsapp", "error": str(exc)}


async def notify_qualified_lead(lead: LeadPayload) -> dict:
    email_result = await send_lead_email(lead)
    whatsapp_result = await send_lead_whatsapp(lead)
    return {"email": email_result, "whatsapp": whatsapp_result}
