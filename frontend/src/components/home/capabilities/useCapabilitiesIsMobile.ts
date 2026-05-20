"use client";

import { useEffect, useState } from "react";
import { CAPABILITIES_MOBILE_MEDIA_QUERY } from "./constants";

/**
 * `true` when the viewport matches the mobile accordion layout for capabilities.
 */
export function useCapabilitiesIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(CAPABILITIES_MOBILE_MEDIA_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}
