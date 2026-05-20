"use client";

import type { HomeCapabilityService } from "./types";

export function CapabilitySlatCollapsedFace({
  service,
  pointerEvents,
}: {
  service: HomeCapabilityService;
  pointerEvents: "auto" | "none";
}) {
  return (
    <div
      className="cap-slat-collapsed"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "22px 0",
        pointerEvents,
      }}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontFamily: "var(--font-display)",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(250,250,249,0.82)",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          {service.title}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <span style={{ width: 20, height: 1, background: "rgba(250,250,249,0.18)" }} />
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 11,
            fontWeight: 500,
            color: "rgba(250,250,249,0.55)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {service.num}
        </span>
      </div>
    </div>
  );
}
