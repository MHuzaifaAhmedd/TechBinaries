import { loadGsapWithScrollTrigger } from "@/lib/animation/loaders";

let pendingRefreshRaf: number | null = null;

export function scheduleScrollTriggerRefresh(): void {
  if (typeof window === "undefined") return;

  if (pendingRefreshRaf !== null) {
    window.cancelAnimationFrame(pendingRefreshRaf);
  }

  pendingRefreshRaf = window.requestAnimationFrame(() => {
    pendingRefreshRaf = null;
    void loadGsapWithScrollTrigger().then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh();
    });
  });
}
