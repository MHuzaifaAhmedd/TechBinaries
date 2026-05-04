import { useEffect, type RefObject } from "react";
import { gsap } from "../_lib/careers-gsap";

export function useCareersHeroAnimations(tickerRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      const chars = gsap.utils.toArray<HTMLElement>(".cr-hero-char");
      tl.fromTo(
        chars,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: { each: 0.014 },
          ease: "power4.out",
        },
        0
      );
      tl.fromTo(
        ".cr-hero-fade",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: "power3.out" },
        0.7
      );

      gsap.to(".cr-hero-bg", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".cr-hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      const ticker = tickerRef.current;
      if (ticker) {
        const inner = ticker.querySelector<HTMLDivElement>(".cr-ticker-track");
        if (inner) {
          const firstChild = inner.children[0] as HTMLElement | null;
          if (firstChild) {
            const setWidth = firstChild.offsetWidth;
            gsap.to(inner, {
              x: -setWidth,
              duration: 28,
              ease: "none",
              repeat: -1,
            });
          }
        }
      }
    });
    return () => ctx.revert();
  }, [tickerRef]);
}
