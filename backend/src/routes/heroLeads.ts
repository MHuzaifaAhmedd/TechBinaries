import { Router } from "express";
import { getDb } from "../config/database";
import { env } from "../config/env";
import { insertHeroLead } from "../services/leadService";
import { validateHeroLeadBody } from "../validation/heroLeadValidation";

const router = Router();

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

  const validation = validateHeroLeadBody(req.body);
  if (!validation.ok) {
    return res.status(400).json({ ok: false, message: validation.message });
  }

  try {
    const db = await getDb();
    const { id } = await insertHeroLead(db, validation.data);

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
