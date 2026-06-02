import crypto from "crypto";

type Operator = "+" | "-" | "x";

type HeroCaptchaEntry = {
  answer: number;
  expiresAt: number;
  attempts: number;
};

type IpRateBucket = {
  count: number;
  windowStart: number;
};

type HeroCaptchaRuntimeState = {
  heroCaptchaStore: Map<string, HeroCaptchaEntry>;
  ipRateBuckets: Map<string, IpRateBucket>;
};

const HERO_CAPTCHA_TTL_MS = 2 * 60 * 1000;
const HERO_CAPTCHA_MAX_ATTEMPTS = 3;
const HERO_CAPTCHA_MAX_STORE_SIZE = 5_000;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_CHALLENGES_PER_IP = 20;

function getRuntimeState(): HeroCaptchaRuntimeState {
  const globalRef = globalThis as typeof globalThis & {
    __heroCaptchaRuntimeState__?: HeroCaptchaRuntimeState;
  };

  if (!globalRef.__heroCaptchaRuntimeState__) {
    globalRef.__heroCaptchaRuntimeState__ = {
      heroCaptchaStore: new Map<string, HeroCaptchaEntry>(),
      ipRateBuckets: new Map<string, IpRateBucket>(),
    };
  }

  return globalRef.__heroCaptchaRuntimeState__;
}

const runtimeState = getRuntimeState();
const heroCaptchaStore = runtimeState.heroCaptchaStore;
const ipRateBuckets = runtimeState.ipRateBuckets;

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

function cleanupExpiredRateBuckets(now = Date.now()): void {
  for (const [ip, bucket] of ipRateBuckets.entries()) {
    if (now - bucket.windowStart >= RATE_LIMIT_WINDOW_MS) {
      ipRateBuckets.delete(ip);
    }
  }
}

function evictOldestChallenges(count: number): void {
  if (count <= 0) return;
  const sorted = [...heroCaptchaStore.entries()].sort((a, b) => a[1].expiresAt - b[1].expiresAt);
  for (let i = 0; i < count && i < sorted.length; i += 1) {
    const id = sorted[i]?.[0];
    if (id) heroCaptchaStore.delete(id);
  }
}

function enforceStoreCap(): void {
  if (heroCaptchaStore.size < HERO_CAPTCHA_MAX_STORE_SIZE) return;
  cleanupExpiredChallenges();
  if (heroCaptchaStore.size < HERO_CAPTCHA_MAX_STORE_SIZE) return;
  const overflow = heroCaptchaStore.size - HERO_CAPTCHA_MAX_STORE_SIZE + 1;
  evictOldestChallenges(overflow);
}

export type HeroCaptchaRateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

export function checkHeroCaptchaIssueRateLimit(clientIp: string, now = Date.now()): HeroCaptchaRateLimitResult {
  cleanupExpiredRateBuckets(now);

  const ip = clientIp.slice(0, 64) || "unknown";
  const bucket = ipRateBuckets.get(ip);

  if (!bucket || now - bucket.windowStart >= RATE_LIMIT_WINDOW_MS) {
    ipRateBuckets.set(ip, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (bucket.count >= RATE_LIMIT_MAX_CHALLENGES_PER_IP) {
    const retryAfterSeconds = Math.max(1, Math.ceil((RATE_LIMIT_WINDOW_MS - (now - bucket.windowStart)) / 1000));
    return { allowed: false, retryAfterSeconds };
  }

  bucket.count += 1;
  ipRateBuckets.set(ip, bucket);
  return { allowed: true };
}

export function issueHeroCaptchaChallenge(): {
  challengeId: string;
  challengeText: string;
  expiresAt: number;
} {
  cleanupExpiredChallenges();
  enforceStoreCap();

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
