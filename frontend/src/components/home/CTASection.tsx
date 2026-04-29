"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── CTASection ────────────────────────────────────────────────────────────────
// Full-width dark call-to-action block with discovery call copy,
// email CTA, and three trust metadata items (response time, timeline, location).
// ─────────────────────────────────────────────────────────────────────────────

const META_ITEMS = [
  { k: "Response time", v: "Within 24h" },
  { k: "Typical project", v: "8–16 weeks" },
  { k: "Based in", v: "Houston, US" },
];

export default function CTASection() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "#cta-inner",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: "#cta-inner", start: "top 85%" } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" style={{ padding: "0 20px 64px", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 64 }}>
      <div
        id="cta-inner"
        style={{
          borderRadius: 28, overflow: "hidden",
          padding: "92px 56px", position: "relative",
          background: "#0a0a0a", color: "#fafaf9",
          opacity: 0, maxWidth: 1320, margin: "0 auto",
        }}
      >
        {/* Grid overlay */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px", pointerEvents: "none",
          }}
        />
        {/* Radial glow */}
        <div aria-hidden style={{ position: "absolute", top: "-20%", right: "-10%", width: 560, height: 560, background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
        {/* Decorative image */}
        <div aria-hidden style={{ position: "absolute", right: 40, bottom: -40, width: "clamp(260px, 28vw, 440px)", opacity: 0.28, userSelect: "none", pointerEvents: "none" }}>
          <img src="/images/product-land.png" alt="" draggable={false} style={{ display: "block", width: "100%", height: "auto" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6.2vw, 88px)",
              fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 0.92, margin: "0 0 28px",
            }}
          >
            Have a product<br />
            in mind?{" "}
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>
              Let&apos;s talk.
            </span>
          </h2>

          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.58)", maxWidth: 500, lineHeight: 1.62, margin: "0 0 36px" }}>
            Free 30-minute discovery call. You&apos;ll talk directly with an engineer
            and a strategist. No sales pitch, just a real conversation about your problem.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href="mailto:hello@techbinaries.com"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "13px 24px", background: "#fafaf9", color: "#0a0a0a",
                textDecoration: "none", fontSize: 13, fontWeight: 500,
                borderRadius: 999, transition: "transform 0.2s",
              }}
            >
              Book a discovery call
              <span aria-hidden>→</span>
            </a>
            <a
              href="mailto:hello@techbinaries.com"
              className="ghost-btn-dark"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "13px 24px",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none", fontSize: 13, fontWeight: 500,
                borderRadius: 999, transition: "background 0.2s, border-color 0.2s",
              }}
            >
              hello@techbinaries.com
            </a>
          </div>

          <div
            style={{
              marginTop: 56, paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
            }}
          >
            {META_ITEMS.map((it) => (
              <div key={it.k}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
                  {it.k}
                </div>
                <div style={{ fontSize: 15, color: "#fafaf9", fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "-0.01em" }}>
                  {it.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
