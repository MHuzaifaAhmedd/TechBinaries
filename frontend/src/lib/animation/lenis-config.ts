export const DEFAULT_LENIS_OPTIONS = {
  duration: 1.1,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  wheelMultiplier: 1,
  touchMultiplier: 1.4,
  smoothWheel: true,
} as const;
