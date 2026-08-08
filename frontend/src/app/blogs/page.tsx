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
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { loadGsapWithScrollTrigger, runAfterInteractive } from "@/lib/animation/loaders";

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
  category: "Newsroom",
  readTime: "12 min read",
  date: "May 8, 2026",
  title: "What Is Vibe Coding? The Guide for Founders Deciding How to Build",
  excerpt:
    "Vibe coding means describing what you want in plain language and letting an AI model write the code. It is fast for prototypes, and increasingly risky once real users, real data, or real money are involved.",
  author: {
    name: "Senior Content Strategist",
    role: "Tech Binaries Editorial",
    avatar: "/images/blog/author-zain.jpg",
  },
  cover: "/blogs/what-is-vibe-coding.jpg",
  slug: "state-of-software-development-2026",
  tags: ["Vibe Coding", "AI Development", "Engineering"],
};

const POSTS = [
  {
    n: "01",
    category: "Engineering",
    readTime: "10 min",
    date: "May 15, 2026",
    title: "Vibe Coding Pros and Cons in 2026: What Businesses Need to Know Before They Build",
    excerpt:
      "Vibe coding lets you build software by describing what you want in plain language instead of writing every line yourself. It is fast, it is cheap, and in 2026 it is everywhere. But speed and reliability rarely arrive together, and that tension is exactly what this article breaks down. Vibe coding is excellent for prototypes and internal tools, but it becomes a liability the moment real users, real data, or real money enter the picture. For anything in that second category, you need engineering discipline behind the AI, not just the AI itself.",
    author: { name: "Senior Content Strategist", role: "Tech Binaries Editorial" },
    cover: "/blogs/vibe-coding-pros-and-cons-2026.jpg",
    slug: "vibe-coding-pros-and-cons-2026",
    tags: ["Vibe Coding", "AI Development", "Business"],
    accent: "#b8c4d4",
  },
  {
    n: "02",
    category: "Engineering",
    readTime: "11 min",
    date: "May 22, 2026",
    title: "Vibe Coding vs. Custom Software Development: What the 2026 Data Actually Shows",
    excerpt:
      "Ninety-two percent of developers in the US now use AI coding tools every day. Only 29 to 33 percent of them actually trust the code those tools produce. That gap is not a footnote. It is the defining fact of software development in 2026, and it is the reason vibe coding versus custom software development has become one of the most practical questions a founder or business owner can ask before starting a build.",
    author: { name: "Senior Content Strategist", role: "Tech Binaries Editorial" },
    cover: "/blogs/vibe-coding-vs-custom-software-development.jpg",
    slug: "vibe-coding-vs-custom-software-development-2026",
    tags: ["Vibe Coding", "Custom Software", "AI Development"],
    accent: "#d4c4a8",
  },
  {
    n: "03",
    category: "Engineering",
    readTime: "12 min",
    date: "May 29, 2026",
    title: "Can You Build a Production-Ready SaaS With Vibe Coding Alone?",
    excerpt:
      "Ask any founder in 2026 whether AI can build their SaaS product, and the answer sounds like an easy yes. Ninety-two percent of developers in the United States now use AI coding tools daily. Look past the adoption numbers, though, and a different picture appears. Only 29 percent of developers say they actually trust the code these tools produce.",
    author: { name: "Senior Content Strategist", role: "Tech Binaries Editorial" },
    cover: "/blogs/production-ready-saas-vibe-coding.jpg",
    slug: "production-ready-saas-vibe-coding",
    tags: ["Vibe Coding", "SaaS", "AI Development"],
    accent: "#c4b8a8",
  },
  {
    n: "04",
    category: "Engineering",
    readTime: "10 min",
    date: "Jun 5, 2026",
    title: "Vibe Coding for Non-Developers: What You Can Build, What You Can't, and When to Call an Agency",
    excerpt:
      "A few months ago, a wellness writer with no formal programming background sat down at her laptop, described the app she wanted to Claude, and had a working tool before the rest of her household woke up. She did not hire a developer. Stories like hers are why vibe coding has stopped sounding like a niche experiment.",
    author: { name: "Senior Content Strategist", role: "Tech Binaries Editorial" },
    cover: "/blogs/vibe-coding-for-non-developers-2026.jpg",
    slug: "vibe-coding-for-non-developers-2026",
    tags: ["Vibe Coding", "Non-Developers", "AI Development"],
    accent: "#a8b8c4",
  },
  {
    n: "05",
    category: "Engineering",
    readTime: "11 min",
    date: "Jun 12, 2026",
    title: "The Hidden Costs of Vibe-Coded Apps (What You Don't See Until It's Expensive)",
    excerpt:
      "Vibe coding made software feel free. You describe what you want, the AI writes it, and a working app appears in an afternoon. It didn't drop the cost — it moved. The cost of a vibe-coded app doesn't disappear; it relocates to month three, month six, or the day a paying customer's data leaks.",
    author: { name: "Senior Content Strategist", role: "Tech Binaries Editorial" },
    cover: "/blogs/hidden-costs-vibe-coded-apps-2026.jpg",
    slug: "hidden-costs-vibe-coded-apps-2026",
    tags: ["Vibe Coding", "Technical Debt", "Security"],
    accent: "#b8a8c4",
  },
  {
    n: "06",
    category: "Engineering",
    readTime: "10 min",
    date: "Jun 19, 2026",
    title: "When Vibe Coding Is Enough vs. When You Need a Real Dev Team",
    excerpt:
      "AI coding tools have crossed a strange threshold. Ninety-two percent of US developers now use them every day, but trust in the code they produce has fallen from 77% in 2023 to 60% in 2026. This piece is a guide to knowing where your own project sits on that line — and when you need a real development team.",
    author: { name: "Senior Content Strategist", role: "Tech Binaries Editorial" },
    cover: "/blogs/vibe-coding-vs-real-dev-team-2026.jpg",
    slug: "vibe-coding-vs-real-dev-team-2026",
    tags: ["Vibe Coding", "Dev Team", "Decision Framework"],
    accent: "#c4b8a8",
  },
  {
    n: "07",
    category: "Engineering",
    readTime: "11 min",
    date: "Jun 26, 2026",
    title: "We Tested Vibe Coding Tools to Build an MVP — Here's What Actually Shipped",
    excerpt:
      "We built a real MVP using three of the most talked-about vibe coding tools of 2026: Lovable, Replit, and the Cursor plus Claude Code combination. All three tools got us to a working demo within a single day. None of them got us to something we would put in front of paying users without an engineer reviewing every line first.",
    author: { name: "Senior Content Strategist", role: "Tech Binaries Editorial" },
    cover: "/blogs/tested-vibe-coding-tools-mvp-2026.jpg",
    slug: "tested-vibe-coding-tools-mvp-2026",
    tags: ["Vibe Coding", "MVP", "Tool Comparison"],
    accent: "#b8c4d4",
  },
];

const NEWSLETTER = {
  placeholder: "your@email.com",
  cta: "Subscribe",
};

type LiveNewsItem = {
  title: string;
  description: string;
  url: string;
  image: string | null;
  source: string;
  publishedAt: string;
};

function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diffMs = Date.now() - then;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function faviconFor(domain: string, size = 64): string {
  return `https://www.google.com/s2/favicons?sz=${size}&domain=${encodeURIComponent(
    domain
  )}`;
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

function splitChars(str: string) {
  return str.split("").map((c, i) => (
    <span key={i} className="bl-char-wrap">
      <span className="bl-char">{c === " " ? "\u00A0" : c}</span>
    </span>
  ));
}

const STREAM_IMAGE_POSITIONS = ["50% 50%", "50% 28%", "50% 70%", "28% 50%", "72% 50%"];

function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickPostVisual(slug: string, cover: string) {
  const seed = hashString(slug);
  return {
    cover,
    objectPosition: STREAM_IMAGE_POSITIONS[seed % STREAM_IMAGE_POSITIONS.length],
  };
}

// ── COMPONENT ────────────────────────────────────────────────────────────────

export default function BlogsPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [liveNews, setLiveNews] = useState<LiveNewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(false);
  const [brokenImages, setBrokenImages] = useState<Set<string>>(() => new Set());
  const [loadedImages, setLoadedImages] = useState<Set<string>>(() => new Set());

  const filteredPosts =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((p) => p.category === activeCategory);

  // ── LIVE TECH NEWS FEED ──
  useEffect(() => {
    let alive = true;
    const ctl = new AbortController();

    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
        const endpoint = `${base.replace(/\/$/, "")}/api/news`;
        const res = await fetch(endpoint, {
          signal: ctl.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = (await res.json()) as { items?: LiveNewsItem[] };
        if (!alive) return;
        setLiveNews(Array.isArray(data.items) ? data.items.slice(0, 3) : []);
        setNewsError(false);
      } catch (err) {
        if (!alive) return;
        if ((err as { name?: string })?.name === "AbortError") return;
        setNewsError(true);
      } finally {
        if (alive) setNewsLoading(false);
      }
    })();

    return () => {
      alive = false;
      ctl.abort();
    };
  }, []);

  // ── HERO ANIMATION ──
  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap } = await loadGsapWithScrollTrigger();
        if (cancelled) return;

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({ delay: 0.15 });
          const chars = gsap.utils.toArray(".bl-char") as HTMLElement[];
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
            ".bl-hero-lead",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
            0.55
          );
          tl.fromTo(
            ".bl-hero-cats",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.75, ease: "expo.out" },
            0.85
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

        revert = () => ctx.revert();
      })();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  // ── FEATURED REVEAL ──
  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap } = await loadGsapWithScrollTrigger();
        if (cancelled) return;

        const ctx = gsap.context(() => {
          gsap.fromTo(
            ".bl-featured-card",
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "expo.out",
              scrollTrigger: {
                trigger: ".bl-featured-card",
                start: "top 85%",
                once: true,
              },
            }
          );
          gsap.fromTo(
            ".bl-featured-image",
            { opacity: 0.72 },
            {
              opacity: 1,
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: ".bl-featured-card",
                start: "top 85%",
                once: true,
              },
            }
          );
        });

        revert = () => ctx.revert();
      })();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  // ── GRID POSTS REVEAL ──
  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap } = await loadGsapWithScrollTrigger();
        if (cancelled) return;

        const ctx = gsap.context(() => {
          const cards = gsap.utils.toArray(".bl-stream-row") as HTMLElement[];
          if (!cards.length) return;

          gsap.fromTo(
            cards,
            { opacity: 0, y: 56 },
            {
              opacity: 1,
              y: 0,
              duration: 0.88,
              stagger: 0.14,
              ease: "expo.out",
              scrollTrigger: {
                trigger: ".bl-stream-scroll-track",
                start: "top 82%",
                once: true,
              },
            }
          );
        });

        revert = () => ctx.revert();
      })();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [activeCategory]);

  // ── STREAM PIN + INTERNAL SCROLL (desktop) ──
  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap, ScrollTrigger } = await loadGsapWithScrollTrigger();
        if (cancelled) return;

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

        revert = () => ctx.revert();
      })();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [activeCategory]);

  // ── NEWSLETTER REVEAL ──
  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap } = await loadGsapWithScrollTrigger();
        if (cancelled) return;

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

        revert = () => ctx.revert();
      })();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  // ── LATEST NEWS CARDS: smooth top-down stagger reveal ──
  useEffect(() => {
    if (newsLoading || liveNews.length === 0) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap, ScrollTrigger } = await loadGsapWithScrollTrigger();
        if (cancelled) return;

        const ctx = gsap.context(() => {
          const cards = gsap.utils.toArray(
            ".bl-nl-latest-card:not(.bl-nl-latest-card--skeleton)"
          ) as HTMLElement[];
          if (!cards.length) return;

          gsap.set(cards, { y: -36, opacity: 0 });

          gsap.to(cards, {
            y: 0,
            opacity: 1,
            duration: 1.25,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".bl-nl-latest-grid",
              start: "top 88%",
              once: true,
            },
          });

          ScrollTrigger.refresh();
        });

        revert = () => ctx.revert();
      })();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [newsLoading, liveNews]);

  // Fonts refresh
  useEffect(() => {
    let cancelled = false;
    const fonts = "fonts" in document ? document.fonts : undefined;
    if (!fonts?.ready) return;

    fonts.ready.then(async () => {
      if (cancelled) return;
      const { ScrollTrigger } = await loadGsapWithScrollTrigger();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
    };
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

      <div style={{ background: "#fafaf9", color: "#0a0a0a", fontFamily: "var(--font-display)", overflowX: "hidden" }}>
        <SiteHeader />

        {/* ════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════ */}
        <section ref={heroRef} className="bl-hero" aria-labelledby="bl-hero-title">
          <div className="bl-hero-bg" aria-hidden>
            <div className="bl-hero-media">
              <Image
                src="/images/blogs/blogs-hero.webp"
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
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            FEATURED POST
        ════════════════════════════════════════════════ */}
        <section className="bl-featured" aria-labelledby="bl-featured-title">
          <div className="bl-featured-inner">
            <article className="bl-featured-card">
              <Link href={`/blogs/${FEATURED.slug}`} className="bl-featured-figure-link">
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
                    <Link href={`/blogs/${FEATURED.slug}`} className="bl-featured-title-link">
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

                  <Link href={`/blogs/${FEATURED.slug}`} className="bl-read-btn">
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
        <section className="bl-stream" aria-label="Recent articles">
          <div className="bl-stream-inner">
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
                        const visual = pickPostVisual(post.slug, post.cover);
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
                              <Link href={`/blogs/${post.slug}`} className="bl-stream-row-title-link">
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
                              <Link href={`/blogs/${post.slug}`} className="bl-stream-read" aria-label={`Read ${post.title}`}>
                                Read article <span aria-hidden>→</span>
                              </Link>
                            </div>
                          </div>

                          <Link href={`/blogs/${post.slug}`} className="bl-stream-thumb-link" aria-label={`Open ${post.title}`}>
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
            <div className="bl-nl-latest">
              <h2 id="bl-nl-title" className="bl-nl-latest-heading">Latest news</h2>

              {newsError && liveNews.length === 0 ? (
                <div className="bl-nl-latest-error">
                  Couldn&apos;t load the live feed right now. Please refresh in a moment.
                </div>
              ) : (
                <div className="bl-nl-latest-grid">
                  {newsLoading && liveNews.length === 0
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <article key={`sk-${i}`} className="bl-nl-latest-card bl-nl-latest-card--skeleton" aria-hidden>
                          <div className="bl-nl-latest-thumb bl-skel" />
                          <div className="bl-nl-latest-source bl-skel bl-skel--line" />
                          <div className="bl-nl-latest-title bl-skel bl-skel--line bl-skel--line-lg" />
                          <div className="bl-nl-latest-brief bl-skel bl-skel--line" />
                          <div className="bl-nl-latest-brief bl-skel bl-skel--line bl-skel--line-sm" />
                        </article>
                      ))
                    : liveNews.map((item) => {
                        const imgKey = item.image ?? "";
                        const showFallback =
                          !item.image || brokenImages.has(imgKey);
                        const isLoaded = loadedImages.has(imgKey);
                        return (
                        <article key={item.url} className="bl-nl-latest-card">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bl-nl-latest-thumb-link"
                            aria-label={`Open ${item.title} on ${item.source} (opens in new tab)`}
                          >
                            <figure className="bl-nl-latest-thumb">
                              {!showFallback && item.image ? (
                                <>
                                  <Image
                                    src={item.image}
                                    alt=""
                                    width={400}
                                    height={250}
                                    unoptimized
                                    className={`bl-nl-latest-thumb-img${
                                      isLoaded ? " is-loaded" : ""
                                    }`}
                                    referrerPolicy="no-referrer"
                                    onLoad={() => {
                                      setLoadedImages((prev) => {
                                        if (prev.has(imgKey)) return prev;
                                        const next = new Set(prev);
                                        next.add(imgKey);
                                        return next;
                                      });
                                    }}
                                    onError={() => {
                                      setBrokenImages((prev) => {
                                        if (prev.has(imgKey)) return prev;
                                        const next = new Set(prev);
                                        next.add(imgKey);
                                        return next;
                                      });
                                    }}
                                  />
                                  {!isLoaded && (
                                    <div className="bl-nl-latest-thumb-shimmer" aria-hidden />
                                  )}
                                </>
                              ) : (
                                <div className="bl-nl-latest-thumb-fallback">
                                  <Image
                                    src={faviconFor(item.source, 128)}
                                    alt=""
                                    width={16}
                                    height={16}
                                    unoptimized
                                    className="bl-nl-latest-thumb-favicon"
                                    referrerPolicy="no-referrer"
                                  />
                                  <span className="bl-nl-latest-thumb-domain">{item.source}</span>
                                </div>
                              )}
                              <span className="bl-nl-latest-thumb-arrow" aria-hidden>
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                  <path
                                    d="M5 11L11 5M11 5H6M11 5V10"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </figure>
                          </a>

                          <div className="bl-nl-latest-source">
                            <Image
                              src={faviconFor(item.source, 32)}
                              alt=""
                              width={16}
                              height={16}
                              unoptimized
                              className="bl-nl-latest-source-icon"
                              referrerPolicy="no-referrer"
                            />
                            <span className="bl-nl-latest-source-name">{item.source}</span>
                          </div>

                          <h3 className="bl-nl-latest-title">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bl-nl-latest-link"
                            >
                              {item.title}
                            </a>
                          </h3>
                          {item.description && (
                            <p className="bl-nl-latest-brief">{item.description}</p>
                          )}
                          <time className="bl-nl-latest-date" dateTime={item.publishedAt}>
                            {formatRelativeTime(item.publishedAt)}
                          </time>
                        </article>
                        );
                      })}
                </div>
              )}
            </div>
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
          display: flex;
          flex-direction: row;
          align-items: stretch;
          border-radius: 16px;
          border: 1px solid rgba(10,10,10,0.1);
          background: #fff;
          overflow: hidden;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.9) inset,
            0 28px 64px -36px rgba(10,10,10,0.16);
          transition:
            box-shadow 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bl-featured-card:hover {
          box-shadow:
            0 1px 0 rgba(255,255,255,0.9) inset,
            0 40px 80px -36px rgba(10,10,10,0.22);
          transform: translateY(-2px);
        }
        .bl-featured-figure-link {
          position: relative;
          flex: 1.65 1 0;
          min-width: 0;
          aspect-ratio: 16 / 9;
          text-decoration: none;
          background: #0b0f14;
        }
        .bl-featured-figure {
          position: absolute;
          inset: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          background: #0b0f14;
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
          object-position: center center;
        }
        .bl-featured-figure-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 55%, rgba(10,10,10,0.4) 100%);
          pointer-events: none;
        }
        .bl-featured-figure-meta {
          position: absolute;
          bottom: 14px;
          left: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
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
          flex: 0.9 1 0;
          min-width: 260px;
          max-width: 380px;
          padding: 20px 22px 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          justify-content: center;
        }
        .bl-featured-sheet-head {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .bl-featured-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .bl-featured-title {
          font-family: var(--font-display);
          font-size: clamp(20px, 1.9vw, 28px);
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1.15;
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
          font-size: 13.5px;
          line-height: 1.55;
          color: rgba(10,10,10,0.62);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .bl-featured-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .bl-featured-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(10,10,10,0.1);
          flex-wrap: wrap;
        }
        .bl-author {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bl-author-avatar {
          width: 34px;
          height: 34px;
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
        .bl-featured-footer .bl-read-btn {
          padding: 10px 16px;
          font-size: 13px;
          gap: 8px;
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
          background: transparent;
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
          border: none;
          background: transparent;
          border-radius: 18px;
          overflow: visible;
          box-shadow: none;
        }
        .bl-stream-scroll-viewport {
          height: min(84vh, 860px);
          overflow: hidden;
        }
        .bl-stream-scroll-track {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.7vw, 18px);
          padding: 4px clamp(14px, 1.8vw, 18px) clamp(14px, 1.8vw, 18px);
        }
        .bl-stream-row {
          position: relative;
          padding: clamp(16px, 2vw, 22px);
          border: 1px solid rgba(10,10,10,0.08);
          border-radius: 14px;
          background: #fff;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(320px, 36%);
          gap: clamp(14px, 1.8vw, 22px);
          align-items: stretch;
          transition: background 0.3s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          box-shadow: none;
          will-change: transform, opacity;
        }
        .bl-stream-row::before {
          content: "";
          position: absolute;
          left: 0;
          top: 18px;
          bottom: 18px;
          width: 3px;
          border-radius: 99px;
          background: linear-gradient(180deg, rgba(10,10,10,0.16) 0%, rgba(10,10,10,0.3) 100%);
          opacity: 0.5;
          transition: opacity 0.35s ease, width 0.35s ease;
        }
        .bl-stream-row:hover {
          background: #fff;
          border-color: rgba(10,10,10,0.12);
          box-shadow: inset 0 0 0 1px rgba(10,10,10,0.04);
        }
        .bl-stream-row:hover::before {
          opacity: 0.9;
          width: 5px;
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
          gap: 10px;
        }
        .bl-side-topic {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 32px;
          padding: 0 14px;
          border-radius: 999px;
          border: 1px solid rgba(10,10,10,0.16);
          background: #ffffff;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: #0a0a0a;
          box-shadow: 0 1px 0 rgba(255,255,255,0.95) inset;
          transition:
            transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.28s ease,
            color 0.28s ease,
            background 0.28s ease,
            box-shadow 0.28s ease;
          cursor: default;
          user-select: none;
        }
        .bl-side-topic:hover {
          transform: translateY(-1px);
          border-color: rgba(10,10,10,0.28);
          color: #0a0a0a;
          background: #ffffff;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.98) inset,
            0 8px 16px -14px rgba(10,10,10,0.4);
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
          padding: clamp(44px, 7vw, 72px) 24px;
          background: #efefed;
          color: #0a0a0a;
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
            linear-gradient(rgba(10,10,10,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,10,10,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 80% 100% at 50% 50%, black 20%, transparent 90%);
          -webkit-mask-image: radial-gradient(ellipse 80% 100% at 50% 50%, black 20%, transparent 90%);
        }
        .bl-nl-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 90% 70% at 50% 50%, transparent 35%, rgba(255,255,255,0.24) 100%);
        }
        .bl-nl-inner {
          position: relative;
          z-index: 2;
          max-width: 1180px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(20px, 3vw, 36px);
          align-items: start;
          will-change: transform, opacity;
        }
        .bl-nl-latest-heading {
          font-family: var(--font-display);
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1;
          margin: 0 0 10px;
          color: #0a0a0a;
        }
        .bl-nl-latest-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(12px, 1.6vw, 18px);
        }
        .bl-nl-latest-card {
          position: relative;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid rgba(10,10,10,0.1);
          background: rgba(255,255,255,0.6);
          display: flex;
          flex-direction: column;
          transition: border-color 0.28s ease, background 0.28s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
          will-change: transform, opacity;
        }
        .bl-nl-latest-card:hover {
          border-color: rgba(10,10,10,0.2);
          background: rgba(255,255,255,0.8);
          transform: translateY(-2px);
          box-shadow: 0 18px 36px -28px rgba(10,10,10,0.35);
        }
        .bl-nl-latest-error {
          padding: 18px 16px;
          border-radius: 10px;
          border: 1px dashed rgba(10,10,10,0.18);
          background: rgba(255,255,255,0.5);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.05em;
          color: rgba(10,10,10,0.6);
          text-align: center;
        }
        .bl-nl-latest-source {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin: 0 0 6px;
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.62);
        }
        .bl-nl-latest-source-icon {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          background: rgba(10,10,10,0.06);
          object-fit: contain;
          flex-shrink: 0;
        }
        .bl-nl-latest-source-name {
          max-width: 22ch;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .bl-nl-latest-thumb-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background:
            radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,0.7) 0%, transparent 60%),
            linear-gradient(135deg, #ececea 0%, #d9d8d4 100%);
        }
        .bl-nl-latest-thumb-favicon {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: rgba(255,255,255,0.85);
          padding: 6px;
          box-shadow: 0 4px 12px -6px rgba(10,10,10,0.3);
          object-fit: contain;
        }
        .bl-nl-latest-thumb-domain {
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.55);
          max-width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .bl-nl-latest-thumb-arrow {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 26px;
          height: 26px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(10,10,10,0.78);
          color: #fafaf9;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          opacity: 0;
          transform: translateY(-2px) scale(0.92);
          transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
        }
        .bl-nl-latest-card:hover .bl-nl-latest-thumb-arrow,
        .bl-nl-latest-card:focus-within .bl-nl-latest-thumb-arrow {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .bl-skel {
          position: relative;
          overflow: hidden;
          background: rgba(10,10,10,0.06);
          border-radius: 6px;
        }
        .bl-skel::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%);
          transform: translateX(-100%);
          animation: bl-skel-shimmer 1.5s ease-in-out infinite;
        }
        @keyframes bl-skel-shimmer {
          100% { transform: translateX(100%); }
        }
        .bl-skel--line {
          height: 11px;
          margin: 6px 0 0;
        }
        .bl-skel--line-lg { height: 16px; margin-top: 10px; }
        .bl-skel--line-sm { width: 60%; }
        .bl-nl-latest-card--skeleton:hover {
          transform: none;
          box-shadow: none;
          border-color: rgba(10,10,10,0.1);
          background: rgba(255,255,255,0.6);
        }
        .bl-nl-latest-thumb-link {
          display: block;
          text-decoration: none;
          margin-bottom: 8px;
        }
        .bl-nl-latest-thumb {
          position: relative;
          margin: 0;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 9px;
          overflow: hidden;
          background: rgba(10,10,10,0.08);
        }
        .bl-nl-latest-thumb-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition:
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.4s ease;
        }
        .bl-nl-latest-thumb-img.is-loaded {
          opacity: 1;
        }
        .bl-nl-latest-card:hover .bl-nl-latest-thumb-img.is-loaded {
          transform: scale(1.04);
        }
        .bl-nl-latest-thumb-shimmer {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, #ececea 0%, #d9d8d4 100%);
          overflow: hidden;
        }
        .bl-nl-latest-thumb-shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.55) 50%,
            transparent 100%
          );
          transform: translateX(-100%);
          animation: bl-skel-shimmer 1.5s ease-in-out infinite;
        }
        .bl-nl-latest-title {
          margin: 0 0 6px;
          font-family: var(--font-display);
          font-size: 15px;
          line-height: 1.2;
          letter-spacing: -0.015em;
        }
        .bl-nl-latest-link {
          color: #0a0a0a;
          text-decoration: none;
          transition: opacity 0.25s ease;
        }
        .bl-nl-latest-link:hover {
          opacity: 0.7;
        }
        .bl-nl-latest-brief {
          margin: 0 0 8px;
          font-size: 11.5px;
          line-height: 1.45;
          color: rgba(10,10,10,0.64);
        }
        .bl-nl-latest-date {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.52);
        }
        .bl-nl-subscribe {
          display: grid;
          gap: 10px;
          align-content: start;
          padding-top: 44px;
        }
        .bl-nl-subscribe-title {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(22px, 2.2vw, 30px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #0a0a0a;
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
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(10,10,10,0.16);
          border-radius: 999px;
          padding: 4px 4px 4px 16px;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .bl-nl-input-wrap:focus-within {
          border-color: rgba(10,10,10,0.3);
          background: rgba(255,255,255,0.85);
        }
        .bl-nl-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: -0.01em;
          color: #0a0a0a;
          min-width: 0;
        }
        .bl-nl-input::placeholder { color: rgba(10,10,10,0.45); }
        .bl-nl-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          background: #fafaf9;
          color: #0a0a0a;
          font-family: var(--font-display);
          font-size: 12px;
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
          background: #e4e4e1;
          color: #0a0a0a;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bl-nl-btn:hover .bl-nl-btn-arrow { transform: translateX(3px); }
        .bl-nl-success {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px 28px;
          background: rgba(255,255,255,0.62);
          border: 1px solid rgba(10,10,10,0.12);
          border-radius: 12px;
        }
        .bl-nl-success-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(10,10,10,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: rgba(10,10,10,0.75);
          flex-shrink: 0;
        }
        .bl-nl-success-text {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 400;
          font-style: italic;
          letter-spacing: -0.014em;
          color: rgba(10,10,10,0.72);
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
          .bl-featured-figure-link {
            flex: 1.35 1 0;
          }
          .bl-featured-sheet {
            max-width: 340px;
          }
          .bl-hero-panel-cta {
            width: 100%;
          }
          .bl-hero-panel-controls {
            flex-direction: column;
            align-items: stretch;
          }
        }
        @media (max-width: 980px) {
          .bl-nl-latest-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 900px) {
          .bl-featured-card {
            flex-direction: column;
          }
          .bl-featured-figure-link {
            flex: none;
            width: 100%;
            aspect-ratio: 16 / 9;
          }
          .bl-featured-sheet {
            max-width: none;
            width: 100%;
          }
          .bl-nl-inner {
            grid-template-columns: 1fr;
            gap: 22px;
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
          .bl-nl-subscribe {
            padding-top: 0;
          }
        }
        @media (max-width: 700px) {
          .bl-nl-latest-grid {
            grid-template-columns: 1fr;
          }
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
          .bl-nl-latest-card { transform: none !important; opacity: 1 !important; }
        }
      `}</style>
    </>
  );
}