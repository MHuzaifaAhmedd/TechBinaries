import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export function useCwaCounterScroll(): void {
  useEffect(() => {
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
    return () => ctx.revert();
  }, []);
}
