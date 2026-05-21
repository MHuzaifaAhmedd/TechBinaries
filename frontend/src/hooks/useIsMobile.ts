"use client";

import { useEffect, useState } from "react";
import { MOBILE_BREAKPOINT_PX, MOBILE_MAX_WIDTH_MEDIA_QUERY } from "@/lib/breakpoints";

export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT_PX): boolean {
  const [isMobile, setIsMobile] = useState(false);
  const mediaQuery =
    breakpoint === MOBILE_BREAKPOINT_PX
      ? MOBILE_MAX_WIDTH_MEDIA_QUERY
      : `(max-width: ${breakpoint}px)`;

  useEffect(() => {
    const mq = window.matchMedia(mediaQuery);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint, mediaQuery]);

  return isMobile;
}
