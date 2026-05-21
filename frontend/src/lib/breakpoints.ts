/** Default mobile layout breakpoint (about capabilities, CTA, CSD/CWA hero). */
export const MOBILE_BREAKPOINT_PX = 900;

/** Narrow hero layout (CSD hero service menu sheet vs dropdown). */
export const HERO_NARROW_BREAKPOINT_PX = 768;

/** First desktop width above mobile (video `min-width` media queries). */
export const DESKTOP_MIN_WIDTH_PX = MOBILE_BREAKPOINT_PX + 1;

export const MOBILE_MAX_WIDTH_MEDIA_QUERY =
  `(max-width: ${MOBILE_BREAKPOINT_PX}px)` as const;

export const HERO_NARROW_MAX_WIDTH_MEDIA_QUERY =
  `(max-width: ${HERO_NARROW_BREAKPOINT_PX}px)` as const;

export const DESKTOP_MIN_WIDTH_MEDIA_QUERY =
  `(min-width: ${DESKTOP_MIN_WIDTH_PX}px)` as const;
