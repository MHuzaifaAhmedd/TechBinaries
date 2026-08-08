"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export type BlogTocItem = { id: string; label: string };

type BlogDetailTocProps = {
  items: BlogTocItem[];
};

type MarkerPosition = {
  top: number;
  height: number;
};

function getScrollOffset() {
  const header = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  const headerPx = Number.parseFloat(header) || 84;
  // Active when a section's top has crossed ~1/3 down the viewport (below sticky header).
  return Math.max(headerPx + 24, window.innerHeight * 0.28);
}

function resolveActiveId(items: BlogTocItem[]): string {
  if (items.length === 0) return "";

  const scrollBottom = window.scrollY + window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  // Last section once the page bottom (or footer) is in view.
  if (scrollBottom >= docHeight - 120) {
    return items[items.length - 1].id;
  }

  const offset = getScrollOffset();
  let current = items[0].id;

  for (const item of items) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= offset) {
      current = item.id;
    } else {
      break;
    }
  }

  return current;
}

export default function BlogDetailToc({ items }: BlogDetailTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [marker, setMarker] = useState<MarkerPosition>({ top: 0, height: 0 });
  const listRef = useRef<HTMLUListElement>(null);
  const frameRef = useRef<number | null>(null);
  const itemsKey = items.map((item) => item.id).join("|");

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId),
  );

  const updateMarker = useCallback(() => {
    const list = listRef.current;
    if (!list || !activeId) return;

    const activeLink = list.querySelector<HTMLElement>(`a[href="#${CSS.escape(activeId)}"]`);
    if (!activeLink) return;

    const listRect = list.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    setMarker({
      top: linkRect.top - listRect.top,
      height: linkRect.height,
    });
  }, [activeId]);

  const syncActive = useCallback(() => {
    const next = resolveActiveId(items);
    if (next) {
      setActiveId((prev) => (prev === next ? prev : next));
    }
  }, [items]);

  useLayoutEffect(() => {
    updateMarker();
  }, [updateMarker, itemsKey]);

  useEffect(() => {
    const schedule = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        syncActive();
      });
    };

    syncActive();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [syncActive]);

  useEffect(() => {
    const onResize = () => updateMarker();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateMarker]);

  const progressPercent =
    items.length <= 1 ? 100 : ((activeIndex + 1) / items.length) * 100;

  return (
    <nav className="blog-detail__toc" aria-label="Table of contents">
      <div className="blog-detail__toc-head">
        <p className="blog-detail__toc-title">On this page</p>
        <span className="blog-detail__toc-step" aria-live="polite">
          {activeIndex + 1} / {items.length}
        </span>
      </div>

      <div className="blog-detail__toc-rail-wrap">
        <div className="blog-detail__toc-rail" aria-hidden>
          <div
            className="blog-detail__toc-rail-progress"
            style={{ height: `${progressPercent}%` }}
          />
          <span
            className="blog-detail__toc-rail-marker"
            style={{
              transform: `translateY(${marker.top}px)`,
              height: `${marker.height}px`,
            }}
          />
        </div>

        <ul ref={listRef} className="blog-detail__toc-list">
          {items.map((item, index) => {
            const state =
              item.id === activeId ? "active" : index < activeIndex ? "past" : "upcoming";

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`blog-detail__toc-link blog-detail__toc-link--${state}`}
                  aria-current={item.id === activeId ? "location" : undefined}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
