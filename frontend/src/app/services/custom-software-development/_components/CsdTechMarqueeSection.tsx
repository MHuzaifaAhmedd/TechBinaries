import type { RefObject } from "react";
import { TECH } from "../_lib/csd-data";

export type CsdTechMarqueeProps = {
  marqueeLeftRef: RefObject<HTMLDivElement | null>;
  marqueeRightRef: RefObject<HTMLDivElement | null>;
  onTechMarqueeEnter: () => void;
  onTechMarqueeLeave: () => void;
};

export function CsdTechMarqueeSection({
  marqueeLeftRef,
  marqueeRightRef,
  onTechMarqueeEnter,
  onTechMarqueeLeave,
}: CsdTechMarqueeProps) {
  const techDup = [...TECH, ...TECH];
  const techRev = [...TECH.slice().reverse(), ...TECH.slice().reverse()];

  return (
    <section
      className="csd-tech-marquee"
      onMouseEnter={onTechMarqueeEnter}
      onMouseLeave={onTechMarqueeLeave}
      style={{ padding: "120px 0", borderTop: "1px solid rgba(0,0,0,0.06)", overflow: "hidden", background: "#fafaf9" }}
    >
      <div
        className="csd-sh"
        style={{
          maxWidth: 1320,
          margin: "0 auto 56px",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 3.8vw, 56px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Tools we <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>trust.</span>
          </h2>
        </div>
        <p style={{ fontSize: 14, color: "rgba(0,0,0,0.55)", maxWidth: 380, lineHeight: 1.65, margin: 0 }}>
          Mature, battle-tested tooling — picked for your problem, not because it&apos;s new.
        </p>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ overflow: "hidden" }}>
          <div ref={marqueeLeftRef} className="marquee-track" style={{ display: "flex", width: "max-content", gap: 0 }}>
            {techDup.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, padding: "0 24px", flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(20px, 2.4vw, 34px)",
                    fontWeight: 500,
                    color: "#0a0a0a",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {t}
                </span>
                <span aria-hidden style={{ width: 8, height: 8, background: "#0a0a0a", borderRadius: "50%", opacity: 0.2 }} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ overflow: "hidden", marginTop: 20 }}>
          <div ref={marqueeRightRef} className="marquee-track" style={{ display: "flex", width: "max-content", gap: 0 }}>
            {techRev.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, padding: "0 24px", flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(20px, 2.4vw, 34px)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(0,0,0,0.2)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {t}
                </span>
                <span aria-hidden style={{ width: 8, height: 8, border: "1px solid rgba(0,0,0,0.2)", borderRadius: "50%" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
