"use client";

// ── GrowthBinarySection ───────────────────────────────────────────────────────
// "We turn market signals into measurable growth" section with the animated
// 10/01 binary mark, orbiting messages, and stat cards.
// ─────────────────────────────────────────────────────────────────────────────

const STAT_CARDS = [
  { value: "01", label: "Signal map", note: "Audience, funnel, offer" },
  { value: "10", label: "Binary loop", note: "Build, measure, scale" },
  { value: "99+", label: "Compounding", note: "Systems over hacks" },
];

const ORBIT_MESSAGES = [
  { key: "01", label: "Decode demand", desc: "Find demand leaks first.", className: "growth-orbit-message-one" },
  { key: "10", label: "Engineer the loop", desc: "Wire SEO, ads, analytics, and pages.", className: "growth-orbit-message-two" },
  { key: "11", label: "Scale what wins", desc: "Ship the proven signals weekly.", className: "growth-orbit-message-three" },
];

export default function GrowthBinarySection() {
  return (
    <section
      id="studio"
      className="growth-binary-section"
      style={{
        padding: "140px 20px",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        background: "#fafaf9",
        color: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orbit ring bg */}
      <div
        aria-hidden
        className="growth-orbit-bg"
        style={{
          position: "absolute",
          top: "50%",
          right: "max(-120px, -8vw)",
          width: "min(620px, 54vw)",
          aspectRatio: "1",
          borderRadius: "50%",
          border: "1px solid rgba(10,10,10,0.06)",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 78% 38%, rgba(15,23,42,0.07), transparent 32%), radial-gradient(circle at 18% 85%, rgba(148,163,184,0.16), transparent 34%)",
          pointerEvents: "none",
        }}
      />

      <div className="growth-binary-grid" style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Left: copy + stats */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 3.8vw, 56px)",
              fontWeight: 500, letterSpacing: "-0.032em",
              lineHeight: 1.02, margin: "0 0 18px", maxWidth: 760,
            }}
          >
            We turn market signals into{" "}
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(10,10,10,0.48)" }}>
              measurable growth.
            </span>
          </h2>
          <p style={{ fontSize: "clamp(16px, 1.6vw, 20px)", lineHeight: 1.65, color: "rgba(10,10,10,0.62)", maxWidth: 650, margin: 0 }}>
            Tech Binaries is built on the simplest operating principle in technology:
            keep the signal, remove the waste. We map your funnel, instrument the
            truth, ship experiments, and turn the winning moves into systems your
            business can repeat.
          </p>

          <div
            className="growth-binary-stats"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 44, maxWidth: 700 }}
          >
            {STAT_CARDS.map((item) => (
              <div
                key={item.label}
                className="growth-stat-card"
                style={{
                  border: "1px solid rgba(10,10,10,0.1)", background: "#fff",
                  borderRadius: 20, padding: "20px 18px", minHeight: 142,
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  backdropFilter: "blur(18px)",
                }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontSize: 34, letterSpacing: "-0.04em", color: "#0a0a0a" }}>
                  {item.value}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a", marginBottom: 5 }}>{item.label}</div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.45, color: "rgba(10,10,10,0.48)" }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: animated engine card */}
        <div className="growth-engine-card">
          <div className="growth-engine-meta">
            <span>Signal OS</span>
            <span>
              <span className="growth-live-dot" />
              live loop
            </span>
          </div>

          <div className="growth-logo-system">
            <div className="growth-binary-mark" aria-hidden>
              <span>1</span>
              <span>0</span>
            </div>
            <div className="growth-orbit growth-orbit-one" aria-hidden />
            <div className="growth-orbit growth-orbit-two" aria-hidden />
            <div className="growth-signal-line growth-signal-line-one" aria-hidden />
            <div className="growth-signal-line growth-signal-line-two" aria-hidden />

            {ORBIT_MESSAGES.map((step) => (
              <div key={step.key} className={`growth-orbit-message ${step.className}`}>
                <span className="growth-orbit-dot">{step.key}</span>
                <span className="growth-orbit-copy">
                  <strong>{step.label}</strong>
                  <span>{step.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
