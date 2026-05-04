import { useEffect } from "react";
import { gsap, ScrollTrigger } from "../_lib/careers-gsap";

export function useCareersSectionReveals() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const setupBatch = (
        selector: string,
        from: gsap.TweenVars,
        to: gsap.TweenVars,
        start = "top 86%"
      ) => {
        const items = gsap.utils.toArray<HTMLElement>(selector);
        if (!items.length) return;
        gsap.set(items, from);
        ScrollTrigger.batch(items, {
          start,
          once: true,
          onEnter: (batch) => gsap.to(batch, { ...to, stagger: 0.08, overwrite: true }),
        });
      };

      setupBatch(
        ".cr-sh",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" }
      );

      gsap.fromTo(
        ".cr-filter-thead",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cr-filter-table", start: "top 86%", once: true },
        }
      );
      gsap.utils.toArray<HTMLElement>(".cr-filter-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            delay: 0.15 + i * 0.06,
            scrollTrigger: { trigger: ".cr-filter-table", start: "top 86%", once: true },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);
}
