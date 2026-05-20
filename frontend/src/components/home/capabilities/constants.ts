/** Desktop ↔ mobile split — must match GSAP `matchMedia` query in the pin animation hook */
export const CAPABILITIES_DESKTOP_MIN_WIDTH_PX = 901;

export const CAPABILITIES_MOBILE_MEDIA_QUERY = `(max-width: ${CAPABILITIES_DESKTOP_MIN_WIDTH_PX - 1}px)`;

/** Target section for “Jump to signals” affordances */
export const SIGNALS_SECTION_ELEMENT_ID = "studio";

/** Horizontal flex weights for the desktop slat rail */
export const SLAT_FLEX_COLLAPSED = 1;
export const SLAT_FLEX_EXPANDED = 12;

export const SLAT_GAP_PX = 12;

export const CAP_SECTION_DOM_ID = "services";
