# TechBinaries — Header & Typography Update

## What changed

1. **New reusable `<SiteHeader />` component** — replaces the inline navbar.
   Features a proper mega-menu on Services, a frosted scroll-compact state,
   Karachi live-clock status badge, primary "Contact us" CTA, and a full
   mobile drawer with accordion submenus. Drop `<SiteHeader />` on any
   page going forward — no duplication.

2. **Global typography system** — Kamerik 105 Cyrillic (primary/display)
   and Plus Jakarta Sans (secondary/body) wired up as CSS variables so the
   stack can be swapped in one place.

3. **`page.tsx` cleaned up** — inline nav removed, inline `time` state
   removed (SiteHeader owns it now), every hardcoded `'Space Grotesk'` /
   `'Inter'` / `'JetBrains Mono'` font-family replaced with the
   `var(--font-display)` / `var(--font-body)` / `var(--font-mono)` tokens.

## File drop-in map

```
app/
  layout.tsx        ← replace
  globals.css       ← replace (new file if you didn't have one)
  page.tsx          ← replace
components/
  SiteHeader.tsx    ← new file
public/
  fonts/            ← create this folder and drop the Kamerik .woff2 files here
```

If your project uses a different alias than `@/components`, adjust the
import at the top of `page.tsx`:

```tsx
import SiteHeader from "@/components/SiteHeader";
```

## Installing Kamerik 105 Cyrillic

Kamerik 105 is a **commercial/licensed typeface** — it's not on Google
Fonts. You need the font files from your brand asset bundle (or purchased
from Latinotype). Drop these files into `public/fonts/`:

```
kamerik-105-cyrillic-light.woff2     (300)
kamerik-105-cyrillic-regular.woff2   (400)
kamerik-105-cyrillic-bold.woff2      (700)
kamerik-105-cyrillic-black.woff2     (800)
```

The `@font-face` declarations in `globals.css` already reference these
paths. `kamerik-105-cyrillic-regular.woff2` is mapped to `font-weight: 400 500`
to cover medium requests. Until the files are in place, the site falls back
to Plus Jakarta Sans / system sans — layout and rhythm stay identical.

If your filenames differ, edit the `src:` URLs in `globals.css` to match.

## Using the font system going forward

**Stop writing font-family strings directly.** Use the tokens:

```tsx
// Display / headings
<h1 style={{ fontFamily: "var(--font-display)" }}>…</h1>
// or
<h1 className="font-display">…</h1>

// Body / paragraphs — this is the default, so usually you don't need to set it
<p>Already using var(--font-body) via the body selector.</p>

// Mono / code
<code className="font-mono">…</code>
```

All three utility classes (`.font-display`, `.font-body`, `.font-mono`)
and the CSS variables live in `globals.css`. If the brand ever changes
typefaces, **edit `globals.css` only** — every component updates.

## Header props / extension

`<SiteHeader />` is self-contained for now. If you want to:

- **change the nav items** → edit the `NAV` array at the top of `SiteHeader.tsx`
- **change the services in the mega-menu** → edit the `SERVICES` array (same file)
- **add a second CTA or a theme toggle** → add it inside the
  `.site-header__right` cluster in the JSX

When you have a layout.tsx that wraps more than the homepage, you can
lift `<SiteHeader />` out of `page.tsx` and into `layout.tsx` above
`{children}` — at which point it's truly global and all sub-pages get it
for free.
