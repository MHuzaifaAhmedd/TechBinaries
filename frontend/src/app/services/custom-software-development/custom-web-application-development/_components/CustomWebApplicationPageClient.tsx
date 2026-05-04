"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { CsdGrainOverlay } from "../../_components/CsdGrainOverlay";
import { CsdHeroServicePickerPortal } from "../../_components/CsdHeroServicePickerPortal";
import { useCsdBreakpoints } from "../../_hooks/useCsdBreakpoints";
import { useCsdFontScrollTriggerRefresh } from "../../_hooks/useCsdFontScrollTriggerRefresh";
import { useCsdHeroServiceMenu } from "../../_hooks/useCsdHeroServiceMenu";
import { CWA_HERO_PICKER_DOM_IDS } from "../_lib/cwa-picker-dom-ids";
import { useCwaCounterScroll } from "../_hooks/useCwaCounterScroll";
import { useCwaGrowthPinnedScroll } from "../_hooks/useCwaGrowthPinnedScroll";
import { useCwaLenis } from "../_hooks/useCwaLenis";
import { useCwaPageGsapReveals } from "../_hooks/useCwaPageGsapReveals";
import { CwaCostSection } from "./CwaCostSection";
import { CwaFaqSection } from "./CwaFaqSection";
import { CwaFinalCtaSection } from "./CwaFinalCtaSection";
import { CwaGrowthCursor } from "./CwaGrowthCursor";
import { CwaGrowthSection } from "./CwaGrowthSection";
import { CwaHeroSection } from "./CwaHeroSection";
import { CwaProcessSection } from "./CwaProcessSection";
import { CwaStackSection } from "./CwaStackSection";

gsap.registerPlugin(ScrollTrigger);

export function CustomWebApplicationPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const { isMobile, isHeroNarrow, setIsHeroNarrow } = useCsdBreakpoints();
  const { lenisRef } = useCwaLenis();
  const heroMenu = useCsdHeroServiceMenu({ lenisRef, isHeroNarrow, setIsHeroNarrow });
  const growth = useCwaGrowthPinnedScroll();

  useCwaCounterScroll();
  useCwaPageGsapReveals();
  useCsdFontScrollTriggerRefresh();

  const heroMenuProps = {
    heroService: heroMenu.heroService,
    heroServiceOpen: heroMenu.heroServiceOpen,
    heroServiceBtnRef: heroMenu.heroServiceBtnRef,
    openHeroServiceMenu: heroMenu.openHeroServiceMenu,
    closeHeroServiceMenu: heroMenu.closeHeroServiceMenu,
  };

  return (
    <>
      <CsdGrainOverlay />

      <CwaGrowthCursor
        cursorRef={growth.cursorRef}
        cursorRingRef={growth.cursorRingRef}
        cursorIndexRef={growth.cursorIndexRef}
      />

      <div
        style={{
          background: "#fafaf9",
          color: "#0a0a0a",
          fontFamily: "var(--font-body)",
          overflowX: "hidden",
        }}
      >
        <SiteHeader />

        <CwaHeroSection isMobile={isMobile} heroMenu={heroMenuProps} pickerDomIds={CWA_HERO_PICKER_DOM_IDS} />

        <CwaGrowthSection
          activePillar={growth.activePillar}
          stageRef={growth.stageRef}
          pillarListRef={growth.pillarListRef}
        />
        <CwaCostSection />
        <CwaProcessSection />
        <CwaStackSection />
        <CwaFaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
        <CwaFinalCtaSection />
        <SiteFooter />
      </div>

      <CsdHeroServicePickerPortal
        heroMenu={heroMenu}
        isHeroNarrow={isHeroNarrow}
        pickerDomIds={CWA_HERO_PICKER_DOM_IDS}
      />
    </>
  );
}
