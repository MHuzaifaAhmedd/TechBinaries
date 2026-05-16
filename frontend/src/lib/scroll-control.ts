import type Lenis from "@studio-freight/lenis";

let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenisInstance() {
  return lenisInstance;
}

export function getScrollY() {
  if (lenisInstance) return lenisInstance.scroll as number;
  return window.scrollY;
}

export function scrollWindowTo(y: number) {
  const top = Math.max(0, y);

  if (lenisInstance) {
    lenisInstance.scrollTo(top, { immediate: true, force: true });
    return;
  }

  window.scrollTo({ top, behavior: "instant" });
}

export function setScrollbarDragging(dragging: boolean) {
  if (!lenisInstance) return;
  if (dragging) lenisInstance.stop();
  else lenisInstance.start();
}
