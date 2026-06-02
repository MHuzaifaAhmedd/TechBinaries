import { ChallengePayload, HeroLeadResponse } from "./CsdHeroLeadForm.types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseChallengePayload(payload: unknown): ChallengePayload | null {
  if (!isRecord(payload)) {
    return null;
  }

  const challengeId = payload.challengeId;
  const challengeText = payload.challengeText;
  const expiresAt = payload.expiresAt;

  if (typeof challengeId !== "string" || typeof challengeText !== "string" || typeof expiresAt !== "number") {
    return null;
  }

  return {
    challengeId,
    challengeText,
    expiresAt,
  };
}

export function parseHeroLeadResponse(payload: unknown): HeroLeadResponse | null {
  if (!isRecord(payload)) {
    return null;
  }

  const message = payload.message;
  if (typeof message !== "string") {
    return null;
  }

  return { message };
}
