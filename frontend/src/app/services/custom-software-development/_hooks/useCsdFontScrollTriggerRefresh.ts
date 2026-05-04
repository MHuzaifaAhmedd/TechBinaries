import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export function useCsdFontScrollTriggerRefresh(): void {
  useEffect(() => {
    const fonts = "fonts" in document ? document.fonts : undefined;
    if (!fonts?.ready) return;
    fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }, []);
}
