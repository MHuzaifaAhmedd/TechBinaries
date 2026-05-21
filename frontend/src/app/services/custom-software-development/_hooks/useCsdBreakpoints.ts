import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  HERO_NARROW_MAX_WIDTH_MEDIA_QUERY,
  MOBILE_MAX_WIDTH_MEDIA_QUERY,
} from "@/lib/breakpoints";

export type UseCsdBreakpointsResult = {
  isMobile: boolean;
  isHeroNarrow: boolean;
  setIsHeroNarrow: Dispatch<SetStateAction<boolean>>;
};

export function useCsdBreakpoints(): UseCsdBreakpointsResult {
  const [isMobile, setIsMobile] = useState(false);
  const [isHeroNarrow, setIsHeroNarrow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(MOBILE_MAX_WIDTH_MEDIA_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(HERO_NARROW_MAX_WIDTH_MEDIA_QUERY);
    const update = () => setIsHeroNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return { isMobile, isHeroNarrow, setIsHeroNarrow };
}
