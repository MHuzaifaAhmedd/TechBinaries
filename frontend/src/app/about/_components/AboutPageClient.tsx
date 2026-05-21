"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLenis } from "@/hooks/useLenis";
import { useAboutHeroAnimations } from "../_hooks/useAboutHeroAnimations";
import { useAboutPillarsAnimations } from "../_hooks/useAboutPillarsAnimations";
import { useAboutCapabilitiesDesktopScroll } from "../_hooks/useAboutCapabilitiesDesktopScroll";
import { useAboutCapabilitiesMobileReveals } from "../_hooks/useAboutCapabilitiesMobileReveals";
import { useAboutCtaAnimations } from "../_hooks/useAboutCtaAnimations";
import { useAboutFontRefresh } from "../_hooks/useAboutFontRefresh";
import { AboutGrainOverlay } from "./AboutGrainOverlay";
import { AboutHeroSection } from "./AboutHeroSection";
import { AboutPillarsSection } from "./AboutPillarsSection";
import { AboutCapabilitiesSection } from "./AboutCapabilitiesSection";
import { AboutCtaSection } from "./AboutCtaSection";

const ABOUT_LENIS_DURATION = 1.2;

export function AboutPageClient() {
  const capRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const [activeCapIndex, setActiveCapIndex] = useState(0);
  const [animationsReady, setAnimationsReady] = useState(false);
  const isMobile = useIsMobile();

  const setActiveCapIndexStable = useCallback((index: number) => {
    setActiveCapIndex(index);
  }, []);

  useEffect(() => {
    setAnimationsReady(true);
  }, []);

  useLenis({ duration: ABOUT_LENIS_DURATION, enabled: animationsReady });
  useAboutHeroAnimations(animationsReady);
  useAboutPillarsAnimations(animationsReady);
  useAboutCapabilitiesDesktopScroll(
    capRef,
    isMobile,
    setActiveCapIndexStable,
    animationsReady
  );
  useAboutCapabilitiesMobileReveals(isMobile, animationsReady);
  useAboutCtaAnimations(marqueeRef, animationsReady);
  useAboutFontRefresh(animationsReady);

  return (
    <>
      <AboutGrainOverlay />

      <div className="ab-page-shell">
        <SiteHeader />
        <AboutHeroSection isMobile={isMobile} />
        <AboutPillarsSection />
        <AboutCapabilitiesSection capRef={capRef} activeIndex={activeCapIndex} />
        <AboutCtaSection sectionRef={ctaRef} marqueeRef={marqueeRef} />
        <SiteFooter />
      </div>
    </>
  );
}
