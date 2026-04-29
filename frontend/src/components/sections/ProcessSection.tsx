"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS } from "@/data/home";

gsap.registerPlugin(ScrollTrigger);

// ── ProcessSection ────────────────────────────────────────────────────────────
// Horizontally-pinned scroll section showing the 4-phase delivery process.
// Reusable — drop into any page that needs to showcase the process.
// On mobile, the pinning is disabled and cards stack vertically.
// ─────────────────────────────────────────────────────────────────────────────

export default function ProcessSection() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const processTrack = document.querySelector<HTMLElement>(".process-track");
      const processPin = document.querySelector<HTMLElement>(".process-pin");
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
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      className="process-pin"
      style={{
        padding: 0, background: "#0a0a0a", color: "#fafaf9",
        height: "100vh", overflow: "hidden", position: "relative",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Grid bg */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px", pointerEvents: "none",
        }}
      />

      {/* Section header */}
      <div
        style={{
          position: "relative", zIndex: 2, flexShrink: 0,
          padding: "clamp(80px,12vh,140px) 20px clamp(20px,3vh,40px)",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 40,
        }}
      >
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4.5vw, 72px)", fontWeight: 500, letterSpacing: "-0.035em", lineHeight: 0.95, margin: 0 }}>
            Our <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>process.</span>
          </h2>
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", maxWidth: 300, lineHeight: 1.65, margin: 0, textAlign: "right", flexShrink: 0 }}>
          Four phases. One team. A way of working<br />refined across 150+ shipped products.
        </p>
      </div>

      {/* Horizontal scroll track */}
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}>
        <div className="process-track" style={{ display: "flex", gap: 20, paddingLeft: 20, paddingRight: 112, willChange: "transform", alignItems: "stretch" }}>
          {PROCESS.map((step, i) => (
            <div
              key={i}
              className="process-card"
              style={{
                width: "clamp(320px, 28vw, 440px)", flexShrink: 0,
                padding: "clamp(28px,3.5vh,44px) 36px",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20, background: "rgba(255,255,255,0.02)",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                height: "clamp(340px, 58vh, 500px)",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(24px,4vh,48px)" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,6vh,72px)", fontWeight: 500, color: "rgba(255,255,255,0.12)", lineHeight: 1, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}>
                    {step.num}
                  </span>
                  <span style={{ padding: "5px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.15)", fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.65)", letterSpacing: "0.04em" }}>
                    Phase 0{i + 1}
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3.2vh,40px)", fontWeight: 500, margin: "0 0 clamp(10px,2vh,20px)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "clamp(13px,1.6vh,15px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "clamp(14px,2.5vh,24px)" }}>
                {step.points.map((p) => (
                  <li key={p} style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", padding: "clamp(5px,1vh,8px) 0", display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 14, height: 1, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* End-of-track CTA */}
          <div style={{ width: 300, flexShrink: 0, padding: "clamp(28px,3.5vh,44px) 36px", display: "flex", flexDirection: "column", justifyContent: "center", height: "clamp(340px,58vh,500px)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,2.8vh,32px)", fontWeight: 500, margin: "0 0 20px", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
              Every project.{" "}
              <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>No exceptions.</span>
            </h3>
            <a
              href="mailto:hello@techbinaries.com"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "12px 22px", background: "#fafaf9", color: "#0a0a0a",
                borderRadius: 999, fontSize: 13, fontWeight: 500,
                textDecoration: "none", alignSelf: "flex-start", marginTop: 4,
              }}
            >
              Start yours →
            </a>
          </div>
        </div>
      </div>

      {/* Corner labels */}
      <div style={{ position: "absolute", bottom: 20, left: 32, fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ display: "inline-block", width: 28, height: 1, background: "rgba(255,255,255,0.25)" }} />
        Scroll
      </div>
      <div style={{ position: "absolute", bottom: 20, right: 32, fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontVariantNumeric: "tabular-nums" }}>
        04 phases
      </div>

      {/* Mobile overrides */}
      <style>{`
        @media (max-width: 768px) {
          .process-pin { height: auto !important; overflow: visible !important; display: flex !important; flex-direction: column !important; }
          .process-pin > div:first-child { padding: 80px 14px 32px !important; }
          .process-track { flex-direction: column !important; padding: 0 14px 60px !important; transform: none !important; gap: 16px !important; width: 100% !important; }
          .process-track > div { flex: 1 1 auto !important; }
          .process-card { width: 100% !important; height: auto !important; min-height: 320px !important; }
          .process-pin > div[style*="bottom: 20px"] { display: none !important; }
        }
      `}</style>
    </section>
  );
}
