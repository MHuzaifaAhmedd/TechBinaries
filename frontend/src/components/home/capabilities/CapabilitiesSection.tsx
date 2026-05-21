"use client";

import { useCallback, useRef, useState } from "react";
import { SERVICES } from "@/data/home";
import { useHomeScrollRefs } from "@/components/home/HomeScrollProvider";
import { CAP_SECTION_DOM_ID } from "./constants";
import type { CapabilitiesSectionProps, CapabilitiesPinScrollTrigger } from "./types";
import { CapabilityDesktopView } from "./CapabilityDesktopView";
import { CapabilityMobileView } from "./CapabilityMobileView";
import { durationForSlatJump, runProgrammaticScrollToY } from "./smoothScroll";
import { useCapabilitiesDesktopGsap } from "./useCapabilitiesDesktopGsap";
import { useCapabilitiesIsMobile } from "./useCapabilitiesIsMobile";
import { useScrollToSignalsSection } from "./useScrollToSignalsSection";

export default function CapabilitiesSection({
  lenisRef: lenisRefProp,
  capProgrammaticScrollRef: capProgrammaticScrollRefProp,
}: Partial<CapabilitiesSectionProps> = {}) {
  const { lenisRef: lenisRefCtx, capProgrammaticScrollRef: capScrollCtx } =
    useHomeScrollRefs();
  const lenisRef = lenisRefProp ?? lenisRefCtx;
  const capProgrammaticScrollRef = capProgrammaticScrollRefProp ?? capScrollCtx;
  const sectionRef = useRef<HTMLElement>(null);
  const pinScrollTriggerRef = useRef<CapabilitiesPinScrollTrigger | null>(null);

  const [activeCapability, setActiveCapability] = useState(0);
  const [showCapabilityInterlude, setShowCapabilityInterlude] = useState(false);
  const [mobileOpenCap, setMobileOpenCap] = useState<number | null>(0);

  const isMobile = useCapabilitiesIsMobile();
  const scrollToSignals = useScrollToSignalsSection(lenisRef, capProgrammaticScrollRef);

  const serviceCount = SERVICES.length;

  useCapabilitiesDesktopGsap({
    sectionRef,
    pinScrollTriggerRef,
    capProgrammaticScrollRef,
    slatCount: serviceCount,
    setActiveCapability,
    setShowCapabilityInterlude,
  });

  const scrollToCapabilityIndex = useCallback(
    (index: number) => {
      const st = pinScrollTriggerRef.current;
      if (!st || serviceCount < 2) return;

      const denom = serviceCount - 1;
      const progressTarget = index / denom;
      const targetY = st.start + progressTarget * (st.end - st.start) + 1;
      const duration = durationForSlatJump(activeCapability, index);

      runProgrammaticScrollToY({
        lenisRef,
        capProgrammaticScrollRef,
        targetY,
        duration,
      });
    },
    [activeCapability, capProgrammaticScrollRef, lenisRef, serviceCount]
  );

  return (
    <section
      id={CAP_SECTION_DOM_ID}
      ref={sectionRef}
      className="cap-section"
      style={{ position: "relative", padding: "0", background: "#fafaf9" }}
    >
      {!isMobile && (
        <CapabilityDesktopView
          services={SERVICES}
          activeCapabilityIndex={activeCapability}
          showCapabilityInterlude={showCapabilityInterlude}
          onJumpToSignals={scrollToSignals}
          onSelectCapability={scrollToCapabilityIndex}
        />
      )}

      {isMobile && (
        <CapabilityMobileView
          services={SERVICES}
          openIndex={mobileOpenCap}
          setOpenIndex={setMobileOpenCap}
          onJumpToSignals={scrollToSignals}
        />
      )}
    </section>
  );
}
