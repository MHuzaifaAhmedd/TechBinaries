// ── GrainOverlay ─────────────────────────────────────────────────────────────
// Fixed full-viewport SVG noise texture rendered as a multiply layer.
// Purely decorative — gives flat backgrounds a tactile, printed feel.
// ─────────────────────────────────────────────────────────────────────────────

export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9997,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "180px 180px",
        opacity: 0.028,
        mixBlendMode: "multiply",
      }}
    />
  );
}
