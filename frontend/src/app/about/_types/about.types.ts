import type { CAPABILITIES, CTA, HERO, PILLARS } from "../_lib/about-data";

export type AboutHeroContent = typeof HERO;
export type AboutPillarsContent = typeof PILLARS;
export type AboutCapabilitiesContent = typeof CAPABILITIES;
export type AboutCtaContent = typeof CTA;

export type AboutPillarItem = (typeof PILLARS.items)[number];
export type AboutCapabilityItem = (typeof CAPABILITIES.items)[number];

export type AboutHeroStat = (typeof HERO.stats)[number];
