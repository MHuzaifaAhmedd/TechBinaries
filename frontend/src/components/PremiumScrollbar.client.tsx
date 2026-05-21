"use client";

import {
  getScrollY,
  scrollWindowTo,
  setScrollbarDragging,
} from "@/lib/scroll-control";
import { useCallback, useEffect, useRef, useState } from "react";

type ThumbState = {
  height: number;
  top: number;
  visible: boolean;
  scrollPercent: number;
};

type ScrollMetrics = {
  maxScroll: number;
  thumbHeight: number;
  trackHeight: number;
};

const MIN_THUMB_PX = 48;
const THUMB_WIDTH_PX = 6;
const EDGE_INSET_PX = 5;
const HIT_WIDTH_PX = 14;

function getScrollMetrics(): ScrollMetrics | null {
  const doc = document.documentElement;
  const scrollHeight = doc.scrollHeight;
  const clientHeight = doc.clientHeight;
  const maxScroll = scrollHeight - clientHeight;

  if (maxScroll <= 1) return null;

  const thumbHeight = Math.max(
    MIN_THUMB_PX,
    (clientHeight / scrollHeight) * clientHeight,
  );
  const trackHeight = clientHeight - thumbHeight;

  return { maxScroll, thumbHeight, trackHeight };
}

export function PremiumScrollbar() {
  const [thumb, setThumb] = useState<ThumbState>({
    height: 0,
    top: 0,
    visible: false,
    scrollPercent: 0,
  });
  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const draggingRef = useRef(false);
  const dragRef = useRef({ startY: 0, startScrollY: 0 });

  const markActive = useCallback(() => {
    setActive(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (!draggingRef.current) {
      hideTimerRef.current = setTimeout(() => setActive(false), 900);
    }
  }, []);

  const updateThumb = useCallback(() => {
    const metrics = getScrollMetrics();
    if (!metrics) {
      setThumb({ height: 0, top: 0, visible: false, scrollPercent: 0 });
      return;
    }

    const { maxScroll, thumbHeight, trackHeight } = metrics;
    const scrollY = getScrollY();
    const thumbTop = (scrollY / maxScroll) * trackHeight;
    const scrollPercent =
      maxScroll > 0 ? Math.round((scrollY / maxScroll) * 100) : 0;

    setThumb({ height: thumbHeight, top: thumbTop, visible: true, scrollPercent });
  }, []);

  const scrollFromClientY = useCallback((clientY: number) => {
    const metrics = getScrollMetrics();
    if (!metrics) return;

    const { maxScroll, thumbHeight, trackHeight } = metrics;
    const thumbTop = Math.min(
      Math.max(clientY - thumbHeight / 2, 0),
      trackHeight,
    );
    const scrollY = (thumbTop / trackHeight) * maxScroll;
    scrollWindowTo(scrollY);
  }, []);

  useEffect(() => {
    let raf = 0;
    let resizeRaf = 0;
    let lastScrollY = -1;

    const scheduleUpdateThumb = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        updateThumb();
      });
    };

    const onResize = () => {
      markActive();
      scheduleUpdateThumb();
    };

    const tick = () => {
      const scrollY = getScrollY();
      if (scrollY !== lastScrollY) {
        lastScrollY = scrollY;
        markActive();
        updateThumb();
      }
      raf = requestAnimationFrame(tick);
    };

    scheduleUpdateThumb();
    window.addEventListener("resize", onResize);

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(document.documentElement);
    if (document.body) resizeObserver.observe(document.body);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [markActive, updateThumb]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!draggingRef.current) return;

      const metrics = getScrollMetrics();
      if (!metrics) return;

      const { maxScroll, trackHeight } = metrics;
      const deltaY = event.clientY - dragRef.current.startY;
      const scrollDelta = (deltaY / trackHeight) * maxScroll;
      scrollWindowTo(dragRef.current.startScrollY + scrollDelta);
    };

    const endDrag = () => {
      if (!draggingRef.current) return;

      draggingRef.current = false;
      setDragging(false);
      setScrollbarDragging(false);
      document.body.classList.remove("premium-scrollbar-dragging");

      hideTimerRef.current = setTimeout(() => setActive(false), 900);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      document.body.classList.remove("premium-scrollbar-dragging");
    };
  }, []);

  const onThumbPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    event.preventDefault();
    event.stopPropagation();
    markActive();
    draggingRef.current = true;
    setDragging(true);
    dragRef.current = {
      startY: event.clientY,
      startScrollY: getScrollY(),
    };

    document.body.classList.add("premium-scrollbar-dragging");
    setScrollbarDragging(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onRailPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || event.target !== event.currentTarget) return;

    event.preventDefault();
    markActive();
    scrollFromClientY(event.clientY);
  };

  if (!thumb.visible) return null;

  return (
    <div
      className="premium-scrollbar-rail"
      onPointerDown={onRailPointerDown}
    >
      <div
        role="slider"
        aria-label="Page scroll position"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={thumb.scrollPercent}
        tabIndex={0}
        className={[
          "premium-scrollbar-thumb",
          active ? "is-active" : "",
          dragging ? "is-dragging" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          height: thumb.height,
          top: thumb.top,
          width: THUMB_WIDTH_PX,
        }}
        onPointerDown={onThumbPointerDown}
      />
    </div>
  );
}
