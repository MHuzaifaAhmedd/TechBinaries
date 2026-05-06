import type { RefObject } from "react";

export type CwaGrowthCursorProps = {
  cursorRef: RefObject<HTMLDivElement | null>;
  cursorRingRef: RefObject<SVGCircleElement | null>;
  cursorIndexRef: RefObject<HTMLSpanElement | null>;
};

export function CwaGrowthCursor({ cursorRef, cursorRingRef, cursorIndexRef }: CwaGrowthCursorProps) {
  return (
    <div className="cwa-cursor" ref={cursorRef} aria-hidden data-visible="false">
      <svg className="cwa-cursor-svg" viewBox="0 0 56 56" width="56" height="56">
        <circle
          className="cwa-cursor-track"
          cx="28"
          cy="28"
          r="22"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2"
        />
        <circle
          className="cwa-cursor-ring"
          ref={cursorRingRef}
          cx="28"
          cy="28"
          r="22"
          fill="none"
          stroke="#fafaf9"
          strokeWidth="2"
          strokeLinecap="round"
          transform="rotate(-90 28 28)"
        />
      </svg>
      <span className="cwa-cursor-index" ref={cursorIndexRef}>
        01/04
      </span>
      <span className="cwa-cursor-dot" aria-hidden />
    </div>
  );
}
