import { useEffect } from "react";
import { ScrollTrigger } from "../_lib/careers-gsap";

export function useCareersFontRefresh() {
  useEffect(() => {
    const fonts = "fonts" in document ? document.fonts : undefined;
    if (!fonts?.ready) return;
    fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);
}
