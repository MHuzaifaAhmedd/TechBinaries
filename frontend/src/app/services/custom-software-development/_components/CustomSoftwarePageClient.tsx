"use client";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useState } from "react";
import { useCsdBreakpoints } from "../_hooks/useCsdBreakpoints";
import { useCsdFontScrollTriggerRefresh } from "../_hooks/useCsdFontScrollTriggerRefresh";
import { useCsdHeroServiceMenu } from "../_hooks/useCsdHeroServiceMenu";
import { useCsdLenis } from "../_hooks/useCsdLenis";
import { useCsdGsapPage } from "../_hooks/useCsdGsapPage";
import { useCsdTechMarquee } from "../_hooks/useCsdTechMarquee";
import { CsdBuildSection } from "./CsdBuildSection";
import { CsdCapabilitiesSection } from "./CsdCapabilitiesSection";
import { CsdCostSection } from "./CsdCostSection";
import { CsdFaqSection } from "./CsdFaqSection";
import { CsdFinalCtaSection } from "./CsdFinalCtaSection";
import { CsdGrainOverlay } from "./CsdGrainOverlay";
import { CsdHeroSection } from "./CsdHeroSection";
import { CsdHeroServicePickerPortal } from "./CsdHeroServicePickerPortal";
import { CsdProcessSection } from "./CsdProcessSection";
import { CsdResultsSection } from "./CsdResultsSection";
import { CsdTechMarqueeSection } from "./CsdTechMarqueeSection";
import { CsdValuePropsSection } from "./CsdValuePropsSection";

export function CustomSoftwarePageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [hoveredBuild, setHoveredBuild] = useState(0);

  const { isMobile, isHeroNarrow, setIsHeroNarrow } = useCsdBreakpoints();
  const { lenisRef, isLenisScrollingRef, pendingHoveredBuildRef } = useCsdLenis({
    setHoveredBuild,
  });
  const heroMenu = useCsdHeroServiceMenu({ lenisRef, isHeroNarrow, setIsHeroNarrow });
  const { marqueeLeftRef, marqueeRightRef, onTechMarqueeEnter, onTechMarqueeLeave } = useCsdTechMarquee();

  useCsdGsapPage();
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

      <div style={{ background: "#fafaf9", color: "#0a0a0a", fontFamily: "var(--font-body)", overflowX: "hidden" }}>
        <SiteHeader />

        <CsdHeroSection isMobile={isMobile} heroMenu={heroMenuProps} />

        <CsdCapabilitiesSection />
        <CsdCostSection />
        <CsdProcessSection isMobile={isMobile} />
        <CsdBuildSection
          build={{
            hoveredBuild,
            setHoveredBuild,
            isLenisScrollingRef,
            pendingHoveredBuildRef,
          }}
        />
        <CsdValuePropsSection />
        <CsdTechMarqueeSection
          marqueeLeftRef={marqueeLeftRef}
          marqueeRightRef={marqueeRightRef}
          onTechMarqueeEnter={onTechMarqueeEnter}
          onTechMarqueeLeave={onTechMarqueeLeave}
        />
        <CsdResultsSection />
        <CsdFaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
        <CsdFinalCtaSection />
        <SiteFooter />
      </div>

      <CsdHeroServicePickerPortal heroMenu={heroMenu} isHeroNarrow={isHeroNarrow} />
    </>
  );
}
