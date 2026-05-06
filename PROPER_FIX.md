# PROPER FIX — Capabilities Section

## What was wrong with the previous fix

The previous fix made `.ab-cap-pin` the trigger and pinned element with `height: 100vh`. That worked for showing the cards correctly, BUT it meant the header **"Four practices. One standard."** was a separate block ABOVE the pin area — so it scrolled off-screen before pinning engaged.

You wanted the header to **stay visible** alongside the cards, the rail, AND the circular progress indicator — all in one viewport.

## The proper fix

Move the header **INSIDE** the pinned wrapper, and restructure the layout so everything fits in `100vh`:

```
┌─────────────────────────────────────────────┐
│  Four practices. One standard.       (HEADER inside pin)
│  We don't try to be everything...
├──────────────┬──────────────────────────────┤
│  INDEX       │                              │
│  01 Product  │      [Card stage]            │
│  02 ...      │                              │
│  ...         │                              │
│  [○ arc]     │                              │
└──────────────┴──────────────────────────────┘
```

---

## STEP 1 — JSX changes

Find this in your JSX:

```jsx
<section ref={capRef} className="ab-cap" aria-labelledby="ab-cap-title">
  {/* Pre-pin header */}
  <div className="ab-cap-header">
    <h2 id="ab-cap-title" className="ab-cap-h2">
      {CAPABILITIES.title}{" "}
      <span className="ab-italic-mute">
        {CAPABILITIES.titleAccent}
      </span>
    </h2>
    <p className="ab-cap-lead">{CAPABILITIES.lead}</p>
  </div>

  {/* The pinned area */}
  <div className="ab-cap-pin">
    <div className="ab-cap-pin-bg" aria-hidden>
      <div className="ab-cap-grain" />
    </div>

    <div className="ab-cap-pin-inner">
      {/* LEFT — Index rail */}
      <aside className="ab-cap-rail" aria-hidden>
```

Replace with this — the header moves INSIDE `.ab-cap-pin`:

```jsx
<section ref={capRef} className="ab-cap" aria-labelledby="ab-cap-title">
  {/* The pinned area — now contains the header too */}
  <div className="ab-cap-pin">
    <div className="ab-cap-pin-bg" aria-hidden>
      <div className="ab-cap-grain" />
    </div>

    {/* Header now lives INSIDE pin so it stays visible while pinned */}
    <div className="ab-cap-header">
      <h2 id="ab-cap-title" className="ab-cap-h2">
        {CAPABILITIES.title}{" "}
        <span className="ab-italic-mute">
          {CAPABILITIES.titleAccent}
        </span>
      </h2>
      <p className="ab-cap-lead">{CAPABILITIES.lead}</p>
    </div>

    <div className="ab-cap-pin-inner">
      {/* LEFT — Index rail */}
      <aside className="ab-cap-rail" aria-hidden>
```

The rest of the JSX stays the same. Just close `</div>` for `.ab-cap-pin` after the scroll hint as before.

---

## STEP 2 — CSS changes

### 2a. Restructure the pin container to a column flexbox

Replace `.ab-cap-pin`:

```css
.ab-cap-pin {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background: #f5f5f4;
  display: flex;
  flex-direction: column;
}
```

### 2b. Header sizing — make it compact so cards fit below

Replace `.ab-cap-header`:

```css
.ab-cap-header {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  max-width: 1320px;
  margin: 0 auto;
  width: 100%;
  padding: clamp(60px, 9vh, 96px) clamp(24px, 4vw, 64px) clamp(20px, 3vh, 32px);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

Note the top padding accounts for your fixed site header. Adjust the first value if your nav is taller.

### 2c. Pin inner — fill remaining space

Replace `.ab-cap-pin-inner`:

```css
.ab-cap-pin-inner {
  position: relative;
  z-index: 2;
  flex: 1;
  min-height: 0;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  padding: clamp(8px, 1.5vh, 20px) clamp(18px, 3vw, 40px) clamp(56px, 8vh, 80px);
  display: grid;
  grid-template-columns: minmax(170px, 220px) 1fr;
  gap: clamp(20px, 2.4vw, 36px);
  align-items: stretch;
  transform: none;
}
```

(Bottom padding leaves room for the scroll hint pill.)

### 2d. Stage — let it expand to fill

Replace `.ab-cap-stage`:

```css
.ab-cap-stage {
  position: relative;
  height: 100%;
  min-height: 280px;
  padding: 0;
  perspective: 2000px;
}
```

(Removed `max-height: 520px` cap — let the stage size itself based on the pin container. Removed inner padding too, the cards already have their own padding.)

### 2e. Header h2 — shrink slightly so it doesn't dominate

Replace `.ab-cap-h2`:

```css
.ab-cap-h2 {
  font-family: var(--font-display);
  font-size: clamp(32px, 4.6vw, 64px);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1;
  margin: 0 0 16px;
  max-width: none;
  white-space: nowrap;
}
```

Replace `.ab-cap-lead`:

```css
.ab-cap-lead {
  font-size: clamp(14px, 1vw, 16px);
  color: rgba(10,10,10,0.62);
  line-height: 1.6;
  margin: 0;
  max-width: 60ch;
}
```

---

## STEP 3 — JS adjustment (one line)

In your capabilities `useEffect`, the header reveal animation uses `start: "top 80%"`, which now triggers as the pin engages. To make the header animate in BEFORE the pin engages (so the user sees it animate, then pin locks), change the trigger:

Find:
```js
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
```

Replace with:
```js
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
      trigger: pinEl,
      start: "top 70%",
      once: true,
    },
  }
);
```

This triggers the header reveal slightly before the pin engages, so by the time pinning locks, the header is already visible.

---

## STEP 4 — Mobile media query

Find the `@media (max-width: 768px)` block and remove these now-redundant lines (the header lives in pin now, not as a separate block):

```css
.ab-cap-header { padding: clamp(72px, 12vw, 110px) 16px clamp(40px, 7vw, 64px); }
```

Replace with:

```css
.ab-cap-header { padding: 0 16px; }
```

(Mobile uses `.ab-cap-mobile` fallback anyway, and `.ab-cap-pin` is `display: none` on mobile, so this barely matters — but keeps things clean.)

---

## Why this works

- `.ab-cap-pin` is now a 100vh flex column: `[header (auto)] + [pin-inner (flex: 1)]`.
- Pin engages exactly when `.ab-cap-pin` top hits viewport top — at that moment the header is at the top of the viewport, the rail+arc on the left, the cards on the right. **Everything visible, nothing scrolled off.**
- ScrollTrigger pin keeps the entire section locked while the user scrolls, advancing through the 4 cards via the scrubbed timeline.
- Header reveal triggers slightly earlier (at `top 70%`) so it's visible when the pin engages, not animating during the pin lock.
