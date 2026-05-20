import type { MutableRefObject } from "react";
import type Lenis from "@studio-freight/lenis";
import { loadGsap } from "@/lib/animation/loaders";

/** Shared easing used with Lenis `scrollTo` and mirrored in GSAP timelines where needed */
export function easeSmoothStep(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

export function durationForSignalsJump(scrollDistancePx: number): number {
  return Math.min(1.4, 0.7 + scrollDistancePx / 4500);
}

export function durationForSlatJump(activeIndex: number, targetIndex: number): number {
  const distance = Math.abs(targetIndex - activeIndex);
  return Math.min(1.6, 0.75 + distance * 0.15);
}

export interface ProgrammaticScrollParams {
  lenisRef: MutableRefObject<Lenis | null>;
  capProgrammaticScrollRef: MutableRefObject<boolean>;
  targetY: number;
  duration: number;
}

/**
 * Smooth-scrolls the viewport to `targetY`, toggling `capProgrammaticScrollRef` for the
 * duration so pinned-section snap logic does not fight the animation.
 */
export function runProgrammaticScrollToY({
  lenisRef,
  capProgrammaticScrollRef,
  targetY,
  duration,
}: ProgrammaticScrollParams): void {
  if (typeof window === "undefined") return;

  capProgrammaticScrollRef.current = true;
  const release = () => {
    capProgrammaticScrollRef.current = false;
  };

  const lenis = lenisRef.current;
  if (lenis) {
    lenis.scrollTo(targetY, {
      duration,
      easing: easeSmoothStep,
      onComplete: release,
    });
    window.setTimeout(release, duration * 1000 + 300);
    return;
  }

  void scrollToYWithGsap(targetY, duration, release);
}

async function scrollToYWithGsap(
  targetY: number,
  duration: number,
  onComplete: () => void
): Promise<void> {
  const gsap = await loadGsap();
  try {
    const scrollToMod = await import("gsap/ScrollToPlugin");
    const ScrollToPlugin =
      "ScrollToPlugin" in scrollToMod && scrollToMod.ScrollToPlugin
        ? scrollToMod.ScrollToPlugin
        : scrollToMod.default;

    if (ScrollToPlugin) {
      gsap.registerPlugin(ScrollToPlugin);
    }

    gsap.to(window, {
      duration,
      scrollTo: { y: targetY, autoKill: false },
      ease: "power3.inOut",
      onComplete,
    });
  } catch {
    window.scrollTo({ top: targetY, behavior: "smooth" });
    onComplete();
  }
}
