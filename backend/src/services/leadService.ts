import type { Collection, Db } from "mongodb";

/** Stored in MongoDB collection `leads` (hero + contact form submissions). */

export type HeroLeadInsertInput = {
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

export type ContactLeadInsertInput = {
  firstName: string;
  lastName: string;
  company: string;
  website: string;
  workEmail: string;
  phone: string;
  budgetRange: string;
  hearAbout: string;
  message: string;
  services: string[];
  consent: boolean;
};

const COLLECTION = "leads";

const LIMITS = {
  name: 120,
  email: 254,
  countryCode: 8,
  phoneNational: 32,
  phoneE164: 20,
  phoneCountryIso2: 2,
  phone: 48,
  budgetRange: 120,
  serviceInterest: 512,
  projectDetails: 8000,
  channel: 64,
  company: 200,
  website: 2048,
  hearAbout: 500,
  message: 8000,
  serviceItem: 200,
  maxServices: 48,
} as const;

function trimMax(value: string, max: number): string {
  const t = value.trim();
  return t.length <= max ? t : t.slice(0, max);
}

function normalizeServices(raw: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const item of raw) {
    if (out.length >= LIMITS.maxServices) break;
    const t = trimMax(typeof item === "string" ? item : "", LIMITS.serviceItem);
    if (!t) continue;
    const key = t.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(t);
  }
  return out;
}

let indexesEnsured = false;

async function ensureIndexes(collection: Collection): Promise<void> {
  if (indexesEnsured) return;
  await collection.createIndex({ createdAt: -1 });
  await collection.createIndex({ workEmail: 1, createdAt: -1 });
  await collection.createIndex({ channel: 1, createdAt: -1 });
  indexesEnsured = true;
}

export async function insertHeroLead(db: Db, input: HeroLeadInsertInput): Promise<{ id: string }> {
  const collection = db.collection(COLLECTION);
  await ensureIndexes(collection);

  const doc = {
    createdAt: new Date(),
    channel: trimMax(input.channel, LIMITS.channel),
    firstName: trimMax(input.firstName, LIMITS.name),
    lastName: trimMax(input.lastName, LIMITS.name),
    countryCode: trimMax(input.countryCode, LIMITS.countryCode),
    phoneNational: trimMax(input.phoneNational, LIMITS.phoneNational),
    phoneE164: trimMax(input.phoneE164, LIMITS.phoneE164),
    phoneCountryIso2: trimMax(input.phoneCountryIso2, LIMITS.phoneCountryIso2).toUpperCase(),
    workEmail: trimMax(input.workEmail, LIMITS.email).toLowerCase(),
    budgetRange: trimMax(input.budgetRange, LIMITS.budgetRange),
    serviceInterest: trimMax(input.serviceInterest, LIMITS.serviceInterest),
    projectDetails: trimMax(input.projectDetails, LIMITS.projectDetails),
  };

  const result = await collection.insertOne(doc);
  return { id: result.insertedId.toHexString() };
}

export async function insertContactLead(db: Db, input: ContactLeadInsertInput): Promise<{ id: string }> {
  const collection = db.collection(COLLECTION);
  await ensureIndexes(collection);

  const services = normalizeServices(input.services);

  const doc = {
    createdAt: new Date(),
    channel: "contact" as const,
    firstName: trimMax(input.firstName, LIMITS.name),
    lastName: trimMax(input.lastName, LIMITS.name),
    company: trimMax(input.company, LIMITS.company),
    website: trimMax(input.website, LIMITS.website),
    workEmail: trimMax(input.workEmail, LIMITS.email).toLowerCase(),
    phone: trimMax(input.phone, LIMITS.phone),
    budgetRange: trimMax(input.budgetRange, LIMITS.budgetRange),
    hearAbout: trimMax(input.hearAbout, LIMITS.hearAbout),
    message: trimMax(input.message, LIMITS.message),
    services,
    consent: input.consent === true,
  };

  const result = await collection.insertOne(doc);
  return { id: result.insertedId.toHexString() };
}
