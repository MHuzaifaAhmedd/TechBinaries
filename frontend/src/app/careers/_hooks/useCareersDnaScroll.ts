import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "../_lib/careers-gsap";
import { DNA } from "../_lib/careers-data";

type SetActive = (idx: number) => void;

export function useCareersDnaScroll(
  dnaStageRef: RefObject<HTMLDivElement | null>,
  dnaCursorRingRef: RefObject<HTMLDivElement | null>,
  setActiveValue: SetActive
) {
  useEffect(() => {
    const stage = dnaStageRef.current;
    if (!stage) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1101px) and (hover: hover) and (pointer: fine)",
      () => {
        const totalScenes = DNA.values.length;
        const scrollPerScene = 1.0;
        const totalDistance = totalScenes * scrollPerScene;

        let currentActive = -1;
        let lastDnaScrollProgress = 0;

        const updateDnaCursorRing = (progress: number) => {
          const ring = dnaCursorRingRef.current;
          if (!ring) return;
          const arc = ring.querySelector<SVGCircleElement>("[data-ring-arc]");
          if (arc) arc.setAttribute("stroke-dashoffset", String(1 - progress));
          const pct = ring.querySelector("[data-ring-pct]");
          if (pct) pct.textContent = String(Math.round(progress * 100));
        };

        const onStageMove = (e: MouseEvent) => {
          const ring = dnaCursorRingRef.current;
          if (!ring) return;
          ring.style.left = `${e.clientX}px`;
          ring.style.top = `${e.clientY}px`;
          ring.dataset.visible = "true";
          updateDnaCursorRing(lastDnaScrollProgress);
        };

        const onStageLeave = () => {
          const ring = dnaCursorRingRef.current;
          if (ring) ring.dataset.visible = "false";
        };

        const cards = gsap.utils.toArray<HTMLElement>(".cr-dna-full-card");
        gsap.set(cards, {
          xPercent: 100,
          opacity: 0,
          rotateY: 8,
          scale: 0.94,
          filter: "blur(10px)",
          transformOrigin: "left center",
        });

        const showCard = (idx: number, prevIdx: number) => {
          if (idx === currentActive) return;
          currentActive = idx;
          setActiveValue(idx);

          cards.forEach((card, i) => {
            if (i === idx) {
              gsap.killTweensOf(card);
              gsap.fromTo(
                card,
                {
                  xPercent: 72,
                  opacity: 0,
                  rotateY: 10,
                  scale: 0.92,
                  filter: "blur(14px)",
                  transformOrigin: "left center",
                },
                {
                  xPercent: 0,
                  opacity: 1,
                  rotateY: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 1.05,
                  ease: "expo.out",
                  clearProps: "filter",
                }
              );

              const img = card.querySelector<HTMLElement>(".cr-dna-full-card-img-wrap");
              if (img) {
                gsap.fromTo(
                  img,
                  { xPercent: 6, scale: 1.08 },
                  { xPercent: 0, scale: 1, duration: 1.4, ease: "expo.out" }
                );
              }

              const texts = card.querySelectorAll<HTMLElement>(".cr-dna-full-card-text-line");
              gsap.fromTo(
                texts,
                { yPercent: 110, opacity: 0 },
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.9,
                  ease: "power4.out",
                  stagger: 0.07,
                  delay: 0.18,
                }
              );
            } else if (i === prevIdx) {
              gsap.killTweensOf(card);
              gsap.to(card, {
                xPercent: -55,
                opacity: 0,
                scale: 0.96,
                filter: "blur(6px)",
                duration: 0.7,
                ease: "power3.in",
                onComplete: () => {
                  gsap.set(card, {
                    xPercent: 100,
                    opacity: 0,
                    filter: "blur(10px)",
                    scale: 0.94,
                    rotateY: 8,
                  });
                },
              });
            } else {
              gsap.set(card, {
                xPercent: 100,
                opacity: 0,
                filter: "blur(10px)",
                scale: 0.94,
                rotateY: 8,
              });
            }
          });
        };

        const trigger = ScrollTrigger.create({
          trigger: stage,
          start: "top 24px",
          end: () => `+=${window.innerHeight * totalDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            lastDnaScrollProgress = self.progress;
            updateDnaCursorRing(self.progress);

            const raw = self.progress * totalScenes;
            const idx = Math.min(totalScenes - 1, Math.max(0, Math.floor(raw)));
            showCard(idx, currentActive === idx ? -99 : currentActive);

            document.querySelectorAll<HTMLElement>(".cr-dna-dot").forEach((dot, i) => {
              dot.dataset.active = i === idx ? "true" : "false";
            });

            const counter = document.querySelector<HTMLElement>(".cr-dna-counter-num");
            if (counter) counter.textContent = String(idx + 1).padStart(2, "0");
          },
          onEnter: (self) => {
            showCard(0, -1);
            updateDnaCursorRing(self.progress ?? 0);
          },
        });

        stage.addEventListener("mousemove", onStageMove);
        stage.addEventListener("mouseleave", onStageLeave);
        requestAnimationFrame(() => {
          lastDnaScrollProgress = trigger.progress ?? 0;
          updateDnaCursorRing(lastDnaScrollProgress);
        });

        return () => {
          stage.removeEventListener("mousemove", onStageMove);
          stage.removeEventListener("mouseleave", onStageLeave);
          trigger.kill();
        };
      }
    );

    mm.add(
      "(max-width: 1100px), (hover: none), (pointer: coarse)",
      () => {
        const ctx = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>(".cr-dna-mobile-card").forEach((el, i) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 32 },
              {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power3.out",
                delay: i * 0.05,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }
            );
          });
        });
        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, [dnaStageRef, dnaCursorRingRef, setActiveValue]);
}
