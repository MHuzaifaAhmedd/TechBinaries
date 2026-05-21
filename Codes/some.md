"use client";

/* ─────────────────────────────────────────────────────────────────────────
   CaseDetailExperience
   ────────────────────
   The full scroll-driven case study story. Eight sections:

     1. Hero            — clip-path line reveal + cover desaturation
     2. Overview        — split editorial, drawn divider
     3. Metrics         — counted KPIs with progress bars
     4. Process         — horizontally pinned scroll
     5. Showcase        — alternating visual gallery
     6. Testimonial     — word-scrub quote
     7. Results         — SVG progress rings + before/after slider
     8. Next case       — hover-expand transition

   Everything lives in one gsap.context for clean unmount. matchMedia
   guards horizontal-scroll + heavy parallax below the tablet breakpoint.
   ──────────────────────────────────────────────────────────────────────── */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useLenis } from "@/hooks/useLenis";
import type { CaseStudy } from "@/lib/case-studies";

interface Props {
  c: CaseStudy;
  next: CaseStudy;
}

export default function CaseDetailExperience({ c, next }: Props) {
  useLenis();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);

  // Refs — grouped by section for clarity
  const heroRef = useRef<HTMLElement>(null);
  const heroCoverRef = useRef<HTMLDivElement>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement>(null);
  const heroMetaRef = useRef<HTMLDivElement>(null);

  const overviewLeftRef = useRef<HTMLDivElement>(null);
  const overviewRightRef = useRef<HTMLDivElement>(null);
  const overviewDividerRef = useRef<HTMLSpanElement>(null);

  const metricsSectionRef = useRef<HTMLElement>(null);

  const processSectionRef = useRef<HTMLDivElement>(null);
  const processTrackRef = useRef<HTMLDivElement>(null);
  const processProgressRef = useRef<HTMLSpanElement>(null);

  const testimonialQuoteRef = useRef<HTMLParagraphElement>(null);
  const testimonialMarkRef = useRef<HTMLSpanElement>(null);
  const testimonialAttrRef = useRef<HTMLDivElement>(null);

  const resultsRef = useRef<HTMLElement>(null);

  const nextCardRef = useRef<HTMLAnchorElement>(null);

  // Before/after slider state
  const [sliderPos, setSliderPos] = useState(50);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ═════ HERO ═════
      if (heroHeadlineRef.current) {
        const split = new SplitText(heroHeadlineRef.current, { type: "words,lines" });
        gsap.fromTo(
          split.lines,
          { clipPath: "inset(0 0 100% 0)", y: 20 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            duration: 1.0,
            stagger: 0.14,
            ease: "power4.out",
            delay: 0.15,
          }
        );
      }
      gsap.from(heroMetaRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.9,
      });

      // Cover parallax + desaturation on scroll
      if (heroCoverRef.current && heroRef.current) {
        gsap.to(heroCoverRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.fromTo(
          heroCoverRef.current,
          { filter: "saturate(1) brightness(1)" },
          {
            filter: "saturate(0.25) brightness(0.85)",
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // ═════ OVERVIEW ═════
      gsap.from(overviewLeftRef.current, {
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: overviewLeftRef.current,
          start: "top 75%",
        },
      });
      gsap.from(overviewRightRef.current, {
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: overviewRightRef.current,
          start: "top 75%",
        },
      });
      if (overviewDividerRef.current) {
        gsap.from(overviewDividerRef.current, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: overviewDividerRef.current,
            start: "top 80%",
          },
        });
      }

      // ═════ METRICS ═════
      gsap.utils.toArray<HTMLElement>(".metric-num").forEach((numEl, i) => {
        const target = parseFloat(numEl.dataset.value || "0");
        const decimals = parseInt(numEl.dataset.decimals || "0", 10);
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 2.2,
          ease: "power2.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: numEl,
            start: "top 82%",
          },
          onUpdate: () => {
            const v = decimals > 0
              ? counter.v.toFixed(decimals)
              : Math.ceil(counter.v).toLocaleString();
            numEl.textContent = v;
          },
        });
      });
      gsap.from(".metric-bar", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: metricsSectionRef.current,
          start: "top 75%",
        },
      });

      // ═════ PROCESS (horizontal scroll, desktop only) ═════
      mm.add("(min-width: 768px)", () => {
        if (!processSectionRef.current || !processTrackRef.current) return;
        const section = processSectionRef.current;
        const track = processTrackRef.current;
        const getDistance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            end: () => "+=" + getDistance(),
            invalidateOnRefresh: true,
            onUpdate: (self: { progress: number }) => {
              if (processProgressRef.current) {
                processProgressRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });
      });

      // ═════ SHOWCASE ═════
      gsap.utils.toArray<HTMLElement>(".visual-fullbleed-inner").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.12 },
          {
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".visual-split-image").forEach((el) => {
        gsap.to(el, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      gsap.utils.toArray<HTMLElement>(".visual-highlight").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 1.0,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".visual-mockup").forEach((el) => {
        gsap.to(el, {
          y: -14,
          duration: 2.6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });
      gsap.utils.toArray<HTMLElement>(".visual-video-overlay").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.6 },
          {
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // ═════ TESTIMONIAL ═════
      if (testimonialQuoteRef.current) {
        const split = new SplitText(testimonialQuoteRef.current, { type: "words" });
        split.words.forEach((word) => {
          gsap.fromTo(
            word,
            { opacity: 0.06 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: word,
                start: "top 72%",
                end: "top 32%",
                scrub: true,
              },
            }
          );
        });
      }
      if (testimonialMarkRef.current) {
        gsap.fromTo(
          testimonialMarkRef.current,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: testimonialMarkRef.current,
              start: "top 80%",
            },
          }
        );
      }
      if (testimonialAttrRef.current) {
        gsap.fromTo(
          testimonialAttrRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: testimonialAttrRef.current,
              start: "top 78%",
            },
          }
        );
      }

      // ═════ RESULTS — progress rings ═════
      gsap.utils.toArray<SVGCircleElement>(".result-ring").forEach((ring, i) => {
        const dash = parseFloat(ring.dataset.dash || "0");
        const len = parseFloat(ring.dataset.len || "1");
        gsap.fromTo(
          ring,
          { strokeDashoffset: len },
          {
            strokeDashoffset: len - dash,
            duration: 2,
            ease: "power3.out",
            delay: i * 0.18,
            scrollTrigger: {
              trigger: ring,
              start: "top 80%",
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [c.slug]);

  // ═════ NEXT CASE — hover expansion ═════
  const handleNextEnter = () => {
    // Subtle pre-expand on hover; full expand happens on click.
    if (!nextCardRef.current) return;
    gsap.to(nextCardRef.current.querySelector(".next-card__cover"), {
      scale: 1.04,
      duration: 0.7,
      ease: "power3.out",
    });
  };
  const handleNextLeave = () => {
    if (!nextCardRef.current) return;
    gsap.to(nextCardRef.current.querySelector(".next-card__cover"), {
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
    });
  };
  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!nextCardRef.current) {
      router.push(`/case-studies/${next.slug}`);
      return;
    }
    const card = nextCardRef.current;
    const rect = card.getBoundingClientRect();
    // Fix the card in its current viewport position, then expand to fill.
    gsap.set(card, {
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      margin: 0,
      zIndex: 100,
    });
    gsap.to(card, {
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      duration: 0.85,
      ease: "expo.inOut",
      onComplete: () => router.push(`/case-studies/${next.slug}`),
    });
  };

  return (
    <div ref={rootRef} className="cd-root">
      {/* ════════ SECTION 1 · HERO ════════ */}
      <section ref={heroRef} className="cd-hero">
        <div
          ref={heroCoverRef}
          className="cd-hero__cover"
          style={{
            background: `linear-gradient(135deg, #0a0a0a 0%, #1c1c1c 50%, #2a2a2a 100%)`,
          }}
        >
          <span className="cd-hero__cover-grid" aria-hidden />
        </div>
        <div className="cd-hero__inner">
          <p className="cd-hero__eyebrow">{c.hero.eyebrow}</p>
          <h1 ref={heroHeadlineRef} className="cd-hero__headline font-display">
            {c.hero.headline}
          </h1>
          <div ref={heroMetaRef} className="cd-hero__meta">
            <span><strong>Client</strong>{c.client}</span>
            <span><strong>Industry</strong>{c.category}</span>
            <span><strong>Year</strong>{c.year}</span>
            <span><strong>Services</strong>{c.services.join(", ")}</span>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 2 · OVERVIEW ════════ */}
      <section className="cd-overview">
        <div className="cd-overview__inner">
          <div ref={overviewLeftRef} className="cd-overview__left">
            <p className="cd-overview__label">The challenge</p>
            <p className="cd-overview__challenge font-display">{c.overview.challenge}</p>
          </div>
          <span ref={overviewDividerRef} className="cd-overview__divider" aria-hidden />
          <div ref={overviewRightRef} className="cd-overview__right">
            <p className="cd-overview__label">The approach</p>
            <p className="cd-overview__approach">{c.overview.approach}</p>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 3 · METRICS ════════ */}
      <section ref={metricsSectionRef} className="cd-metrics">
        <div className="cd-metrics__inner">
          <p className="cd-metrics__eyebrow">By the numbers</p>
          <div className="cd-metrics__grid">
            {c.metrics.map((m, i) => {
              const decimals = m.value % 1 !== 0 ? 2 : 0;
              return (
                <div key={i} className="cd-metrics__cell">
                  <div className="cd-metrics__value font-display">
                    {m.prefix && <span className="cd-metrics__prefix">{m.prefix}</span>}
                    <span
                      className="metric-num"
                      data-value={m.value}
                      data-decimals={decimals}
                    >
                      0
                    </span>
                    {m.suffix && <span className="cd-metrics__suffix">{m.suffix}</span>}
                  </div>
                  <p className="cd-metrics__label">{m.label}</p>
                  <div className="cd-metrics__barwrap">
                    <span className="metric-bar cd-metrics__bar" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ SECTION 4 · PROCESS (horizontal) ════════ */}
      <section className="cd-process">
        <div className="cd-process__header">
          <p className="cd-process__eyebrow">The process</p>
          <h2 className="cd-process__title font-display">
            From discovery to launch.
          </h2>
        </div>
        <div ref={processSectionRef} className="cd-process__pin">
          <div ref={processTrackRef} className="cd-process__track">
            {c.process.map((ch) => (
              <article key={ch.number} className="cd-process__panel">
                <div className="cd-process__panel-visual" aria-hidden>
                  <span className="cd-process__panel-num font-display">{ch.number}</span>
                </div>
                <div className="cd-process__panel-body">
                  <h3 className="cd-process__panel-title font-display">{ch.title}</h3>
                  <ul className="cd-process__panel-list">
                    {ch.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className="cd-process__progress" aria-hidden>
            <span ref={processProgressRef} className="cd-process__progress-fill" />
          </div>
        </div>
      </section>

      {/* ════════ SECTION 5 · SHOWCASE ════════ */}
      <section className="cd-showcase">
        {c.visuals.map((v, i) => {
          if (v.kind === "fullbleed") {
            return (
              <figure key={i} className="cd-showcase__fullbleed">
                <div
                  className="visual-fullbleed-inner cd-showcase__cover"
                  style={{ background: `linear-gradient(${130 + i * 20}deg, #0a0a0a, #2a2a2a)` }}
                >
                  <span className="cd-showcase__grid" aria-hidden />
                </div>
                <figcaption className="cd-showcase__caption">{v.caption}</figcaption>
              </figure>
            );
          }
          if (v.kind === "split") {
            const parts = v.highlight && v.caption
              ? v.caption.split(v.highlight)
              : [v.caption ?? "", ""];
            return (
              <div key={i} className="cd-showcase__split">
                <div className="cd-showcase__split-media">
                  <div
                    className="visual-split-image"
                    style={{
                      background: `linear-gradient(${140 + i * 12}deg, #131313, #2a2a2a)`,
                    }}
                  />
                </div>
                <figcaption className="cd-showcase__split-caption font-display">
                  {parts[0]}
                  {v.highlight && (
                    <span className="cd-showcase__split-em">
                      {v.highlight}
                      <span className="visual-highlight cd-showcase__split-under" />
                    </span>
                  )}
                  {parts[1]}
                </figcaption>
              </div>
            );
          }
          if (v.kind === "mockup") {
            return (
              <div key={i} className="cd-showcase__mockup-wrap">
                <div className="visual-mockup cd-showcase__mockup">
                  <div className="cd-showcase__mockup-browser">
                    <div className="cd-showcase__mockup-bar">
                      <span /><span /><span />
                    </div>
                    <div className="cd-showcase__mockup-content" />
                  </div>
                  <div className="cd-showcase__mockup-phone">
                    <div className="cd-showcase__mockup-screen" />
                  </div>
                </div>
                <p className="cd-showcase__caption cd-showcase__caption--center">{v.caption}</p>
              </div>
            );
          }
          // video
          return (
            <figure key={i} className="cd-showcase__video">
              <div
                className="cd-showcase__video-bg"
                style={{ background: `linear-gradient(120deg, #050505, #1f1f1f)` }}
              >
                <span className="visual-video-overlay cd-showcase__video-overlay" />
                <span className="cd-showcase__video-play" aria-hidden>▶</span>
              </div>
              <figcaption className="cd-showcase__caption">{v.caption}</figcaption>
            </figure>
          );
        })}
      </section>

      {/* ════════ SECTION 6 · TESTIMONIAL ════════ */}
      <section className="cd-testimonial">
        <span ref={testimonialMarkRef} className="cd-testimonial__mark font-display" aria-hidden>
          “
        </span>
        <p ref={testimonialQuoteRef} className="cd-testimonial__quote font-display">
          {c.testimonial.quote}
        </p>
        <div ref={testimonialAttrRef} className="cd-testimonial__attr">
          <div className="cd-testimonial__avatar font-display" aria-hidden>
            {c.testimonial.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="cd-testimonial__attr-text">
            <strong>{c.testimonial.name}</strong>
            <span>{c.testimonial.title}</span>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 7 · RESULTS ════════ */}
      <section ref={resultsRef} className="cd-results">
        <div className="cd-results__inner">
          <div className="cd-results__rings">
            {c.results.rings.map((r, i) => {
              const radius = 64;
              const len = 2 * Math.PI * radius;
              // For decorative rings we don't need to map exact %s — just scale.
              const fraction = Math.min(1, Math.abs(r.value) / 100 || 0.78);
              const dash = len * fraction;
              return (
                <div key={i} className="cd-results__ring-wrap">
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle
                      cx="80" cy="80" r={radius}
                      fill="none"
                      stroke="rgba(10,10,10,0.08)"
                      strokeWidth="2"
                    />
                    <circle
                      className="result-ring"
                      cx="80" cy="80" r={radius}
                      fill="none"
                      stroke="var(--color-ink, #0a0a0a)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={len}
                      strokeDashoffset={len}
                      transform="rotate(-90 80 80)"
                      data-dash={dash}
                      data-len={len}
                    />
                  </svg>
                  <div className="cd-results__ring-value font-display">
                    {r.value}{r.suffix ?? ""}
                  </div>
                  <p className="cd-results__ring-label">{r.label}</p>
                </div>
              );
            })}
          </div>
          <div className="cd-results__narrative">
            <p className="cd-results__eyebrow">Outcomes</p>
            <h2 className="cd-results__title font-display">
              The numbers settled. <em>The story didn&apos;t.</em>
            </h2>
            <p className="cd-results__copy">{c.results.narrative}</p>
          </div>
        </div>

        {/* Before / after slider */}
        <div className="cd-slider">
          <p className="cd-slider__label">Before / after</p>
          <div
            className="cd-slider__frame"
            style={{ "--pos": `${sliderPos}%` } as React.CSSProperties}
          >
            <div className="cd-slider__after" />
            <div className="cd-slider__before" />
            <div className="cd-slider__handle" aria-hidden>
              <span className="cd-slider__handle-line" />
              <span className="cd-slider__handle-knob">⇆</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="cd-slider__input"
              aria-label="Reveal before and after"
            />
          </div>
        </div>
      </section>

      {/* ════════ SECTION 8 · NEXT CASE ════════ */}
      <section className="cd-next">
        <p className="cd-next__eyebrow">Next case study</p>
        <Link
          ref={nextCardRef}
          href={`/case-studies/${next.slug}`}
          className="next-card cd-next__card"
          onMouseEnter={handleNextEnter}
          onMouseLeave={handleNextLeave}
          onClick={handleNextClick}
        >
          <div
            className="next-card__cover"
            style={{
              background: `linear-gradient(135deg, #0a0a0a, #2a2a2a)`,
            }}
          >
            <span className="cd-next__grid" aria-hidden />
          </div>
          <div className="cd-next__overlay">
            <p className="cd-next__client font-display">{next.client}</p>
            <h3 className="cd-next__title font-display">{next.title}</h3>
            <p className="cd-next__cta">
              Read next
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </div>
        </Link>
      </section>

      <style>{styles}</style>
    </div>
  );
}

const styles = `
  .cd-root {
    background: var(--color-paper, #fafaf9);
    color: var(--color-ink, #0a0a0a);
    overflow-x: hidden;
  }

  /* ── Hero ─────────────────────────────────────────────────────────── */
  .cd-hero {
    position: relative;
    height: 100vh;
    min-height: 640px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .cd-hero__cover {
    position: absolute;
    inset: -10%;
    z-index: 0;
    will-change: transform, filter;
  }
  .cd-hero__cover-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 80%);
  }
  .cd-hero__inner {
    position: relative;
    z-index: 1;
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    padding: 0 24px 80px;
    color: #fafaf9;
  }
  .cd-hero__eyebrow {
    margin: 0 0 28px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
  }
  .cd-hero__headline {
    margin: 0 0 56px;
    font-size: clamp(3rem, 9vw, 9rem);
    line-height: 0.95;
    letter-spacing: -0.04em;
    font-weight: 500;
    max-width: 16ch;
  }
  .cd-hero__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 36px 56px;
    padding-top: 22px;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
  }
  .cd-hero__meta span {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: var(--font-body);
    font-size: 14px;
    color: rgba(255, 255, 255, 0.85);
  }
  .cd-hero__meta strong {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }

  /* ── Overview ─────────────────────────────────────────────────────── */
  .cd-overview {
    padding: clamp(80px, 14vh, 140px) 24px;
  }
  .cd-overview__inner {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 45% 1px 1fr;
    gap: 56px;
    align-items: start;
  }
  .cd-overview__divider {
    align-self: stretch;
    background: rgba(10, 10, 10, 0.14);
    transform-origin: top center;
  }
  .cd-overview__label {
    margin: 0 0 18px;
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(10, 10, 10, 0.5);
  }
  .cd-overview__challenge {
    margin: 0;
    font-size: clamp(1.8rem, 3vw, 2.8rem);
    line-height: 1.18;
    letter-spacing: -0.025em;
    font-weight: 500;
  }
  .cd-overview__approach {
    margin: 0;
    font-family: var(--font-body);
    font-size: 17px;
    line-height: 1.7;
    color: rgba(10, 10, 10, 0.72);
    max-width: 56ch;
  }

  /* ── Metrics ──────────────────────────────────────────────────────── */
  .cd-metrics {
    background: #0a0a0a;
    color: #fafaf9;
    padding: clamp(80px, 12vh, 120px) 24px;
  }
  .cd-metrics__inner {
    max-width: 1280px;
    margin: 0 auto;
  }
  .cd-metrics__eyebrow {
    margin: 0 0 48px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }
  .cd-metrics__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }
  .cd-metrics__cell {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .cd-metrics__value {
    font-size: clamp(2.6rem, 6.5vw, 6.5rem);
    line-height: 0.95;
    letter-spacing: -0.04em;
    font-weight: 500;
    display: inline-flex;
    align-items: baseline;
    gap: 2px;
  }
  .cd-metrics__prefix,
  .cd-metrics__suffix {
    font-size: 0.5em;
    color: rgba(255, 255, 255, 0.55);
    letter-spacing: -0.02em;
  }
  .cd-metrics__label {
    margin: 0;
    font-family: var(--font-body);
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
  }
  .cd-metrics__barwrap {
    height: 2px;
    background: rgba(255, 255, 255, 0.08);
    overflow: hidden;
    margin-top: 8px;
  }
  .cd-metrics__bar {
    display: block;
    height: 100%;
    width: 100%;
    background: linear-gradient(to right, #a3e635, rgba(163, 230, 53, 0.4));
    transform-origin: left center;
  }

  /* ── Process (horizontal) ─────────────────────────────────────────── */
  .cd-process {
    position: relative;
    background: var(--color-paper, #fafaf9);
  }
  .cd-process__header {
    max-width: 1280px;
    margin: 0 auto;
    padding: clamp(80px, 12vh, 120px) 24px clamp(40px, 6vh, 64px);
  }
  .cd-process__eyebrow {
    margin: 0 0 16px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(10, 10, 10, 0.5);
  }
  .cd-process__title {
    margin: 0 0 24px;
    font-size: clamp(2.4rem, 5vw, 4.2rem);
    line-height: 1.05;
    letter-spacing: -0.035em;
    font-weight: 500;
  }
  .cd-process__pin {
    position: relative;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .cd-process__track {
    display: flex;
    align-items: center;
    height: 100%;
    will-change: transform;
  }
  .cd-process__panel {
    flex: 0 0 100vw;
    height: 100%;
    padding: 0 6vw;
    display: grid;
    grid-template-columns: 45% 1fr;
    gap: 48px;
    align-items: center;
    box-sizing: border-box;
  }
  .cd-process__panel-visual {
    position: relative;
    aspect-ratio: 5 / 4;
    max-height: 70vh;
    background: linear-gradient(135deg, #0a0a0a, #1f1f1f);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cd-process__panel-num {
    font-size: clamp(96px, 16vw, 220px);
    font-weight: 500;
    letter-spacing: -0.04em;
    color: rgba(250, 250, 249, 0.06);
    line-height: 1;
    user-select: none;
  }
  .cd-process__panel-title {
    margin: 0 0 32px;
    font-size: clamp(2rem, 4vw, 3.4rem);
    line-height: 1.05;
    letter-spacing: -0.025em;
    font-weight: 500;
  }
  .cd-process__panel-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .cd-process__panel-list li {
    position: relative;
    padding-left: 22px;
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    color: rgba(10, 10, 10, 0.7);
  }
  .cd-process__panel-list li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.7em;
    width: 12px;
    height: 1px;
    background: rgba(10, 10, 10, 0.4);
  }
  .cd-process__progress {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: rgba(10, 10, 10, 0.08);
    overflow: hidden;
    z-index: 2;
  }
  .cd-process__progress-fill {
    display: block;
    height: 100%;
    background: var(--color-ink, #0a0a0a);
    transform: scaleX(0);
    transform-origin: left center;
  }

  /* ── Showcase ─────────────────────────────────────────────────────── */
  .cd-showcase {
    padding: clamp(80px, 12vh, 120px) 0;
    display: flex;
    flex-direction: column;
    gap: 100px;
  }
  .cd-showcase__fullbleed {
    margin: 0;
    padding: 0 24px;
  }
  .cd-showcase__cover {
    position: relative;
    aspect-ratio: 16 / 8;
    overflow: hidden;
    border-radius: 16px;
    max-width: 1440px;
    margin: 0 auto;
  }
  .cd-showcase__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .visual-fullbleed-inner {
    will-change: transform;
  }
  .cd-showcase__caption {
    max-width: 1440px;
    margin: 18px auto 0;
    padding: 0 4px;
    font-family: var(--font-body);
    font-size: 12px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(10, 10, 10, 0.5);
  }
  .cd-showcase__caption--center {
    text-align: center;
  }
  .cd-showcase__split {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 55% 45%;
    gap: 56px;
    align-items: center;
  }
  .cd-showcase__split-media {
    position: relative;
    aspect-ratio: 4 / 3;
    border-radius: 16px;
    overflow: hidden;
  }
  .visual-split-image {
    position: absolute;
    inset: -10%;
    will-change: transform;
  }
  .cd-showcase__split-caption {
    margin: 0;
    font-size: clamp(1.6rem, 2.4vw, 2.4rem);
    line-height: 1.25;
    letter-spacing: -0.02em;
    font-weight: 500;
  }
  .cd-showcase__split-em {
    position: relative;
    display: inline;
    color: var(--color-ink, #0a0a0a);
  }
  .cd-showcase__split-under {
    position: absolute;
    left: 0; right: 0; bottom: -4px;
    height: 2px;
    background: var(--color-ink, #0a0a0a);
    transform-origin: left center;
  }
  .cd-showcase__mockup-wrap {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .cd-showcase__mockup {
    position: relative;
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
    will-change: transform;
  }
  .cd-showcase__mockup-browser {
    position: absolute;
    top: 50%;
    left: 8%;
    transform: translateY(-50%);
    width: 72%;
    aspect-ratio: 16 / 10;
    background: #fff;
    border: 1px solid rgba(10, 10, 10, 0.12);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 40px 80px -40px rgba(10, 10, 10, 0.4);
  }
  .cd-showcase__mockup-bar {
    display: flex;
    gap: 6px;
    padding: 10px 14px;
    background: #f4f4f3;
    border-bottom: 1px solid rgba(10, 10, 10, 0.08);
  }
  .cd-showcase__mockup-bar span {
    width: 10px; height: 10px; border-radius: 50%;
    background: rgba(10, 10, 10, 0.18);
  }
  .cd-showcase__mockup-content {
    height: calc(100% - 32px);
    background:
      linear-gradient(135deg, #0a0a0a 0%, #2a2a2a 100%);
  }
  .cd-showcase__mockup-phone {
    position: absolute;
    right: 8%;
    top: 50%;
    transform: translateY(-30%);
    width: 18%;
    aspect-ratio: 9 / 19;
    background: #0a0a0a;
    border-radius: 22px;
    padding: 6px;
    box-shadow: 0 30px 60px -30px rgba(10, 10, 10, 0.5);
    z-index: 2;
  }
  .cd-showcase__mockup-screen {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    background: linear-gradient(160deg, #14171c, #2a2e36);
  }
  .cd-showcase__video {
    margin: 0;
    padding: 0 24px;
  }
  .cd-showcase__video-bg {
    position: relative;
    aspect-ratio: 16 / 8;
    max-width: 1440px;
    margin: 0 auto;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cd-showcase__video-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    pointer-events: none;
  }
  .cd-showcase__video-play {
    position: relative;
    z-index: 1;
    width: 76px;
    height: 76px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.4);
    color: #fafaf9;
    font-size: 22px;
    backdrop-filter: blur(8px);
  }

  /* ── Testimonial ──────────────────────────────────────────────────── */
  .cd-testimonial {
    position: relative;
    padding: clamp(100px, 18vh, 180px) 24px;
    text-align: center;
    max-width: 1080px;
    margin: 0 auto;
  }
  .cd-testimonial__mark {
    display: inline-block;
    font-size: clamp(120px, 18vw, 220px);
    line-height: 0.6;
    color: rgba(10, 10, 10, 0.08);
    margin-bottom: -40px;
    user-select: none;
  }
  .cd-testimonial__quote {
    margin: 0 0 48px;
    font-size: clamp(1.8rem, 4vw, 3.8rem);
    line-height: 1.25;
    letter-spacing: -0.025em;
    font-weight: 400;
  }
  .cd-testimonial__attr {
    display: inline-flex;
    align-items: center;
    gap: 16px;
  }
  .cd-testimonial__avatar {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: var(--color-ink, #0a0a0a);
    color: var(--color-paper, #fafaf9);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: -0.01em;
  }
  .cd-testimonial__attr-text {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .cd-testimonial__attr-text strong {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 500;
  }
  .cd-testimonial__attr-text span {
    font-family: var(--font-body);
    font-size: 13px;
    color: rgba(10, 10, 10, 0.55);
  }

  /* ── Results ──────────────────────────────────────────────────────── */
  .cd-results {
    padding: clamp(80px, 12vh, 120px) 24px;
    background: var(--color-paper, #fafaf9);
  }
  .cd-results__inner {
    max-width: 1280px;
    margin: 0 auto 80px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }
  .cd-results__rings {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    place-items: center;
  }
  .cd-results__ring-wrap {
    position: relative;
    text-align: center;
  }
  .cd-results__ring-value {
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.02em;
  }
  .cd-results__ring-label {
    margin: 8px 0 0;
    font-family: var(--font-body);
    font-size: 12px;
    color: rgba(10, 10, 10, 0.55);
  }
  .cd-results__eyebrow {
    margin: 0 0 16px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(10, 10, 10, 0.5);
  }
  .cd-results__title {
    margin: 0 0 24px;
    font-size: clamp(2rem, 4vw, 3.4rem);
    line-height: 1.08;
    letter-spacing: -0.03em;
    font-weight: 500;
  }
  .cd-results__title em {
    font-style: italic;
    font-weight: 400;
    color: rgba(10, 10, 10, 0.55);
  }
  .cd-results__copy {
    margin: 0;
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.65;
    color: rgba(10, 10, 10, 0.7);
    max-width: 52ch;
  }

  /* Before / after slider */
  .cd-slider {
    max-width: 1280px;
    margin: 0 auto;
  }
  .cd-slider__label {
    margin: 0 0 18px;
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(10, 10, 10, 0.5);
  }
  .cd-slider__frame {
    position: relative;
    aspect-ratio: 16 / 9;
    border-radius: 16px;
    overflow: hidden;
    user-select: none;
  }
  .cd-slider__before {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #eaeaea, #c8c8c8);
    clip-path: inset(0 calc(100% - var(--pos, 50%)) 0 0);
  }
  .cd-slider__after {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #0a0a0a, #2a2a2a);
  }
  .cd-slider__handle {
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--pos, 50%);
    width: 2px;
    background: rgba(255, 255, 255, 0.85);
    transform: translateX(-50%);
    pointer-events: none;
  }
  .cd-slider__handle-knob {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 44px;
    height: 44px;
    background: #fafaf9;
    color: #0a0a0a;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.5);
  }
  .cd-slider__input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: ew-resize;
  }

  /* ── Next case ────────────────────────────────────────────────────── */
  .cd-next {
    padding: clamp(80px, 12vh, 120px) 24px clamp(80px, 12vh, 120px);
    max-width: 1440px;
    margin: 0 auto;
  }
  .cd-next__eyebrow {
    margin: 0 0 28px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(10, 10, 10, 0.5);
  }
  .next-card.cd-next__card {
    position: relative;
    display: block;
    aspect-ratio: 16 / 7;
    border-radius: 18px;
    overflow: hidden;
    text-decoration: none;
    color: #fafaf9;
    will-change: transform, width, height, top, left;
  }
  .next-card__cover {
    position: absolute;
    inset: 0;
    transition: filter 0.6s ease;
    will-change: transform;
  }
  .next-card.cd-next__card:hover .next-card__cover {
    filter: brightness(0.7);
  }
  .cd-next__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 80%);
  }
  .cd-next__overlay {
    position: absolute;
    inset: 0;
    padding: 48px 56px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 12px;
  }
  .cd-next__client {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.6);
  }
  .cd-next__title {
    margin: 0 0 12px;
    font-size: clamp(2rem, 4.5vw, 4rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
    font-weight: 500;
    max-width: 22ch;
  }
  .cd-next__cta {
    margin: 0;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
  }
  .cd-next__cta svg {
    transition: transform 0.25s;
  }
  .next-card.cd-next__card:hover .cd-next__cta svg {
    transform: translateX(4px);
  }

  /* ── Responsive ───────────────────────────────────────────────────── */
  @media (max-width: 1024px) {
    .cd-metrics__grid { grid-template-columns: repeat(2, 1fr); gap: 40px; }
    .cd-results__inner { grid-template-columns: 1fr; gap: 48px; }
  }
  @media (max-width: 768px) {
    .cd-hero__meta { gap: 20px 32px; }
    .cd-overview__inner {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .cd-overview__divider {
      width: 100%;
      height: 1px;
      transform-origin: left center;
    }
    .cd-process__pin {
      height: auto;
      display: block;
    }
    .cd-process__track {
      flex-direction: column;
      height: auto;
      gap: 64px;
      padding: 24px 0 80px;
    }
    .cd-process__panel {
      flex: 0 0 auto;
      height: auto;
      grid-template-columns: 1fr;
      gap: 24px;
      padding: 0 24px;
    }
    .cd-process__panel-visual {
      max-height: none;
    }
    .cd-process__progress {
      display: none;
    }
    .cd-showcase__split {
      grid-template-columns: 1fr;
      gap: 28px;
    }
    .cd-showcase { gap: 64px; }
    .cd-results__rings { grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .cd-next__overlay { padding: 28px 24px; }
  }
`;