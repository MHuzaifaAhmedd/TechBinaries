const LIMITS = {
  name: 120,
  email: 254,
  countryCode: 8,
  phoneNational: 32,
  phoneE164: 20,
  phoneCountryIso2: 2,
  budgetRange: 120,
  serviceInterest: 512,
  projectDetails: 8000,
  channel: 64,
} as const;

const VALID_BUDGET_VALUES = new Set(["under-10k", "10k-25k", "25k-50k", "50k-plus"]);
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/;
// Allow common formatting controls for textarea-like content.
const DISALLOWED_TEXTAREA_CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
const E164_REGEX = /^\+[1-9]\d{6,14}$/;
const ISO2_REGEX = /^[A-Z]{2}$/;

export type HeroLeadBody = {
  channel?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  countryCode?: unknown;
  phoneNational?: unknown;
  phoneE164?: unknown;
  phoneCountryIso2?: unknown;
  workEmail?: unknown;
  budgetRange?: unknown;
  serviceInterest?: unknown;
  projectDetails?: unknown;
};

export type ValidatedHeroLead = {
  channel: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNational: string;
  phoneE164: string;
  phoneCountryIso2: string;
  workEmail: string;
  budgetRange: string;
  serviceInterest: string;
  projectDetails: string;
};

function trimMax(value: string, max: number): string {
  const t = value.trim();
  return t.length <= max ? t : t.slice(0, max);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasNoControlChars(value: string): boolean {
  return !CONTROL_CHARS.test(value);
}

function hasNoDisallowedTextareaControlChars(value: string): boolean {
  return !DISALLOWED_TEXTAREA_CONTROL_CHARS.test(value);
}

function isValidPersonName(value: string): boolean {
  const t = trimMax(value, LIMITS.name);
  if (t.length < 1) return false;
  if (!hasNoControlChars(t)) return false;
  return /^[\p{L}\p{M}'\s.\-]+$/u.test(t);
}

function isValidEmail(value: string): boolean {
  const t = trimMax(value, LIMITS.email).toLowerCase();
  if (t.length < 3 || t.length > LIMITS.email) return false;
  if (!hasNoControlChars(t)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

export type HeroLeadValidationResult =
  | { ok: true; data: ValidatedHeroLead }
  | { ok: false; message: string };

export function validateHeroLeadBody(body: HeroLeadBody): HeroLeadValidationResult {
  if (!isNonEmptyString(body.firstName) || !isNonEmptyString(body.lastName)) {
    return { ok: false, message: "Please add your full name." };
  }

  const firstName = trimMax(body.firstName, LIMITS.name);
  const lastName = trimMax(body.lastName, LIMITS.name);

  if (!isValidPersonName(firstName) || !isValidPersonName(lastName)) {
    return { ok: false, message: "Please enter a valid first and last name." };
  }

  if (!isNonEmptyString(body.workEmail) || !isValidEmail(body.workEmail)) {
    return { ok: false, message: "Please add a valid work email." };
  }

  if (!isNonEmptyString(body.phoneNational)) {
    return { ok: false, message: "Please add your contact number." };
  }

  const phoneNational = trimMax(body.phoneNational, LIMITS.phoneNational);
  if (!hasNoControlChars(phoneNational) || !/^\d{4,15}$/.test(phoneNational.replace(/\s/g, ""))) {
    return { ok: false, message: "Please add a valid contact number." };
  }

  if (!isNonEmptyString(body.phoneE164) || !E164_REGEX.test(trimMax(body.phoneE164, LIMITS.phoneE164))) {
    return { ok: false, message: "Please add a valid contact number." };
  }

  const phoneE164 = trimMax(body.phoneE164, LIMITS.phoneE164);

  if (!isNonEmptyString(body.phoneCountryIso2)) {
    return { ok: false, message: "Please select a valid country calling code." };
  }

  const phoneCountryIso2 = trimMax(body.phoneCountryIso2, LIMITS.phoneCountryIso2).toUpperCase();
  if (!ISO2_REGEX.test(phoneCountryIso2)) {
    return { ok: false, message: "Please select a valid country calling code." };
  }

  const countryCode =
    typeof body.countryCode === "string" ? trimMax(body.countryCode, LIMITS.countryCode) : "";
  if (countryCode && !/^\+\d{1,4}$/.test(countryCode)) {
    return { ok: false, message: "Invalid country calling code." };
  }

  const budgetRange =
    typeof body.budgetRange === "string" ? trimMax(body.budgetRange, LIMITS.budgetRange) : "";
  if (!budgetRange || !VALID_BUDGET_VALUES.has(budgetRange)) {
    return { ok: false, message: "Please select a valid budget range." };
  }

  const serviceInterest =
    typeof body.serviceInterest === "string" ? trimMax(body.serviceInterest, LIMITS.serviceInterest) : "";
  if (serviceInterest.length > 0) {
    if (!hasNoControlChars(serviceInterest) || !serviceInterest.startsWith("/") || serviceInterest.includes("://")) {
      return { ok: false, message: "Invalid service selection." };
    }
  }

  const projectDetails =
    typeof body.projectDetails === "string" ? trimMax(body.projectDetails, LIMITS.projectDetails) : "";
  if (projectDetails.length > 0 && !hasNoDisallowedTextareaControlChars(projectDetails)) {
    return { ok: false, message: "Project description contains invalid characters." };
  }

  const channel =
    typeof body.channel === "string" && body.channel.trim()
      ? trimMax(body.channel, LIMITS.channel)
      : "csd-hero";

  if (!hasNoControlChars(channel)) {
    return { ok: false, message: "Invalid request." };
  }

  return {
    ok: true,
    data: {
      channel,
      firstName,
      lastName,
      countryCode,
      phoneNational,
      phoneE164,
      phoneCountryIso2,
      workEmail: trimMax(body.workEmail, LIMITS.email).toLowerCase(),
      budgetRange,
      serviceInterest,
      projectDetails,
    },
  };
}
