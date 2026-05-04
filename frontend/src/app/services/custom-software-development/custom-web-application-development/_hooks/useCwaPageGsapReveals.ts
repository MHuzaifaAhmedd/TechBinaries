import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export function useCwaPageGsapReveals(): void {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.15 });
      const chars = gsap.utils.toArray<HTMLElement>(".cwa-h1-char");
      heroTl.fromTo(
        chars,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: { each: 0.018 }, ease: "power4.out" },
        0
      );
      heroTl.fromTo(
        ".cwa-hero-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" },
        0.55
      );
      heroTl.fromTo(
        ".cwa-hero-copy",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        0.3
      );
      heroTl.fromTo(
        ".csd-hero-form-shell",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
        0.4
      );
      heroTl.fromTo(
        ".csd-hero-form-field",
        { opacity: 0, y: 16, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
        0.7
      );

      const setupBatch = (
        selector: string,
        from: gsap.TweenVars,
        to: gsap.TweenVars,
        start = "top 88%"
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
      setupBatch(".cwa-sh", { opacity: 0, y: 38 }, { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" });
      setupBatch(".cwa-faq-row", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "top 92%");

      gsap.utils.toArray<HTMLElement>(".cwa-fail-card").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
      });

      const processSection = document.querySelector<HTMLElement>(".cwa-process-section");
      const processLine = document.querySelector<HTMLElement>(".cwa-process-line-fill");
      if (processSection && processLine) {
        gsap.fromTo(processLine,
          { scaleY: 0 },
          {
            scaleY: 1, ease: "none", transformOrigin: "top center",
            scrollTrigger: {
              trigger: processSection,
              start: "top 60%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          });
      }
      gsap.utils.toArray<HTMLElement>(".cwa-proc-step").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          });
      });

      gsap.utils.toArray<HTMLElement>(".cwa-stack-line").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 14 },
          {
            opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
            delay: i * 0.04,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
      });

      const ctaChars = gsap.utils.toArray<HTMLElement>(".cwa-ncta-char");
      if (ctaChars.length) {
        gsap.fromTo(ctaChars,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0, opacity: 1, duration: 0.9,
            stagger: { each: 0.014 }, ease: "power4.out",
            scrollTrigger: { trigger: ".cwa-ncta", start: "top 75%", once: true },
          });
      }
      gsap.utils.toArray<HTMLElement>(".cwa-ncta-fade").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 18 },
          {
            opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
            delay: 0.4 + i * 0.08,
            scrollTrigger: { trigger: ".cwa-ncta", start: "top 75%", once: true },
          });
      });
    });
    return () => ctx.revert();
  }, []);
}
