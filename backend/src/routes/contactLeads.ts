import { Router } from "express";
import { getDb } from "../config/database";
import { env } from "../config/env";
import { insertContactLead } from "../services/leadService";

const router = Router();

type Body = {
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

router.post("/", async (req, res) => {
  if (!env.heroLeadInternalSecret) {
    return res.status(503).json({
      ok: false,
      message: "Contact lead intake is not configured on the server.",
    });
  }

  const provided = req.get("x-hero-lead-internal-secret");
  if (provided !== env.heroLeadInternalSecret) {
    return res.status(401).json({ ok: false, message: "Unauthorized." });
  }

  const body = req.body as Body;

  if (!isFilled(body.firstName) || !isFilled(body.lastName)) {
    return res.status(400).json({ ok: false, message: "Please add your full name." });
  }
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ ok: false, message: "Please add a valid email address." });
  }
  if (!isFilled(body.phone)) {
    return res.status(400).json({ ok: false, message: "Please add your phone number." });
  }
  if (!isFilled(body.budget)) {
    return res.status(400).json({ ok: false, message: "Please select a budget range." });
  }
  if (!isFilled(body.hearAbout)) {
    return res.status(400).json({ ok: false, message: "Please tell us how you heard about us." });
  }
  if (!isFilled(body.message)) {
    return res.status(400).json({ ok: false, message: "Please describe your project or goals." });
  }
  if (!isServicesArray(body.services)) {
    return res.status(400).json({ ok: false, message: "Please select at least one service." });
  }
  if (body.consent !== true) {
    return res.status(400).json({ ok: false, message: "Consent is required before submitting." });
  }

  try {
    const db = await getDb();
    const { id } = await insertContactLead(db, {
      firstName: body.firstName!.trim(),
      lastName: body.lastName!.trim(),
      company: typeof body.company === "string" ? body.company.trim() : "",
      website: typeof body.website === "string" ? body.website.trim() : "",
      workEmail: email,
      phone: body.phone!.trim(),
      budgetRange: body.budget!.trim(),
      hearAbout: body.hearAbout!.trim(),
      message: body.message!.trim(),
      services: body.services,
      consent: true,
    });

    return res.status(201).json({
      ok: true,
      message: "Contact request submitted successfully.",
      id,
    });
  } catch (error) {
    console.error("contact-leads insert failed", error);
    return res.status(500).json({
      ok: false,
      message: "Could not save your request. Please try again later.",
    });
  }
});

export default router;
