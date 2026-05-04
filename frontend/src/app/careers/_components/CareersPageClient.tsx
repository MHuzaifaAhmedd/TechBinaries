"use client";

import { useCallback, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "../_lib/careers-gsap";
import { useCareersLenis } from "../_hooks/useCareersLenis";
import { useCareersHeroAnimations } from "../_hooks/useCareersHeroAnimations";
import { useCareersSectionReveals } from "../_hooks/useCareersSectionReveals";
import { useCareersLifeMosaic } from "../_hooks/useCareersLifeMosaic";
import { useCareersDnaScroll } from "../_hooks/useCareersDnaScroll";
import { useCareersFontRefresh } from "../_hooks/useCareersFontRefresh";
import { CareersGrainOverlay } from "./CareersGrainOverlay";
import { CareersDnaCursorRing } from "./CareersDnaCursorRing";
import { CareersHeroSection } from "./CareersHeroSection";
import { CareersFilterSection } from "./CareersFilterSection";
import { CareersDnaSection } from "./CareersDnaSection";
import { CareersLifeSection } from "./CareersLifeSection";
import { CareersRolesSection } from "./CareersRolesSection";

export function CareersPageClient() {
  const [activeValue, setActiveValue] = useState(0);
  useCareersLenis();

  const heroRef = useRef<HTMLElement | null>(null);
  const tickerRef = useRef<HTMLDivElement | null>(null);
  const dnaStageRef = useRef<HTMLDivElement | null>(null);
  const dnaCursorRingRef = useRef<HTMLDivElement | null>(null);

  const setActiveValueStable = useCallback((idx: number) => {
    setActiveValue(idx);
  }, []);

  useCareersHeroAnimations(tickerRef);
  useCareersSectionReveals();
  useCareersLifeMosaic();
  useCareersDnaScroll(dnaStageRef, dnaCursorRingRef, setActiveValueStable);
  useCareersFontRefresh();

  return (
    <>
      <CareersGrainOverlay />
      <CareersDnaCursorRing ringRef={dnaCursorRingRef} />

      <div
        style={{
          background: "#fafaf9",
          color: "#0a0a0a",
          fontFamily: "var(--font-body)",
          overflowX: "hidden",
        }}
      >
        <SiteHeader />
        <CareersHeroSection heroRef={heroRef} tickerRef={tickerRef} />
        <CareersFilterSection />
        <CareersDnaSection dnaStageRef={dnaStageRef} activeValue={activeValue} />
        <CareersLifeSection />
        <CareersRolesSection />
        <SiteFooter />
      </div>
    </>
  );
}
