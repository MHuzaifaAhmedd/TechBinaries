import { NextResponse } from "next/server";
import { verifyHeroCaptchaChallenge } from "../_lib/hero-captcha-store";
import {
  HERO_LEAD_MAX_BODY_BYTES,
  validateHeroLeadPayload,
  type HeroLeadPayloadInput,
} from "../_lib/hero-lead-validation";
import {
  leadPersistenceRequiredInThisEnvironment,
  postInternalLeadJson,
  readInternalLeadEnv,
} from "../_lib/internalLeadApi";

function captchaErrorMessage(reason: "not_found" | "expired" | "invalid" | "locked"): string {
  if (reason === "expired") return "Captcha expired. Please refresh the challenge.";
  if (reason === "not_found") return "Captcha challenge is no longer valid. Please refresh and try again.";
  if (reason === "locked") return "Too many failed attempts. Request a new captcha challenge.";
  return "Incorrect captcha answer. Please try again.";
}

export async function POST(request: Request) {
  try {
    const contentLength = request.headers.get("content-length");
    if (contentLength) {
      const length = Number.parseInt(contentLength, 10);
      if (Number.isFinite(length) && length > HERO_LEAD_MAX_BODY_BYTES) {
        return NextResponse.json({ message: "Request payload is too large." }, { status: 413 });
      }
    }

    const rawBody = await request.text();
    if (rawBody.length > HERO_LEAD_MAX_BODY_BYTES) {
      return NextResponse.json({ message: "Request payload is too large." }, { status: 413 });
    }

    let payload: HeroLeadPayloadInput;
    try {
      payload = JSON.parse(rawBody) as HeroLeadPayloadInput;
    } catch {
      return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
    }

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
    }

    const validation = validateHeroLeadPayload(payload);
    if (!validation.ok) {
      return NextResponse.json({ message: validation.message }, { status: 400 });
    }

    const data = validation.data;

    const verification = verifyHeroCaptchaChallenge(data.challengeId, data.captchaAnswer);
    if (!verification.ok) {
      return NextResponse.json({ message: captchaErrorMessage(verification.reason) }, { status: 400 });
    }

    const cfg = readInternalLeadEnv();
    if (!cfg) {
      if (leadPersistenceRequiredInThisEnvironment()) {
        return NextResponse.json(
          { message: "Lead intake is not configured on the server. Please try again later." },
          { status: 503 }
        );
      }
      console.info("Hero lead accepted (no HERO_LEAD_INTERNAL_URL/SECRET — not persisted)", {
        channel: "csd-hero",
        email: data.workEmail,
        phoneCountryIso2: data.phoneCountryIso2,
      });
      return NextResponse.json({ message: "Consultation request submitted." }, { status: 200 });
    }

    const result = await postInternalLeadJson(cfg, "/api/hero-leads", {
      channel: "csd-hero",
      firstName: data.firstName,
      lastName: data.lastName,
      countryCode: data.countryCode,
      phoneNational: data.phoneNational,
      phoneE164: data.phoneE164,
      phoneCountryIso2: data.phoneCountryIso2,
      workEmail: data.workEmail,
      budgetRange: data.budgetRange,
      serviceInterest: data.serviceInterest,
      projectDetails: data.projectDetails,
    });

    if (!result.ok) {
      return NextResponse.json({ message: result.message }, { status: result.status });
    }

    return NextResponse.json({ message: "Consultation request submitted." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }
}
