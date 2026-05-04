import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export function useCsdGsapPage(): void {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.1 });
      const headlineChars = gsap.utils.toArray<HTMLElement>(
        ".csd-h1-lines-desktop .csd-h1-char, .csd-h1-lines-mobile .csd-h1-char"
      );
      heroTl.fromTo(
        headlineChars,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.85, stagger: { each: 0.018 }, ease: "power4.out" },
        0
      );
      heroTl.fromTo(
        ".csd-hero-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        0.55
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
      heroTl.fromTo(
        ".csd-hero-marquee-row",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        1.1
      );

      const setupBatchReveal = (
        selector: string,
        fromVars: gsap.TweenVars,
        toVars: gsap.TweenVars,
        start: string
      ) => {
        const items = gsap.utils.toArray<HTMLElement>(selector);
        if (!items.length) return;
        gsap.set(items, fromVars);
        ScrollTrigger.batch(items, {
          start,
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, { ...toVars, stagger: 0.08, overwrite: true });
          },
        });
      };

      setupBatchReveal(".csd-sh", { opacity: 0, y: 38 }, { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" }, "top 88%");
      setupBatchReveal(".csd-svc-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "top 90%");
      setupBatchReveal(".csd-build-row", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, "top 92%");
      setupBatchReveal(".csd-vp-item", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "top 88%");
      setupBatchReveal(".csd-result-card", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "top 90%");
      setupBatchReveal(".csd-faq-row", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "top 92%");

      const processTrack = document.querySelector<HTMLElement>(".csd-process-track");
      const processPin = document.querySelector<HTMLElement>(".csd-process-pin");
      const mm = gsap.matchMedia();
      mm.add("(min-width: 769px)", () => {
        if (!processTrack || !processPin) return;
        const getScrollDistance = () => processTrack.scrollWidth - window.innerWidth + 80;
        gsap.to(processTrack, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: processPin,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.fromTo(
        ".csd-cta-inner",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".csd-cta-inner", start: "top 85%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);
}
