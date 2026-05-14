type InternalLeadConfig = { base: string; secret: string };

export type InternalLeadPath = "/api/hero-leads" | "/api/contact-leads";

export function readInternalLeadEnv(): InternalLeadConfig | null {
  const baseRaw =
    typeof process.env.HERO_LEAD_INTERNAL_URL === "string" ? process.env.HERO_LEAD_INTERNAL_URL.trim() : "";
  const secretRaw =
    typeof process.env.HERO_LEAD_INTERNAL_SECRET === "string" ? process.env.HERO_LEAD_INTERNAL_SECRET.trim() : "";
  if (!baseRaw || !secretRaw) return null;
  return { base: baseRaw.replace(/\/$/, ""), secret: secretRaw };
}

export function leadPersistenceRequiredInThisEnvironment(): boolean {
  return process.env.NODE_ENV === "production";
}

export async function postInternalLeadJson(
  cfg: InternalLeadConfig,
  path: InternalLeadPath,
  body: Record<string, unknown>
): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const upstream = await fetch(`${cfg.base}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hero-lead-internal-secret": cfg.secret,
    },
    body: JSON.stringify(body),
  });

  const raw = await upstream.text();
  let parsed: { message?: string } = {};
  try {
    parsed = JSON.parse(raw) as { message?: string };
  } catch {
    return {
      ok: false,
      status: 502,
      message: "Lead service returned an invalid response. Please try again later.",
    };
  }

  if (!upstream.ok) {
    const status = upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502;
    return {
      ok: false,
      status,
      message: parsed.message ?? "Could not save your request. Please try again later.",
    };
  }

  return { ok: true };
}
