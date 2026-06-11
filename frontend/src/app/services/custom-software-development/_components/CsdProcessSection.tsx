import { CsdProcessTrack } from "./CsdProcessTrack";

type Props = { isMobile: boolean };

export function CsdProcessSection({ isMobile }: Props) {
  return (
    <section
      id="process"
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

      <div className="csd-process-header">
        <div className="csd-process-title-row">
          <h3 className="csd-process-h3">
            Our <span className="csd-process-h3-accent">Development Process</span>
          </h3>
          <p className="csd-process-meta">
            Six phases. One team. A way of working refined across 150+ shipped products.
          </p>
        </div>
        <p className="csd-process-lead">
          A streamlined, proven approach designed to deliver scalable, high-performing custom software development
          solutions with clarity, efficiency, and measurable business impact.
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
