import type { RefObject } from "react";

type Props = {
  ringRef: RefObject<HTMLDivElement | null>;
};

export function CareersDnaCursorRing({ ringRef }: Props) {
  return (
    <div
      ref={ringRef}
      className="cr-dna-cursor-ring"
      data-visible="false"
      aria-hidden="true"
    >
      <div className="cr-dna-cursor-ring-inner">
        <svg
          className="cr-dna-cursor-ring-svg"
          width="56"
          height="56"
          viewBox="0 0 56 56"
          aria-hidden
        >
          <circle
            cx="28"
            cy="28"
            r="22"
            fill="none"
            stroke="rgba(250,250,249,0.14)"
            strokeWidth="2"
          />
          <circle
            data-ring-arc
            cx="28"
            cy="28"
            r="22"
            fill="none"
            stroke="#fafaf9"
            strokeWidth="2"
            strokeLinecap="round"
            transform="rotate(-90 28 28)"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset="1"
          />
        </svg>
        <span className="cr-dna-cursor-ring-pct" data-ring-pct>
          0
        </span>
      </div>
    </div>
  );
}
