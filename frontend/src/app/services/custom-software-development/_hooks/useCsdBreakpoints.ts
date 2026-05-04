import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

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
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsHeroNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return { isMobile, isHeroNarrow, setIsHeroNarrow };
}
