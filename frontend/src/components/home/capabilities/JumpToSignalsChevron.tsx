"use client";

export function JumpToSignalsChevron({
  size = 12,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 12 12"
      className={className}
      style={className === "cap-skip-arrow" ? { transition: "transform 0.25s ease" } : undefined}
    >
      <path
        d="M6 2.5v7M3 6.5 6 9.5 9 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
