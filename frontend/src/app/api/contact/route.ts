import { NextResponse } from "next/server";
import {
  leadPersistenceRequiredInThisEnvironment,
  postInternalLeadJson,
  readInternalLeadEnv,
} from "../_lib/internalLeadApi";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  company?: string;
  website?: string;
  email?: string;
  phone?: string;
  budget?: string;
  hearAbout?: string;
  message?: string;
  services?: unknown;
  consent?: unknown;
  captchaToken?: string;
};

function isFilled(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  const t = value.trim();
  if (t.length === 0 || t.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

function isServicesArray(value: unknown): value is string[] {
  if (!Array.isArray(value) || value.length === 0) return false;
  return value.every((item) => typeof item === "string" && item.trim().length > 0);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;

    if (!isFilled(payload.firstName) || !isFilled(payload.lastName)) {
      return NextResponse.json({ message: "Please complete all required fields." }, { status: 400 });
    }

    const email = typeof payload.email === "string" ? payload.email.trim() : "";
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ message: "Please add a valid email address." }, { status: 400 });
    }

    if (!isFilled(payload.phone)) {
      return NextResponse.json({ message: "Please add your phone number." }, { status: 400 });
    }

    if (!isFilled(payload.budget)) {
      return NextResponse.json({ message: "Please select a monthly marketing budget." }, { status: 400 });
    }

    if (!isFilled(payload.hearAbout)) {
      return NextResponse.json({ message: "Please tell us how you heard about us." }, { status: 400 });
    }

    if (!isFilled(payload.message)) {
      return NextResponse.json({ message: "Please describe your project or goals." }, { status: 400 });
    }

    if (!isServicesArray(payload.services)) {
      return NextResponse.json({ message: "Please select at least one service." }, { status: 400 });
    }

    if (payload.consent !== true) {
      return NextResponse.json({ message: "Consent is required before submitting." }, { status: 400 });
    }

    if (!payload.captchaToken || typeof payload.captchaToken !== "string" || !payload.captchaToken.trim()) {
      return NextResponse.json({ message: "reCAPTCHA verification is required." }, { status: 400 });
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
      return NextResponse.json(
        { message: "Server is missing reCAPTCHA secret configuration." },
        { status: 500 }
      );
    }

    const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: recaptchaSecret,
        response: payload.captchaToken.trim(),
      }),
    });

    const verifyResult = (await verifyResponse.json()) as { success?: boolean };
    if (!verifyResult.success) {
      return NextResponse.json({ message: "reCAPTCHA failed. Please try again." }, { status: 400 });
    }

    const website = typeof payload.website === "string" ? payload.website.trim() : "";

    const cfg = readInternalLeadEnv();
    if (!cfg) {
      if (leadPersistenceRequiredInThisEnvironment()) {
        return NextResponse.json(
          {
            message:
              "Contact intake is not configured on the server. Please try again later or reach us by phone.",
          },
          { status: 503 }
        );
      }
      console.info("Contact inquiry accepted (no HERO_LEAD_INTERNAL_URL/SECRET — not persisted)", {
        email: payload.email?.trim(),
        company: payload.company?.trim(),
        services: payload.services.length,
      });
      return NextResponse.json({ message: "Contact request submitted successfully." }, { status: 200 });
    }

    const result = await postInternalLeadJson(cfg, "/api/contact-leads", {
      firstName: payload.firstName!.trim(),
      lastName: payload.lastName!.trim(),
      company: typeof payload.company === "string" ? payload.company.trim() : "",
      website,
      email,
      phone: payload.phone!.trim(),
      budget: payload.budget!.trim(),
      hearAbout: payload.hearAbout!.trim(),
      message: payload.message!.trim(),
      services: payload.services.map((s) => s.trim()),
      consent: true,
    });

    if (!result.ok) {
      return NextResponse.json({ message: result.message }, { status: result.status });
    }

    return NextResponse.json({ message: "Contact request submitted successfully." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }
}
