import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, type RefObject } from "react";

export type UseCwaGrowthPinnedScrollResult = {
  activePillar: number;
  stageRef: RefObject<HTMLDivElement | null>;
  pillarListRef: RefObject<HTMLOListElement | null>;
  cursorRef: RefObject<HTMLDivElement | null>;
  cursorRingRef: RefObject<SVGCircleElement | null>;
  cursorIndexRef: RefObject<HTMLSpanElement | null>;
};

export function useCwaGrowthPinnedScroll(): UseCwaGrowthPinnedScrollResult {
  const [activePillar, setActivePillar] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pillarListRef = useRef<HTMLOListElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<SVGCircleElement | null>(null);
  const cursorIndexRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const list = pillarListRef.current;
    if (!list) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1101px) and (hover: hover) and (pointer: fine)",
        isTouchOrSmall: "(max-width: 1100px), (hover: none), (pointer: coarse)",
      },
      (context) => {
        const { isDesktop, isTouchOrSmall } = context.conditions as {
          isDesktop: boolean;
          isTouchOrSmall: boolean;
        };

        if (isDesktop) {
          const stage = stageRef.current;
          if (!stage) return;

          const rows = gsap.utils.toArray<HTMLElement>(".cwa-pillar-row", list);
          if (!rows.length) return;

          const totalScenes = rows.length;
          const distancePerPillar = 1;
          const totalDistance = totalScenes * distancePerPillar;

          const ring = cursorRingRef.current;
          const CIRC = 2 * Math.PI * 22;
          if (ring) {
            ring.style.strokeDasharray = `${CIRC}`;
            ring.style.strokeDashoffset = `${CIRC}`;
          }

          const cursorEl = cursorRef.current;
          let xTo: ((v: number) => void) | null = null;
          let yTo: ((v: number) => void) | null = null;
          if (cursorEl) {
            xTo = gsap.quickTo(cursorEl, "x", { duration: 0.18, ease: "power3.out" });
            yTo = gsap.quickTo(cursorEl, "y", { duration: 0.18, ease: "power3.out" });
          }

          let isInsideStage = false;

          const handleMove = (e: MouseEvent) => {
            if (!cursorEl || !xTo || !yTo) return;
            xTo(e.clientX);
            yTo(e.clientY);
          };
          const handleEnter = () => {
            isInsideStage = true;
            if (cursorEl) cursorEl.setAttribute("data-visible", "true");
          };
          const handleLeave = () => {
            isInsideStage = false;
            if (cursorEl) cursorEl.setAttribute("data-visible", "false");
          };

          stage.addEventListener("mousemove", handleMove);
          stage.addEventListener("mouseenter", handleEnter);
          stage.addEventListener("mouseleave", handleLeave);

          const trigger = ScrollTrigger.create({
            trigger: stage,
            start: "top top",
            end: () => `+=${window.innerHeight * totalDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const raw = self.progress * totalScenes;
              const idx = Math.min(totalScenes - 1, Math.max(0, Math.floor(raw)));
              setActivePillar((prev) => (prev === idx ? prev : idx));

              const localProgress = Math.min(1, Math.max(0, raw - idx));
              if (ring) {
                ring.style.strokeDashoffset = `${CIRC * (1 - localProgress)}`;
              }
              if (cursorIndexRef.current) {
                cursorIndexRef.current.textContent = `${String(idx + 1).padStart(2, "0")}/${String(totalScenes).padStart(2, "0")}`;
              }
            },
            onEnter: () => {
              if (cursorEl && isInsideStage) cursorEl.setAttribute("data-visible", "true");
            },
            onLeave: () => {
              if (cursorEl) cursorEl.setAttribute("data-visible", "false");
            },
            onEnterBack: () => {
              if (cursorEl && isInsideStage) cursorEl.setAttribute("data-visible", "true");
            },
            onLeaveBack: () => {
              if (cursorEl) cursorEl.setAttribute("data-visible", "false");
            },
          });

          return () => {
            stage.removeEventListener("mousemove", handleMove);
            stage.removeEventListener("mouseenter", handleEnter);
            stage.removeEventListener("mouseleave", handleLeave);
            trigger.kill();
          };
        }

        if (isTouchOrSmall) {
          const rows = gsap.utils.toArray<HTMLElement>(".cwa-pillar-row", list);
          if (!rows.length) return;

          const trigger = ScrollTrigger.create({
            trigger: list,
            start: "top center",
            end: "bottom center",
            onUpdate: (self) => {
              const idx = Math.min(
                rows.length - 1,
                Math.max(0, Math.floor(self.progress * rows.length))
              );
              setActivePillar((prev) => (prev === idx ? prev : idx));
            },
          });

          return () => {
            trigger.kill();
          };
        }
      }
    );

    return () => mm.revert();
  }, []);

  return {
    activePillar,
    stageRef,
    pillarListRef,
    cursorRef,
    cursorRingRef,
    cursorIndexRef,
  };
}
