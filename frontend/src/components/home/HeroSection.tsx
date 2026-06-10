import Image from "next/image";
import Link from "next/link";
import { BUILDING_NOW } from "@/data/home";
import { HeroRotatingVerb } from "@/components/home/HeroRotatingVerb.client";
import { HeroSectionAnimations } from "@/components/home/HeroSectionAnimations.client";
import "@/styles/hero-section.css";

function splitChars(text: string, keyPrefix: string) {
  return text.split("").map((c, i) => (
    <span key={`${keyPrefix}-${i}`} className="hero-char" style={{ display: "inline-block", willChange: "transform" }}>
      {c === " " ? "\u00A0" : c}
    </span>
  ));
}

export default function HeroSection() {
  return (
    <HeroSectionAnimations>
      <section className="hero-section" style={{ position: "relative", overflow: "hidden" }}>
        <div className="hero-bg-media" aria-hidden>
          <Image
            src="/images/hero-poster.webp"
            alt=""
            className="hero-bg-poster"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
          />
          <video
            aria-hidden
            className="hero-bg-video"
            muted
            loop
            playsInline
            preload="none"
          />
        </div>

        <div
          aria-hidden
          className="hero-overlay"
          style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
        />

        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(1000px 520px at 18% 36%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 34%, transparent 72%)",
            mixBlendMode: "screen",
          }}
        />

        {[
          { top: 140, left: 40, borderTop: "1px solid rgba(255,255,255,0.34)", borderLeft: "1px solid rgba(255,255,255,0.34)" },
          { top: 140, right: 40, borderTop: "1px solid rgba(255,255,255,0.28)", borderRight: "1px solid rgba(255,255,255,0.28)" },
          { bottom: 40, left: 40, borderBottom: "1px solid rgba(255,255,255,0.34)", borderLeft: "1px solid rgba(255,255,255,0.34)" },
          { bottom: 40, right: 40, borderBottom: "1px solid rgba(255,255,255,0.28)", borderRight: "1px solid rgba(255,255,255,0.28)" },
        ].map((s, i) => (
          <div key={i} aria-hidden className="hero-corner" style={{ position: "absolute", width: 10, height: 10, pointerEvents: "none", ...s }} />
        ))}

        <div
          className="hero-content-wrap"
          style={{
            maxWidth: 1320,
            width: "100%",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
            willChange: "transform, opacity",
          }}
        >
          <div
            className="hero-main-grid"
            style={{ display: "grid", gridTemplateColumns: "1.65fr 1fr", gap: 36, alignItems: "start", marginBottom: 56 }}
          >
            <div className="hero-left" style={{ marginTop: "clamp(8px, 1.1vh, 16px)" }}>
              <h1
                className="hero-headline"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  lineHeight: 1.05,
                  letterSpacing: "-0.032em",
                  color: "#ffffff",
                  textShadow: "0 8px 28px rgba(0,0,0,0.35)",
                }}
              >
                <div className="hero-headline-line">
                  {splitChars("Software Development", "l1")}
                </div>

                <div className="hero-headline-line">
                  {splitChars("Company", "l2")}
                </div>

                <div className="hero-headline-line hero-headline-line--rotating">
                  <span className="hero-headline-word">{splitChars("Building", "l3")}</span>
                  <HeroRotatingVerb />
                </div>

                <div className="hero-headline-line hero-headline-line--last">
                  {splitChars("Digital Products", "l4")}
                </div>
              </h1>

              <p
                className="hero-intro-col hero-desc"
                style={{
                  color: "rgba(255,255,255,0.88)",
                  fontWeight: 400,
                  opacity: 1,
                  textShadow: "0 6px 22px rgba(0,0,0,0.32)",
                }}
              >
                Our full-service software development Company delivers
                <br />
                cloud-native solutions that empower modern enterprises to
                <br />
                innovate faster and scale their digital infrastructure 
                <br />
                effortlessly.
              </p>

              <div className="hero-intro-col hero-cta" style={{ display: "flex", gap: 12, opacity: 0, flexWrap: "wrap" }}>
                <Link
                  href="/contact"
                  className="hero-cta-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#ffffff",
                    color: "#0a0a0a",
                    textDecoration: "none",
                    fontWeight: 500,
                    borderRadius: 999,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <span style={{ position: "relative", zIndex: 2 }}>Let’s Talk Tech</span>
                  <svg
                    aria-hidden
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    className="hero-cta-arrow"
                    style={{ position: "relative", zIndex: 2, flexShrink: 0 }}
                  >
                    <path
                      d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div
              className="hero-terminal"
              style={{ opacity: 0, willChange: "transform", transformStyle: "preserve-3d", position: "relative" }}
            >
              <div
                className="hero-terminal-card"
                style={{
                  background: "linear-gradient(145deg, rgba(12,12,12,0.74) 0%, rgba(12,12,12,0.5) 100%)",
                  color: "#fafaf9",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 30px 70px -30px rgba(0,0,0,0.6), 0 8px 24px -10px rgba(0,0,0,0.35)",
                  position: "relative",
                  overflow: "hidden",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="hero-term-chrome"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="hero-term-dots" style={{ display: "flex" }}>
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="hero-term-dot"
                        style={{ borderRadius: "50%", background: "rgba(255,255,255,0.15)" }}
                      />
                    ))}
                  </div>
                  <div
                    className="hero-term-title"
                    style={{ color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.06em" }}
                  >
                    studio.tsx
                  </div>
                  <div className="hero-term-bars" style={{ display: "flex" }}>
                    {[0, 1].map((i) => (
                      <span key={i} className="hero-term-bar" style={{ background: "rgba(255,255,255,0.25)" }} />
                    ))}
                  </div>
                </div>

                <div className="hero-term-code" style={{ fontFamily: "var(--font-mono)" }}>
                  {[
                    [
                      <>
                        <span style={{ color: "#ec4899" }}>export const</span>{" "}
                        <span style={{ color: "#38bdf8" }}>studio</span> = {"{"}
                      </>,
                      "01",
                    ],
                    [
                      <>
                        {"  "}
                        <span style={{ color: "#a3e635" }}>team</span>: <span style={{ color: "#fbbf24" }}>40</span>,
                      </>,
                      "02",
                    ],
                    [
                      <>
                        {"  "}
                        <span style={{ color: "#a3e635" }}>shipped</span>: <span style={{ color: "#fbbf24" }}>150</span>,
                      </>,
                      "03",
                    ],
                    [
                      <>
                        {"  "}
                        <span style={{ color: "#a3e635" }}>stack</span>: [
                        <span style={{ color: "#fde68a" }}>&apos;react&apos;</span>,{" "}
                        <span style={{ color: "#fde68a" }}>&apos;go&apos;</span>,{" "}
                        <span style={{ color: "#fde68a" }}>&apos;k8s&apos;</span>],
                      </>,
                      "04",
                    ],
                    [
                      <>
                        {"  "}
                        <span style={{ color: "#a3e635" }}>status</span>:{" "}
                        <span style={{ color: "#fde68a" }}>&apos;accepting&apos;</span>,
                      </>,
                      "05",
                    ],
                    [
                      <>
                        {"  "}
                        <span style={{ color: "#a3e635" }}>ship</span>: <span style={{ color: "#ec4899" }}>async</span>{" "}
                        () =&gt; <span style={{ color: "rgba(255,255,255,0.5)" }}>{"/"}* every week *{"/"}</span>
                      </>,
                      "06",
                    ],
                    [
                      <>
                        {"}"}
                        <span
                          className="caret-blink hero-term-caret"
                          style={{ display: "inline-block", background: "#fafaf9", verticalAlign: "middle" }}
                        />
                      </>,
                      "07",
                    ],
                  ].map(([content, lineNum]) => (
                    <div key={lineNum as string} className="hero-terminal-line" style={{ opacity: 0, display: "flex" }}>
                      <span className="hero-term-num" style={{ color: "rgba(255,255,255,0.25)", textAlign: "right" }}>
                        {lineNum}
                      </span>
                      <span>{content}</span>
                    </div>
                  ))}
                </div>

                <div className="hero-term-divider" style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

                <div className="hero-term-ship" style={{ position: "relative", overflow: "hidden" }}>
                  <div
                    className="hero-term-ship-label"
                    style={{
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.35)",
                      textTransform: "uppercase",
                    }}
                  >
                    Currently shipping
                  </div>
                  <div className="building-now hero-term-ship-track" style={{ position: "relative" }}>
                    {BUILDING_NOW.map((b, i) => (
                      <div
                        key={i}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          opacity: 0,
                          animation: `building-rotate 12s infinite ${i * 3}s`,
                        }}
                      >
                        <span
                          className="hero-term-tag"
                          style={{
                            borderRadius: 4,
                            background: "rgba(255,255,255,0.08)",
                            fontWeight: 600,
                            letterSpacing: "0.14em",
                            color: "rgba(255,255,255,0.7)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {b.tag}
                        </span>
                        <span className="hero-term-tag-label" style={{ color: "rgba(255,255,255,0.75)" }}>
                          {b.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="hero-term-stats"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {[
                    { label: "Commits today", val: "247" },
                    { label: "Deploys this week", val: "18" },
                  ].map(({ label, val }) => (
                    <div key={label}>
                      <div
                        className="hero-term-stat-label"
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          fontWeight: 500,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                        }}
                      >
                        {label}
                      </div>
                      <div
                        className="hero-term-stat-val"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 500,
                          letterSpacing: "-0.02em",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        <span className="stat-num" data-val={val}>
                          {val}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: -80,
                    right: -80,
                    width: 280,
                    height: 280,
                    background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="hero-scroll-hint"
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            opacity: 0,
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <span
            className="hero-scroll-text"
            style={{
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            Scroll
          </span>
          <div
            className="hero-scroll-mouse"
            style={{ border: "1px solid rgba(255,255,255,0.35)", position: "relative", overflow: "hidden" }}
          >
            <span
              className="scroll-dot"
              style={{
                position: "absolute",
                left: "50%",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.75)",
              }}
            />
          </div>
        </div>
      </section>
    </HeroSectionAnimations>
  );
}
