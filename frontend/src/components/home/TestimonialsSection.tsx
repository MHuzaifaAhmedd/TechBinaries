"use client";

import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "@/data/home";

// ── TestimonialsSection ───────────────────────────────────────────────────────
// Sliding testimonial carousel — auto-advances every 3.8 s with left/right
// arrow controls. On mobile shows 1 card, on desktop shows 3.
// ─────────────────────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev" | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const visibleCount = isMobile ? 1 : 3;
  const canSlide = TESTIMONIALS.length > visibleCount;

  const getAt = (i: number) => TESTIMONIALS[(i + TESTIMONIALS.length) % TESTIMONIALS.length];

  const visibleCards = canSlide
    ? Array.from({ length: visibleCount + 1 }, (_, i) =>
        getAt(startIndex + i + (slideDirection === "prev" ? -1 : 0))
      )
    : TESTIMONIALS;

  const stepPercent = 100 / visibleCount;
  const translate =
    slideDirection === "prev"
      ? animate ? 0 : -stepPercent
      : slideDirection === "next" && animate
        ? -stepPercent
        : 0;

  // Reset on breakpoint change
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setAnimate(false);
      setSlideDirection(null);
      setStartIndex(0);
    });
    return () => cancelAnimationFrame(frame);
  }, [visibleCount]);

  // Auto-advance
  useEffect(() => {
    if (!canSlide) return;
    const id = setInterval(() => {
      if (slideDirection) return;
      setSlideDirection("next");
      setAnimate(false);
      requestAnimationFrame(() => setAnimate(true));
    }, 3800);
    return () => clearInterval(id);
  }, [slideDirection, canSlide]);

  const slideNext = () => {
    if (!canSlide || slideDirection) return;
    setSlideDirection("next");
    setAnimate(false);
    requestAnimationFrame(() => setAnimate(true));
  };

  const slidePrev = () => {
    if (!canSlide || slideDirection) return;
    setSlideDirection("prev");
    setAnimate(false);
    requestAnimationFrame(() => setAnimate(true));
  };

  const onTransitionEnd = () => {
    if (!slideDirection) return;
    setAnimate(false);
    setStartIndex((prev) =>
      slideDirection === "next"
        ? (prev + 1) % TESTIMONIALS.length
        : (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
    setSlideDirection(null);
  };

  const ArrowBtn = ({ label, onClick, char }: { label: string; onClick: () => void; char: string }) => (
    <button
      aria-label={label}
      onClick={onClick}
      suppressHydrationWarning
      style={{
        width: 42, height: 42, borderRadius: "50%",
        border: "1px solid rgba(0,0,0,0.2)",
        background: "#fff", color: "#111",
        fontSize: 20, lineHeight: 1, cursor: "pointer",
        flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
      }}
    >
      {char}
    </button>
  );

  return (
    <section
      id="testimonials"
      style={{ padding: "140px 20px", background: "#f5f5f4", borderTop: "1px solid rgba(0,0,0,0.06)" }}
    >
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", marginBottom: 42 }}>
          <div style={{ maxWidth: 720, marginLeft: -6 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 3.8vw, 56px)",
                fontWeight: 500, letterSpacing: "-0.032em", lineHeight: 1.02, margin: "0 0 16px",
              }}
            >
              What our <span style={{ color: "rgba(0,0,0,0.52)", fontWeight: 400, fontStyle: "italic" }}>clients</span> say
            </h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "rgba(0,0,0,0.58)", maxWidth: 620 }}>
              Real feedback from teams we have partnered with across product, platform, and AI delivery.
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ArrowBtn label="Previous testimonial" onClick={slidePrev} char="<" />

          <div style={{ overflow: "hidden", flex: 1 }}>
            <div
              style={{
                display: "flex",
                transform: `translateX(${translate}%)`,
                transition: slideDirection && animate ? "transform 0.65s cubic-bezier(0.22,1,0.36,1)" : "none",
              }}
              onTransitionEnd={onTransitionEnd}
            >
              {(canSlide ? visibleCards : TESTIMONIALS).map((t, i) => (
                <div
                  key={`${t.initials}-${i}`}
                  style={{ flex: `0 0 ${100 / visibleCount}%`, padding: "0 9px" }}
                >
                  <article
                    style={{
                      display: "flex", flexDirection: "column", justifyContent: "space-between",
                      border: "1px solid rgba(0,0,0,0.1)",
                      background: "#fafaf9", padding: "28px 26px",
                      minHeight: 300, height: "100%",
                    }}
                  >
                    <blockquote
                      style={{
                        margin: 0, fontFamily: "var(--font-display)",
                        fontSize: "clamp(17px, 1.65vw, 22px)",
                        lineHeight: 1.45, letterSpacing: "-0.014em",
                        color: "rgba(0,0,0,0.85)",
                      }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(0,0,0,0.09)", display: "flex", alignItems: "center", gap: 14 }}>
                      <div
                        style={{
                          width: 42, height: 42, borderRadius: "50%",
                          background: "#0a0a0a", color: "#fafaf9",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 12, fontWeight: 500, letterSpacing: "0.05em",
                          fontFamily: "var(--font-display)", flexShrink: 0,
                        }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: 14.5, fontWeight: 500, letterSpacing: "-0.005em", color: "#111" }}>{t.name}</div>
                        <div style={{ fontSize: 13, color: "rgba(0,0,0,0.5)", marginTop: 2 }}>{t.title}</div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <ArrowBtn label="Next testimonial" onClick={slideNext} char=">" />
        </div>
      </div>
    </section>
  );
}
