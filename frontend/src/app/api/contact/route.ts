import { NextResponse } from "next/server";

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
  services?: string[];
  consent?: boolean;
  captchaToken?: string;
};

const requiredFields: Array<keyof ContactPayload> = [
  "firstName",
  "lastName",
  "company",
  "email",
  "phone",
  "budget",
  "message",
];

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const missingRequired = requiredFields.some(
      (field) => !payload[field] || String(payload[field]).trim().length === 0
    );

    if (missingRequired) {
      return NextResponse.json(
        { message: "Please complete all required fields." },
        { status: 400 }
      );
    }

    if (!payload.consent) {
      return NextResponse.json(
        { message: "Consent is required before submitting." },
        { status: 400 }
      );
    }

    if (!Array.isArray(payload.services) || payload.services.length === 0) {
      return NextResponse.json(
        { message: "Please select at least one service." },
        { status: 400 }
      );
    }

    if (!payload.captchaToken) {
      return NextResponse.json(
        { message: "reCAPTCHA verification is required." },
        { status: 400 }
      );
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
      return NextResponse.json(
        { message: "Server is missing reCAPTCHA secret configuration." },
        { status: 500 }
      );
    }

    const verifyResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: recaptchaSecret,
          response: payload.captchaToken,
        }),
      }
    );

    const verifyResult = (await verifyResponse.json()) as { success?: boolean };
    if (!verifyResult.success) {
      return NextResponse.json(
        { message: "reCAPTCHA failed. Please try again." },
        { status: 400 }
      );
    }

    // Hook your CRM/email provider here (HubSpot, Zoho, Slack, etc).
    console.info("Contact inquiry accepted", {
      email: payload.email,
      company: payload.company,
      services: payload.services.length,
    });

    return NextResponse.json(
      { message: "Contact request submitted successfully." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 }
    );
  }
}
