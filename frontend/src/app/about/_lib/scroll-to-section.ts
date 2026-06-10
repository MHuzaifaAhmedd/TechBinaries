import { MOBILE_BREAKPOINT_PX } from "@/lib/breakpoints";
import { loadGsapWithScrollTrigger } from "@/lib/animation/loaders";
import { getLenisInstance } from "@/lib/scroll-control";

function getHeaderHeight() {
  return (
    Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-height")
    ) || 72
  );
}

function scrollWindowToY(targetY: number) {
  const y = Math.max(0, targetY);
  const lenis = getLenisInstance();

  if (lenis) {
    lenis.scrollTo(y, { duration: 1.15 });
    return;
  }

  window.scrollTo({ top: y, behavior: "smooth" });
}

async function getFourPillarsPinLockYFromScrollTrigger(
  section: HTMLElement
): Promise<number | null> {
  const pinEl = section.querySelector<HTMLElement>(".ab-cap-pin");
  if (!pinEl) return null;

  const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`).matches;
  if (isMobile) {
    return pinEl.getBoundingClientRect().top + window.scrollY - getHeaderHeight();
  }

  const { ScrollTrigger } = await loadGsapWithScrollTrigger();
  ScrollTrigger.refresh();

  const pinTrigger = ScrollTrigger.getAll().find(
    (trigger) => trigger.trigger === pinEl && trigger.pin
  );
  if (pinTrigger) {
    return pinTrigger.start;
  }

  return pinEl.getBoundingClientRect().top + window.scrollY;
}

export async function scrollToAboutSection(sectionId: string) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const targetY =
    sectionId === "four-pillars"
      ? await getFourPillarsPinLockYFromScrollTrigger(section)
      : section.getBoundingClientRect().top + window.scrollY - getHeaderHeight();

  if (targetY == null) return;

  scrollWindowToY(targetY);
}
