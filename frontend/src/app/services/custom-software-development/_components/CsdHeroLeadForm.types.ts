import { RefObject } from "react";

export type HeroMenuValue = {
  href: string;
  label: string;
};

export type HeroMenuProps = {
  heroService: HeroMenuValue | null;
  heroServiceOpen: boolean;
  heroServiceBtnRef: RefObject<HTMLButtonElement | null>;
  openHeroServiceMenu: () => void;
  closeHeroServiceMenu: () => void;
};

export type ServiceControls = {
  listboxId: string;
  triggerId: string;
};

export type CsdHeroLeadFormProps = {
  heroMenu: HeroMenuProps;
  serviceControls: ServiceControls;
};

export type ChallengePayload = {
  challengeId: string;
  challengeText: string;
  expiresAt: number;
};

export type HeroLeadResponse = {
  message: string;
};
