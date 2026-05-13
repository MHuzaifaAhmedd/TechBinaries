import { useEffect } from "react";
import { loadGsapWithScrollTrigger, runAfterInteractive } from "@/lib/animation/loaders";
import { scheduleScrollTriggerRefresh } from "@/lib/animation/refreshScrollTrigger";

export function useCsdFontScrollTriggerRefresh(): void {
  useEffect(() => {
    const fonts = "fonts" in document ? document.fonts : undefined;
    if (!fonts?.ready) return;
    let cancelled = false;
    runAfterInteractive(() => {
      void loadGsapWithScrollTrigger().then(() => {
        if (cancelled) return;
        fonts.ready.then(() => {
          if (!cancelled) {
            scheduleScrollTriggerRefresh();
          }
        });
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);
}
