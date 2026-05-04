# Custom Software Development page — refined modularization plan

This document supersedes the earlier high-level plan. **Do not execute implementation until this plan is explicitly approved.**

---

## 0. Layout file status (Step 0)

**Confirmed:** [`frontend/src/app/services/custom-software-development/layout.tsx`](layout.tsx) **already exists** (metadata + `children` only). There is **no** “create layout from scratch” step.

**Step 0 (first code change when executing):** extend the existing `layout.tsx` with:

```ts
import "./_styles/custom-software-page.css";
```

No new layout file is required.

---

## 1. Hero hook ref contract (TypeScript signatures)

Refs that cross **Lenis scroll** and **hero service picker** boundaries:

- `lenisRef` — created and owned inside **`useCsdLenis`**; exposed to **`useCsdHeroServiceMenu`** only as a **read-only dependency** (stop/start, `on("scroll", …)` for repositioning). The Lenis hook **does not** consume hero refs.
- Hero picker owns **`heroServiceBtnRef`**, **`heroServiceMenuRef`**, **`heroServiceSheetRef`** internally.
- **Build / hover-defer** owns **`isLenisScrollingRef`**, **`hoverLockTimeoutRef`**, **`pendingHoveredBuildRef`** — these are required by both Lenis’s `on("scroll")` handler and the “What we build” row `onMouseEnter`. They are **created inside `useCsdLenis`** and **returned** so `CsdBuildSection` can read them without duplicating logic.

### Shared types (suggested `_lib/csd-hero-service-types.ts` or inline in hook file)

```ts
export type CsdHeroServiceValue = { href: string; label: string };

export type CsdHeroServiceMenuBox = {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
};
```

### `useCsdBreakpoints`

**Role:** Single source for `matchMedia` used by hero menu (narrow vs fixed dropdown) and process section layout.

```ts
export type UseCsdBreakpointsResult = {
  isMobile: boolean;
  isHeroNarrow: boolean;
};

export function useCsdBreakpoints(): UseCsdBreakpointsResult;
```

- **Parameters:** none.  
- **Returns:** `{ isMobile, isHeroNarrow }` (both booleans, updated on media query change).

---

### `useCsdLenis`

**Role:** Construct `Lenis`, wire `gsap.ticker`, `ScrollTrigger.update`, hover-defer refs for build list, cleanup.

```ts
import type Lenis from "@studio-freight/lenis";
import type { MutableRefObject, Dispatch, SetStateAction } from "react";

export type UseCsdLenisParams = {
  setHoveredBuild: Dispatch<SetStateAction<number>>;
};

export type UseCsdLenisResult = {
  lenisRef: MutableRefObject<Lenis | null>;
  isLenisScrollingRef: MutableRefObject<boolean>;
  hoverLockTimeoutRef: MutableRefObject<number | null>;
  pendingHoveredBuildRef: MutableRefObject<number | null>;
};

export function useCsdLenis(params: UseCsdLenisParams): UseCsdLenisResult;
```

- **Input:** only `setHoveredBuild` (parent owns `hoveredBuild` state index for “What we build”).  
- **Output:** `lenisRef` + three refs used by build rows and Lenis scroll callback.  
- **Contract:** `useCsdHeroServiceMenu` receives **`lenisRef`** from this return value (not a second Lenis instance).

---

### `useCsdHeroServiceMenu`

**Role:** Dropdown/sheet open state, menu box measurement, `visualViewport` / window / Lenis scroll listeners for repositioning, body overflow + Lenis stop when sheet open, outside click + Escape.

```ts
import type Lenis from "@studio-freight/lenis";
import type { MutableRefObject, RefObject, Dispatch, SetStateAction } from "react";
import type { CsdHeroServiceValue, CsdHeroServiceMenuBox } from "./csd-hero-service-types"; // path TBD

export type UseCsdHeroServiceMenuParams = {
  lenisRef: MutableRefObject<Lenis | null>;
  isHeroNarrow: boolean;
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

export function useCsdHeroServiceMenu(
  params: UseCsdHeroServiceMenuParams
): UseCsdHeroServiceMenuResult;
```

- **Input:** `lenisRef` (from `useCsdLenis`), `isHeroNarrow` (from `useCsdBreakpoints`).  
- **Output:** all state, refs, and open/close actions the hero form + portal need.  
- **Note:** `measureHeroServiceMenu` stays **internal** to the hook (not part of the public API) unless a child truly needs it; the current code only uses it inside effects and `openHeroServiceMenu`.

---

### `useCsdTechMarquee`

```ts
import type { RefObject } from "react";

export type UseCsdTechMarqueeResult = {
  marqueeLeftRef: RefObject<HTMLDivElement | null>;
  marqueeRightRef: RefObject<HTMLDivElement | null>;
  onTechMarqueeEnter: () => void;
  onTechMarqueeLeave: () => void;
};

export function useCsdTechMarquee(): UseCsdTechMarqueeResult;
```

---

### `useCsdGsapPage`

```ts
export function useCsdGsapPage(): void;
```

Single `gsap.context` with existing selectors and `matchMedia` for process track; `[]` deps; `ctx.revert()` on unmount.

---

### `useCsdFontScrollTriggerRefresh`

```ts
export function useCsdFontScrollTriggerRefresh(): void;
```

---

## 2. Hero component split (fewer files, avoid drill)

**Decision:** After CSS is moved out of `page.tsx`, the **hero markup block alone is ~220 lines** (video wrap through form, excluding portal). That fits **under 250 lines** in one file.

**Preferred structure:**

| File | Responsibility |
|------|----------------|
| **`CsdHeroSection.tsx`** | Entire hero `<section className="csd-hero">`: video/image overlay, `csd-hero-inner`, headline (desktop + mobile char lines), lead, CTA row, requirements form including service trigger wired from **one** `heroMenu` prop object (see §5). **~220–245 lines estimated.** |
| **`CsdHeroServicePickerPortal.tsx`** | `createPortal` tree (backdrop, sheet, fixed listbox) + inline rendering of `SERVICE_CATEGORIES` options (today’s `heroServiceOptionNodes` body). **~115–165 lines estimated.** |

**Dropped** from the earlier plan (unless line count fails during build): separate `CsdHeroVideoBackdrop`, `CsdHeroHeadline`, `CsdHeroLeadCta`, `CsdHeroRequirementsForm`, `CsdHeroServiceOptions` — unnecessary prop drilling for marginal gain.

---

## 3. Line count validation (planned `.tsx` files)

Estimates are **post-CSS extraction**, including typical imports + `export`. If implementation pushes a file over 250, split **that** file only (e.g. extract `CsdProcessCard.tsx`).

| File | Estimated lines | Notes |
|------|-----------------|--------|
| `page.tsx` | ~8 | Server default export → client. |
| `_components/CustomSoftwarePageClient.tsx` | ~130–180 | Hooks + shallow section tree + grouped props. |
| `_components/CsdGrainOverlay.tsx` | ~25 | Fixed SVG noise div. |
| `_components/CsdHeroSection.tsx` | ~220–245 | Largest section; monitor in PR. |
| `_components/CsdHeroServicePickerPortal.tsx` | ~115–165 | Portal + options list. |
| `_components/CsdCapabilitiesSection.tsx` | ~55 | Map `SUB_SERVICES`. |
| `_components/CsdCostSection.tsx` | ~85 | Editorial block. |
| `_components/CsdProcessSection.tsx` | ~125–175 | Dense inline styles; if >250, extract `CsdProcessCard.tsx` (~90 lines). |
| `_components/CsdBuildSection.tsx` | ~95 | List + stage + `BuildFrame` children. |
| `_components/BuildFrame.tsx` | ~95 | Types can live in `_lib/csd-build-types.ts` (~15 lines) if needed to shave `.tsx`. |
| `_components/CsdValuePropsSection.tsx` | ~60 | |
| `_components/CsdTechMarqueeSection.tsx` | ~50 | |
| `_components/CsdResultsSection.tsx` | ~45 | |
| `_components/CsdFaqSection.tsx` | ~55 | |
| `_components/CsdFinalCtaSection.tsx` | ~60 | |

**Risk row:** `CsdProcessSection.tsx` — if the estimate exceeds 250 after formatting, **plan split:** `CsdProcessSection.tsx` (shell + header + track wrapper) + `CsdProcessStepCard.tsx` (single card + styles).

---

## 4. Prop-drilling audit — `CustomSoftwarePageClient` → sections

Orchestrator holds:

- `useCsdBreakpoints()` → `isMobile`, `isHeroNarrow`
- `useState` for `hoveredBuild` (default `0`) and `openFaq` (default `0`)
- `useCsdLenis({ setHoveredBuild })` → `lenisRef`, `isLenisScrollingRef`, `hoverLockTimeoutRef`, `pendingHoveredBuildRef`
- `useCsdHeroServiceMenu({ lenisRef, isHeroNarrow })` → hero picker API
- `useCsdTechMarquee()` → marquee refs + enter/leave
- `useCsdGsapPage()`, `useCsdFontScrollTriggerRefresh()`

### Props per section (target ≤5–6 “slots” per section)

1. **`CsdGrainOverlay`** — **0 props** (or optional `className` — default 0).

2. **`CsdHeroSection`** — **2 props**  
   - `isMobile: boolean`  
   - `heroMenu: Pick<UseCsdHeroServiceMenuResult, "heroService" | "heroServiceOpen" | "setHeroService" | "heroServiceBtnRef" | "openHeroServiceMenu" | "closeHeroServiceMenu">`  
   Form hidden field + trigger use `heroMenu`; no separate ref props.

3. **`CsdHeroServicePickerPortal`** — **1 prop** (recommended grouped type)  
   - `portal: { heroMenu: UseCsdHeroServiceMenuResult; isHeroNarrow: boolean }`  
   `isHeroNarrow` comes from **`useCsdBreakpoints`**, not from `useCsdHeroServiceMenu`; the portal needs it for the sheet vs fixed-dropdown branch. Single call site: `pickerPortal={{ heroMenu, isHeroNarrow }}`.

4. **`CsdCapabilitiesSection`** — **0 props** (imports data from `_lib`).

5. **`CsdCostSection`** — **0 props**.

6. **`CsdProcessSection`** — **1 prop:** `isMobile: boolean`.

7. **`CsdBuildSection`** — **1 prop object** `buildInteraction={{ hoveredBuild, setHoveredBuild, isLenisScrollingRef, pendingHoveredBuildRef }}` — **4 fields inside one prop** (counts as one argument for API clarity).

8. **`CsdValuePropsSection`** — **0 props**.

9. **`CsdTechMarqueeSection`** — **1 prop:** `marquee: Pick<UseCsdTechMarqueeResult, "marqueeLeftRef" | "marqueeRightRef" | "onTechMarqueeEnter" | "onTechMarqueeLeave">`.

10. **`CsdResultsSection`** — **0 props**.

11. **`CsdFaqSection`** — **1 prop:** `faq={{ openFaq, setOpenFaq }}` or two props if preferred: `openFaq`, `setOpenFaq` (still only 2).

12. **`CsdFinalCtaSection`** — **0 props**.

**Conclusion:** No section needs more than **two top-level props** if we pass **grouped objects** (`heroMenu`, `picker`, `buildInteraction`, `marquee`, `faq`). Logic stays in hooks at the orchestrator; sections stay presentational + local handlers from those objects.

---

## 5. CSS extraction risk (GSAP + specificity + scope)

- Moving rules from an inline `<style>` tag to a **global stylesheet** imported in **`layout.tsx`** keeps the same **selector strings** (e.g. `.csd-h1-char`, `.csd-process-track`). **Specificity** per rule is unchanged (still class-based rules as today).
- **ScrollTrigger / `gsap.utils.toArray` / `document.querySelector`:** they match the live DOM by class name; **no change** as long as JSX `className` strings are unchanged.
- **Cascade order:** Global CSS from `layout` typically loads in a predictable place in the Next.js CSS chunk order. The previous inline block lived in the client component tree and was injected with the app — either order can theoretically interact with other globals; **mitigation:** keep the extracted file **namespaced** to the existing `csd-` prefix only (no broad element selectors) and avoid loosening selectors during the move. If a rare override conflict appears, fix by **duplicating specificity** (e.g. same compound selector) rather than changing class names used by GSAP.
- **“Dead” selectors** (e.g. `.csd-hero-marquee-row` referenced in GSAP/CSS but absent in current JSX): behavior remains as today (no matching nodes → no-op tweens). Do not remove during extraction.

---

## 6. Final execution order (numbered checklist)

1. **Step 0 — Layout:** Edit **existing** [`layout.tsx`](layout.tsx): add `import "./_styles/custom-software-page.css";` (path relative to that file). Do **not** create a new layout file.

2. **Step 1 — CSS file:** Add `_styles/custom-software-page.css` with the **verbatim** contents of the current `<style>{…}</style>` block (no selector renames). Remove the `<style>` block from the React tree once the import is active.

3. **Step 2 — Data:** Add `_lib/csd-data.ts` (and tiny `_lib/csd-hero-service-types.ts` if desired) with all constants currently at the top of `page.tsx`.

4. **Step 3 — Hooks:** Add `_hooks/` files implementing the signatures in **§1** (`useCsdBreakpoints`, `useCsdLenis`, `useCsdHeroServiceMenu`, `useCsdTechMarquee`, `useCsdGsapPage`, `useCsdFontScrollTriggerRefresh`). **Order within hooks:** implement `useCsdLenis` first, then `useCsdHeroServiceMenu` consuming `lenisRef`.

5. **Step 4 — Presentational components:** Add `_components/` section files per **§2** and **§3** (`BuildFrame`, grain, capabilities, cost, process, build, VP, tech, results, FAQ, CTA, hero, portal). If `CsdProcessSection.tsx` exceeds 250 lines, split per **§3** contingency.

6. **Step 5 — Orchestrator:** Add `CustomSoftwarePageClient.tsx` wiring hooks and grouped props per **§4**.

7. **Step 6 — Page entry:** Replace [`page.tsx`](page.tsx) with a thin server component that renders `<CustomSoftwarePageClient />` (and remove `"use client"` from `page.tsx`).

8. **Step 7 — Validation:** Run lint / typecheck / production build for `frontend`; smoke-test hero picker (desktop + narrow), Lenis + process pin, build hover during scroll, tech marquee hover, FAQ toggle.

---

## 7. Approval gate

Implementation (code edits) starts **only after** explicit approval of this refined plan (e.g. “approved — execute” or “go ahead and implement”).
