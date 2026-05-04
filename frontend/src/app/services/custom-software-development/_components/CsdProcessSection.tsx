import { CsdProcessTrack } from "./CsdProcessTrack";

type Props = { isMobile: boolean };

export function CsdProcessSection({ isMobile }: Props) {
  return (
    <section
      className="csd-process-pin"
      style={{
        padding: 0,
        background: "#0a0a0a",
        color: "#fafaf9",
        height: isMobile ? "auto" : "100vh",
        overflow: isMobile ? "visible" : "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flexShrink: 0,
          padding: "clamp(80px, 12vh, 140px) 20px clamp(20px, 3vh, 40px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4.5vw, 72px)",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 0.95,
              margin: 0,
            }}
          >
            Our{" "}
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>process.</span>
          </h2>
        </div>
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            maxWidth: 320,
            lineHeight: 1.65,
            margin: 0,
            textAlign: "right",
            flexShrink: 0,
          }}
        >
          Six phases. One team. A way of working refined
          <br />
          across 150+ shipped products.
        </p>
      </div>

      <CsdProcessTrack />

      {!isMobile && (
        <>
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: 32,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ display: "inline-block", width: 28, height: 1, background: "rgba(255,255,255,0.25)" }} />
            Scroll
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 32,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            06 phases
          </div>
        </>
      )}
    </section>
  );
}
