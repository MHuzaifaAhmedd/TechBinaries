"use client";

/* ─────────────────────────────────────────────────────────────────────────
   CaseStudiesExperience
   ─────────────────────
   The client-side composition for /case-studies. One file by design — every
   section shares the Lenis-synced GSAP context and ScrollTrigger registry,
   and keeping them together makes cleanup unambiguous on route change.

   Sections, in order:
     1. Hero — cinematic SplitText opener
     2. Filter bar — sticky, sliding pill indicator
     3. Asymmetric grid — featured + alternating row rhythm
     4. Logo marquee + word-scrub pull quote
     5. Process pillars — header, icon cards, connector line
     6. CTA banner — magnetic button, mouse-tracked gradient
   ──────────────────────────────────────────────────────────────────────── */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useLenis } from "@/hooks/useLenis";
import type { CaseStudy, Industry } from "@/lib/case-studies";
import { CATEGORIES, CLIENT_LOGOS, caseStudyCoverStyle } from "@/lib/case-studies";

type FilterCategory = Industry | "All";

interface Props {
  cases: CaseStudy[];
}

export default function CaseStudiesExperience({ cases }: Props) {
  useLenis({ duration: 1.2, orientation: "vertical", syncScrollControl: true });

  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<FilterCategory>("All");

  const filtered = useMemo(
    () => (active === "All" ? cases : cases.filter((c) => c.category === active)),
    [active, cases]
  );

  // ─── Hero refs ──
  const heroRef = useRef<HTMLElement>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroStatRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  // ─── Filter bar refs ──
  const filterBarRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const pillRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // ─── Pull quote ──
  const pullQuoteRef = useRef<HTMLParagraphElement>(null);
  const marqueeTrackARef = useRef<HTMLDivElement>(null);
  const marqueeTrackBRef = useRef<HTMLDivElement>(null);

  // ─── Pillars ──
  const pillarsSectionRef = useRef<HTMLElement>(null);
  const pillarGridRef = useRef<HTMLDivElement>(null);
  const pillarConnectorDrawnRef = useRef(false);
  const [pillarConnector, setPillarConnector] = useState<{
    w: number;
    h: number;
    d: string;
  } | null>(null);

  // ─── CTA ──
  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const ctaGlowRef = useRef<HTMLDivElement>(null);

  // ─── Animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ──────────────────────────────────────────────────────────────
      // HERO — line blocks only (SplitText would flatten markup and force per-word columns)
      // ──────────────────────────────────────────────────────────────
      if (heroHeadlineRef.current) {
        const lines = heroHeadlineRef.current.querySelectorAll(".cs-hero-title-line");
        gsap.from(lines, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          stagger: 0.16,
          ease: "power3.out",
          delay: 0.08,
        });

        gsap.from(heroSubRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          delay: 1.1,
        });

        gsap.fromTo(
          heroStatRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.85,
            ease: "power3.inOut",
            delay: 1.4,
          }
        );
      }

      // Parallax hero content on scroll
      if (heroContentRef.current && heroRef.current) {
        gsap.to(heroContentRef.current, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      if (heroBgRef.current && heroRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ──────────────────────────────────────────────────────────────
      // FILTER BAR — slide-in entrance
      // ──────────────────────────────────────────────────────────────
      gsap.from(filterBarRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: filterBarRef.current,
          start: "top 90%",
        },
      });

      // ──────────────────────────────────────────────────────────────
      // GRID — directional reveal (left cards from left, right from right)
      // ──────────────────────────────────────────────────────────────
      gsap.set(".case-card", { opacity: 0 });
      ScrollTrigger.batch(".case-card", {
        onEnter: (elements) => {
          const pending = gsap.utils
            .toArray<HTMLElement>(elements)
            .filter((el) => el.dataset.entered !== "true");
          if (pending.length) animateCaseCardsIn(pending);
        },
        start: "top 92%",
        once: true,
      });

      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>(".case-card__media-inner").forEach((el) => {
          gsap.to(el, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest(".case-card") as Element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });

      // ──────────────────────────────────────────────────────────────
      // MARQUEE — two opposing infinite loops
      // ──────────────────────────────────────────────────────────────
      if (marqueeTrackARef.current) {
        gsap.to(marqueeTrackARef.current, {
          xPercent: -50,
          duration: 28,
          ease: "none",
          repeat: -1,
        });
      }
      if (marqueeTrackBRef.current) {
        gsap.fromTo(
          marqueeTrackBRef.current,
          { xPercent: -50 },
          { xPercent: 0, duration: 32, ease: "none", repeat: -1 }
        );
      }

      // ──────────────────────────────────────────────────────────────
      // PULL QUOTE — word-scrub reveal
      // ──────────────────────────────────────────────────────────────
      if (pullQuoteRef.current) {
        const qsplit = new SplitText(pullQuoteRef.current, { type: "words" });
        qsplit.words.forEach((word) => {
          gsap.fromTo(
            word,
            { opacity: 0.08 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: word,
                start: "top 78%",
                end: "top 48%",
                scrub: true,
              },
            }
          );
        });
      }

      // ──────────────────────────────────────────────────────────────
      // PILLARS — header reveal, cards stagger, connector draws
      // ──────────────────────────────────────────────────────────────
      if (pillarsSectionRef.current) {
        gsap.from(".cs-pillars__head > *", {
          opacity: 0,
          y: 28,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cs-pillars__head",
            start: "top 82%",
          },
        });

        gsap.from(".pillar-card", {
          opacity: 0,
          y: 56,
          duration: 0.95,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cs-pillars__track",
            start: "top 78%",
          },
        });

        gsap.utils.toArray<HTMLElement>(".pillar-card__index").forEach((numEl) => {
          const target = parseInt(numEl.dataset.value || "0", 10);
          const counter = { v: 0 };
          gsap.to(counter, {
            v: target,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: numEl,
              start: "top 85%",
            },
            onUpdate: () => {
              numEl.textContent = String(Math.ceil(counter.v)).padStart(2, "0");
            },
          });
        });
      }

      // ──────────────────────────────────────────────────────────────
      // CTA — mouse-tracked gradient
      // ──────────────────────────────────────────────────────────────
      if (ctaSectionRef.current && ctaGlowRef.current) {
        const section = ctaSectionRef.current;
        const glow = ctaGlowRef.current;
        const onMove = (e: MouseEvent) => {
          const r = section.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width) * 100;
          const y = ((e.clientY - r.top) / r.height) * 100;
          gsap.to(glow, {
            "--mx": `${x}%`,
            "--my": `${y}%`,
            duration: 0.6,
            ease: "power2.out",
          });
        };
        section.addEventListener("mousemove", onMove);
        // Cleanup attaches via ctx.revert(), but we also remove the listener:
        return () => section.removeEventListener("mousemove", onMove);
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Measure connector path from real card centers (fixes grid gap misalignment)
  useLayoutEffect(() => {
    const grid = pillarGridRef.current;
    if (!grid) return;

    const measure = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setPillarConnector(null);
        return;
      }
      requestAnimationFrame(() => {
        const next = buildPillarConnectorPath(grid);
        if (next) setPillarConnector(next);
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    const track = grid.parentElement;
    if (track) ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Draw connector once path matches card centers (single path avoids partial fade)
  useLayoutEffect(() => {
    const section = pillarsSectionRef.current;
    if (!section || !pillarConnector) return;

    const path = section.querySelector<SVGPathElement>(".pillar-connector__path--draw");
    const base = section.querySelector<SVGPathElement>(".pillar-connector__path--base");
    if (!path) return;

    const len = path.getTotalLength();

    if (pillarConnectorDrawnRef.current) {
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
      if (base) gsap.set(base, { opacity: 1 });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section.querySelector(".cs-pillars__track"),
          start: "top 72%",
          once: true,
          invalidateOnRefresh: true,
          onEnter: () => {
            pillarConnectorDrawnRef.current = true;
          },
        },
      });
      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, [pillarConnector]);

  // ─── Magnetic button (attached separately so it doesn't fight ctx) ──
  useEffect(() => {
    const btn = ctaButtonRef.current;
    if (!btn) return;
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    };
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // ─── Filter indicator: slide between pills ──
  useEffect(() => {
    const idx = CATEGORIES.indexOf(active);
    const pill = pillRefs.current[idx];
    const indicator = indicatorRef.current;
    if (!pill || !indicator) return;
    gsap.to(indicator, {
      x: pill.offsetLeft,
      width: pill.offsetWidth,
      duration: 0.45,
      ease: "power3.inOut",
    });
  }, [active]);

  // ─── Filter change — animate cards out, then in ──
  const outgoingRef = useRef<FilterCategory>("All");
  useEffect(() => {
    if (outgoingRef.current === active) return;
    outgoingRef.current = active;
    const cards = gsap.utils.toArray<HTMLElement>(".case-card");
    cards.forEach((el) => {
      delete el.dataset.entered;
    });
    gsap.set(cards, { opacity: 0 });
    requestAnimationFrame(() => {
      animateCaseCardsIn(cards, { stagger: 0.07, duration: 0.85 });
    });
    ScrollTrigger.refresh();
  }, [active, filtered.length]);

  return (
    <div ref={rootRef} className="cs-root">
      {/* ════════════════════════════════════════════════════════════════
          SECTION 1 · HERO
          ══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="cs-hero" aria-labelledby="cs-hero-title">
        <div ref={heroBgRef} className="cs-hero-bg" aria-hidden>
          <div className="cs-hero-media">
            <picture className="cs-hero-picture">
              <source
                media="(max-width: 768px)"
                srcSet="/images/Case%20study/hero-section-case-study-mobile.jpg"
              />
              <Image
                src="/images/Case%20study/hero-section-case-study.jpg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="cs-hero-media-img"
              />
            </picture>
          </div>
          <div className="cs-hero-media-overlay" />
          <div className="cs-hero-grid-pattern" />
          <div className="cs-hero-bg-label">Cases</div>
        </div>

        <div ref={heroContentRef} className="cs-hero-content">
          <div className="cs-hero-inner">
            <h1 id="cs-hero-title" ref={heroHeadlineRef} className="cs-hero-title font-display">
              <span className="cs-hero-title-line">We don&apos;t build websites.</span>
              <span className="cs-hero-title-line">
                We <span className="cs-hero-title-italic">engineer outcomes.</span>
              </span>
            </h1>

            <p ref={heroSubRef} className="cs-hero-lead">
              A small senior team has shipped products for FinTech, HealthTech, logistics
              and AI — measured by what they did for the business, not how they looked
              at launch.
            </p>

            <div ref={heroStatRef} className="cs-hero-stat font-display">
              47 products. <span className="cs-hero-stat-em">Zero compromises.</span>
            </div>
          </div>
        </div>

        <div className="cs-hero-scrollcue" aria-hidden>
          <span className="cs-hero-scrollcue-label">Scroll</span>
          <span className="cs-hero-scrollcue-line">
            <span className="cs-hero-scrollcue-dot" />
          </span>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 2 · FILTER BAR
          ══════════════════════════════════════════════════════════════ */}
      <div ref={filterBarRef} className="cs-filter">
        <div className="cs-filter__inner">
          <span className="cs-filter__label">Filter by industry</span>
          <div className="cs-filter__pills" role="tablist">
            <span ref={indicatorRef} className="cs-filter__indicator" aria-hidden />
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                ref={(el) => { pillRefs.current[i] = el; }}
                type="button"
                role="tab"
                aria-selected={active === cat}
                className="cs-filter__pill"
                data-active={active === cat ? "true" : "false"}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 3 · ASYMMETRIC GRID
          ══════════════════════════════════════════════════════════════ */}
      <section className="cs-grid">
        <div className="cs-grid__inner">
          {filtered.map((c, i) => (
            <CaseCard
              key={c.slug}
              c={c}
              index={i}
              featured={
                c.size === "featured" &&
                filtered.findIndex((item) => item.size === "featured") === i
              }
            />
          ))}
          {filtered.length === 0 && (
            <p className="cs-grid__empty">
              No case studies in this category yet — we&apos;re writing more up.
            </p>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 4 · LOGO MARQUEE + PULL QUOTE
          ══════════════════════════════════════════════════════════════ */}
      <section className="cs-marquee-section">
        <p className="cs-marquee-section__eyebrow">Trusted by teams that ship</p>
        <div className="cs-marquee">
          <div ref={marqueeTrackARef} className="cs-marquee__track">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((l, i) => (
              <span key={`a-${i}`} className="cs-marquee__item font-display">
                {l}
              </span>
            ))}
          </div>
        </div>
        <div className="cs-marquee cs-marquee--alt">
          <div ref={marqueeTrackBRef} className="cs-marquee__track">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].reverse().map((l, i) => (
              <span key={`b-${i}`} className="cs-marquee__item font-display">
                {l}
              </span>
            ))}
          </div>
        </div>

        <div className="cs-quote">
          <p ref={pullQuoteRef} className="cs-quote__text font-display">
            They challenged our assumptions, improved our roadmap, and shipped faster
            than any team we&apos;ve worked with. Exceptional craft.
          </p>
          <p className="cs-quote__attr">
            <strong>Sarah Chen</strong> · CTO, FinEdge
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 5 · PROCESS PILLARS
          ══════════════════════════════════════════════════════════════ */}
      <section ref={pillarsSectionRef} className="cs-pillars">
        <div className="cs-pillars__inner">
          <header className="cs-pillars__head">
            <p className="cs-pillars__eyebrow">How we work</p>
            <h2 className="cs-pillars__headline font-display">
              From discovery to <em>production</em> — one senior team, end to end.
            </h2>
          </header>

          <div className="cs-pillars__track">
            {pillarConnector && (
              <div className="pillar-connector" aria-hidden>
                <svg
                  className="pillar-connector__svg"
                  viewBox={`0 0 ${pillarConnector.w} ${pillarConnector.h}`}
                >
                  <path
                    className="pillar-connector__path pillar-connector__path--base"
                    d={pillarConnector.d}
                  />
                  <path
                    className="pillar-connector__path pillar-connector__path--draw"
                    d={pillarConnector.d}
                  />
                </svg>
              </div>
            )}
            <div ref={pillarGridRef} className="cs-pillars__grid">
              {PROCESS_PILLARS.map((p) => (
                <article key={p.num} className="pillar-card">
                  <div className="pillar-card__top">
                    <span className="pillar-card__icon" aria-hidden>
                      {p.icon}
                    </span>
                    <span
                      className="pillar-card__index font-display"
                      data-value={p.num}
                    >
                      00
                    </span>
                  </div>
                  <span className="pillar-card__tag">{p.tag}</span>
                  <h3 className="pillar-card__title font-display">{p.title}</h3>
                  <p className="pillar-card__desc">{p.desc}</p>
                  <p className="pillar-card__focus">
                    <span className="pillar-card__focus-label">Focus</span>
                    {p.focus}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 6 · CTA BANNER
          ══════════════════════════════════════════════════════════════ */}
      <section ref={ctaSectionRef} className="cs-cta">
        <div ref={ctaGlowRef} className="cs-cta__glow" aria-hidden />
        <div className="cs-cta__inner">
          <p className="cs-cta__eyebrow">
            <span className="cs-cta__dot" />
            Got something to ship?
          </p>
          <h2 className="cs-cta__headline font-display">
            Let&apos;s build the next
            <br />
            <em>case study together.</em>
          </h2>
          <Link ref={ctaButtonRef} href="/contact" className="cs-cta__btn">
            <span>Start a project</span>
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
          </Link>
        </div>
      </section>

      <style>{styles}</style>
    </div>
  );
}

function buildPillarConnectorPath(grid: HTMLElement) {
  const track = grid.parentElement;
  if (!track) return null;

  const cards = [...grid.querySelectorAll<HTMLElement>(".pillar-card")];
  if (cards.length < 3) return null;

  const w = track.clientWidth;
  if (w < 320) return null;

  const trackLeft = track.getBoundingClientRect().left;
  const centers = cards.map((card) => {
    const r = card.getBoundingClientRect();
    return r.left + r.width / 2 - trackLeft;
  });

  const [c0, c1, c2] = centers;
  const h = 52;
  const yDown = 42;
  const yUp = 10;
  const yTip = 48;
  const horn = 28;
  const corner = 22;
  const left = Math.max(12, c0 - horn);
  const right = Math.min(w - 12, c2 + horn);

  // Curved horns + flat span; straight stem to center (Engineer) card
  const arc = [
    `M ${left} ${yDown}`,
    `Q ${left} ${yUp}, ${left + corner} ${yUp}`,
    `L ${right - corner} ${yUp}`,
    `Q ${right} ${yUp}, ${right} ${yDown}`,
  ].join(" ");

  const centerStem = `M ${c1} ${yUp} L ${c1} ${yTip}`;

  return { w, h, d: `${arc} ${centerStem}` };
}

const PROCESS_PILLARS = [
  {
    num: 1,
    tag: "Discovery",
    title: "Research",
    desc: "Discovery shapes everything. We start by understanding the business, not the brief.",
    focus: "Stakeholder interviews, domain mapping, success metrics",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: 2,
    tag: "Build",
    title: "Engineer",
    desc: "Senior engineers from day one — no juniors learning on your dime, no agency hand-offs.",
    focus: "Architecture, CI/CD, code review, production readiness",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M8 6L4 8v8l4 2 4-2V8L8 6zM16 6l4 2v8l-4 2-4-2V8l4-2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M10 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: 3,
    tag: "Operate",
    title: "Scale",
    desc: "We stay after launch. Observability, on-call, and the migration playbook are part of the work.",
    focus: "Monitoring, incident response, performance tuning",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 18V8l4-2 4 2v10M12 8l4-2 4 2v10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M8 14v4M16 12v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────────
   CaseCard — one card in the asymmetric grid.
   Layout class is chosen by index so we keep the editorial rhythm:
     • index 0 → featured (full width, video/large cover)
     • index 1 → large (~62%)
     • index 2 → tall (~38%)
     • index 3 → half · index 4 → half
     • index 5 → full-width band
     • after that we loop the pattern.
   ──────────────────────────────────────────────────────────────────────── */
function CaseCard({ c, index, featured }: { c: CaseStudy; index: number; featured: boolean }) {
  // Map index → grid span class
  const pattern = ["span-12", "span-7", "span-5", "span-6", "span-6", "span-12"];
  const spanClass = featured ? "span-12 is-featured" : pattern[index % pattern.length];

  return (
    <Link href={`/case-studies/${c.slug}`} className={`case-card ${spanClass}`}>
      <div className="case-card__media">
        <div
          className="case-card__media-inner"
          style={
            c.cover
              ? caseStudyCoverStyle(c.cover, 140 + index * 18)
              : {
                  background: `linear-gradient(${140 + index * 18}deg, ${pickGradient(index)})`,
                }
          }
        >
          <span className="case-card__cover-noise" aria-hidden />
        </div>
        <div className="case-card__tag">{c.category}</div>
      </div>
      <div className="case-card__body">
        <div className="case-card__client font-display">{c.client}</div>
        <h3 className="case-card__title font-display">{c.title}</h3>
        <div className="case-card__foot">
          <span className="case-card__outcome">
            <strong className="font-display">{c.outcomeValue}</strong>
            <span>{c.outcome.replace(c.outcomeValue, "").trim() || c.outcome}</span>
          </span>
          <span className="case-card__view">
            View case study
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
              <path
                d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Slide distance from left/right (or up on mobile / full-width rows). */
function getCaseCardEnterOffset(el: HTMLElement): { x: number; y: number } {
  const rect = el.getBoundingClientRect();
  const vw = window.innerWidth;
  const travel = Math.min(110, Math.max(64, vw * 0.085));

  if (vw < 768) {
    return { x: 0, y: 44 };
  }

  const centerX = rect.left + rect.width / 2;
  if (centerX < vw * 0.42) return { x: -travel, y: 0 };
  if (centerX > vw * 0.58) return { x: travel, y: 0 };
  return { x: 0, y: 40 };
}

function animateCaseCardsIn(
  elements: gsap.DOMTarget,
  opts?: { stagger?: number; duration?: number }
) {
  const list = gsap.utils.toArray<HTMLElement>(elements);
  const stagger = opts?.stagger ?? 0.09;
  const duration = opts?.duration ?? 1.05;

  list.forEach((el, i) => {
    if (el.dataset.entered === "true") return;
    el.dataset.entered = "true";
    const { x, y } = getCaseCardEnterOffset(el);
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { opacity: 0, x, y },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay: i * stagger,
        ease: "power2.out",
        overwrite: "auto",
        onComplete: () => {
          gsap.set(el, { clearProps: "x,y,transform" });
        },
      }
    );
  });
}

// Cycle of brand-safe duotone gradients used as cover placeholders.
function pickGradient(i: number): string {
  const palette = [
    "#0a0a0a 0%, #1f1f1f 60%, #3a3a3a 100%",
    "#1a1a1a 0%, #2b2b2b 50%, #4a4a4a 100%",
    "#0e1414 0%, #1a2226 60%, #2f3a3f 100%",
    "#0a0a0a 0%, #14171c 50%, #2a2e36 100%",
    "#0a0a0a 0%, #1c1818 60%, #332a2a 100%",
    "#080808 0%, #181818 50%, #2c2c2c 100%",
  ];
  return palette[i % palette.length];
}

/* ─────────────────────────────────────────────────────────────────────────
   Styles — inline so the page travels as a single drop-in component.
   ──────────────────────────────────────────────────────────────────────── */
const styles = `
  .cs-root {
    background: var(--color-paper, #fafaf9);
    color: var(--color-ink, #0a0a0a);
  }

  /* ── Hero — same language as /blogs (image + dark wash + light type + blend header) ─ */
  .cs-hero {
    position: relative;
    min-height: clamp(420px, 58vh, 620px);
    background: #0a0a0a;
    color: #fafaf9;
    overflow: hidden;
    isolation: isolate;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: clamp(36px, 5vw, 56px);
  }
  .cs-hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }
  .cs-hero-media {
    position: absolute;
    inset: 0;
  }
  .cs-hero-picture {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
  }
  .cs-hero-media-img {
    object-fit: cover;
    object-position: center 30%;
    filter: saturate(0.72) contrast(1.05);
    transform: scale(1.03);
  }
  .cs-hero-media-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.5) 32%, rgba(8,8,8,0.82) 100%),
      linear-gradient(90deg, rgba(8,8,8,0.46) 0%, transparent 58%);
  }
  .cs-hero-grid-pattern {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(ellipse 70% 80% at 50% 60%, black 20%, transparent 90%);
    -webkit-mask-image: radial-gradient(ellipse 70% 80% at 50% 60%, black 20%, transparent 90%);
  }
  .cs-hero-bg-label {
    position: absolute;
    bottom: -8%;
    right: -2%;
    font-family: var(--font-display);
    font-size: clamp(100px, 14vw, 200px);
    font-weight: 600;
    letter-spacing: -0.08em;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.05);
    line-height: 0.85;
    user-select: none;
    pointer-events: none;
    will-change: transform;
  }
  .cs-hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-top: clamp(108px, 12.5vh, 152px);
    padding-bottom: 0;
    will-change: transform, opacity, filter;
  }
  .cs-hero-inner {
    max-width: 1320px;
    width: 100%;
    margin: 0 auto;
  }
  .cs-hero-title {
    margin: 0 0 clamp(12px, 1.8vw, 18px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: clamp(6px, 0.75vw, 10px);
    max-width: min(42rem, 100%);
    font-size: clamp(28px, 3.6vw, 56px);
    font-weight: 500;
    letter-spacing: -0.04em;
    line-height: 1.12;
    color: #fff;
    text-shadow: 0 12px 40px rgba(0,0,0,0.4);
    text-wrap: balance;
  }
  .cs-hero-title-line {
    display: block;
    width: fit-content;
    max-width: 100%;
    white-space: normal;
    word-break: normal;
    overflow-wrap: break-word;
  }
  .cs-hero-title-italic {
    font-style: italic;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.88);
    padding: 0 0.04em;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
    border-radius: 0.08em;
  }
  .cs-hero-lead {
    margin: 0 0 clamp(16px, 2.2vw, 24px);
    max-width: 52ch;
    font-family: var(--font-body);
    font-size: clamp(14px, 1.1vw, 16px);
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.82);
  }
  .cs-hero-stat {
    font-size: clamp(17px, 1.8vw, 24px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-weight: 500;
    padding: 12px 0 0;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
    max-width: fit-content;
  }
  .cs-hero-stat-em {
    font-style: italic;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.65);
  }
  .cs-hero-scrollcue {
    position: absolute;
    bottom: clamp(14px, 2vh, 26px);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    z-index: 3;
    pointer-events: none;
  }
  .cs-hero-scrollcue-label {
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.45);
  }
  .cs-hero-scrollcue-line {
    position: relative;
    width: 1px;
    height: 28px;
    background: rgba(255, 255, 255, 0.2);
    overflow: hidden;
  }
  .cs-hero-scrollcue-dot {
    position: absolute;
    top: -10px;
    left: -1px;
    width: 3px;
    height: 12px;
    background: #fafaf9;
    border-radius: 2px;
    animation: cs-scroll 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
  }
  @keyframes cs-scroll {
    0% { transform: translateY(0); opacity: 0; }
    25% { opacity: 1; }
    75% { opacity: 1; }
    100% { transform: translateY(36px); opacity: 0; }
  }

  /* ── Filter bar ───────────────────────────────────────────────────── */
  .cs-filter {
    position: sticky;
    top: var(--header-height-compact, 72px);
    z-index: 30;
    background: rgba(250, 250, 249, 0.86);
    backdrop-filter: saturate(180%) blur(16px);
    -webkit-backdrop-filter: saturate(180%) blur(16px);
    border-top: 1px solid rgba(10, 10, 10, 0.06);
    border-bottom: 1px solid rgba(10, 10, 10, 0.06);
  }
  .cs-filter__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 14px 24px;
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .cs-filter__label {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(10, 10, 10, 0.45);
    flex-shrink: 0;
  }
  .cs-filter__pills {
    position: relative;
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    overflow: hidden;
  }
  .cs-filter__indicator {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--color-ink, #0a0a0a);
    border-radius: 999px;
    z-index: 0;
    pointer-events: none;
  }
  .cs-filter__pill {
    position: relative;
    z-index: 1;
    padding: 8px 16px;
    border: 0;
    background: transparent;
    color: rgba(10, 10, 10, 0.65);
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.005em;
    border-radius: 999px;
    cursor: pointer;
    transition: color 0.2s;
  }
  .cs-filter__pill[data-active="true"] {
    color: var(--color-paper, #fafaf9);
  }
  .cs-filter__pill:hover:not([data-active="true"]) {
    color: var(--color-ink, #0a0a0a);
  }

  /* ── Grid ─────────────────────────────────────────────────────────── */
  .cs-grid {
    padding: 80px 24px 100px;
    overflow-x: clip;
  }
  .cs-grid__inner {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 28px;
    overflow-x: clip;
  }
  .cs-grid__empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 80px 0;
    font-family: var(--font-body);
    color: rgba(10, 10, 10, 0.5);
  }
  .case-card {
    position: relative;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: var(--color-ink, #0a0a0a);
    background: #fff;
    border: 1px solid rgba(10, 10, 10, 0.07);
    border-radius: 18px;
    overflow: hidden;
    transition: border-color 0.3s ease, box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .case-card:hover {
    border-color: rgba(10, 10, 10, 0.18);
    box-shadow: 0 36px 72px -40px rgba(10, 10, 10, 0.38);
  }
  .case-card.span-12 { grid-column: span 12; }
  .case-card.span-7 { grid-column: span 7; }
  .case-card.span-5 { grid-column: span 5; }
  .case-card.span-6 { grid-column: span 6; }
  .case-card.is-featured .case-card__media { aspect-ratio: 16 / 7.5; }
  .case-card__media {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: #0a0a0a;
  }
  .case-card.span-7 .case-card__media { aspect-ratio: 16 / 10; }
  .case-card.span-5 .case-card__media { aspect-ratio: 4 / 5; }
  .case-card.span-6 .case-card__media { aspect-ratio: 4 / 3; }
  .case-card__media-inner {
    position: absolute;
    inset: -8%;
    transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
    will-change: transform;
  }
  .case-card:hover .case-card__media-inner {
    transform: scale(1.05);
  }
  .case-card__cover-noise {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 10px 10px;
    mix-blend-mode: overlay;
    pointer-events: none;
  }
  .case-card__tag {
    position: absolute;
    top: 16px; left: 16px;
    padding: 6px 12px;
    background: rgba(250, 250, 249, 0.92);
    border-radius: 999px;
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-ink, #0a0a0a);
    backdrop-filter: blur(6px);
  }
  .case-card__body {
    padding: 22px 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }
  .case-card__client {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(10, 10, 10, 0.55);
  }
  .case-card__title {
    margin: 0;
    font-size: clamp(20px, 2.2vw, 28px);
    line-height: 1.15;
    letter-spacing: -0.02em;
    font-weight: 500;
  }
  .case-card.is-featured .case-card__title {
    font-size: clamp(28px, 3.4vw, 42px);
    max-width: 18ch;
  }
  .case-card__foot {
    margin-top: auto;
    padding-top: 16px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    border-top: 1px solid rgba(10, 10, 10, 0.08);
  }
  .case-card__outcome {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .case-card__outcome strong {
    font-size: clamp(20px, 1.8vw, 26px);
    font-weight: 500;
    letter-spacing: -0.02em;
  }
  .case-card__outcome span {
    font-family: var(--font-body);
    font-size: 12px;
    color: rgba(10, 10, 10, 0.55);
  }
  .case-card__view {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 500;
    color: rgba(10, 10, 10, 0.7);
  }
  .case-card__view svg {
    transition: transform 0.25s ease;
  }
  .case-card:hover .case-card__view svg {
    transform: translateX(4px);
  }

  /* ── Marquee + Quote ──────────────────────────────────────────────── */
  .cs-marquee-section {
    padding: 100px 0 120px;
    background: var(--color-paper, #fafaf9);
    border-top: 1px solid rgba(10, 10, 10, 0.06);
  }
  .cs-marquee-section__eyebrow {
    text-align: center;
    margin: 0 0 36px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(10, 10, 10, 0.45);
  }
  .cs-marquee {
    overflow: hidden;
    padding: 8px 0;
    mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  }
  .cs-marquee--alt { padding-bottom: 16px; }
  .cs-marquee__track {
    display: inline-flex;
    gap: 56px;
    white-space: nowrap;
    will-change: transform;
  }
  .cs-marquee__item {
    display: inline-block;
    font-size: clamp(28px, 3.4vw, 42px);
    font-weight: 500;
    letter-spacing: -0.02em;
    color: rgba(10, 10, 10, 0.35);
    transition: color 0.3s;
  }
  .cs-marquee__item:hover { color: var(--color-ink, #0a0a0a); }
  .cs-quote {
    max-width: 1080px;
    margin: 80px auto 0;
    padding: 0 24px;
    text-align: center;
  }
  .cs-quote__text {
    font-size: clamp(1.8rem, 3.5vw, 3rem);
    line-height: 1.25;
    letter-spacing: -0.025em;
    font-weight: 500;
    margin: 0 0 24px;
    color: var(--color-ink, #0a0a0a);
  }
  .cs-quote__attr {
    margin: 0;
    font-family: var(--font-body);
    font-size: 14px;
    color: rgba(10, 10, 10, 0.6);
  }
  .cs-quote__attr strong {
    color: var(--color-ink, #0a0a0a);
    font-weight: 600;
  }

  /* ── Pillars ──────────────────────────────────────────────────────── */
  .cs-pillars {
    padding: clamp(80px, 12vh, 120px) 24px;
    background:
      radial-gradient(ellipse 90% 60% at 50% 0%, rgba(10, 10, 10, 0.04), transparent 70%),
      var(--color-paper, #fafaf9);
    border-top: 1px solid rgba(10, 10, 10, 0.06);
  }
  .cs-pillars__inner {
    max-width: 1280px;
    margin: 0 auto;
  }
  .cs-pillars__head {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 52rem;
    margin-bottom: clamp(40px, 6vw, 64px);
  }
  .cs-pillars__eyebrow {
    margin: 0;
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(10, 10, 10, 0.45);
  }
  .cs-pillars__headline {
    margin: 0;
    font-size: clamp(1.75rem, 3.2vw, 2.75rem);
    line-height: 1.12;
    letter-spacing: -0.03em;
    font-weight: 500;
    color: var(--color-ink, #0a0a0a);
  }
  .cs-pillars__headline em {
    font-style: italic;
    font-weight: 400;
    color: rgba(10, 10, 10, 0.55);
  }
  .cs-pillars__track {
    position: relative;
  }
  .pillar-connector {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 52px;
    z-index: 2;
    pointer-events: none;
  }
  .pillar-connector__svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .pillar-connector__path {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .pillar-connector__path--base {
    stroke: rgba(10, 10, 10, 0.12);
    stroke-width: 1.5;
  }
  .pillar-connector__path--draw {
    stroke: rgba(10, 10, 10, 0.45);
    stroke-width: 1.75;
    opacity: 0;
  }
  .cs-pillars__grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding-top: 48px;
  }
  .pillar-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 28px 26px 26px;
    background: #fff;
    border: 1px solid rgba(10, 10, 10, 0.08);
    border-radius: 20px;
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.9) inset,
      0 24px 48px -36px rgba(10, 10, 10, 0.22);
    transition:
      transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
      border-color 0.3s ease,
      box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .pillar-card::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(120% 80% at 0% 0%, rgba(10, 10, 10, 0.04), transparent 55%);
    pointer-events: none;
  }
  .pillar-card:hover {
    transform: translateY(-6px);
    border-color: rgba(10, 10, 10, 0.16);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.9) inset,
      0 32px 64px -32px rgba(10, 10, 10, 0.28);
  }
  .pillar-card__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  .pillar-card__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(10, 10, 10, 0.05);
    color: var(--color-ink, #0a0a0a);
    flex-shrink: 0;
    transition: background 0.3s ease, transform 0.3s ease;
  }
  .pillar-card:hover .pillar-card__icon {
    background: var(--color-ink, #0a0a0a);
    color: #fafaf9;
    transform: scale(1.04);
  }
  .pillar-card__index {
    font-size: clamp(36px, 4.5vw, 52px);
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.05em;
    color: rgba(10, 10, 10, 0.12);
    transition: color 0.35s ease;
  }
  .pillar-card:hover .pillar-card__index {
    color: rgba(10, 10, 10, 0.22);
  }
  .pillar-card__tag {
    display: inline-flex;
    align-self: flex-start;
    padding: 5px 11px;
    border-radius: 999px;
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(10, 10, 10, 0.7);
    background: rgba(10, 10, 10, 0.05);
    border: 1px solid rgba(10, 10, 10, 0.08);
  }
  .pillar-card__title {
    margin: 0;
    font-size: clamp(20px, 2vw, 26px);
    letter-spacing: -0.02em;
    font-weight: 500;
    line-height: 1.15;
  }
  .pillar-card__desc {
    margin: 0;
    font-family: var(--font-body);
    font-size: 14px;
    line-height: 1.62;
    color: rgba(10, 10, 10, 0.62);
  }
  .pillar-card__focus {
    margin: 4px 0 0;
    padding-top: 16px;
    border-top: 1px solid rgba(10, 10, 10, 0.08);
    font-family: var(--font-body);
    font-size: 12px;
    line-height: 1.5;
    color: rgba(10, 10, 10, 0.5);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .pillar-card__focus-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(10, 10, 10, 0.38);
  }

  /* ── CTA ──────────────────────────────────────────────────────────── */
  .cs-cta {
    position: relative;
    overflow: hidden;
    padding: clamp(80px, 14vh, 140px) 24px;
    background: #0a0a0a;
    color: #fafaf9;
  }
  .cs-cta__glow {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        ellipse 800px 500px at var(--mx, 50%) var(--my, 50%),
        rgba(255, 255, 255, 0.14),
        rgba(255, 255, 255, 0) 62%
      );
    pointer-events: none;
    transition: background 0.4s ease;
  }
  .cs-cta::after {
    /* dot grid texture */
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 22px 22px;
    mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 80%);
    pointer-events: none;
  }
  .cs-cta__inner {
    position: relative;
    z-index: 1;
    max-width: 1080px;
    margin: 0 auto;
    text-align: center;
  }
  .cs-cta__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 28px;
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.6);
  }
  .cs-cta__dot {
    width: 6px; height: 6px;
    background: #fafaf9;
    border-radius: 50%;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.18);
  }
  .cs-cta__headline {
    margin: 0 0 44px;
    font-size: clamp(3rem, 6.5vw, 6rem);
    line-height: 0.98;
    letter-spacing: -0.035em;
    font-weight: 500;
  }
  .cs-cta__headline em {
    font-style: italic;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
  }
  .cs-cta__btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 18px 30px;
    background: #fafaf9;
    color: #0a0a0a;
    border-radius: 999px;
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.005em;
    text-decoration: none;
    transition: background 0.25s, color 0.25s;
    will-change: transform;
  }
  .cs-cta__btn:hover {
    background: transparent;
    color: #fafaf9;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.55);
  }
  .cs-cta__btn svg {
    transition: transform 0.25s ease;
  }
  .cs-cta__btn:hover svg { transform: translateX(3px); }

  /* ── Responsive ───────────────────────────────────────────────────── */
  @media (max-width: 1024px) {
    .cs-grid__inner { gap: 22px; }
    .case-card.span-7 { grid-column: span 8; }
    .case-card.span-5 { grid-column: span 4; }
    .cs-pillars__grid { gap: 20px; }
  }
  @media (max-width: 768px) {
    .cs-hero {
      min-height: clamp(380px, 60svh, 520px);
      padding: 0 16px;
      padding-bottom: clamp(28px, 4.5vw, 48px);
    }
    .cs-hero-content { padding-top: 96px; }
    .cs-hero-media-img {
      object-position: center 25%;
    }
    .cs-hero-title {
      font-size: clamp(24px, 5.2vw, 38px);
      max-width: 100%;
    }
    .cs-hero-lead { font-size: 14px; }
    .cs-hero-bg-label { transform: none !important; }
    .cs-hero-scrollcue { display: none; }
    .cs-filter__inner { flex-direction: column; align-items: flex-start; gap: 12px; }
    .cs-filter__pills { overflow-x: auto; flex-wrap: nowrap; width: 100%; padding-bottom: 4px; }
    .cs-grid__inner { grid-template-columns: 1fr; }
    .case-card.span-12,
    .case-card.span-7,
    .case-card.span-5,
    .case-card.span-6 { grid-column: 1 / -1; }
    .cs-pillars__grid { grid-template-columns: 1fr; gap: 16px; padding-top: 0; }
    .pillar-connector { display: none; }
    .pillar-card { padding: 24px 22px 22px; }
    .cs-marquee__item { font-size: clamp(22px, 8vw, 32px); gap: 32px; }
    .cs-marquee__track { gap: 36px; }
  }
`;
