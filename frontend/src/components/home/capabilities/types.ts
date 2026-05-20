import type { MutableRefObject } from "react";
import type Lenis from "@studio-freight/lenis";

export type { HomeCapabilityService } from "@/data/home";

export interface CapabilitiesSectionProps {
  lenisRef: MutableRefObject<Lenis | null>;
  capProgrammaticScrollRef: MutableRefObject<boolean>;
}

/**
 * Narrow surface read at interaction time for mapping a slat index to scroll Y.
 * Matches the public fields GSAP exposes on a `ScrollTrigger` instance created via
 * `ScrollTrigger.create` (values update after refresh / resize).
 */
export interface CapabilitiesPinScrollTrigger {
  readonly start: number;
  readonly end: number;
}
