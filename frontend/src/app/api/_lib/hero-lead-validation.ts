import { CountryCode, getCountries, parsePhoneNumberFromString } from "libphonenumber-js/min";
import { MARKETING_BUDGET_OPTIONS, type MarketingBudgetValue } from "@/lib/marketing-budget-ranges";

export const HERO_LEAD_MAX_BODY_BYTES = 32_768;

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
  challengeId: 64,
  captchaAnswer: 16,
} as const;

const VALID_ISO2 = new Set<CountryCode>(getCountries());
const VALID_BUDGET_VALUES = new Set<string>(MARKETING_BUDGET_OPTIONS.map((o) => o.value));

const CONTROL_CHARS = /[\u0000-\u001F\u007F]/;
// Allow common formatting controls for textarea-like content.
const DISALLOWED_TEXTAREA_CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

export type HeroLeadPayloadInput = {
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
  challengeId?: unknown;
  captchaAnswer?: unknown;
};

export type ValidatedHeroLeadPayload = {
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNational: string;
  phoneE164: string;
  phoneCountryIso2: CountryCode;
  workEmail: string;
  budgetRange: string;
  serviceInterest: string;
  projectDetails: string;
  challengeId: string;
  captchaAnswer: string;
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
  if (t.length < 1 || t.length > LIMITS.name) return false;
  if (!hasNoControlChars(t)) return false;
  return /^[\p{L}\p{M}'\s.\-]+$/u.test(t);
}

function isValidEmail(value: string): boolean {
  const t = trimMax(value, LIMITS.email);
  if (t.length < 3 || t.length > LIMITS.email) return false;
  if (!hasNoControlChars(t)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

function isValidIso2(value: string): value is CountryCode {
  const upper = value.trim().toUpperCase();
  return upper.length === 2 && VALID_ISO2.has(upper as CountryCode);
}

function isValidBudget(value: string): value is MarketingBudgetValue {
  return VALID_BUDGET_VALUES.has(value);
}

export type HeroLeadValidationResult =
  | { ok: true; data: ValidatedHeroLeadPayload }
  | { ok: false; message: string };

export function validateHeroLeadPayload(raw: HeroLeadPayloadInput): HeroLeadValidationResult {
  if (!isNonEmptyString(raw.firstName) || !isNonEmptyString(raw.lastName)) {
    return { ok: false, message: "Please add your full name." };
  }

  const firstName = trimMax(raw.firstName, LIMITS.name);
  const lastName = trimMax(raw.lastName, LIMITS.name);

  if (!isValidPersonName(firstName) || !isValidPersonName(lastName)) {
    return { ok: false, message: "Please enter a valid first and last name." };
  }

  if (!isNonEmptyString(raw.workEmail) || !isValidEmail(raw.workEmail)) {
    return { ok: false, message: "Please add a valid work email." };
  }

  if (!isNonEmptyString(raw.phoneCountryIso2) || !isValidIso2(raw.phoneCountryIso2)) {
    return { ok: false, message: "Please select a valid country calling code." };
  }

  const phoneCountryIso2 = raw.phoneCountryIso2.trim().toUpperCase() as CountryCode;

  if (!isNonEmptyString(raw.countryCode)) {
    return { ok: false, message: "Please select your country calling code." };
  }

  const countryCode = trimMax(raw.countryCode, LIMITS.countryCode);
  if (!/^\+\d{1,4}$/.test(countryCode)) {
    return { ok: false, message: "Invalid country calling code." };
  }

  if (!isNonEmptyString(raw.phoneNational)) {
    return { ok: false, message: "Please add your contact number." };
  }

  const phoneNationalInput = trimMax(raw.phoneNational, LIMITS.phoneNational);
  const parsed = parsePhoneNumberFromString(phoneNationalInput, phoneCountryIso2);
  if (!parsed || !parsed.isValid()) {
    return { ok: false, message: "Please enter a valid phone number for the selected country." };
  }

  const phoneE164FromClient =
    typeof raw.phoneE164 === "string" ? trimMax(raw.phoneE164, LIMITS.phoneE164) : "";
  const phoneE164 = parsed.number;
  if (phoneE164FromClient && phoneE164FromClient !== phoneE164) {
    return { ok: false, message: "Phone number does not match the selected country." };
  }

  const phoneNational = parsed.nationalNumber;
  const dialFromParsed = `+${parsed.countryCallingCode}`;
  if (countryCode !== dialFromParsed) {
    return { ok: false, message: "Country code does not match the selected country." };
  }

  if (!isNonEmptyString(raw.budgetRange) || !isValidBudget(trimMax(raw.budgetRange, LIMITS.budgetRange))) {
    return { ok: false, message: "Please select a valid budget range." };
  }

  const budgetRange = trimMax(raw.budgetRange, LIMITS.budgetRange);

  const serviceInterest =
    typeof raw.serviceInterest === "string" ? trimMax(raw.serviceInterest, LIMITS.serviceInterest) : "";

  const projectDetails =
    typeof raw.projectDetails === "string" ? trimMax(raw.projectDetails, LIMITS.projectDetails) : "";

  if (projectDetails.length > 0 && !hasNoDisallowedTextareaControlChars(projectDetails)) {
    return { ok: false, message: "Project description contains invalid characters." };
  }

  if (serviceInterest.length > 0) {
    if (!hasNoControlChars(serviceInterest)) {
      return { ok: false, message: "Service selection contains invalid characters." };
    }
    if (!serviceInterest.startsWith("/") || serviceInterest.includes("://")) {
      return { ok: false, message: "Invalid service selection." };
    }
  }

  if (!isNonEmptyString(raw.challengeId) || !isNonEmptyString(raw.captchaAnswer)) {
    return { ok: false, message: "Captcha challenge is required." };
  }

  const challengeId = trimMax(raw.challengeId, LIMITS.challengeId);
  const captchaAnswer = trimMax(raw.captchaAnswer, LIMITS.captchaAnswer);

  if (!/^[0-9a-f-]{8,64}$/i.test(challengeId)) {
    return { ok: false, message: "Invalid captcha challenge." };
  }

  if (!/^-?\d{1,6}$/.test(captchaAnswer.trim())) {
    return { ok: false, message: "Invalid captcha answer." };
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      countryCode,
      phoneNational,
      phoneE164,
      phoneCountryIso2,
      workEmail: trimMax(raw.workEmail, LIMITS.email).toLowerCase(),
      budgetRange,
      serviceInterest,
      projectDetails,
      challengeId,
      captchaAnswer,
    },
  };
}
