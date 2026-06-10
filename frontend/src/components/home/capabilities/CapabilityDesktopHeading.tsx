"use client";

import { CapabilityDesktopJumpButton } from "./CapabilityDesktopJumpButton";

export function CapabilityDesktopHeading({
  activeCapabilityIndex,
  capabilityCount,
  onJumpToSignals,
}: {
  activeCapabilityIndex: number;
  capabilityCount: number;
  onJumpToSignals: () => void;
}) {
  const showSkip = activeCapabilityIndex >= 1;

  return (
    <div
      className="cap-header"
      style={{
        maxWidth: 1320,
        margin: "0 auto",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "end",
        gap: 40,
        flexWrap: "wrap",
        marginBottom: 36,
        opacity: 0,
      }}
    >
      <div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 3.8vw, 56px)",
            fontWeight: 500,
            letterSpacing: "-0.032em",
            lineHeight: 1.02,
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          Services We{" "}
          <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>
            Excel At.
          </span>
        </h2>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "rgba(0,0,0,0.4)",
            fontWeight: 600,
            textTransform: "uppercase",
            transform: showSkip ? "translateX(0)" : "translateX(172px)",
            transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <span>Scroll to explore</span>
          <span style={{ width: 24, height: 1, background: "rgba(0,0,0,0.2)" }} />
          <span
            style={{
              fontVariantNumeric: "tabular-nums",
              color: "#0a0a0a",
              fontSize: 13,
            }}
          >
            {String(activeCapabilityIndex + 1).padStart(2, "0")}
            <span style={{ opacity: 0.35, margin: "0 4px", fontWeight: 400 }}>/</span>
            {String(capabilityCount).padStart(2, "0")}
          </span>
        </div>

        <CapabilityDesktopJumpButton visible={showSkip} onClick={onJumpToSignals} />
      </div>
    </div>
  );
}
