import { NextResponse } from "next/server";
import { verifyHeroCaptchaChallenge } from "../_lib/hero-captcha-store";

const internalBase =
  typeof process.env.HERO_LEAD_INTERNAL_URL === "string" ? process.env.HERO_LEAD_INTERNAL_URL.trim() : "";
const internalSecret =
  typeof process.env.HERO_LEAD_INTERNAL_SECRET === "string" ? process.env.HERO_LEAD_INTERNAL_SECRET.trim() : "";

type HeroLeadPayload = {
  firstName?: string;
  lastName?: string;
  countryCode?: string;
  phoneNational?: string;
  workEmail?: string;
  budgetRange?: string;
  serviceInterest?: string;
  projectDetails?: string;
  challengeId?: string;
  captchaAnswer?: string;
};

function isFilled(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as HeroLeadPayload;

    if (!isFilled(payload.firstName) || !isFilled(payload.lastName)) {
      return NextResponse.json({ message: "Please add your full name." }, { status: 400 });
    }

    if (!isFilled(payload.phoneNational)) {
      return NextResponse.json({ message: "Please add your contact number." }, { status: 400 });
    }

    if (!isFilled(payload.workEmail)) {
      return NextResponse.json({ message: "Please add your work email." }, { status: 400 });
    }

    const challengeId = payload.challengeId?.trim() ?? "";
    const captchaAnswer = payload.captchaAnswer?.trim() ?? "";

    if (!challengeId || !captchaAnswer) {
      return NextResponse.json({ message: "Captcha challenge is required." }, { status: 400 });
    }

    const verification = verifyHeroCaptchaChallenge(challengeId, captchaAnswer);
    if (!verification.ok) {
      const message =
        verification.reason === "expired"
          ? "Captcha expired. Please refresh the challenge."
          : verification.reason === "locked"
            ? "Too many failed attempts. Request a new captcha challenge."
            : "Incorrect captcha answer. Please try again.";
      return NextResponse.json({ message }, { status: 400 });
    }

    if (internalBase && internalSecret) {
      const base = internalBase.replace(/\/$/, "");
      const upstream = await fetch(`${base}/api/hero-leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hero-lead-internal-secret": internalSecret,
        },
        body: JSON.stringify({
          channel: "csd-hero",
          firstName: payload.firstName,
          lastName: payload.lastName,
          countryCode: payload.countryCode ?? "",
          phoneNational: payload.phoneNational,
          workEmail: payload.workEmail,
          budgetRange: payload.budgetRange ?? "",
          serviceInterest: payload.serviceInterest ?? "",
          projectDetails: payload.projectDetails ?? "",
        }),
      });

      const raw = await upstream.text();
      let parsed: { message?: string } = {};
      try {
        parsed = JSON.parse(raw) as { message?: string };
      } catch {
        return NextResponse.json(
          { message: "Lead service returned an invalid response. Please try again later." },
          { status: 502 }
        );
      }

      if (!upstream.ok) {
        return NextResponse.json(
          { message: parsed.message ?? "Could not save your request. Please try again later." },
          { status: upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502 }
        );
      }
    } else {
      console.info("Hero lead accepted (no HERO_LEAD_INTERNAL_URL/SECRET — not persisted)", {
        fullName: `${payload.firstName} ${payload.lastName}`.trim(),
        email: payload.workEmail,
        phone: `${payload.countryCode ?? ""}${payload.phoneNational ?? ""}`,
        service: payload.serviceInterest ?? "",
      });
    }

    return NextResponse.json({ message: "Consultation request submitted." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }
}
