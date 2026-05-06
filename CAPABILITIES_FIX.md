# Fix for Capabilities Section Pin/Scroll Issue

## Root Cause

Three problems were combining to cause the broken behavior:

1. **Pin trigger was the wrong element** — `.ab-cap` includes the pre-pin header, so by the time `start: "top top"` fired, the stage area (cards) was already pushed below the fold. With `scrub`, GSAP "catches up" the timeline instantly to whatever progress matches the current scroll, jumping the cards forward.

2. **Flex layout on the section** — `.ab-cap` is `display: flex; flex-direction: column` and `.ab-cap-pin` has `flex: 1; min-height: 0`. ScrollTrigger needs a stable, predictable height on the pinned element. Flex auto-sizing made the pin start position unstable.

3. **No fixed pinned-element height** — `.ab-cap-pin` had no explicit height, so `pinSpacing: true` couldn't reliably calculate the spacer.

## Fix Summary

- Make the pinned wrapper (`.ab-cap-pin`) the **trigger itself** with a fixed `height: 100vh`.
- Remove flex from `.ab-cap` (block layout instead).
- Pin starts when `.ab-cap-pin` top hits viewport top — guaranteed correct because the wrapper *is* one viewport tall.
- Use `pin: true` on the same element used as `trigger`.

---

## Changes Required

### 1. JavaScript — Replace the entire capabilities `useEffect` (the one with the rebuilt comment)

Find this block:

```js
// ═════════════════════════════════════════════════════════════════════════
// ── SECTION 3 — CAPABILITIES (REBUILT)
//   Concept: pinned stacking-card deck. ...
// ═════════════════════════════════════════════════════════════════════════
useEffect(() => {
  if (isMobile) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const ctx = gsap.context(() => {
    const section = capRef.current;
    if (!section) return;
    ...
```

Replace the **entire** useEffect with this:

```js
useEffect(() => {
  if (isMobile) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const ctx = gsap.context(() => {
    const section = capRef.current;
    if (!section) return;

    // Use the pinned wrapper itself as trigger — guarantees the cards
    // are fully in view when pin engages.
    const pinEl = section.querySelector<HTMLElement>(".ab-cap-pin");
    if (!pinEl) return;

    const cards = gsap.utils.toArray<HTMLElement>(".ab-cap-card");
    const total = cards.length;
    if (!total) return;
    const segments = total - 1;

    // Initial state — first card visible, rest below
    cards.forEach((card, i) => {
      if (i === 0) {
        gsap.set(card, {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          zIndex: 10,
        });
      } else {
        gsap.set(card, {
          yPercent: 100,
          scale: 1,
          opacity: 0,
          filter: "blur(0px)",
          zIndex: 10 + i,
        });
      }
    });

    // Header reveal — pre-pin, completely separate from the pinned timeline
    gsap.fromTo(
      ".ab-cap-header > *",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".ab-cap-header",
          start: "top 80%",
          once: true,
        },
      }
    );

    // Reveal initial card's inner elements when pin area first enters
    const firstInner = cards[0].querySelectorAll<HTMLElement>(
      ".ab-cap-card-tag, .ab-cap-card-deliv, .ab-cap-card-stat-block, .ab-cap-card-rule"
    );
    gsap.fromTo(
      firstInner,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "expo.out",
        scrollTrigger: {
          trigger: pinEl,
          start: "top 60%",
          once: true,
        },
      }
    );

    // Distance to scroll while pinned — one viewport per transition + a hold buffer
    const holdRatio = 0.35;
    const pinDistancePerSegment = () => window.innerHeight * 0.9;

    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: pinEl,
        start: "top top",
        end: () => `+=${pinDistancePerSegment() * (segments + 1)}`,
        scrub: 1,
        pin: pinEl,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const raw = self.progress * segments;
          const idx = Math.min(total - 1, Math.round(raw));
          setActiveCapIndex(idx);
        },
      },
    });

    // Build segment transitions
    for (let i = 0; i < segments; i++) {
      const current = cards[i];
      const next = cards[i + 1];
      const segStart = i;
      const transStart = segStart + holdRatio;
      const transEnd = segStart + 1;

      masterTL.to(
        current,
        {
          yPercent: -8,
          scale: 0.92,
          opacity: 0,
          filter: "blur(6px)",
          ease: "power2.inOut",
        },
        transStart
      );

      masterTL.fromTo(
        next,
        { yPercent: 100, scale: 1, opacity: 0, filter: "blur(4px)" },
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power2.inOut",
        },
        transStart
      );

      const innerEls = next.querySelectorAll<HTMLElement>(
        ".ab-cap-card-tag, .ab-cap-card-deliv, .ab-cap-card-stat-block, .ab-cap-card-rule"
      );
      masterTL.fromTo(
        innerEls,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: "power3.out",
        },
        transEnd - 0.3
      );
    }

    // Arc fill — separate scrub on the same range
    gsap.to(".ab-cap-arc-fill", {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: pinEl,
        start: "top top",
        end: () => `+=${pinDistancePerSegment() * (segments + 1)}`,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
  }, capRef);

  return () => ctx.revert();
}, [isMobile]);
```

### 2. CSS Changes

Find `.ab-cap` and replace its rule:

```css
.ab-cap {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f4;
  border-top: 1px solid rgba(10,10,10,0.06);
  color: #0a0a0a;
}
```

Replace with:

```css
.ab-cap {
  position: relative;
  background: #f5f5f4;
  border-top: 1px solid rgba(10,10,10,0.06);
  color: #0a0a0a;
}
```

Find `.ab-cap-pin`:

```css
.ab-cap-pin {
  position: relative;
  margin-top: 0;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: #f5f5f4;
}
```

Replace with:

```css
.ab-cap-pin {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background: #f5f5f4;
}
```

Find `.ab-cap-pin-inner`:

```css
.ab-cap-pin-inner {
  position: relative;
  z-index: 2;
  height: 100%;
  ...
}
```

Keep it as-is — it already uses `height: 100%`, which now resolves correctly because parent has fixed `100vh`.

### 3. Reduced motion CSS — also update

Find the reduced-motion block at the bottom and update the `.ab-cap-pin` line:

```css
.ab-cap-card { position: relative !important; opacity: 1 !important; transform: none !important; filter: none !important; margin-bottom: 16px; }
.ab-cap-pin { height: auto !important; }
```

That part is already correct — keep it.
