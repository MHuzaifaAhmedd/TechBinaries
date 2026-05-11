import { useEffect } from "react";
import { runAfterInteractive } from "@/lib/animation/loaders";
import { loadCareersGsap } from "../_lib/careers-gsap";

export function useCareersFontRefresh() {
  useEffect(() => {
    const fonts = "fonts" in document ? document.fonts : undefined;
    if (!fonts?.ready) return;
    let cancelled = false;
    fonts.ready.then(async () => {
      if (cancelled) return;
      runAfterInteractive(() => {
        void loadCareersGsap().then(({ ScrollTrigger }) => {
          if (cancelled) return;
          ScrollTrigger.refresh();
        });
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);
}
