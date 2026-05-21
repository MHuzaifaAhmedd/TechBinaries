import type { CSSProperties } from "react";

export function capabilityAccentStyle(accent: string): CSSProperties & { "--card-accent": string } {
  return { "--card-accent": accent };
}
