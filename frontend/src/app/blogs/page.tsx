// import SiteHeader from "@/components/SiteHeader";
// import SiteFooter from "@/components/SiteFooter";

// export default function BlogsPage() {
//   return (
//     <>
//       <SiteHeader />
//       <main
//         style={{
//           minHeight: "70vh",
//           display: "grid",
//           placeItems: "center",
//           padding: "140px 20px 80px",
//           background: "#fafaf9",
//           color: "#0a0a0a",
//         }}
//       >
//         <h1
//           style={{
//             margin: 0,
//             fontSize: "clamp(34px, 8vw, 64px)",
//             lineHeight: 1.05,
//             letterSpacing: "-0.03em",
//             textAlign: "center",
//             fontWeight: 700,
//           }}
//         >
//           Coming soon
//         </h1>
//       </main>
//       <SiteFooter />
//     </>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

// ── DATA ──────────────────────────────────────────────────────────────────────

const HERO = {
  eyebrow: "Insights — Tech Binaries",
  headline1: "Thinking",
  headline2: "out",
  headlineItalic: "loud.",
  lead: "Engineering notes, product decisions, and the reasoning behind our work. Written by the people who build it.",
};

const CATEGORIES = ["All", "Engineering", "Product", "Performance", "Growth", "Culture"];

const FEATURED = {
  category: "Engineering",
  readTime: "9 min read",
  date: "Apr 28, 2026",
  title: "Why we stopped writing tests first (and what we do instead)",
  excerpt:
    "TDD is sound in theory. In production, with real deadlines and evolving requirements, the calculus changes. Here's how we restructured our QA philosophy without sacrificing correctness.",
  author: {
    name: "Zain Mirza",
    role: "Lead Engineer",
    avatar: "/images/blog/author-zain.jpg",
  },
  cover: "/images/blog/featured-cover.jpg",
  slug: "why-we-stopped-writing-tests-first",
  tags: ["TypeScript", "Testing", "Architecture"],
};

const POSTS = [
  {
    n: "01",
    category: "Performance",
    readTime: "6 min",
    date: "Apr 14, 2026",
    title: "Getting sub-1s LCP on a content-heavy Next.js site",
    excerpt:
      "A field guide to the three changes that moved our median LCP from 2.4s to 0.88s — without touching the design.",
    author: { name: "Sana Qureshi", role: "Frontend Lead" },
    cover: "/images/blog/post-cover-1.jpg",
    slug: "sub-1s-lcp-nextjs",
    tags: ["Next.js", "CWV", "Edge"],
    accent: "#b8c4d4",
  },
  {
    n: "02",
    category: "Product",
    readTime: "8 min",
    date: "Apr 02, 2026",
    title: "The product brief that killed a bad idea in 20 minutes",
    excerpt:
      "We shipped a one-page decision framework that stops features from being built for the wrong reasons. Here's the template.",
    author: { name: "Omar Siddiqui", role: "Product Director" },
    cover: "/images/blog/post-cover-2.jpg",
    slug: "product-brief-killed-bad-idea",
    tags: ["Product", "Frameworks", "Decisions"],
    accent: "#d4c4a8",
  },
  {
    n: "03",
    category: "Engineering",
    readTime: "11 min",
    date: "Mar 22, 2026",
    title: "tRPC in production: the things no tutorial tells you",
    excerpt:
      "After running tRPC in four different codebases, we've hit every edge case. Here's what actually breaks and how to handle it.",
    author: { name: "Zain Mirza", role: "Lead Engineer" },
    cover: "/images/blog/post-cover-3.jpg",
    slug: "trpc-in-production",
    tags: ["tRPC", "TypeScript", "API"],
    accent: "#c4b8a8",
  },
  {
    n: "04",
    category: "Growth",
    readTime: "7 min",
    date: "Mar 10, 2026",
    title: "Attribution is broken. Here's how we work around it.",
    excerpt:
      "Multi-touch attribution models sound scientific. They're mostly fiction. We rebuilt our decision-making around what actually holds up.",
    author: { name: "Hira Baig", role: "Growth Lead" },
    cover: "/images/blog/post-cover-4.jpg",
    slug: "attribution-is-broken",
    tags: ["Analytics", "Growth", "Data"],
    accent: "#a8b8c4",
  },
  {
    n: "05",
    category: "Culture",
    readTime: "5 min",
    date: "Feb 28, 2026",
    title: "How we run async standups for a team across four timezones",
    excerpt:
      "Synchronous standups were eating 30 minutes a day and producing nothing. Our async system costs five minutes and produces actual context.",
    author: { name: "Sana Qureshi", role: "Frontend Lead" },
    cover: "/images/blog/post-cover-5.jpg",
    slug: "async-standups-four-timezones",
    tags: ["Culture", "Process", "Remote"],
    accent: "#b8a8c4",
  },
  {
    n: "06",
    category: "Engineering",
    readTime: "10 min",
    date: "Feb 15, 2026",
    title: "Postgres query tuning: five patterns that fixed our p95",
    excerpt:
      "We went from 800ms p95 to 95ms on a query serving 40k requests/day. Five patterns, no schema changes, no cache layer added.",
    author: { name: "Zain Mirza", role: "Lead Engineer" },
    cover: "/images/blog/post-cover-6.jpg",
    slug: "postgres-query-tuning-p95",
    tags: ["Postgres", "Performance", "DB"],
    accent: "#c4d4b8",
  },
];

const NEWSLETTER = {
  headline: "No noise.",
  headlineAccent: "Just signal.",
  lead: "One email when we publish something worth reading. No digests, no promotions, no cadence for cadence's sake.",
  placeholder: "your@email.com",
  cta: "Subscribe",
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

function splitChars(str: string) {
  return str.split("").map((c, i) => (
    <span key={i} className="bl-char-wrap">
      <span className="bl-char">{c === " " ? "\u00A0" : c}</span>
    </span>
  ));
}

const STREAM_RANDOM_COVERS = [FEATURED.cover, ...POSTS.map((post) => post.cover)];
const STREAM_IMAGE_POSITIONS = ["50% 50%", "50% 28%", "50% 70%", "28% 50%", "72% 50%"];

function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickPostVisual(slug: string) {
  const seed = hashString(slug);
  return {
    cover: STREAM_RANDOM_COVERS[seed % STREAM_RANDOM_COVERS.length],
    objectPosition: STREAM_IMAGE_POSITIONS[seed % STREAM_IMAGE_POSITIONS.length],
  };
}

// ── COMPONENT ────────────────────────────────────────────────────────────────

export default function BlogsPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((p) => p.category === activeCategory);

  // ── HERO ANIMATION ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      const chars = gsap.utils.toArray<HTMLElement>(".bl-char");
      tl.fromTo(
        chars,
        { yPercent: 115, opacity: 0, rotateZ: 3 },
        {
          yPercent: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 1.1,
          stagger: { each: 0.016 },
          ease: "expo.out",
        },
        0
      );
      tl.fromTo(
        ".bl-hero-eyebrow",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        0.05
      );
      tl.fromTo(
        ".bl-hero-lead",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        0.65
      );
      tl.fromTo(
        ".bl-hero-cats",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.75, ease: "expo.out" },
        0.85
      );
      tl.fromTo(
        ".bl-hero-rule",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "expo.inOut" },
        0.3
      );

      // hero parallax
      gsap.to(".bl-hero-bg-label", {
        yPercent: 28,
        ease: "none",
        scrollTrigger: {
          trigger: ".bl-hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });
      gsap.to(".bl-hero-content", {
        yPercent: -14,
        opacity: 0,
        filter: "blur(6px)",
        ease: "none",
        scrollTrigger: {
          trigger: ".bl-hero",
          start: "30% top",
          end: "bottom 20%",
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // ── FEATURED REVEAL ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bl-featured-label",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: { trigger: ".bl-featured", start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        ".bl-featured-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".bl-featured-card", start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        ".bl-featured-image",
        { scale: 1.06 },
        {
          scale: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: ".bl-featured-card", start: "top 85%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // ── GRID POSTS REVEAL ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".bl-stream-row").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "expo.out",
            delay: (i % 2) * 0.07,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      gsap.fromTo(".bl-grid-eyebrow--stream", { opacity: 0, y: 18 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: { trigger: ".bl-stream", start: "top 80%", once: true },
      });
    });
    return () => ctx.revert();
  }, [activeCategory]);

  // ── STREAM PIN + INTERNAL SCROLL (desktop) ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1101px) and (prefers-reduced-motion: no-preference)", () => {
        const section = document.querySelector<HTMLElement>(".bl-stream");
        const board = document.querySelector<HTMLElement>(".bl-stream-board");
        const viewport = document.querySelector<HTMLElement>(".bl-stream-scroll-viewport");
        const track = document.querySelector<HTMLElement>(".bl-stream-scroll-track");

        if (!section || !board || !viewport || !track) return;

        const getScrollDistance = () => Math.max(0, track.scrollHeight - viewport.clientHeight);
        const tween = gsap.fromTo(
          track,
          { y: 0 },
          {
            y: () => -getScrollDistance(),
            duration: 1,
            ease: "none",
          }
        );

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance() + window.innerHeight * 0.35}`,
          pin: board,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
          animation: tween,
          anticipatePin: 1,
        });
      });
    });

    return () => ctx.revert();
  }, [activeCategory]);

  // ── NEWSLETTER REVEAL ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bl-nl-inner",
        { opacity: 0, scale: 0.96, y: 36 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".bl-nl", start: "top 80%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Fonts refresh
  useEffect(() => {
    document.fonts?.ready?.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9997,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          opacity: 0.028,
          mixBlendMode: "multiply",
        }}
      />

      <div style={{ background: "#fafaf9", color: "#0a0a0a", fontFamily: "var(--font-body)", overflowX: "hidden" }}>
        <SiteHeader />

        {/* ════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════ */}
        <section ref={heroRef} className="bl-hero" aria-labelledby="bl-hero-title">
          <div className="bl-hero-bg" aria-hidden>
            <div className="bl-hero-media">
              <Image
                src="/images/blogs/blogs-hero.png"
                alt=""
                fill
                priority
                sizes="100vw"
                className="bl-hero-media-img"
              />
            </div>
            <div className="bl-hero-media-overlay" />
            <div className="bl-hero-grid-pattern" />
            <div className="bl-hero-bg-label" aria-hidden>Blog</div>
          </div>

          <div className="bl-hero-content">
            <div className="bl-hero-inner">
              <span className="bl-hero-eyebrow" style={{ opacity: 0 }}>
                <span className="bl-hero-eyebrow-dot" />
                {HERO.eyebrow}
              </span>

              <h1 id="bl-hero-title" className="bl-hero-title">
                <span className="bl-hero-line">
                  {splitChars(HERO.headline1)}
                </span>
                <span className="bl-hero-line">
                  {splitChars(HERO.headline2)}
                  {splitChars(" ")}
                  <span className="bl-hero-italic">
                    {splitChars(HERO.headlineItalic)}
                  </span>
                </span>
              </h1>

              <p className="bl-hero-lead" style={{ opacity: 0 }}>
                {HERO.lead}
              </p>

              <div className="bl-hero-rule" />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            FEATURED POST
        ════════════════════════════════════════════════ */}
        <section className="bl-featured" aria-labelledby="bl-featured-title">
          <div className="bl-featured-inner">
            <div className="bl-featured-label">
              <span className="bl-featured-label-dot" aria-hidden />
              <span>Featured</span>
            </div>

            <article className="bl-featured-card">
              <Link href={`/blog/${FEATURED.slug}`} className="bl-featured-figure-link">
                <figure className="bl-featured-figure">
                  <div className="bl-featured-figure-mask">
                    <div className="bl-featured-image-wrap">
                      <Image
                        src={FEATURED.cover}
                        alt={FEATURED.title}
                        fill
                        priority
                        sizes="(max-width: 900px) 100vw, 52vw"
                        className="bl-featured-image"
                      />
                      <div className="bl-featured-figure-overlay" />
                    </div>
                  </div>
                  <div className="bl-featured-figure-meta">
                    <span className="bl-tag">{FEATURED.category}</span>
                    <span className="bl-featured-time">{FEATURED.readTime}</span>
                  </div>
                </figure>
              </Link>

              <div className="bl-featured-sheet">
                <header className="bl-featured-sheet-head">
                  <div className="bl-featured-meta-row">
                    <time className="bl-post-date">{FEATURED.date}</time>
                    <span className="bl-meta-sep" aria-hidden>·</span>
                    <span className="bl-post-read">{FEATURED.readTime}</span>
                  </div>
                  <h2 id="bl-featured-title" className="bl-featured-title">
                    <Link href={`/blog/${FEATURED.slug}`} className="bl-featured-title-link">
                      {FEATURED.title}
                    </Link>
                  </h2>
                  <p className="bl-featured-excerpt">{FEATURED.excerpt}</p>
                </header>

                <div className="bl-featured-tags">
                  {FEATURED.tags.map((t) => (
                    <span key={t} className="bl-pill">{t}</span>
                  ))}
                </div>

                <footer className="bl-featured-footer">
                  <div className="bl-author">
                    <div className="bl-author-avatar">
                      <span className="bl-author-avatar-initials">
                        {FEATURED.author.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="bl-author-info">
                      <span className="bl-author-name">{FEATURED.author.name}</span>
                      <span className="bl-author-role">{FEATURED.author.role}</span>
                    </div>
                  </div>

                  <Link href={`/blog/${FEATURED.slug}`} className="bl-read-btn">
                    <span className="bl-read-btn-label">Read article</span>
                    <span className="bl-read-btn-arrow" aria-hidden>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M8.5 3.5L13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </footer>
              </div>
            </article>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            ARTICLES STREAM + STICKY RAIL
        ════════════════════════════════════════════════ */}
        <section className="bl-stream" aria-labelledby="bl-stream-title">
          <div className="bl-stream-inner">
            <div className="bl-stream-header">
              <div className="bl-grid-eyebrow bl-grid-eyebrow--stream">
                <span className="bl-grid-eyebrow-mark" aria-hidden />
                <span id="bl-stream-title">Recent Articles</span>
              </div>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="bl-empty">
                <span className="bl-empty-label">No posts in this category yet.</span>
              </div>
            ) : (
              <div className="bl-stream-board">
                <div className="bl-stream-main">
                  <div className="bl-stream-scroll-viewport">
                    <div className="bl-stream-scroll-track">
                      {filteredPosts.map((post) => {
                        const visual = pickPostVisual(post.slug);
                        return (
                        <article
                          key={post.slug}
                          className="bl-stream-row"
                        >
                          <div className="bl-stream-row-main">
                            <div className="bl-stream-row-top">
                              <div className="bl-stream-row-meta">
                                <time className="bl-post-date">{post.date}</time>
                                <span className="bl-meta-sep" aria-hidden>·</span>
                                <span className="bl-post-read">{post.readTime}</span>
                              </div>
                              <span className="bl-tag bl-tag--stream">{post.category}</span>
                            </div>

                            <h3 className="bl-stream-row-title">
                              <Link href={`/blog/${post.slug}`} className="bl-stream-row-title-link">
                                {post.title}
                              </Link>
                            </h3>
                            <p className="bl-stream-row-excerpt">{post.excerpt}</p>

                            <div className="bl-stream-row-bottom">
                              <div className="bl-stream-row-bottom-left">
                                <span className="bl-stream-author">{post.author.name}</span>
                                <div className="bl-stream-tags">
                                  {post.tags.slice(0, 2).map((tag) => (
                                    <span key={tag} className="bl-pill bl-pill--sm">{tag}</span>
                                  ))}
                                </div>
                              </div>
                              <Link href={`/blog/${post.slug}`} className="bl-stream-read" aria-label={`Read ${post.title}`}>
                                Read article <span aria-hidden>→</span>
                              </Link>
                            </div>
                          </div>

                          <Link href={`/blog/${post.slug}`} className="bl-stream-thumb-link" aria-label={`Open ${post.title}`}>
                            <figure className="bl-stream-thumb">
                              <Image
                                src={visual.cover}
                                alt={post.title}
                                fill
                                sizes="(max-width: 1100px) 100vw, 280px"
                                className="bl-stream-thumb-img"
                                style={{ objectPosition: visual.objectPosition }}
                              />
                              <div className="bl-stream-thumb-overlay" />
                              <span className="bl-stream-thumb-num">{post.n}</span>
                            </figure>
                          </Link>
                        </article>
                      )})}
                    </div>
                  </div>
                </div>

                <aside className="bl-stream-aside" aria-label="Blog sidebar">
                  <div className="bl-side-card bl-side-news">
                    <h3 className="bl-side-title">Stay informed</h3>
                    <p className="bl-side-copy">
                      Get practical insights, regulatory updates, and strategic notes delivered directly to your inbox.
                    </p>
                    <form
                      className="bl-side-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (email) setSubscribed(true);
                      }}
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="bl-side-input"
                        required
                        aria-label="Sidebar email address"
                      />
                      <button type="submit" className="bl-side-btn">
                        {subscribed ? "Subscribed" : "Subscribe"}
                      </button>
                    </form>
                  </div>

                  <div className="bl-side-card">
                    <h4 className="bl-side-heading">Trending Topics</h4>
                    <div className="bl-side-topics">
                      {Array.from(new Set(POSTS.flatMap((p) => p.tags))).slice(0, 8).map((topic) => (
                        <span key={topic} className="bl-side-topic">#{topic}</span>
                      ))}
                    </div>
                  </div>

                  <div className="bl-side-card">
                    <h4 className="bl-side-heading">By the numbers</h4>
                    <div className="bl-side-stats">
                      <div className="bl-side-stat">
                        <strong>{POSTS.length}+ </strong>
                        <span>articles published</span>
                      </div>
                      <div className="bl-side-stat">
                        <strong>{CATEGORIES.length - 1}+ </strong>
                        <span>active categories</span>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            NEWSLETTER
        ════════════════════════════════════════════════ */}
        <section className="bl-nl" aria-labelledby="bl-nl-title">
          <div className="bl-nl-bg" aria-hidden>
            <div className="bl-nl-orb bl-nl-orb-a" />
            <div className="bl-nl-orb bl-nl-orb-b" />
            <div className="bl-nl-grid" />
            <div className="bl-nl-vignette" />
          </div>

          <div className="bl-nl-inner">
            <div className="bl-nl-text">
              <h2 id="bl-nl-title" className="bl-nl-headline">
                {NEWSLETTER.headline}{" "}
                <span className="bl-nl-italic">{NEWSLETTER.headlineAccent}</span>
              </h2>
              <p className="bl-nl-lead">{NEWSLETTER.lead}</p>
            </div>

            {!subscribed ? (
              <form
                className="bl-nl-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubscribed(true);
                }}
              >
                <div className="bl-nl-input-wrap">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={NEWSLETTER.placeholder}
                    className="bl-nl-input"
                    required
                    aria-label="Email address"
                  />
                  <button type="submit" className="bl-nl-btn">
                    <span className="bl-nl-btn-label">{NEWSLETTER.cta}</span>
                    <span className="bl-nl-btn-arrow" aria-hidden>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M8.5 3.5L13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </div>
                <p className="bl-nl-disclaimer">No spam. Unsubscribe any time.</p>
              </form>
            ) : (
              <div className="bl-nl-success">
                <span className="bl-nl-success-icon" aria-hidden>✓</span>
                <span className="bl-nl-success-text">You're in. We'll be in touch when it's worth it.</span>
              </div>
            )}
          </div>
        </section>

        <SiteFooter />
      </div>

      <style>{`
        /* ═══════════════════════════════════════
           SHARED TOKENS
        ═══════════════════════════════════════ */
        .bl-tag {
          display: inline-flex;
          align-items: center;
          height: 26px;
          padding: 0 10px;
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.72);
          background: rgba(10,10,10,0.07);
          border: 1px solid rgba(10,10,10,0.1);
          border-radius: 4px;
        }
        .bl-pill {
          display: inline-flex;
          align-items: center;
          height: 24px;
          padding: 0 9px;
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.58);
          border: 1px solid rgba(10,10,10,0.14);
          border-radius: 4px;
          background: transparent;
        }
        .bl-pill--sm {
          height: 21px;
          font-size: 8.5px;
          padding: 0 7px;
        }
        .bl-post-date {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: rgba(10,10,10,0.5);
        }
        .bl-post-read {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: rgba(10,10,10,0.5);
        }
        .bl-meta-sep {
          color: rgba(10,10,10,0.3);
          font-size: 13px;
        }

        /* Char animation */
        .bl-char-wrap {
          display: inline-block;
          overflow: hidden;
          line-height: 1;
          padding-bottom: 0.12em;
        }
        .bl-char {
          display: inline-block;
          will-change: transform, opacity;
        }

        /* ═══════════════════════════════════════
           HERO
        ═══════════════════════════════════════ */
        .bl-hero {
          position: relative;
          min-height: min(88vh, 860px);
          background: #0a0a0a;
          color: #fafaf9;
          overflow: hidden;
          isolation: isolate;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding-bottom: clamp(56px, 8vw, 88px);
        }
        .bl-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .bl-hero-media {
          position: absolute;
          inset: 0;
        }
        .bl-hero-media-img {
          object-fit: cover;
          object-position: center 30%;
          filter: saturate(0.72) contrast(1.05);
          transform: scale(1.03);
        }
        .bl-hero-media-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.5) 32%, rgba(8,8,8,0.82) 100%),
            linear-gradient(90deg, rgba(8,8,8,0.46) 0%, transparent 58%);
        }
        .bl-hero-grid-pattern {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 70% 80% at 50% 60%, black 20%, transparent 90%);
          -webkit-mask-image: radial-gradient(ellipse 70% 80% at 50% 60%, black 20%, transparent 90%);
        }
        .bl-hero-bg-label {
          position: absolute;
          bottom: -6%;
          right: -2%;
          font-family: var(--font-display);
          font-size: clamp(160px, 22vw, 320px);
          font-weight: 600;
          letter-spacing: -0.08em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.05);
          line-height: 0.85;
          user-select: none;
          will-change: transform;
          pointer-events: none;
        }
        .bl-hero-content {
          position: relative;
          z-index: 2;
          padding-top: clamp(132px, 16vh, 188px);
          will-change: transform, opacity, filter;
        }
        .bl-hero-inner {
          max-width: 1320px;
          margin: 0 auto;
          width: 100%;
        }
        .bl-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 24px;
        }
        .bl-hero-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.6);
          box-shadow: 0 0 0 3px rgba(255,255,255,0.1);
          animation: bl-pulse 2.4s ease-in-out infinite;
        }
        @keyframes bl-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 0 7px rgba(255,255,255,0.02); }
        }
        .bl-hero-title {
          font-family: var(--font-display);
          font-size: clamp(54px, 8.2vw, 118px);
          font-weight: 400;
          letter-spacing: -0.05em;
          line-height: 0.9;
          margin: 0 0 clamp(20px, 2.8vw, 30px);
          color: #fff;
          display: flex;
          flex-direction: column;
          text-shadow: 0 18px 52px rgba(0,0,0,0.45);
        }
        .bl-hero-line {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          overflow: visible;
        }
        .bl-hero-italic {
          font-style: italic;
          font-weight: 300;
          color: rgba(255,255,255,0.9);
          display: inline-flex;
          flex-wrap: nowrap;
          align-items: baseline;
          padding: 0 0.04em;
          background: linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%);
          border-radius: 0.1em;
        }
        .bl-hero-italic .bl-char-wrap { overflow: visible; }
        .bl-hero-lead {
          font-size: clamp(15px, 1.2vw, 17px);
          line-height: 1.7;
          color: rgba(255,255,255,0.82);
          margin: 0 0 clamp(22px, 3vw, 30px);
          max-width: 56ch;
        }
        .bl-hero-panel {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          align-items: stretch;
          gap: 12px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.18);
          background: linear-gradient(180deg, rgba(16,16,16,0.58) 0%, rgba(16,16,16,0.68) 100%);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 14px clamp(14px, 2vw, 22px);
          box-shadow: 0 18px 44px -20px rgba(0,0,0,0.6);
          max-width: 1180px;
        }
        .bl-hero-panel-head {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;
        }
        .bl-hero-panel-label {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }
        .bl-hero-rule {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.16);
          margin-bottom: 0;
          transform-origin: left center;
          will-change: transform;
        }
        /* Category filter */
        .bl-hero-cats {
          display: block;
        }
        .bl-hero-cats-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          flex: 1;
          min-width: 0;
        }
        .bl-hero-panel-controls {
          display: flex;
          align-items: center;
          gap: 14px;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .bl-cat-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 36px;
          padding: 0 16px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          cursor: pointer;
          transition:
            color 0.35s ease,
            background 0.35s ease,
            border-color 0.35s ease,
            transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bl-cat-btn:hover {
          color: rgba(255,255,255,0.9);
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.22);
        }
        .bl-cat-btn.is-active {
          color: #0a0a0a;
          background: #fafaf9;
          border-color: #fafaf9;
        }
        .bl-cat-btn-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #0a0a0a;
          flex-shrink: 0;
        }
        .bl-hero-panel-cta {
          height: 40px;
          padding: 0 20px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #fc3eff 0%, #c904b6 100%);
          color: #fff;
          font-family: var(--font-display);
          font-size: 14px;
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;
          box-shadow: 0 14px 24px -14px rgba(231, 23, 209, 0.75);
        }
        .bl-hero-panel-cta:hover {
          transform: translateY(-1px);
          filter: brightness(1.06);
        }

        /* ═══════════════════════════════════════
           FEATURED
        ═══════════════════════════════════════ */
        .bl-featured {
          background: linear-gradient(180deg, #f7f7f6 0%, #fbfbfb 100%);
          padding: clamp(64px, 9vw, 104px) 24px;
          border-top: 1px solid rgba(10,10,10,0.08);
        }
        .bl-featured-inner {
          max-width: 1320px;
          margin: 0 auto;
          width: 100%;
        }
        .bl-featured-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.55);
          margin-bottom: 28px;
        }
        .bl-featured-label-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0a0a0a;
          box-shadow: 0 0 0 3px rgba(10,10,10,0.1);
          animation: bl-pulse-dark 2.4s ease-in-out infinite;
        }
        @keyframes bl-pulse-dark {
          0%, 100% { box-shadow: 0 0 0 3px rgba(10,10,10,0.1); }
          50% { box-shadow: 0 0 0 7px rgba(10,10,10,0.02); }
        }
        .bl-featured-card {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          border-radius: 16px;
          border: 1px solid rgba(10,10,10,0.1);
          background: #fff;
          overflow: hidden;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.9) inset,
            0 32px 72px -40px rgba(10,10,10,0.18);
          min-height: 500px;
          transition:
            box-shadow 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bl-featured-card:hover {
          box-shadow:
            0 1px 0 rgba(255,255,255,0.9) inset,
            0 48px 96px -40px rgba(10,10,10,0.26);
          transform: translateY(-3px);
        }
        .bl-featured-figure-link {
          display: block;
          height: 100%;
          text-decoration: none;
        }
        .bl-featured-figure {
          position: relative;
          margin: 0;
          height: 100%;
          min-height: 400px;
          background: #1a1a1a;
          overflow: hidden;
        }
        .bl-featured-figure-mask {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .bl-featured-image-wrap {
          position: absolute;
          inset: 0;
        }
        .bl-featured-image {
          object-fit: cover;
          object-position: center;
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
          filter: saturate(0.85);
        }
        .bl-featured-card:hover .bl-featured-image {
          transform: scale(1.04);
        }
        .bl-featured-figure-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.55) 100%),
            linear-gradient(90deg, rgba(10,10,10,0.4) 0%, transparent 60%);
          pointer-events: none;
        }
        .bl-featured-figure-meta {
          position: absolute;
          bottom: 20px;
          left: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 2;
        }
        .bl-featured-figure-meta .bl-tag {
          color: rgba(255,255,255,0.9);
          background: rgba(10,10,10,0.55);
          border-color: rgba(255,255,255,0.18);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .bl-featured-time {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          backdrop-filter: blur(8px);
          background: rgba(10,10,10,0.35);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 4px;
          padding: 0 8px;
          height: 26px;
          display: inline-flex;
          align-items: center;
        }
        .bl-featured-sheet {
          padding: clamp(32px, 3.5vw, 52px);
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 2.2vw, 28px);
          justify-content: space-between;
        }
        .bl-featured-sheet-head {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .bl-featured-meta-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bl-featured-title {
          font-family: var(--font-display);
          font-size: clamp(24px, 2.6vw, 38px);
          font-weight: 500;
          letter-spacing: -0.034em;
          line-height: 1.1;
          margin: 0;
          color: #0a0a0a;
        }
        .bl-featured-title-link {
          text-decoration: none;
          color: inherit;
          transition: opacity 0.3s ease;
        }
        .bl-featured-title-link:hover { opacity: 0.72; }
        .bl-featured-excerpt {
          font-size: clamp(14px, 1.1vw, 16px);
          line-height: 1.68;
          color: rgba(10,10,10,0.62);
          margin: 0;
          max-width: 52ch;
        }
        .bl-featured-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .bl-featured-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding-top: clamp(16px, 2vw, 24px);
          border-top: 1px solid rgba(10,10,10,0.1);
          flex-wrap: wrap;
        }
        .bl-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .bl-author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a1a1a, #333);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 2px solid rgba(10,10,10,0.1);
        }
        .bl-author-avatar-initials {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.02em;
        }
        .bl-author-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .bl-author-name {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.012em;
          color: #0a0a0a;
        }
        .bl-author-role {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.5);
        }
        .bl-read-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 13px 22px;
          background: #0a0a0a;
          color: #fafaf9;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
          border-radius: 999px;
          text-decoration: none;
          flex-shrink: 0;
          transition:
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.3s ease;
        }
        .bl-read-btn:hover {
          transform: scale(1.05);
          background: #1a1a1a;
        }
        .bl-read-btn-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bl-read-btn:hover .bl-read-btn-arrow { transform: translateX(3px); }

        /* ═══════════════════════════════════════
           ARTICLES STREAM
        ═══════════════════════════════════════ */
        .bl-stream {
          background: linear-gradient(180deg, #f2f2f1 0%, #f7f7f6 100%);
          padding: clamp(56px, 8vw, 96px) 24px clamp(80px, 12vw, 140px);
          border-top: 1px solid rgba(10,10,10,0.07);
        }
        .bl-stream-inner {
          max-width: 1320px;
          margin: 0 auto;
          width: 100%;
        }
        .bl-stream-header {
          margin-bottom: clamp(30px, 4vw, 42px);
        }
        .bl-grid-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.55);
        }
        .bl-grid-eyebrow-mark {
          display: inline-block;
          width: 28px;
          height: 1px;
          background: rgba(10,10,10,0.4);
        }
        .bl-stream-board {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: clamp(18px, 2.1vw, 28px);
          align-items: start;
        }
        .bl-stream-main {
          border: 1px solid rgba(10,10,10,0.08);
          background: #fbfbfa;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 22px 50px -34px rgba(10,10,10,0.24);
        }
        .bl-stream-scroll-viewport {
          height: min(77vh, 760px);
          overflow: hidden;
        }
        .bl-stream-scroll-track {
          display: flex;
          flex-direction: column;
        }
        .bl-stream-row {
          position: relative;
          padding: clamp(16px, 2vw, 22px);
          border-bottom: 1px solid rgba(10,10,10,0.07);
          background: #fbfbfa;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(320px, 36%);
          gap: clamp(14px, 1.8vw, 22px);
          align-items: stretch;
          transition: background 0.3s ease, box-shadow 0.35s ease;
          will-change: transform, opacity;
        }
        .bl-stream-row::before {
          content: "";
          position: absolute;
          left: 0;
          top: 16px;
          bottom: 16px;
          width: 3px;
          border-radius: 99px;
          background: linear-gradient(180deg, rgba(10,10,10,0.16) 0%, rgba(10,10,10,0.3) 100%);
          opacity: 0.5;
          transition: opacity 0.35s ease, width 0.35s ease;
        }
        .bl-stream-row:hover {
          background: #fff;
          box-shadow: inset 0 0 0 1px rgba(10,10,10,0.05);
        }
        .bl-stream-row:hover::before {
          opacity: 0.9;
          width: 5px;
        }
        .bl-stream-row:last-child {
          border-bottom: none;
        }
        .bl-stream-row-main {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 8px 6px 8px 14px;
          justify-content: center;
        }
        .bl-stream-row-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }
        .bl-stream-row-meta {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .bl-tag--stream {
          height: 24px;
          font-size: 9px;
        }
        .bl-stream-row-title {
          font-family: var(--font-display);
          font-size: clamp(24px, 2.3vw, 33px);
          font-weight: 500;
          letter-spacing: -0.032em;
          line-height: 1.1;
          margin: 0 0 10px;
          color: #0a0a0a;
          max-width: 21ch;
        }
        .bl-stream-row-title-link {
          text-decoration: none;
          color: inherit;
          transition: opacity 0.3s ease;
        }
        .bl-stream-row-title-link:hover {
          opacity: 0.68;
        }
        .bl-stream-row-excerpt {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(10,10,10,0.6);
          margin: 0;
          max-width: 62ch;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .bl-stream-row-bottom {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .bl-stream-row-bottom-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .bl-stream-author {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.55);
        }
        .bl-stream-tags {
          display: flex;
          gap: 6px;
          align-items: center;
          flex-wrap: wrap;
        }
        .bl-stream-read {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-family: var(--font-display);
          font-size: 14px;
          color: #0a0a0a;
          transition: gap 0.3s ease;
        }
        .bl-stream-read:hover {
          gap: 12px;
        }
        .bl-stream-thumb-link {
          display: block;
          text-decoration: none;
        }
        .bl-stream-thumb {
          position: relative;
          margin: 0;
          height: 100%;
          min-height: 250px;
          border-radius: 12px;
          overflow: hidden;
          background: #dcdcdc;
          border: 1px solid rgba(10,10,10,0.08);
          box-shadow: 0 14px 30px -22px rgba(10,10,10,0.42);
        }
        .bl-stream-thumb-img {
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          filter: saturate(0.95) contrast(1.07);
        }
        .bl-stream-row:hover .bl-stream-thumb-img {
          transform: scale(1.06);
        }
        .bl-stream-thumb-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10,10,10,0.02) 0%, rgba(10,10,10,0.42) 100%);
          pointer-events: none;
        }
        .bl-stream-thumb-num {
          position: absolute;
          left: 10px;
          bottom: 10px;
          height: 24px;
          min-width: 30px;
          border-radius: 999px;
          padding: 0 9px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.92);
          background: rgba(10,10,10,0.45);
          border: 1px solid rgba(255,255,255,0.2);
        }

        .bl-stream-aside {
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: sticky;
          top: calc(var(--header-h, 84px) + 14px);
        }
        .bl-side-card {
          border: 1px solid rgba(10,10,10,0.08);
          border-radius: 14px;
          background: #fbfbfa;
          padding: 18px;
          box-shadow: 0 14px 34px -28px rgba(10,10,10,0.25);
        }
        .bl-side-news {
          background: linear-gradient(165deg, #0b1d53 0%, #101a43 100%);
          color: #fafaf9;
          border-color: rgba(255,255,255,0.12);
        }
        .bl-side-title {
          margin: 0 0 9px;
          font-family: var(--font-display);
          font-size: 20px;
          letter-spacing: -0.02em;
        }
        .bl-side-copy {
          margin: 0 0 14px;
          font-size: 12.5px;
          line-height: 1.6;
          color: rgba(250,250,249,0.74);
        }
        .bl-side-form {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .bl-side-input {
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.08);
          color: #fff;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 12px;
          outline: none;
        }
        .bl-side-input::placeholder {
          color: rgba(255,255,255,0.52);
        }
        .bl-side-btn {
          border: none;
          border-radius: 8px;
          background: #fafaf9;
          color: #0a0a0a;
          font-family: var(--font-display);
          font-size: 12px;
          padding: 10px 12px;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }
        .bl-side-btn:hover { opacity: 0.9; }
        .bl-side-heading {
          margin: 0 0 12px;
          font-family: var(--font-display);
          font-size: 19px;
          letter-spacing: -0.02em;
          color: #0a0a0a;
        }
        .bl-side-topics {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .bl-side-topic {
          padding: 6px 9px;
          border-radius: 999px;
          border: 1px solid rgba(10,10,10,0.08);
          background: #f0f0ef;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.04em;
          color: rgba(10,10,10,0.65);
        }
        .bl-side-stats {
          display: grid;
          gap: 12px;
        }
        .bl-side-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .bl-side-stat strong {
          font-family: var(--font-display);
          font-size: 40px;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #0a0a0a;
          font-weight: 500;
        }
        .bl-side-stat span {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.48);
        }

        .bl-empty {
          padding: 80px 24px;
          text-align: center;
        }
        .bl-empty-label {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 500;
          letter-spacing: -0.02em;
          font-style: italic;
          color: rgba(10,10,10,0.4);
        }

        /* ═══════════════════════════════════════
           NEWSLETTER
        ═══════════════════════════════════════ */
        .bl-nl {
          position: relative;
          padding: clamp(96px, 14vw, 160px) 24px clamp(96px, 14vw, 160px);
          background: #0a0a0a;
          color: #fafaf9;
          overflow: hidden;
          isolation: isolate;
        }
        .bl-nl-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .bl-nl-orb {
          position: absolute;
          width: 50vw;
          height: 50vw;
          max-width: 600px;
          max-height: 600px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
        }
        .bl-nl-orb-a {
          top: -15%;
          left: -10%;
          background: radial-gradient(circle, rgba(120,140,180,0.3) 0%, transparent 70%);
          animation: bl-orb-a 16s ease-in-out infinite alternate;
        }
        .bl-nl-orb-b {
          bottom: -20%;
          right: -8%;
          background: radial-gradient(circle, rgba(180,160,140,0.28) 0%, transparent 70%);
          animation: bl-orb-b 20s ease-in-out infinite alternate;
        }
        @keyframes bl-orb-a {
          0% { transform: translate(0, 0); }
          100% { transform: translate(5%, -8%); }
        }
        @keyframes bl-orb-b {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-6%, 10%); }
        }
        .bl-nl-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.024) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.024) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 80% 100% at 50% 50%, black 20%, transparent 90%);
          -webkit-mask-image: radial-gradient(ellipse 80% 100% at 50% 50%, black 20%, transparent 90%);
        }
        .bl-nl-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 90% 70% at 50% 50%, transparent 30%, rgba(10,10,10,0.42) 100%);
        }
        .bl-nl-inner {
          position: relative;
          z-index: 2;
          max-width: 1080px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
          will-change: transform, opacity;
        }
        .bl-nl-headline {
          font-family: var(--font-display);
          font-size: clamp(40px, 5.5vw, 80px);
          font-weight: 400;
          letter-spacing: -0.045em;
          line-height: 0.98;
          margin: 0 0 18px;
          color: #fff;
        }
        .bl-nl-italic {
          font-style: italic;
          font-weight: 300;
          color: rgba(255,255,255,0.72);
        }
        .bl-nl-lead {
          font-size: clamp(14px, 1.1vw, 16px);
          line-height: 1.7;
          color: rgba(255,255,255,0.56);
          margin: 0;
          max-width: 46ch;
        }
        .bl-nl-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .bl-nl-input-wrap {
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          padding: 5px 5px 5px 22px;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .bl-nl-input-wrap:focus-within {
          border-color: rgba(255,255,255,0.36);
          background: rgba(255,255,255,0.08);
        }
        .bl-nl-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 400;
          letter-spacing: -0.01em;
          color: #fafaf9;
          min-width: 0;
        }
        .bl-nl-input::placeholder { color: rgba(255,255,255,0.3); }
        .bl-nl-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background: #fafaf9;
          color: #0a0a0a;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          flex-shrink: 0;
          transition:
            transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.3s ease;
        }
        .bl-nl-btn:hover {
          transform: scale(1.04);
          background: #fff;
        }
        .bl-nl-btn-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #0a0a0a;
          color: #fafaf9;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bl-nl-btn:hover .bl-nl-btn-arrow { transform: translateX(3px); }
        .bl-nl-disclaimer {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin: 0;
          padding-left: 8px;
        }
        .bl-nl-success {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px 28px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 12px;
        }
        .bl-nl-success-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: rgba(255,255,255,0.85);
          flex-shrink: 0;
        }
        .bl-nl-success-text {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 400;
          font-style: italic;
          letter-spacing: -0.014em;
          color: rgba(255,255,255,0.78);
        }

        /* ═══════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════ */
        @media (max-width: 1100px) {
          .bl-stream-board {
            grid-template-columns: 1fr;
          }
          .bl-stream-scroll-viewport {
            height: auto;
            overflow: visible;
          }
          .bl-stream-scroll-track {
            gap: 0;
          }
          .bl-stream-aside {
            position: static;
            top: auto;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .bl-featured-card {
            grid-template-columns: 1fr 1fr;
          }
          .bl-hero-panel-cta {
            width: 100%;
          }
          .bl-hero-panel-controls {
            flex-direction: column;
            align-items: stretch;
          }
        }
        @media (max-width: 900px) {
          .bl-featured-card {
            grid-template-columns: 1fr;
          }
          .bl-featured-figure { min-height: 300px; }
          .bl-nl-inner {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .bl-stream-aside {
            grid-template-columns: 1fr;
          }
          .bl-stream-row-title {
            max-width: 100%;
            font-size: clamp(24px, 7vw, 34px);
          }
          .bl-stream-row {
            grid-template-columns: 1fr;
          }
          .bl-stream-row-main {
            padding-left: 10px;
          }
          .bl-stream-thumb {
            min-height: 260px;
          }
          .bl-hero {
            min-height: min(78vh, 720px);
          }
          .bl-nl-lead { max-width: 100%; }
        }
        @media (max-width: 700px) {
          .bl-hero { padding: 0 16px; min-height: 74svh; }
          .bl-hero-title { font-size: clamp(44px, 13vw, 72px); }
          .bl-hero-cats-nav { gap: 6px; }
          .bl-cat-btn { height: 32px; font-size: 9.5px; padding: 0 12px; }
          .bl-hero-lead { font-size: 14px; }
          .bl-hero-panel {
            border-radius: 10px;
            padding: 12px;
            gap: 10px;
          }
          .bl-featured { padding-inline: 16px; }
          .bl-featured-sheet { padding: 24px 20px; }
          .bl-stream { padding-inline: 16px; }
          .bl-stream-row {
            padding: 20px 16px;
          }
          .bl-stream-row-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
          .bl-stream-row-main {
            padding: 0;
          }
          .bl-stream-thumb {
            min-height: 220px;
          }
          .bl-nl { padding-inline: 16px; }
          .bl-nl-headline { font-size: clamp(32px, 10vw, 56px); }
          .bl-nl-input-wrap { flex-direction: column; border-radius: 12px; padding: 14px 16px; gap: 12px; }
          .bl-nl-input { font-size: 14px; }
          .bl-nl-btn { width: 100%; justify-content: center; border-radius: 8px; }
          .bl-featured-footer { flex-direction: column; align-items: flex-start; }
          .bl-read-btn { width: 100%; justify-content: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bl-char { transform: none !important; opacity: 1 !important; }
          .bl-hero-bg-label { transform: none !important; }
          .bl-hero-content { transform: none !important; opacity: 1 !important; filter: none !important; }
          .bl-stream-row:hover { transform: none; }
          .bl-featured-card:hover { transform: none; }
          .bl-nl-orb { animation: none; }
          .bl-hero-eyebrow-dot, .bl-featured-label-dot { animation: none; }
        }
      `}</style>
    </>
  );
}