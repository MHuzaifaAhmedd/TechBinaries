import type Lenis from "@studio-freight/lenis";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type Dispatch,
  type MutableRefObject,
  type RefObject,
  type SetStateAction,
} from "react";
import type { CsdHeroServiceMenuBox, CsdHeroServiceValue } from "../_lib/csd-hero-service-types";

export type UseCsdHeroServiceMenuParams = {
  lenisRef: MutableRefObject<Lenis | null>;
  isHeroNarrow: boolean;
  setIsHeroNarrow: Dispatch<SetStateAction<boolean>>;
};

export type UseCsdHeroServiceMenuResult = {
  heroServiceOpen: boolean;
  heroService: CsdHeroServiceValue | null;
  setHeroService: Dispatch<SetStateAction<CsdHeroServiceValue | null>>;
  heroServiceMenuBox: CsdHeroServiceMenuBox | null;
  heroServiceBtnRef: RefObject<HTMLButtonElement | null>;
  heroServiceMenuRef: RefObject<HTMLDivElement | null>;
  heroServiceSheetRef: RefObject<HTMLDivElement | null>;
  openHeroServiceMenu: () => void;
  closeHeroServiceMenu: () => void;
};

export function useCsdHeroServiceMenu({
  lenisRef,
  isHeroNarrow,
  setIsHeroNarrow,
}: UseCsdHeroServiceMenuParams): UseCsdHeroServiceMenuResult {
  const [heroServiceOpen, setHeroServiceOpen] = useState(false);
  const [heroService, setHeroService] = useState<CsdHeroServiceValue | null>(null);
  const [heroServiceMenuBox, setHeroServiceMenuBox] = useState<CsdHeroServiceMenuBox | null>(null);
  const heroServiceBtnRef = useRef<HTMLButtonElement>(null);
  const heroServiceMenuRef = useRef<HTMLDivElement>(null);
  const heroServiceSheetRef = useRef<HTMLDivElement>(null);

  const measureHeroServiceMenu = () => {
    const btn = heroServiceBtnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const gap = 4;
    const top = r.bottom + gap;
    const spaceBelow = window.innerHeight - top - 12;
    const maxHeight = Math.min(280, Math.max(120, spaceBelow));
    setHeroServiceMenuBox({ top, left: r.left, width: r.width, maxHeight });
  };

  const closeHeroServiceMenu = () => {
    setHeroServiceOpen(false);
    setHeroServiceMenuBox(null);
  };

  const openHeroServiceMenu = () => {
    const narrow =
      typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
    setIsHeroNarrow(narrow);
    if (narrow) {
      setHeroServiceMenuBox(null);
      setHeroServiceOpen(true);
      return;
    }
    measureHeroServiceMenu();
    setHeroServiceOpen(true);
  };

  useLayoutEffect(() => {
    if (!heroServiceOpen) return;
    const menu = heroServiceMenuRef.current;
    if (menu) menu.scrollTop = 0;
  }, [heroServiceOpen]);

  useEffect(() => {
    if (!heroServiceOpen || isHeroNarrow) return;
    const onMove = () => measureHeroServiceMenu();
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", onMove);
    vv?.addEventListener("scroll", onMove);
    const lenis = lenisRef.current;
    const offLenis = lenis?.on("scroll", onMove);
    return () => {
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
      vv?.removeEventListener("resize", onMove);
      vv?.removeEventListener("scroll", onMove);
      offLenis?.();
    };
  }, [heroServiceOpen, isHeroNarrow, lenisRef]);

  useEffect(() => {
    if (!heroServiceOpen || !isHeroNarrow) return;
    const lenis = lenisRef.current;
    lenis?.stop();
    return () => {
      lenis?.start();
    };
  }, [heroServiceOpen, isHeroNarrow, lenisRef]);

  useEffect(() => {
    if (!heroServiceOpen) return;
    if (!isHeroNarrow) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [heroServiceOpen, isHeroNarrow]);

  useEffect(() => {
    if (!heroServiceOpen) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (heroServiceBtnRef.current?.contains(t)) return;
      if (heroServiceMenuRef.current?.contains(t)) return;
      if (heroServiceSheetRef.current?.contains(t)) return;
      closeHeroServiceMenu();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeHeroServiceMenu();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [heroServiceOpen]);

  useEffect(() => {
    if (!heroServiceOpen || isHeroNarrow) return;
    measureHeroServiceMenu();
  }, [isHeroNarrow, heroServiceOpen]);

  return {
    heroServiceOpen,
    heroService,
    setHeroService,
    heroServiceMenuBox,
    heroServiceBtnRef,
    heroServiceMenuRef,
    heroServiceSheetRef,
    openHeroServiceMenu,
    closeHeroServiceMenu,
  };
}
