"use client";

import { useEffect } from "react";
import { scheduleScrollTriggerRefresh } from "@/lib/animation/refreshScrollTrigger";

export function useAboutFontRefresh(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const fonts = "fonts" in document ? document.fonts : undefined;
    if (!fonts?.ready) return;

    let cancelled = false;
    fonts.ready.then(() => {
      if (cancelled) return;
      scheduleScrollTriggerRefresh();
    });

    return () => {
      cancelled = true;
    };
  }, [enabled]);
}
