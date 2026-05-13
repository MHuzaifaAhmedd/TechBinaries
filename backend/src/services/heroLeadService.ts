import type { Collection, Db } from "mongodb";

export type HeroLeadInsertInput = {
  channel: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNational: string;
  workEmail: string;
  budgetRange: string;
  serviceInterest: string;
  projectDetails: string;
};

const COLLECTION = "hero_leads";

const LIMITS = {
  name: 120,
  email: 254,
  countryCode: 8,
  phoneNational: 32,
  budgetRange: 120,
  serviceInterest: 512,
  projectDetails: 8000,
  channel: 64,
} as const;

function trimMax(value: string, max: number): string {
  const t = value.trim();
  return t.length <= max ? t : t.slice(0, max);
}

let indexesEnsured = false;

async function ensureIndexes(collection: Collection): Promise<void> {
  if (indexesEnsured) return;
  await collection.createIndex({ createdAt: -1 });
  await collection.createIndex({ workEmail: 1, createdAt: -1 });
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
    workEmail: trimMax(input.workEmail, LIMITS.email).toLowerCase(),
    budgetRange: trimMax(input.budgetRange, LIMITS.budgetRange),
    serviceInterest: trimMax(input.serviceInterest, LIMITS.serviceInterest),
    projectDetails: trimMax(input.projectDetails, LIMITS.projectDetails),
  };

  const result = await collection.insertOne(doc);
  return { id: result.insertedId.toHexString() };
}
