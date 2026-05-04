import { useEffect } from "react";
import { gsap } from "../_lib/careers-gsap";

export function useCareersLifeMosaic() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let io: IntersectionObserver | null = null;
    const raf = requestAnimationFrame(() => {
      const items = document.querySelectorAll<HTMLElement>(".cr-life-item");
      if (!items.length) return;

      const shiftPx = () => Math.min(window.innerWidth * 0.26, 220);

      const playRow = (el: HTMLElement) => {
        if (el.dataset.lifeReveal === "1") return;
        el.dataset.lifeReveal = "1";
        io?.unobserve(el);
        const visual = el.querySelector<HTMLElement>(".cr-life-visual");
        const body = el.querySelector<HTMLElement>(".cr-life-body");
        if (!visual || !body) return;
        const isL = el.getAttribute("data-side") === "L";
        const px = shiftPx();
        gsap.fromTo(
          visual,
          { x: isL ? -px : px, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.05, ease: "power3.out" }
        );
        gsap.fromTo(
          body,
          { x: isL ? px : -px, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.05, ease: "power3.out", delay: 0.08 }
        );
      };

      io = new IntersectionObserver(
        (entries) => {
          for (const ent of entries) {
            if (!ent.isIntersecting) continue;
            playRow(ent.target as HTMLElement);
          }
        },
        { threshold: 0.14, rootMargin: "0px 0px 8% 0px" }
      );

      items.forEach((el) => io!.observe(el));
    });

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);
}
