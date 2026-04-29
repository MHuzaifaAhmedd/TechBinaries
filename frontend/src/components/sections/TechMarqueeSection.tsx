"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TECH } from "@/data/home";

// ── TechMarqueeSection ────────────────────────────────────────────────────────
// Dual-row marquee showcasing the technology stack.
// Hover slows both rows for readability.
// Reusable — drop into any page that needs a "Tools we trust" strip.
// ─────────────────────────────────────────────────────────────────────────────

export default function TechMarqueeSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftTweenRef = useRef<gsap.core.Tween | null>(null);
  const rightTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    gsap.set(left, { xPercent: 0 });
    gsap.set(right, { xPercent: -50 });

    leftTweenRef.current = gsap.to(left, { xPercent: -50, duration: 55, ease: "none", repeat: -1 });
    rightTweenRef.current = gsap.to(right, { xPercent: 0, duration: 60, ease: "none", repeat: -1 });

    return () => {
      leftTweenRef.current?.kill();
      rightTweenRef.current?.kill();
    };
  }, []);

  const slowDown = () => {
    const l = leftTweenRef.current;
    const r = rightTweenRef.current;
    if (l) gsap.to(l, { timeScale: 0.35, duration: 0.45, ease: "power2.out" });
    if (r) gsap.to(r, { timeScale: 0.35, duration: 0.45, ease: "power2.out" });
  };

  const speedUp = () => {
    const l = leftTweenRef.current;
    const r = rightTweenRef.current;
    if (l) gsap.to(l, { timeScale: 1, duration: 0.45, ease: "power2.out" });
    if (r) gsap.to(r, { timeScale: 1, duration: 0.45, ease: "power2.out" });
  };

  return (
    <section
      className="tech-marquee"
      onMouseEnter={slowDown}
      onMouseLeave={speedUp}
      style={{ padding: "90px 0", borderTop: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }}
    >
      {/* Header */}
      <div style={{ maxWidth: 1320, margin: "0 auto 56px", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "end", gap: 40, flexWrap: "wrap" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 3.8vw, 56px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1, margin: 0 }}>
          Tools we <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>trust.</span>
        </h2>
        <p style={{ fontSize: 14, color: "rgba(0,0,0,0.55)", maxWidth: 380, lineHeight: 1.65, margin: 0 }}>
          Mature, battle-tested tooling — picked for your problem, not because it&apos;s new.
        </p>
      </div>

      {/* Row 1 */}
      <div style={{ position: "relative" }}>
        <div style={{ overflow: "hidden" }}>
          <div ref={leftRef} className="marquee-track marquee-left" style={{ display: "flex", width: "max-content", gap: 0 }}>
            {[...TECH, ...TECH].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, padding: "0 24px", flexShrink: 0 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.4vw, 34px)", fontWeight: 500, color: "#0a0a0a", letterSpacing: "-0.025em" }}>
                  {t}
                </span>
                <span aria-hidden style={{ width: 8, height: 8, background: "#0a0a0a", borderRadius: "50%", opacity: 0.2 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ overflow: "hidden", marginTop: 20 }}>
          <div ref={rightRef} className="marquee-track marquee-right" style={{ display: "flex", width: "max-content", gap: 0 }}>
            {[...TECH.slice().reverse(), ...TECH.slice().reverse()].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, padding: "0 24px", flexShrink: 0 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.4vw, 34px)", fontWeight: 400, fontStyle: "italic", color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.2)", letterSpacing: "-0.025em" }}>
                  {t}
                </span>
                <span aria-hidden style={{ width: 8, height: 8, border: "1px solid rgba(0,0,0,0.2)", borderRadius: "50%" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`.marquee-left, .marquee-right { will-change: transform; }`}</style>
    </section>
  );
}
