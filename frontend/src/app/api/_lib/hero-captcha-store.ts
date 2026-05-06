import crypto from "crypto";

type Operator = "+" | "-" | "x";

type HeroCaptchaEntry = {
  answer: number;
  expiresAt: number;
  attempts: number;
};

const HERO_CAPTCHA_TTL_MS = 2 * 60 * 1000;
const HERO_CAPTCHA_MAX_ATTEMPTS = 3;
const heroCaptchaStore = new Map<string, HeroCaptchaEntry>();

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildChallenge(): { question: string; answer: number } {
  const operatorPool: Operator[] = ["+", "-", "x"];
  const operator = operatorPool[randomInt(0, operatorPool.length - 1)];

  if (operator === "+") {
    const left = randomInt(12, 96);
    const right = randomInt(3, 48);
    return { question: `${left} + ${right} =`, answer: left + right };
  }

  if (operator === "-") {
    const right = randomInt(4, 49);
    const left = randomInt(right + 8, right + 88);
    return { question: `${left} - ${right} =`, answer: left - right };
  }

  const left = randomInt(6, 17);
  const right = randomInt(3, 12);
  return { question: `${left} x ${right} =`, answer: left * right };
}

function cleanupExpiredChallenges(now = Date.now()): void {
  for (const [challengeId, entry] of heroCaptchaStore.entries()) {
    if (entry.expiresAt <= now) {
      heroCaptchaStore.delete(challengeId);
    }
  }
}

export function issueHeroCaptchaChallenge(): {
  challengeId: string;
  challengeText: string;
  expiresAt: number;
} {
  cleanupExpiredChallenges();
  const challengeId = crypto.randomUUID();
  const challenge = buildChallenge();
  const expiresAt = Date.now() + HERO_CAPTCHA_TTL_MS;

  heroCaptchaStore.set(challengeId, {
    answer: challenge.answer,
    expiresAt,
    attempts: 0,
  });

  return {
    challengeId,
    challengeText: challenge.question,
    expiresAt,
  };
}

export function verifyHeroCaptchaChallenge(
  challengeId: string,
  answerInput: string
): { ok: true } | { ok: false; reason: "not_found" | "expired" | "invalid" | "locked" } {
  cleanupExpiredChallenges();

  const entry = heroCaptchaStore.get(challengeId);
  if (!entry) {
    return { ok: false, reason: "not_found" };
  }

  if (Date.now() > entry.expiresAt) {
    heroCaptchaStore.delete(challengeId);
    return { ok: false, reason: "expired" };
  }

  const answer = Number.parseInt(answerInput.trim(), 10);
  if (!Number.isFinite(answer)) {
    entry.attempts += 1;
    if (entry.attempts >= HERO_CAPTCHA_MAX_ATTEMPTS) {
      heroCaptchaStore.delete(challengeId);
      return { ok: false, reason: "locked" };
    }
    heroCaptchaStore.set(challengeId, entry);
    return { ok: false, reason: "invalid" };
  }

  if (answer !== entry.answer) {
    entry.attempts += 1;
    if (entry.attempts >= HERO_CAPTCHA_MAX_ATTEMPTS) {
      heroCaptchaStore.delete(challengeId);
      return { ok: false, reason: "locked" };
    }
    heroCaptchaStore.set(challengeId, entry);
    return { ok: false, reason: "invalid" };
  }

  heroCaptchaStore.delete(challengeId);
  return { ok: true };
}
