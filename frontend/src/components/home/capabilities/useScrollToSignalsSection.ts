"use client";

import type { MutableRefObject } from "react";
import { useCallback } from "react";
import type Lenis from "@studio-freight/lenis";
import { SIGNALS_SECTION_ELEMENT_ID } from "./constants";
import {
  durationForSignalsJump,
  runProgrammaticScrollToY,
} from "./smoothScroll";

export function useScrollToSignalsSection(
  lenisRef: MutableRefObject<Lenis | null>,
  capProgrammaticScrollRef: MutableRefObject<boolean>
): () => void {
  return useCallback(() => {
    if (typeof window === "undefined") return;
    const signalsEl = document.getElementById(SIGNALS_SECTION_ELEMENT_ID);
    if (!signalsEl) return;

    const targetY = signalsEl.getBoundingClientRect().top + window.scrollY;
    const distance = Math.abs(targetY - window.scrollY);
    const duration = durationForSignalsJump(distance);

    runProgrammaticScrollToY({
      lenisRef,
      capProgrammaticScrollRef,
      targetY,
      duration,
    });
  }, [capProgrammaticScrollRef, lenisRef]);
}
