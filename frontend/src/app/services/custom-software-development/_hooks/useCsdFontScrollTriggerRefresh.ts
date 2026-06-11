import { useEffect } from "react";
import { loadGsapWithScrollTrigger, runAfterInteractive } from "@/lib/animation/loaders";
import { scheduleScrollTriggerRefresh } from "@/lib/animation/refreshScrollTrigger";

const LAYOUT_OBSERVER_SELECTORS = [
  ".csd-cost-section",
  ".csd-cap-section",
  ".csd-process-pin",
] as const;

export function useCsdFontScrollTriggerRefresh(): void {
  useEffect(() => {
    const fonts = "fonts" in document ? document.fonts : undefined;
    let cancelled = false;
    let resizeObserver: ResizeObserver | undefined;

    const refresh = () => {
      if (!cancelled) {
        scheduleScrollTriggerRefresh();
      }
    };

    runAfterInteractive(() => {
      void loadGsapWithScrollTrigger().then(() => {
        if (cancelled) return;

        if (fonts?.ready) {
          void fonts.ready.then(refresh);
        } else {
          refresh();
        }

        if (typeof ResizeObserver !== "undefined") {
          resizeObserver = new ResizeObserver(refresh);
          for (const selector of LAYOUT_OBSERVER_SELECTORS) {
            document.querySelectorAll(selector).forEach((node) => {
              resizeObserver?.observe(node);
            });
          }
        }
      });
    });

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
    };
  }, []);
}
