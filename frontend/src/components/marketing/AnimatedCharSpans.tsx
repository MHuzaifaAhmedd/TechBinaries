import type { CSSProperties } from "react";

export type AnimatedCharSpansProps = {
  text: string;
  charClassName: string;
  keyPrefix: string;
  /** Outer clip/reveal wrapper (about hero, about CTA). Omit for flat per-char spans. */
  wrapClassName?: string;
  wrapStyle?: CSSProperties;
  charStyle?: CSSProperties;
};

/** Per-character spans for GSAP headline reveals (preserves spaces as nbsp). */
export function AnimatedCharSpans({
  text,
  charClassName,
  keyPrefix,
  wrapClassName,
  wrapStyle,
  charStyle,
}: AnimatedCharSpansProps) {
  return text.split("").map((char, index) => {
    const content = char === " " ? "\u00A0" : char;
    const key = `${keyPrefix}-${index}`;

    if (wrapClassName) {
      return (
        <span key={key} className={wrapClassName} style={wrapStyle}>
          <span className={charClassName} style={charStyle}>
            {content}
          </span>
        </span>
      );
    }

    return (
      <span key={key} className={charClassName} style={charStyle}>
        {content}
      </span>
    );
  });
}
