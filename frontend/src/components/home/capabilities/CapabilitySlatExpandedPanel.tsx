"use client";

import type { HomeCapabilityService } from "./types";

function CapabilitySlatTitle({ title }: { title: string }) {
  const words = title.split(" ");
  return (
    <h3
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(34px, 4vw, 60px)",
        fontWeight: 500,
        letterSpacing: "-0.035em",
        lineHeight: 0.98,
        margin: "0 0 20px",
      }}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          style={{ display: "inline-block", marginRight: wi < words.length - 1 ? "0.25em" : 0 }}
        >
          {wi === words.length - 1 ? (
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.62)" }}>
              {word}
            </span>
          ) : (
            word
          )}
        </span>
      ))}
    </h3>
  );
}

export function CapabilitySlatExpandedPanel({
  service,
  capabilityCount,
  pointerEvents,
}: {
  service: HomeCapabilityService;
  capabilityCount: number;
  pointerEvents: "auto" | "none";
}) {
  return (
    <div
      className="cap-slat-expanded"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: "var(--cap-expanded-w, 1100px)",
        padding: "40px 48px 44px",
        display: "flex",
        flexDirection: "column",
        pointerEvents,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 70% 50% at 85% 15%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 85% 15%, black 0%, transparent 75%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", minWidth: 0, paddingRight: 16 }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.62)",
            }}
          >
            Capability {service.num} <span style={{ opacity: 0.4, margin: "0 6px" }}>/</span>{" "}
            {service.kicker}
          </span>
        </div>
        <span
          aria-hidden
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 48,
            fontWeight: 500,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.2)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {service.num}
        </span>
      </div>

      <div
        className="cap-slat-body"
        style={{
          flex: 1,
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1.15fr 1fr",
          gap: 48,
          alignItems: "start",
          minHeight: 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <CapabilitySlatTitle title={service.title} />
          <p
            style={{
              fontSize: 15.5,
              color: "rgba(255,255,255,0.62)",
              lineHeight: 1.7,
              margin: "0 0 28px",
              maxWidth: 480,
            }}
          >
            {service.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
            {service.tags.map((t: string) => (
              <span
                key={t}
                style={{
                  padding: "6px 12px",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.72)",
                  letterSpacing: "0.02em",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", minHeight: 0, overflow: "hidden" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.62)",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 16,
                height: 1,
                background: "rgba(255,255,255,0.3)",
                display: "inline-block",
              }}
            />
            What we deliver
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {service.deliverables.map((d: string, di: number) => (
              <li
                key={`${service.num}-deliverable-${di}`}
                style={{
                  padding: "12px 0",
                  borderBottom:
                    di < service.deliverables.length - 1
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  fontSize: 14,
                  color: "#fafaf9",
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  letterSpacing: "-0.005em",
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.45)",
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: 500,
                    minWidth: 20,
                  }}
                >
                  0{di + 1}
                </span>
                <span style={{ flex: 1 }}>{d}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>→</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        style={{
          marginTop: 24,
          paddingTop: 18,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "rgba(255,255,255,0.55)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span>
          {service.glyph} &nbsp; {service.kicker}
        </span>
        <span style={{ fontVariantNumeric: "tabular-nums" }}>
          {service.num} / {String(capabilityCount).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
