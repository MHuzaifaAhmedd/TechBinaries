import { useEffect } from "react";
import { loadGsapWithScrollTrigger, runAfterInteractive } from "@/lib/animation/loaders";

export function useCsdFontScrollTriggerRefresh(): void {
  useEffect(() => {
    const fonts = "fonts" in document ? document.fonts : undefined;
    if (!fonts?.ready) return;
    let cancelled = false;
    runAfterInteractive(() => {
      void loadGsapWithScrollTrigger().then(({ ScrollTrigger }) => {
        if (cancelled) return;
        fonts.ready.then(() => {
          if (!cancelled) {
            ScrollTrigger.refresh();
          }
        });
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);
}
