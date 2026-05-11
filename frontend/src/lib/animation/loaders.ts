export type GsapInstance = typeof import("gsap")["gsap"];
export type ScrollTriggerInstance = typeof import("gsap/ScrollTrigger")["ScrollTrigger"];

type GsapModuleShape = { default?: unknown; gsap?: unknown } & Record<string, unknown>;
type ScrollTriggerModuleShape = { default?: unknown; ScrollTrigger?: unknown } & Record<string, unknown>;
type LenisModuleShape = { default?: unknown } & Record<string, unknown>;

function pickDefault<T>(mod: { default?: unknown }, fallback?: unknown): T {
  return ((mod.default ?? fallback) as unknown) as T;
}

export async function loadGsap(): Promise<GsapInstance> {
  const mod = (await import("gsap")) as unknown as GsapModuleShape;
  return (mod.gsap ?? mod.default ?? mod) as unknown as GsapInstance;
}

export async function loadScrollTrigger(): Promise<ScrollTriggerInstance> {
  const mod = (await import("gsap/ScrollTrigger")) as unknown as ScrollTriggerModuleShape;
  return (mod.ScrollTrigger ?? mod.default ?? mod) as unknown as ScrollTriggerInstance;
}

export async function loadGsapWithScrollTrigger(): Promise<{
  gsap: GsapInstance;
  ScrollTrigger: ScrollTriggerInstance;
}> {
  const [gsap, ScrollTrigger] = await Promise.all([loadGsap(), loadScrollTrigger()]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

export async function loadLenisCtor(): Promise<new (...args: unknown[]) => unknown> {
  const mod = (await import("@studio-freight/lenis")) as unknown as LenisModuleShape;
  return pickDefault<new (...args: unknown[]) => unknown>(mod, mod);
}

export function runAfterInteractive(cb: () => void) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    requestIdleCallback?: (fn: () => void) => void;
    setTimeout: (fn: () => void, ms?: number) => number;
  };
  (w.requestIdleCallback ?? ((fn: () => void) => w.setTimeout(fn, 0)))(cb);
}

