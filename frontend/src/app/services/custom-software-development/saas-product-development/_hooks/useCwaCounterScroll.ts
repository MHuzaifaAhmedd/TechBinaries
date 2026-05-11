import { useEffect } from "react";
import { loadGsapWithScrollTrigger, runAfterInteractive } from "@/lib/animation/loaders";

export function useCwaCounterScroll(): void {
  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void loadGsapWithScrollTrigger().then(({ gsap, ScrollTrigger }) => {
        if (cancelled) return;
        const ctx = gsap.context(() => {
          const counters = gsap.utils.toArray<HTMLElement>(".cwa-count");
          counters.forEach((el) => {
            const target = parseFloat(el.dataset.target || "0");
            const suffix = el.dataset.suffix || "";
            const decimals = parseInt(el.dataset.decimals || "0", 10);
            const obj = { v: 0 };
            ScrollTrigger.create({
              trigger: el,
              start: "top 85%",
              once: true,
              onEnter: () => {
                gsap.to(obj, {
                  v: target,
                  duration: 1.6,
                  ease: "power2.out",
                  onUpdate: () => {
                    el.textContent = obj.v.toFixed(decimals) + suffix;
                  },
                });
              },
            });
          });
        });
        revert = () => ctx.revert();
      });
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);
}
