import { MOBILE_MAX_WIDTH_MEDIA_QUERY } from "@/lib/breakpoints";

/** Viewport query aligned with capabilities layout + CTA static reveal */
export const ABOUT_MOBILE_MEDIA_QUERY = MOBILE_MAX_WIDTH_MEDIA_QUERY;

export const ABOUT_FINE_POINTER_MEDIA_QUERY =
  "(hover: hover) and (pointer: fine)" as const;
