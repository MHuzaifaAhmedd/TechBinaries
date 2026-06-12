"use client";

import { useCallback, useEffect, useState } from "react";
import { TESTIMONIALS } from "@/data/home";

// ── TestimonialsSection ───────────────────────────────────────────────────────
// 3D coverflow carousel — active card comes forward in Z-space; side cards sit
// behind with rotateY depth. Glassmorphism styling, neutral palette.
// ─────────────────────────────────────────────────────────────────────────────

type ArrowButtonProps = {
  label: string;
  onClick: () => void;
  direction: "prev" | "next";
  disabled?: boolean;
};

function ArrowBtn({ label, onClick, direction, disabled }: ArrowButtonProps) {
  return (
    <button
      type="button"
      className="t-nav-btn"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      data-direction={direction}
      suppressHydrationWarning
    >
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <path
          d={direction === "prev" ? "M9 2.5L4.5 7 9 11.5" : "M5 2.5L9.5 7 5 11.5"}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function StarRating() {
  return (
    <div className="t-card__stars" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path
            d="M7 1.2l1.54 3.12 3.44.5-2.49 2.43.59 3.43L7 9.38 3.92 10.68l.59-3.43L2.02 4.82l3.44-.5L7 1.2z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
}

function parseTitle(title: string) {
  const comma = title.indexOf(",");
  if (comma === -1) return { role: title, company: "" };
  return {
    role: title.slice(0, comma).trim(),
    company: title.slice(comma + 1).trim(),
  };
}

type TestimonialCardProps = {
  quote: string;
  name: string;
  title: string;
  initials: string;
};

function TestimonialCard({ quote, name, title, initials }: TestimonialCardProps) {
  const { role, company } = parseTitle(title);

  return (
    <article className="t-card">
      <div className="t-card__shine" aria-hidden />
      <span className="t-card__quote-mark font-display" aria-hidden>
        &ldquo;
      </span>

      <div className="t-card__top">
        <StarRating />
        <span className="t-card__verified">
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
            <path
              d="M5 .5l1.1 2.23 2.46.36-1.78 1.73.42 2.45L5 6.12 2.8 7.27l.42-2.45L1.44 3.09l2.46-.36L5 .5z"
              fill="currentColor"
            />
          </svg>
          Verified client
        </span>
      </div>

      <blockquote className="t-card__quote font-display">&ldquo;{quote}&rdquo;</blockquote>

      <footer className="t-card__author">
        <div className="t-card__avatar font-display" aria-hidden>
          {initials}
        </div>
        <div className="t-card__author-text">
          <div className="t-card__name">{name}</div>
          <div className="t-card__meta">
            <span>{role}</span>
            {company ? <span className="t-card__company">{company}</span> : null}
          </div>
        </div>
      </footer>
    </article>
  );
}

function getWrappedOffset(index: number, active: number, total: number) {
  let diff = index - active;
  const half = Math.floor(total / 2);
  while (diff > half) diff -= total;
  while (diff < -half) diff += total;
  return diff;
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const total = TESTIMONIALS.length;
  const canSlide = total > 1;

  const slide = useCallback(
    (direction: "next" | "prev") => {
      if (!canSlide || isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) =>
        direction === "next" ? (prev + 1) % total : (prev - 1 + total) % total
      );
    },
    [canSlide, isAnimating, total]
  );

  const goTo = useCallback(
    (index: number) => {
      if (!canSlide || isAnimating || index === activeIndex) return;
      setIsAnimating(true);
      setActiveIndex(index);
    },
    [canSlide, isAnimating, activeIndex]
  );

  useEffect(() => {
    if (!isAnimating) return;
    const id = window.setTimeout(() => setIsAnimating(false), 760);
    return () => window.clearTimeout(id);
  }, [isAnimating, activeIndex]);

  useEffect(() => {
    if (!canSlide || isPaused || isAnimating) return;
    const id = setInterval(() => slide("next"), 4500);
    return () => clearInterval(id);
  }, [canSlide, isPaused, isAnimating, slide, activeIndex]);

  return (
    <section
      id="testimonials"
      className="t-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsPaused(false);
      }}
    >
      <div className="t-section__bg" aria-hidden />
      <div className="t-section__inner">
        <header className="t-header">
          <p className="t-eyebrow">Client voices</p>
          <h3 className="t-title font-display">
            Stories Of <span className="t-title-muted">Measurable Growth</span>
          </h3>
          <p className="t-lead">
            Real feedback from forward-thinking companies relying on our software development
            services to scale their technical capabilities.
          </p>
        </header>

        <div className="t-carousel-3d">
          <ArrowBtn
            label="Previous testimonial"
            onClick={() => slide("prev")}
            direction="prev"
            disabled={!canSlide || isAnimating}
          />

          <div className="t-stage" aria-live="polite">
            <div className="t-ring">
              {TESTIMONIALS.map((t, i) => {
                const offset = getWrappedOffset(i, activeIndex, total);
                const isActive = offset === 0;
                const isHidden = isMobile && !isActive;

                return (
                  <div
                    key={t.initials}
                    className="t-slot"
                    data-offset={offset}
                    data-active={isActive ? "true" : "false"}
                    data-settled={isActive && !isAnimating ? "true" : "false"}
                    data-hidden={isHidden ? "true" : "false"}
                    aria-hidden={!isActive}
                  >
                    <div className="t-card-face">
                      <TestimonialCard
                        quote={t.quote}
                        name={t.name}
                        title={t.title}
                        initials={t.initials}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <ArrowBtn
            label="Next testimonial"
            onClick={() => slide("next")}
            direction="next"
            disabled={!canSlide || isAnimating}
          />
        </div>

        {canSlide ? (
          <div className="t-dots" role="tablist" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.initials}
                type="button"
                role="tab"
                className="t-dots__btn"
                aria-label={`Go to testimonial from ${t.name}`}
                aria-selected={i === activeIndex}
                data-active={i === activeIndex ? "true" : "false"}
                onClick={() => goTo(i)}
                disabled={isAnimating}
                suppressHydrationWarning
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
