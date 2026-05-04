import Link from "next/link";
import { PROCESS } from "../_lib/csd-data";

export function CsdProcessTrack() {
  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}>
      <div
        className="csd-process-track"
        style={{
          display: "flex",
          gap: 20,
          paddingLeft: 20,
          paddingRight: 112,
          willChange: "transform",
          alignItems: "stretch",
        }}
      >
        {PROCESS.map((step, i) => (
          <div
            key={i}
            className="csd-process-card"
            style={{
              width: "clamp(320px, 28vw, 440px)",
              flexShrink: 0,
              padding: "clamp(28px, 3.5vh, 44px) 36px",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              background: "rgba(255,255,255,0.02)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "clamp(340px, 58vh, 500px)",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "clamp(24px, 4vh, 48px)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(48px, 6vh, 72px)",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.12)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {step.num}
                </span>
                <span
                  style={{
                    padding: "5px 12px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontSize: 11,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.65)",
                    letterSpacing: "0.04em",
                  }}
                >
                  Phase {step.num}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(26px, 3.2vh, 40px)",
                  fontWeight: 500,
                  margin: "0 0 clamp(10px, 2vh, 20px)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: "clamp(13px, 1.6vh, 15px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0 }}>
                {step.desc}
              </p>
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: "clamp(14px, 2.5vh, 24px)",
              }}
            >
              {step.points.map((p) => (
                <li
                  key={p}
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.7)",
                    padding: "clamp(5px, 1vh, 8px) 0",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ width: 14, height: 1, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div
          style={{
            width: 300,
            flexShrink: 0,
            padding: "clamp(28px, 3.5vh, 44px) 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "clamp(340px, 58vh, 500px)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px, 2.8vh, 32px)",
              fontWeight: 500,
              margin: "0 0 20px",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Every project.{" "}
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>No exceptions.</span>
          </h3>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 22px",
              background: "#fafaf9",
              color: "#0a0a0a",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              alignSelf: "flex-start",
              marginTop: 4,
            }}
          >
            Start yours →
          </Link>
        </div>
      </div>
    </div>
  );
}
