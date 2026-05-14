import { Router } from "express";
import { getDb } from "../config/database";
import { env } from "../config/env";
import { insertHeroLead } from "../services/leadService";

const router = Router();

type Body = {
  channel?: string;
  firstName?: string;
  lastName?: string;
  countryCode?: string;
  phoneNational?: string;
  workEmail?: string;
  budgetRange?: string;
  serviceInterest?: string;
  projectDetails?: string;
};

function isFilled(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

router.post("/", async (req, res) => {
  if (!env.heroLeadInternalSecret) {
    return res.status(503).json({
      ok: false,
      message: "Hero lead intake is not configured on the server.",
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
  if (!isFilled(body.phoneNational)) {
    return res.status(400).json({ ok: false, message: "Please add your contact number." });
  }
  if (!isFilled(body.workEmail)) {
    return res.status(400).json({ ok: false, message: "Please add your work email." });
  }

  try {
    const db = await getDb();
    const { id } = await insertHeroLead(db, {
      channel: typeof body.channel === "string" && body.channel.trim() ? body.channel.trim() : "csd-hero",
      firstName: body.firstName!.trim(),
      lastName: body.lastName!.trim(),
      countryCode: typeof body.countryCode === "string" ? body.countryCode.trim() : "",
      phoneNational: body.phoneNational!.trim(),
      workEmail: body.workEmail!.trim(),
      budgetRange: typeof body.budgetRange === "string" ? body.budgetRange.trim() : "",
      serviceInterest: typeof body.serviceInterest === "string" ? body.serviceInterest.trim() : "",
      projectDetails: typeof body.projectDetails === "string" ? body.projectDetails.trim() : "",
    });

    return res.status(201).json({
      ok: true,
      message: "Consultation request submitted.",
      id,
    });
  } catch (error) {
    console.error("hero-leads insert failed", error);
    return res.status(500).json({
      ok: false,
      message: "Could not save your request. Please try again later.",
    });
  }
});

export default router;
