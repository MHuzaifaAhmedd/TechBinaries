"use client";

import type { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { useEffect } from "react";
import type { GsapInstance } from "@/lib/animation/loaders";
import { loadGsapWithScrollTrigger, runAfterInteractive } from "@/lib/animation/loaders";
import {
  SLAT_FLEX_COLLAPSED,
  SLAT_FLEX_EXPANDED,
  SLAT_GAP_PX,
} from "./constants";
import type { CapabilitiesPinScrollTrigger } from "./types";

const DESKTOP_MM = `(min-width: 901px)`;

interface ScrollTriggerSelf {
  progress: number;
  start: number;
  end: number;
}

interface UseCapabilitiesDesktopGsapParams {
  sectionRef: RefObject<HTMLElement | null>;
  pinScrollTriggerRef: MutableRefObject<CapabilitiesPinScrollTrigger | null>;
  capProgrammaticScrollRef: MutableRefObject<boolean>;
  slatCount: number;
  setActiveCapability: Dispatch<SetStateAction<number>>;
  setShowCapabilityInterlude: Dispatch<SetStateAction<boolean>>;
}

function toSlatElements(gsap: GsapInstance): HTMLElement[] {
  return gsap.utils.toArray<HTMLElement>(".cap-slat");
}

/**
 * Desktop-only: header reveal, pinned horizontal slat scrub, progress bar.
 * Cleans up via `gsap.context().revert()` on unmount or when deps change.
 */
export function useCapabilitiesDesktopGsap({
  sectionRef,
  pinScrollTriggerRef,
  capProgrammaticScrollRef,
  slatCount,
  setActiveCapability,
  setShowCapabilityInterlude,
}: UseCapabilitiesDesktopGsapParams): void {
  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap, ScrollTrigger } = await loadGsapWithScrollTrigger();
        if (cancelled) return;

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReduced) {
          gsap.utils.toArray<HTMLElement>(".cap-header").forEach((el) => {
            gsap.set(el, { opacity: 1, y: 0 });
          });
          gsap.utils.toArray<HTMLElement>(".cap-progress-bar").forEach((el) => {
            gsap.set(el, { scaleX: 1 });
          });
          return;
        }

        const ctx = gsap.context(() => {
          const capSection = sectionRef.current;
          const capMM = gsap.matchMedia();

          capMM.add(DESKTOP_MM, () => {
            if (!capSection) return;

            const header = capSection.querySelector<HTMLElement>(".cap-header");
            if (header) {
              gsap.fromTo(
                header,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.9,
                  ease: "power3.out",
                  scrollTrigger: { trigger: header, start: "top 85%" },
                }
              );
            }

            if (slatCount < 2) {
              gsap.utils.toArray<HTMLElement>(".cap-progress-bar").forEach((el) => {
                gsap.set(el, { scaleX: 1 });
              });
              return;
            }

            const slatEls = toSlatElements(gsap);
            if (slatEls.length === 0) return;

            const slatsContainer = capSection.querySelector<HTMLElement>(".cap-slats");
            const computeExpandedWidth = () => {
              if (!slatsContainer) return;
              const containerW = slatsContainer.clientWidth;
              const totalGap = SLAT_GAP_PX * (slatCount - 1);
              const expandedW =
                ((containerW - totalGap) * SLAT_FLEX_EXPANDED) /
                (SLAT_FLEX_EXPANDED + SLAT_FLEX_COLLAPSED * (slatCount - 1));
              const widthPx = `${Math.floor(expandedW)}px`;
              requestAnimationFrame(() => {
                slatEls.forEach((el) => {
                  el.style.setProperty("--cap-expanded-w", widthPx);
                });
              });
            };
            computeExpandedWidth();
            ScrollTrigger.addEventListener("refreshInit", computeExpandedWidth);

            slatEls.forEach((el, i) => {
              gsap.set(el, { flexGrow: i === 0 ? SLAT_FLEX_EXPANDED : SLAT_FLEX_COLLAPSED });
              const collapsed = el.querySelector<HTMLElement>(".cap-slat-collapsed");
              const expanded = el.querySelector<HTMLElement>(".cap-slat-expanded");
              if (collapsed) gsap.set(collapsed, { autoAlpha: i === 0 ? 0 : 1 });
              if (expanded) gsap.set(expanded, { autoAlpha: i === 0 ? 1 : 0, x: 0 });
            });

            const totalScroll = () => window.innerHeight * slatCount;

            const capST = ScrollTrigger.create({
              trigger: capSection,
              start: "top top",
              end: () => `+=${totalScroll()}`,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              scrub: 0.5,
              snap: {
                snapTo: (value: number) => {
                  if (capProgrammaticScrollRef.current) return value;
                  const denom = slatCount - 1;
                  return Math.round(value * denom) / denom;
                },
                duration: { min: 0.2, max: 0.6 },
                delay: 0.12,
                ease: "power2.inOut",
              },
              onUpdate: (self: ScrollTriggerSelf) => {
                const rawPos = self.progress * (slatCount - 1);
                const distToNearestCapability = Math.abs(rawPos - Math.round(rawPos));
                const interludeVisible =
                  distToNearestCapability > 0.42 && distToNearestCapability < 0.58;
                setShowCapabilityInterlude((prev) =>
                  prev === interludeVisible ? prev : interludeVisible
                );

                slatEls.forEach((el, i) => {
                  const dist = Math.abs(i - rawPos);
                  const weight = Math.max(0, 1 - dist);
                  const eased = weight * weight * (3 - 2 * weight);
                  const flexVal =
                    SLAT_FLEX_COLLAPSED +
                    (SLAT_FLEX_EXPANDED - SLAT_FLEX_COLLAPSED) * eased;
                  el.style.flexGrow = String(flexVal);

                  const collapsedOpacity = Math.min(1, Math.max(0, 1 - eased * 2.6));
                  const expandedOpacity = Math.min(1, Math.max(0, (eased - 0.55) / 0.45));
                  const direction = i < rawPos ? -1 : 1;
                  const slide = (1 - expandedOpacity) * 32 * direction;

                  const collapsed = el.querySelector<HTMLElement>(".cap-slat-collapsed");
                  const expanded = el.querySelector<HTMLElement>(".cap-slat-expanded");
                  if (collapsed) {
                    collapsed.style.opacity = String(collapsedOpacity);
                    collapsed.style.visibility =
                      collapsedOpacity < 0.01 ? "hidden" : "visible";
                  }
                  if (expanded) {
                    expanded.style.opacity = String(expandedOpacity);
                    expanded.style.transform = `translateX(${slide}px)`;
                    expanded.style.visibility =
                      expandedOpacity < 0.01 ? "hidden" : "visible";
                  }
                });

                const idx = Math.round(rawPos);
                setActiveCapability((prev) => (prev === idx ? prev : idx));
              },
            });

            pinScrollTriggerRef.current = capST;

            gsap.to(".cap-progress-bar", {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: capSection,
                start: "top top",
                end: () => `+=${totalScroll()}`,
                scrub: 0.8,
              },
            });

            return () => {
              pinScrollTriggerRef.current = null;
              ScrollTrigger.removeEventListener("refreshInit", computeExpandedWidth);
            };
          });
        });

        revert = () => ctx.revert();
      })();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [
    capProgrammaticScrollRef,
    pinScrollTriggerRef,
    sectionRef,
    setActiveCapability,
    setShowCapabilityInterlude,
    slatCount,
  ]);
}
