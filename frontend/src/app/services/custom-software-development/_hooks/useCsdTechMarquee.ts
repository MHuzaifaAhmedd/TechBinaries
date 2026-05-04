import gsap from "gsap";
import { useEffect, useRef, type RefObject } from "react";

export type UseCsdTechMarqueeResult = {
  marqueeLeftRef: RefObject<HTMLDivElement | null>;
  marqueeRightRef: RefObject<HTMLDivElement | null>;
  onTechMarqueeEnter: () => void;
  onTechMarqueeLeave: () => void;
};

export function useCsdTechMarquee(): UseCsdTechMarqueeResult {
  const marqueeLeftRef = useRef<HTMLDivElement>(null);
  const marqueeRightRef = useRef<HTMLDivElement>(null);
  const marqueeLeftTweenRef = useRef<gsap.core.Tween | null>(null);
  const marqueeRightTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const left = marqueeLeftRef.current;
    const right = marqueeRightRef.current;
    if (!left || !right) return;

    gsap.set(left, { xPercent: 0 });
    gsap.set(right, { xPercent: -50 });

    const leftTween = gsap.to(left, { xPercent: -50, duration: 55, ease: "none", repeat: -1 });
    const rightTween = gsap.to(right, { xPercent: 0, duration: 60, ease: "none", repeat: -1 });
    marqueeLeftTweenRef.current = leftTween;
    marqueeRightTweenRef.current = rightTween;

    return () => {
      marqueeLeftTweenRef.current = null;
      marqueeRightTweenRef.current = null;
      leftTween.kill();
      rightTween.kill();
    };
  }, []);

  const onTechMarqueeEnter = () => {
    const lt = marqueeLeftTweenRef.current;
    const rt = marqueeRightTweenRef.current;
    if (lt) gsap.to(lt, { timeScale: 0.35, duration: 0.45, ease: "power2.out" });
    if (rt) gsap.to(rt, { timeScale: 0.35, duration: 0.45, ease: "power2.out" });
  };

  const onTechMarqueeLeave = () => {
    const lt = marqueeLeftTweenRef.current;
    const rt = marqueeRightTweenRef.current;
    if (lt) gsap.to(lt, { timeScale: 1, duration: 0.45, ease: "power2.out" });
    if (rt) gsap.to(rt, { timeScale: 1, duration: 0.45, ease: "power2.out" });
  };

  return {
    marqueeLeftRef,
    marqueeRightRef,
    onTechMarqueeEnter,
    onTechMarqueeLeave,
  };
}
