
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ── DATA ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: "01",
    title: "Growth & Performance Engineering",
    kicker: "Conversion systems, analytics, and experimentation",
    desc: "We build end-to-end growth systems that turn traffic into measurable revenue with better conversion paths, smarter tracking, and continuous experimentation.",
    deliverables: [
      "Conversion-Focused Landing Systems",
      "Funnel Architecture & Optimization",
      "Performance Tracking Dashboards",
      "A/B Testing & Experimentation Systems",
    ],
    tags: ["Conversion", "Funnels", "Analytics", "A/B Testing"],
    accent: "#a3e635", // lime
    glyph: "◐",
  },
  {
    num: "02",
    title: "Search Visibility & Digital Authority",
    kicker: "Technical SEO and long-term organic growth",
    desc: "We strengthen your search foundation with technical SEO, content architecture, and monitoring systems that compound organic visibility over time.",
    deliverables: [
      "Technical SEO Optimization",
      "Website Performance & Indexing Improvements",
      "Scalable Content Architecture",
      "Keyword & Search Intent Mapping",
    ],
    tags: ["Technical SEO", "Indexing", "Content", "Search Growth"],
    accent: "#38bdf8", // sky
    glyph: "◑",
  },
  {
    num: "03",
    title: "Custom Software & Digital Solutions",
    kicker: "Web, mobile, SaaS, and product UX delivery",
    desc: "We design and build custom digital products from interface systems to production-ready applications tailored to your business goals.",
    deliverables: [
      "Custom Web Application Development",
      "Mobile App Development (iOS & Android)",
      "SaaS Product Development",
      "UI/UX Design Systems",
    ],
    tags: ["Web Apps", "Mobile Apps", "SaaS", "UI/UX"],
    accent: "#f472b6", // pink
    glyph: "◒",
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Discovery",
    desc: "Deep-dive into your business, users, and technical landscape to uncover what actually needs to be built.",
    points: ["Stakeholder interviews", "Technical audit", "Opportunity mapping"],
  },
  {
    num: "02",
    title: "Architecture",
    desc: "We design the technical blueprint — systems design, stack selection, and scalability planning before writing code.",
    points: ["Systems design", "Stack selection", "Scalability plan"],
  },
  {
    num: "03",
    title: "Build",
    desc: "Agile sprints with weekly demos. You stay close to the work. We ship fast without cutting corners.",
    points: ["Weekly demos", "CI/CD pipeline", "Continuous QA"],
  },
  {
    num: "04",
    title: "Launch & Scale",
    desc: "Deployment, monitoring, and post-launch support. We don't disappear after go-live.",
    points: ["Production launch", "Observability", "Ongoing support"],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "TechBinaries didn't just build our product — they challenged our assumptions, improved our roadmap, and shipped faster than any team we've worked with. Exceptional craft.",
    name: "Sarah Chen",
    title: "CTO, FinEdge",
    initials: "SC",
  },
  {
    quote:
      "We went from idea to production in 11 weeks. The architecture they designed has scaled to 2M+ users without a single major incident. That's engineering excellence.",
    name: "Marcus Williams",
    title: "CEO, MedCore",
    initials: "MW",
  },
  {
    quote:
      "Their AI team understood our logistics domain immediately. The route optimization model they built saved us $4M in year one. ROI was clear from week two.",
    name: "Priya Nair",
    title: "VP Engineering, ShipFast",
    initials: "PN",
  },
  {
    quote:
      "The migration was seamless. Their team modernized our stack while keeping business continuity intact, and we saw page performance improve by 43% within the first month.",
    name: "Daniel Kim",
    title: "Head of Product, NovaRetail",
    initials: "DK",
  },
  {
    quote:
      "From strategy to execution, they worked like an extension of our engineering org. We launched two major features ahead of schedule with measurable customer impact.",
    name: "Elena Rodriguez",
    title: "Director of Engineering, CloudAxis",
    initials: "ER",
  },
];

const TECH = [
  "React", "TypeScript", "Node.js", "Python", "Go", "Rust",
  "AWS", "GCP", "Kubernetes", "PostgreSQL", "Redis", "GraphQL",
  "Next.js", "PyTorch", "Terraform", "Docker",
];

// Rotating verb in hero headline — swaps every few seconds
const HERO_VERBS = ["engineer", "ship", "craft", "architect", "scale"];

// "Currently building" ticker — rotates through real-ish in-flight work
const BUILDING_NOW = [
  { tag: "SHIPPING", label: "FinEdge · v2.4 · Monday release" },
  { tag: "DESIGNING", label: "MedCore · patient timeline view" },
  { tag: "SCALING",  label: "ShipFast · route engine, 10x throughput" },
  { tag: "AUDITING", label: "Northwind · infra review, 4-week engagement" },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  // Hero-specific refs & state
  const heroRef = useRef<HTMLElement>(null);
  const heroParallaxLayerRef = useRef<HTMLDivElement>(null);
  const heroGlyphRef = useRef<HTMLDivElement>(null);
  const heroDotsRef = useRef<HTMLDivElement>(null);
  const heroTerminalRef = useRef<HTMLDivElement>(null);
  const [rotatingVerb, setRotatingVerb] = useState(0);

  // Capabilities section — stacked cards
  const capabilitiesRef = useRef<HTMLElement>(null);
  const [activeCapability, setActiveCapability] = useState(0);
  const [showCapabilityInterlude, setShowCapabilityInterlude] = useState(false);
  const capScrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const capProgrammaticScrollRef = useRef(false);
  const marqueeLeftRef = useRef<HTMLDivElement>(null);
  const marqueeRightRef = useRef<HTMLDivElement>(null);
  const marqueeLeftTweenRef = useRef<gsap.core.Tween | null>(null);
  const marqueeRightTweenRef = useRef<gsap.core.Tween | null>(null);

  // Responsive: mobile vs desktop for the capabilities section.
  // The desktop experience (pinned slats, GSAP scrub) and the mobile
  // experience (tap-to-expand accordion) are rendered as separate JSX
  // trees and separate code paths. Nothing in the desktop path changes
  // on mobile — they share data only.
  const [isMobile, setIsMobile] = useState(false);
  // Which capability is open on mobile (accordion). Null = all closed.
  const [mobileOpenCap, setMobileOpenCap] = useState<number | null>(0);
  const [testimonialStartIndex, setTestimonialStartIndex] = useState(0);
  const [testimonialSlideDirection, setTestimonialSlideDirection] = useState<"next" | "prev" | null>(null);
  const [testimonialAnimate, setTestimonialAnimate] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);
  const testimonialVisibleCount = isMobile ? 1 : 3;
  const testimonialCanSlide = TESTIMONIALS.length > testimonialVisibleCount;
  const getTestimonialAt = (index: number) =>
    TESTIMONIALS[(index + TESTIMONIALS.length) % TESTIMONIALS.length];
  const visibleTestimonials = testimonialCanSlide
    ? Array.from({ length: testimonialVisibleCount + 1 }, (_, i) =>
        getTestimonialAt(
          testimonialStartIndex +
            i +
            (testimonialSlideDirection === "prev" ? -1 : 0)
        )
      )
    : TESTIMONIALS;
  const testimonialStepPercent = 100 / testimonialVisibleCount;
  const testimonialTranslate =
    testimonialSlideDirection === "prev"
      ? testimonialAnimate
        ? 0
        : -testimonialStepPercent
      : testimonialSlideDirection === "next" && testimonialAnimate
        ? -testimonialStepPercent
        : 0;

  // Smoothly scroll past the entire pinned capabilities section and land on
  // the Process section. Used by the "Skip" affordance — lets users who don't
  // want to scroll through all 6 capabilities jump ahead without losing the
  // smooth-scroll feel of the rest of the site.
  const skipToProcess = () => {
    if (typeof window === "undefined") return;
    const processEl = document.getElementById("process");
    if (!processEl) return;

    // Disable the cap-section's snap-to-capability behavior during this
    // programmatic scroll so it doesn't fight our destination.
    capProgrammaticScrollRef.current = true;
    const release = () => {
      capProgrammaticScrollRef.current = false;
    };

    // Land exactly at the process section's top edge.
    const targetY =
      processEl.getBoundingClientRect().top + window.scrollY;

    // Distance-aware duration — long skips get a slightly longer ride so the
    // motion reads as intentional, not teleportation. Capped at 1.4s.
    const distance = Math.abs(targetY - window.scrollY);
    const duration = Math.min(1.4, 0.7 + distance / 4500);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetY, {
        duration,
        easing: (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        onComplete: release,
      });
      setTimeout(release, duration * 1000 + 300);
    } else {
      gsap.to(window, {
        duration,
        scrollTo: { y: targetY, autoKill: false },
        ease: "power3.inOut",
        onComplete: release,
      });
    }
  };

  // Mobile-vs-desktop watcher.
  // Uses a media query so it's in sync with the CSS breakpoint used elsewhere.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Rotating verb in headline ("engineer / ship / craft / scale / architect")
  useEffect(() => {
    const id = setInterval(() => {
      setRotatingVerb((v) => (v + 1) % HERO_VERBS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setTestimonialAnimate(false);
    setTestimonialSlideDirection(null);
    setTestimonialStartIndex(0);
  }, [testimonialVisibleCount]);

  useEffect(() => {
    if (TESTIMONIALS.length <= testimonialVisibleCount) return;
    const id = setInterval(() => {
      if (testimonialSlideDirection) return;
      setTestimonialSlideDirection("next");
      setTestimonialAnimate(false);
      requestAnimationFrame(() => setTestimonialAnimate(true));
    }, 3800);
    return () => clearInterval(id);
  }, [testimonialSlideDirection, testimonialVisibleCount]);

  const slideTestimonialsNext = () => {
    if (!testimonialCanSlide || testimonialSlideDirection) return;
    setTestimonialSlideDirection("next");
    setTestimonialAnimate(false);
    requestAnimationFrame(() => setTestimonialAnimate(true));
  };

  const slideTestimonialsPrev = () => {
    if (!testimonialCanSlide || testimonialSlideDirection) return;
    setTestimonialSlideDirection("prev");
    setTestimonialAnimate(false);
    requestAnimationFrame(() => setTestimonialAnimate(true));
  };

  const handleTestimonialTransitionEnd = () => {
    if (!testimonialSlideDirection) return;
    setTestimonialAnimate(false);
    setTestimonialStartIndex((prev) =>
      testimonialSlideDirection === "next"
        ? (prev + 1) % TESTIMONIALS.length
        : (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
    setTestimonialSlideDirection(null);
  };

  // Smooth scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Custom cursor
  useEffect(() => {
    const dot = cursorDot.current;
    const ring = cursorRing.current;
    if (!dot || !ring) return;
    // Keep cursor effects desktop-only and avoid overriding accessibility
    // preferences on touch or reduced-motion devices.
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      return;
    }

    let mx = 0, my = 0, rx = 0, ry = 0, rafId = 0;
    let isHoveringInteractive = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 2}px, ${my - 2}px)`;
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      const scale = isHoveringInteractive ? 1.35 : 1;
      ring.style.transform = `translate(${rx - 9}px, ${ry - 9}px) scale(${scale})`;
      rafId = requestAnimationFrame(animateRing);
    };
    animateRing();
    window.addEventListener("mousemove", onMove);

    const onEnter = () => {
      isHoveringInteractive = true;
      dot.style.background = "#ffffff";
      ring.style.borderColor = "rgba(255,255,255,0.98)";
    };
    const onLeave = () => {
      isHoveringInteractive = false;
      dot.style.background = "#ffffff";
      ring.style.borderColor = "rgba(255,255,255,0.85)";
    };
    const interactive = document.querySelectorAll("a, button, [data-cursor]");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  // Hero mouse-reactive parallax
  useEffect(() => {
    if (!heroRef.current) return;
    const hero = heroRef.current;
    const glyph = heroGlyphRef.current;
    const dots = heroDotsRef.current;
    const terminal = heroTerminalRef.current;

    const glyphX = glyph ? gsap.quickTo(glyph, "x", { duration: 0.9, ease: "power3.out" }) : null;
    const glyphY = glyph ? gsap.quickTo(glyph, "y", { duration: 0.9, ease: "power3.out" }) : null;
    const dotsX = dots ? gsap.quickTo(dots, "x", { duration: 0.9, ease: "power3.out" }) : null;
    const dotsY = dots ? gsap.quickTo(dots, "y", { duration: 0.9, ease: "power3.out" }) : null;
    const termRY = terminal ? gsap.quickTo(terminal, "rotationY", { duration: 0.7, ease: "power3.out" }) : null;
    const termRX = terminal ? gsap.quickTo(terminal, "rotationX", { duration: 0.7, ease: "power3.out" }) : null;

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      if (e.clientY > rect.bottom || e.clientY < rect.top) return;
      const tx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ty = (e.clientY / window.innerHeight - 0.5) * 2;
      glyphX?.(tx * -28);
      glyphY?.(ty * -18);
      dotsX?.(tx * 10);
      dotsY?.(ty * 6);
      termRY?.(tx * -3);
      termRX?.(ty * 3);
    };

    if (terminal) gsap.set(terminal, { transformPerspective: 1400, transformStyle: "preserve-3d" });

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Hero magnetic buttons
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLElement>(".magnetic");
    const handlers: Array<[HTMLElement, (e: MouseEvent) => void, () => void]> = [];
    buttons.forEach((btn) => {
      const move = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const mx = e.clientX - (rect.left + rect.width / 2);
        const my = e.clientY - (rect.top + rect.height / 2);
        gsap.to(btn, { x: mx * 0.25, y: my * 0.3, duration: 0.4, ease: "power3.out" });
      };
      const leave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
      };
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      handlers.push([btn, move, leave]);
    });
    return () => {
      handlers.forEach(([btn, m, l]) => {
        btn.removeEventListener("mousemove", m);
        btn.removeEventListener("mouseleave", l);
      });
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ═════════════════════════════════════════════════════════════
      // HERO — choreographed intro timeline
      // ═════════════════════════════════════════════════════════════
      const heroTl = gsap.timeline({ delay: 0.1 });

      const headlineChars = gsap.utils.toArray<HTMLElement>(".hero-char");
      heroTl.fromTo(
        headlineChars,
        { yPercent: 110, rotateX: -35, opacity: 0 },
        {
          yPercent: 0, rotateX: 0, opacity: 1,
          duration: 0.9,
          stagger: { each: 0.018, from: "start" },
          ease: "power4.out",
        },
        0
      );

      heroTl.fromTo(
        ".hero-verb-mask",
        { yPercent: 100 },
        { yPercent: 0, duration: 0.85, ease: "power4.out" },
        0.2
      );

      heroTl.fromTo(
        ".hero-intro-col",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        0.7
      );

      heroTl.fromTo(
        ".hero-terminal",
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out" },
        0.35
      );
      heroTl.fromTo(
        ".hero-terminal-line",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.12, ease: "power2.out" },
        0.65
      );

      heroTl.fromTo(
        ".hero-scroll-hint",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        1.5
      );

      if (heroRef.current) {
        gsap.to(".hero-content-wrap", {
          y: -80,
          opacity: 0.4,
          scale: 0.98,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero-scroll-hint", {
          opacity: 0,
          y: 20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "15% top",
            scrub: true,
          },
        });
        gsap.to(".hero-dots-scroll", {
          y: 120,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero-glyph-scroll", {
          y: -180,
          x: 80,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Count-up for stats
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const raw = el.dataset.val || "";
        const m = raw.match(/^([\d.]+)(.*)$/);
        if (!m) return;
        const target = parseFloat(m[1]);
        const suffix = m[2];
        const isInt = Number.isInteger(target);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = (isInt ? Math.round(obj.v).toString() : obj.v.toFixed(1)) + suffix;
          },
        });
      });

      // ═════════════════════════════════════════════════════════════
      // CAPABILITIES — vertical accordion slats (pinned)
      // ═════════════════════════════════════════════════════════════
      const capSection = document.querySelector<HTMLElement>(".cap-section");

      gsap.fromTo(
        ".cap-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".cap-header", start: "top 85%" },
        }
      );

      const capMM = gsap.matchMedia();
      capMM.add("(min-width: 901px)", () => {
        if (!capSection) return;

        const slatEls = gsap.utils.toArray<HTMLElement>(".cap-slat");
        const slatCount = slatEls.length;
        if (slatCount === 0) return;

        const FLEX_COLLAPSED = 1;
        const FLEX_EXPANDED = 12;

        // Measure and cache the expanded-slat width so the inner content can be
        // locked to that dimension. If not locked, the inner flex shrinks with
        // the slat on every scroll tick — which is what caused the visible
        // reflow/wrap. We recompute on refresh (window resize, font load).
        const slatsContainer = capSection.querySelector<HTMLElement>(".cap-slats");
        const computeExpandedWidth = () => {
          if (!slatsContainer) return;
          const containerW = slatsContainer.clientWidth;
          const gap = 12; // must match the .cap-slats style
          const totalGap = gap * (slatCount - 1);
          // One slat at FLEX_EXPANDED, the rest at FLEX_COLLAPSED:
          const expandedW =
            ((containerW - totalGap) * FLEX_EXPANDED) /
            (FLEX_EXPANDED + FLEX_COLLAPSED * (slatCount - 1));
          slatEls.forEach((el) => {
            el.style.setProperty("--cap-expanded-w", `${Math.floor(expandedW)}px`);
          });
        };
        computeExpandedWidth();
        // Keep it in sync with viewport changes
        ScrollTrigger.addEventListener("refreshInit", computeExpandedWidth);

        slatEls.forEach((el, i) => {
          gsap.set(el, { flexGrow: i === 0 ? FLEX_EXPANDED : FLEX_COLLAPSED });
          const collapsed = el.querySelector<HTMLElement>(".cap-slat-collapsed");
          const expanded = el.querySelector<HTMLElement>(".cap-slat-expanded");
          if (collapsed) gsap.set(collapsed, { autoAlpha: i === 0 ? 0 : 1 });
          if (expanded) gsap.set(expanded, { autoAlpha: i === 0 ? 1 : 0, x: 0 });
        });

        const totalScroll = () => window.innerHeight * slatCount;

        const capST = ScrollTrigger.create({
          trigger: capSection,
          start: "top top",
          end: () => `+=${totalScroll()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scrub: 0.5,
          snap: {
            snapTo: (value) => {
              if (capProgrammaticScrollRef.current) return value;
              return Math.round(value * (slatCount - 1)) / (slatCount - 1);
            },
            duration: { min: 0.2, max: 0.6 },
            delay: 0.12,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const rawPos = self.progress * (slatCount - 1);
            const distToNearestCapability = Math.abs(rawPos - Math.round(rawPos));
            const interludeVisible =
              distToNearestCapability > 0.42 && distToNearestCapability < 0.58;
            setShowCapabilityInterlude((prev) =>
              prev === interludeVisible ? prev : interludeVisible
            );

            slatEls.forEach((el, i) => {
              const dist = Math.abs(i - rawPos);
              const weight = Math.max(0, 1 - dist);
              const eased = weight * weight * (3 - 2 * weight);

              const flexVal = FLEX_COLLAPSED + (FLEX_EXPANDED - FLEX_COLLAPSED) * eased;
              el.style.flexGrow = String(flexVal);

              // Tighter fade curves — content fully clears before any visible reflow.
              //   Collapsed label:  visible when dist > 0.5  (was gradual across full range)
              //   Expanded content: visible only when dist < 0.35  (was 0.5)
              // This creates a short "void" between states which is invisible because
              // both fade layers are transparent there — but it eliminates overlap
              // where reflow could be seen.
              const collapsedOpacity = Math.min(1, Math.max(0, 1 - eased * 2.6));
              const expandedOpacity  = Math.min(1, Math.max(0, (eased - 0.55) / 0.45));

              // Sign-aware slide: when this slat is BEHIND the active one (lower
              // index), it slides left as it fades. When AHEAD, it slides right.
              // Creates a "cards sliding out of the way" feel instead of pure fade.
              const direction = i < rawPos ? -1 : 1;
              const slide = (1 - expandedOpacity) * 32 * direction;

              const collapsed = el.querySelector<HTMLElement>(".cap-slat-collapsed");
              const expanded = el.querySelector<HTMLElement>(".cap-slat-expanded");
              if (collapsed) {
                collapsed.style.opacity = String(collapsedOpacity);
                collapsed.style.visibility = collapsedOpacity < 0.01 ? "hidden" : "visible";
              }
              if (expanded) {
                expanded.style.opacity = String(expandedOpacity);
                expanded.style.transform = `translateX(${slide}px)`;
                expanded.style.visibility = expandedOpacity < 0.01 ? "hidden" : "visible";
              }
            });

            const idx = Math.round(rawPos);
            setActiveCapability((prev) => (prev === idx ? prev : idx));
          },
        });

        capScrollTriggerRef.current = capST;

        gsap.to(".cap-progress-bar", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: capSection,
            start: "top top",
            end: () => `+=${totalScroll()}`,
            scrub: true,
          },
        });

        return () => {
          capScrollTriggerRef.current = null;
          ScrollTrigger.removeEventListener("refreshInit", computeExpandedWidth);
        };
      });

      // Process: horizontal pin
      const processTrack = document.querySelector<HTMLElement>(".process-track");
      const processPin = document.querySelector<HTMLElement>(".process-pin");
      if (processTrack && processPin) {
        const getScrollDistance = () =>
          processTrack.scrollWidth - window.innerWidth + 80;

        gsap.to(processTrack, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: processPin,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }

      // Section headers
      gsap.utils.toArray<HTMLElement>(".sh").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 38 },
          { opacity: 1, y: 0, duration: 0.95, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });

      // CTA
      gsap.fromTo(
        "#cta-inner",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: "#cta-inner", start: "top 85%" } }
      );

      // Section tag fade-in
      gsap.utils.toArray<HTMLElement>(".tag").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%" } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  // Tech marquee: GSAP-driven loop so hover speed changes stay smooth.
  useEffect(() => {
    const left = marqueeLeftRef.current;
    const right = marqueeRightRef.current;
    if (!left || !right) return;

    gsap.set(left, { xPercent: 0 });
    gsap.set(right, { xPercent: -50 });

    const leftTween = gsap.to(left, {
      xPercent: -50,
      duration: 55,
      ease: "none",
      repeat: -1,
    });
    const rightTween = gsap.to(right, {
      xPercent: 0,
      duration: 60,
      ease: "none",
      repeat: -1,
    });

    marqueeLeftTweenRef.current = leftTween;
    marqueeRightTweenRef.current = rightTween;

    return () => {
      marqueeLeftTweenRef.current = null;
      marqueeRightTweenRef.current = null;
      leftTween.kill();
      rightTween.kill();
    };
  }, []);

  const handleTechMarqueeEnter = () => {
    const leftTween = marqueeLeftTweenRef.current;
    const rightTween = marqueeRightTweenRef.current;
    if (leftTween) gsap.to(leftTween, { timeScale: 0.35, duration: 0.45, ease: "power2.out" });
    if (rightTween) gsap.to(rightTween, { timeScale: 0.35, duration: 0.45, ease: "power2.out" });
  };

  const handleTechMarqueeLeave = () => {
    const leftTween = marqueeLeftTweenRef.current;
    const rightTween = marqueeRightTweenRef.current;
    if (leftTween) gsap.to(leftTween, { timeScale: 1, duration: 0.45, ease: "power2.out" });
    if (rightTween) gsap.to(rightTween, { timeScale: 1, duration: 0.45, ease: "power2.out" });
  };

  // Refresh ScrollTrigger once fonts have loaded
  useEffect(() => {
    if (typeof document === "undefined" || !(document as any).fonts?.ready) return;
    (document as any).fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <>
      {/* ── CURSOR ── */}
      <div
        ref={cursorDot}
        style={{
          position: "fixed", top: 0, left: 0, width: 4, height: 4,
          background: "#ffffff", borderRadius: "50%", pointerEvents: "none",
          zIndex: 9999, willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={cursorRing}
        style={{
          position: "fixed", top: 0, left: 0, width: 18, height: 18,
          border: "1px solid rgba(255,255,255,0.85)", borderRadius: "50%",
          pointerEvents: "none", zIndex: 9998, willChange: "transform",
          transition: "border-color 0.2s ease",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.25)",
        }}
      />

      {/* ── GRAIN OVERLAY ── */}
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9997,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          opacity: 0.028,
          mixBlendMode: "multiply",
        }}
      />

      <div
        style={{
          background: "#fafaf9",
          color: "#0a0a0a",
          fontFamily: "var(--font-body)",
          overflowX: "hidden",
          cursor: "none",
        }}
      >
        {/* ── HEADER (reusable component) ── */}
        <SiteHeader />

        {/* ── HERO ── */}
        <section
          ref={heroRef}
          style={{
            minHeight: "100vh", display: "flex", flexDirection: "column",
            justifyContent: "center", padding: "120px 20px 60px",
            position: "relative", overflow: "hidden",
          }}
        >
          {/* Dot grid (parallax) */}
          <div
            className="hero-dots-scroll"
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              pointerEvents: "none", willChange: "transform",
            }}
          >
            <div
              ref={heroDotsRef}
              className="hero-dots"
              style={{
                position: "absolute", inset: "-40px",
                backgroundImage: "radial-gradient(rgba(0,0,0,0.09) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                maskImage: "radial-gradient(ellipse 75% 65% at 35% 45%, black 0%, transparent 95%)",
                WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 35% 45%, black 0%, transparent 95%)",
                willChange: "transform",
              }}
            />
          </div>

          {/* Large faint background glyph */}
          <div
            className="hero-glyph-scroll"
            aria-hidden
            style={{
              position: "absolute", right: -80, bottom: -80,
              pointerEvents: "none", willChange: "transform",
            }}
          >
            <div
              ref={heroGlyphRef}
              className="hero-glyph"
              style={{
                width: "clamp(360px, 46vw, 700px)",
                userSelect: "none",
                willChange: "transform",
              }}
            >
              <img
                src="/images/hero-section.png"
                alt=""
                aria-hidden
                draggable={false}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  opacity: 0.1,
                }}
              />
            </div>
          </div>

          {/* Faint crosshair marks */}
          <div
            aria-hidden
            style={{
              position: "absolute", top: 140, left: 40, width: 10, height: 10,
              borderTop: "1px solid rgba(0,0,0,0.22)", borderLeft: "1px solid rgba(0,0,0,0.22)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute", top: 140, right: 40, width: 10, height: 10,
              borderTop: "1px solid rgba(0,0,0,0.22)", borderRight: "1px solid rgba(0,0,0,0.22)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute", bottom: 40, left: 40, width: 10, height: 10,
              borderBottom: "1px solid rgba(0,0,0,0.22)", borderLeft: "1px solid rgba(0,0,0,0.22)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute", bottom: 40, right: 40, width: 10, height: 10,
              borderBottom: "1px solid rgba(0,0,0,0.22)", borderRight: "1px solid rgba(0,0,0,0.22)",
              pointerEvents: "none",
            }}
          />

          <div
            className="hero-content-wrap"
            style={{
              maxWidth: 1320, width: "100%", margin: "0 auto",
              position: "relative", zIndex: 1, willChange: "transform, opacity",
            }}
          >
            {/* ── MAIN LAYOUT ── */}
            <div
              className="hero-main-grid"
              style={{
                display: "grid", gridTemplateColumns: "1.65fr 1fr",
                gap: 36, alignItems: "start", marginBottom: 56,
              }}
            >
              {/* LEFT — headline + copy + CTAs */}
              <div>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(40px, 5.8vw, 96px)",
                    fontWeight: 500, lineHeight: 0.96,
                    letterSpacing: "-0.032em", margin: "0 0 48px",
                  }}
                >
                  {/* Line 1: "We [rotating verb]"
                      The verb wrapper uses overflow:visible so Kamerik's wide
                      italic glyphs don't get clipped on the right.
                      paddingRight gives the italic tail breathing room.        */}
                  <div style={{ overflow: "hidden", paddingBottom: "0.08em", display: "flex", flexWrap: "nowrap", alignItems: "baseline", gap: "0.22em" }}>
                    <span style={{ display: "inline-flex", overflow: "hidden", flexShrink: 0 }}>
                      {"We".split("").map((c, i) => (
                        <span key={`we-${i}`} className="hero-char" style={{ display: "inline-block", willChange: "transform" }}>
                          {c === " " ? "\u00A0" : c}
                        </span>
                      ))}
                    </span>
                    {/* Verb slot — overflow VISIBLE so italic isn't clipped */}
                    <span
                      aria-live="polite"
                      style={{
                        position: "relative",
                        display: "inline-block",
                        overflow: "visible",          /* ← was "hidden", caused clip */
                        verticalAlign: "bottom",
                        minWidth: "7ch",              /* widest verb = "architect" */
                        paddingRight: "0.12em",       /* space for italic overhang */
                      }}
                    >
                      <span className="hero-verb-mask" style={{ display: "inline-block", willChange: "transform" }}>
                        {HERO_VERBS.map((v, i) => (
                          <span
                            key={v}
                            style={{
                              display: "block",
                              fontStyle: "italic", fontWeight: 400,
                              color: "rgba(0,0,0,0.62)",
                              whiteSpace: "nowrap",
                              transform: `translateY(${(i - rotatingVerb) * 100}%)`,
                              transition: "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
                              position: i === 0 ? "relative" : "absolute",
                              top: 0, left: 0,
                            }}
                          >
                            {v}
                          </span>
                        ))}
                      </span>
                    </span>
                  </div>

                  {/* Line 2: "software for" */}
                  <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
                    {"software for".split("").map((c, i) => (
                      <span key={`s-${i}`} className="hero-char" style={{ display: "inline-block", willChange: "transform" }}>
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </div>

                  {/* Line 3: "ambitious teams." */}
                  <div className="hero-line-3" style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                    {"ambitious teams.".split("").map((c, i) => (
                      <span
                        key={`a-${i}`}
                        className="hero-char"
                        style={{
                          display: "inline-block", willChange: "transform",
                          color: c === "." ? "rgba(0,0,0,0.28)" : "inherit",
                          whiteSpace: "pre",
                        }}
                      >
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </div>
                </h1>

                <p
                  className="hero-intro-col"
                  style={{
                    fontSize: 17, color: "rgba(0,0,0,0.6)", maxWidth: 480,
                    lineHeight: 1.65, margin: "0 0 36px", fontWeight: 400,
                    opacity: 0,
                  }}
                >
                  A senior team of engineers, designers, and strategists partnering with
                  startups and scale-ups to design, build, and ship products that matter —
                  from zero to production and long after.
                </p>

                <div
                  className="hero-intro-col hero-cta"
                  style={{ display: "flex", gap: 12, opacity: 0, flexWrap: "wrap" }}
                >
                  <a
                    href="mailto:hello@techbinaries.com"
                    className="magnetic hero-cta-primary"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 10,
                      padding: "15px 28px", background: "#0a0a0a", color: "#fafaf9",
                      textDecoration: "none", fontSize: 14, fontWeight: 500,
                      borderRadius: 999, position: "relative", overflow: "hidden",
                      willChange: "transform",
                    }}
                  >
                    <span style={{ position: "relative", zIndex: 2 }}>Start a project</span>
                    <span aria-hidden style={{ position: "relative", zIndex: 2, display: "inline-block" }}>→</span>
                  </a>
                </div>
              </div>

              {/* RIGHT — live visualization card */}
              <div
                ref={heroTerminalRef}
                className="hero-terminal"
                style={{
                  opacity: 0, willChange: "transform",
                  transformStyle: "preserve-3d",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    background: "#0a0a0a", color: "#fafaf9", borderRadius: 16,
                    border: "1px solid rgba(0,0,0,0.85)",
                    padding: "20px 22px 22px",
                    boxShadow: "0 30px 70px -30px rgba(0,0,0,0.45), 0 8px 24px -10px rgba(0,0,0,0.2)",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.06em" }}>
                      studio.tsx
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <span style={{ width: 10, height: 1, background: "rgba(255,255,255,0.25)" }} />
                      <span style={{ width: 10, height: 1, background: "rgba(255,255,255,0.25)" }} />
                    </div>
                  </div>

                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12.5, lineHeight: 1.8,
                    }}
                  >
                    <div className="hero-terminal-line" style={{ opacity: 0, display: "flex", gap: 14 }}>
                      <span style={{ color: "rgba(255,255,255,0.25)", width: 14, textAlign: "right" }}>01</span>
                      <span><span style={{ color: "#ec4899" }}>export const</span> <span style={{ color: "#38bdf8" }}>studio</span> = {"{"}</span>
                    </div>
                    <div className="hero-terminal-line" style={{ opacity: 0, display: "flex", gap: 14 }}>
                      <span style={{ color: "rgba(255,255,255,0.25)", width: 14, textAlign: "right" }}>02</span>
                      <span>  <span style={{ color: "#a3e635" }}>team</span>: <span style={{ color: "#fbbf24" }}>40</span>,</span>
                    </div>
                    <div className="hero-terminal-line" style={{ opacity: 0, display: "flex", gap: 14 }}>
                      <span style={{ color: "rgba(255,255,255,0.25)", width: 14, textAlign: "right" }}>03</span>
                      <span>  <span style={{ color: "#a3e635" }}>shipped</span>: <span style={{ color: "#fbbf24" }}>150</span>,</span>
                    </div>
                    <div className="hero-terminal-line" style={{ opacity: 0, display: "flex", gap: 14 }}>
                      <span style={{ color: "rgba(255,255,255,0.25)", width: 14, textAlign: "right" }}>04</span>
                      <span>  <span style={{ color: "#a3e635" }}>stack</span>: [<span style={{ color: "#fde68a" }}>&apos;react&apos;</span>, <span style={{ color: "#fde68a" }}>&apos;go&apos;</span>, <span style={{ color: "#fde68a" }}>&apos;k8s&apos;</span>],</span>
                    </div>
                    <div className="hero-terminal-line" style={{ opacity: 0, display: "flex", gap: 14 }}>
                      <span style={{ color: "rgba(255,255,255,0.25)", width: 14, textAlign: "right" }}>05</span>
                      <span>  <span style={{ color: "#a3e635" }}>status</span>: <span style={{ color: "#fde68a" }}>&apos;accepting&apos;</span>,</span>
                    </div>
                    <div className="hero-terminal-line" style={{ opacity: 0, display: "flex", gap: 14 }}>
                      <span style={{ color: "rgba(255,255,255,0.25)", width: 14, textAlign: "right" }}>06</span>
                      <span>  <span style={{ color: "#a3e635" }}>ship</span>: <span style={{ color: "#ec4899" }}>async</span> () =&gt; <span style={{ color: "rgba(255,255,255,0.5)" }}>/* every week */</span></span>
                    </div>
                    <div className="hero-terminal-line" style={{ opacity: 0, display: "flex", gap: 14 }}>
                      <span style={{ color: "rgba(255,255,255,0.25)", width: 14, textAlign: "right" }}>07</span>
                      <span>{"}"}<span className="caret-blink" style={{ display: "inline-block", width: 8, height: 14, background: "#fafaf9", marginLeft: 6, verticalAlign: "middle" }} /></span>
                    </div>
                  </div>

                  <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "18px -22px 14px" }} />

                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", marginBottom: 8, textTransform: "uppercase" }}>
                      Currently shipping
                    </div>
                    <div className="building-now" style={{ position: "relative", height: 22 }}>
                      {BUILDING_NOW.map((b, i) => (
                        <div
                          key={i}
                          style={{
                            position: "absolute", top: 0, left: 0, right: 0,
                            display: "flex", alignItems: "center", gap: 10,
                            opacity: 0,
                            animation: `building-rotate 12s infinite ${i * 3}s`,
                          }}
                        >
                          <span
                            style={{
                              padding: "2px 8px", borderRadius: 4,
                              background: "rgba(255,255,255,0.08)",
                              fontSize: 9, fontWeight: 600, letterSpacing: "0.14em",
                              color: "rgba(255,255,255,0.7)",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            {b.tag}
                          </span>
                          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
                            {b.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid", gridTemplateColumns: "1fr 1fr",
                      gap: 12, marginTop: 18,
                      paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>
                        Commits today
                      </div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                        <span className="stat-num" data-val="247">247</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>
                        Deploys this week
                      </div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                        <span className="stat-num" data-val="18">18</span>
                      </div>
                    </div>
                  </div>

                  <div
                    aria-hidden
                    style={{
                      position: "absolute", top: -80, right: -80, width: 280, height: 280,
                      background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Scroll hint */}
          <div
            className="hero-scroll-hint"
            style={{
              position: "absolute", bottom: 28, left: "50%",
              transform: "translateX(-50%)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)" }}>
              Scroll
            </span>
            <div
              style={{
                width: 20, height: 32, borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.2)",
                position: "relative", overflow: "hidden",
              }}
            >
              <span
                className="scroll-dot"
                style={{
                  position: "absolute", top: 6, left: "50%", marginLeft: -2,
                  width: 4, height: 4, borderRadius: "50%", background: "rgba(0,0,0,0.5)",
                }}
              />
            </div>
          </div>
        </section>

        {/* ── CAPABILITIES — DESKTOP = PINNED SLATS · MOBILE = ACCORDION ── */}
        <section
          id="services"
          ref={capabilitiesRef}
          className="cap-section"
          style={{
            position: "relative",
            padding: "0",
            background: "#fafaf9",
          }}
        >
          {!isMobile && (
            // ─────────────────────────────────────────────────────────
            // DESKTOP — pinned viewport with horizontal accordion slats.
            // Unchanged layout. Only addition: "Skip to process" button
            // in the header right cluster.
            // ─────────────────────────────────────────────────────────
            <div
              style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                padding: "96px 20px 40px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute", top: 64, left: 20, right: 20, height: 2,
                  background: "rgba(0,0,0,0.06)",
                  borderRadius: 1, overflow: "hidden", zIndex: 2,
                }}
              >
                <div
                  className="cap-progress-bar"
                  style={{
                    position: "absolute", inset: 0,
                    background: "#0a0a0a",
                    transformOrigin: "left center",
                    transform: "scaleX(0)",
                  }}
                />
              </div>

              <div
                className="cap-header"
                style={{
                  maxWidth: 1320, margin: "0 auto", width: "100%",
                  display: "flex", justifyContent: "space-between",
                  alignItems: "end", gap: 40, flexWrap: "wrap",
                  marginBottom: 36, opacity: 0,
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(36px, 4.6vw, 68px)", fontWeight: 500,
                      letterSpacing: "-0.035em", lineHeight: 1, margin: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    What we <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>do best.</span>
                  </h2>
                </div>

                {/* Right cluster — counter + skip pill */}
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: 20,
                    flexWrap: "wrap",
                  }}
                >
                  {/* Counter (unchanged) */}
                  <div
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      fontSize: 11, letterSpacing: "0.14em", color: "rgba(0,0,0,0.4)",
                      fontWeight: 600, textTransform: "uppercase",
                      transform: activeCapability >= 1 ? "translateX(0)" : "translateX(172px)",
                      transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <span>Scroll to explore</span>
                    <span style={{ width: 24, height: 1, background: "rgba(0,0,0,0.2)" }} />
                    <span style={{ fontVariantNumeric: "tabular-nums", color: "#0a0a0a", fontSize: 13 }}>
                      {String(activeCapability + 1).padStart(2, "0")}
                      <span style={{ opacity: 0.35, margin: "0 4px", fontWeight: 400 }}>/</span>
                      {String(SERVICES.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* ── SKIP PILL ──
                      Appears only after user has moved past the first
                      capability — so the section gets to introduce itself
                      before we offer the exit. Uses opacity + pointer-events
                      so the layout doesn't shift; pure CSS transition. */}
                  <button
                    type="button"
                    onClick={skipToProcess}
                    className="cap-skip-btn"
                    aria-label="Skip to process section"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 16px",
                      border: "1px solid rgba(0,0,0,0.15)",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.6)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      color: "rgba(0,0,0,0.75)",
                      cursor: "pointer",
                      opacity: activeCapability >= 1 ? 1 : 0,
                      transform: activeCapability >= 1
                        ? "translateY(0)"
                        : "translateY(4px)",
                      pointerEvents: activeCapability >= 1 ? "auto" : "none",
                      transition:
                        "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s, border-color 0.2s, color 0.2s",
                    }}
                  >
                    <span style={{ opacity: 0.55, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 10, fontWeight: 600 }}>
                      Skip
                    </span>
                    <span style={{ width: 1, height: 12, background: "rgba(0,0,0,0.12)" }} />
                    <span>Jump to our process</span>
                    <svg
                      aria-hidden
                      width="12" height="12" viewBox="0 0 12 12"
                      style={{ transition: "transform 0.25s ease" }}
                      className="cap-skip-arrow"
                    >
                      <path
                        d="M6 2.5v7M3 6.5 6 9.5 9 6.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className="cap-slats"
                style={{
                  flex: 1, maxWidth: 1320, margin: "0 auto", width: "100%",
                  display: "flex", gap: 12,
                  alignItems: "stretch",
                  minHeight: 0,
                  position: "relative",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 6,
                    pointerEvents: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: showCapabilityInterlude ? 1 : 0,
                    transition: "opacity 220ms ease",
                  }}
                >
                  <img
                    src="/images/product-land.png"
                    alt=""
                    draggable={false}
                    style={{
                      width: "min(66vw, 900px)",
                      maxWidth: "100%",
                      height: "auto",
                      opacity: 0.36,
                      filter: "brightness(1.12) contrast(1.12)",
                      userSelect: "none",
                    }}
                  />
                </div>
                {SERVICES.map((s, i) => {
                  const isActive = activeCapability === i;
                  return (
                    <div
                      key={s.num}
                      className={`cap-slat ${isActive ? "is-active" : ""}`}
                      onClick={() => {
                        const st = capScrollTriggerRef.current;
                        if (!st) return;

                        const slatCount = SERVICES.length;
                        const progressTarget = i / (slatCount - 1);
                        const targetY = st.start + progressTarget * (st.end - st.start) + 1;

                        const distance = Math.abs(i - activeCapability);
                        const duration = Math.min(1.6, 0.75 + distance * 0.15);

                        capProgrammaticScrollRef.current = true;
                        const releaseGuard = () => {
                          capProgrammaticScrollRef.current = false;
                        };

                        if (lenisRef.current) {
                          lenisRef.current.scrollTo(targetY, {
                            duration,
                            easing: (t: number) =>
                              t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
                            onComplete: releaseGuard,
                          });
                          setTimeout(releaseGuard, duration * 1000 + 300);
                        } else {
                          gsap.to(window, {
                            duration,
                            scrollTo: { y: targetY, autoKill: false },
                            ease: "power3.inOut",
                            onComplete: releaseGuard,
                          });
                        }
                      }}
                      style={{
                        position: "relative",
                        flexGrow: i === 0 ? 12 : 1,
                        flexShrink: 1,
                        flexBasis: 0,
                        borderRadius: 20,
                        overflow: "hidden",
                        background: "#0a0a0a",
                        color: "#fafaf9",
                        border: "1px solid rgba(255,255,255,0.05)",
                        cursor: isActive ? "default" : "pointer",
                        minWidth: 0,
                        willChange: "flex-grow",
                      }}
                    >
                      <div
                        className="cap-slat-collapsed"
                        style={{
                          position: "absolute", inset: 0,
                          display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "space-between",
                          padding: "22px 0",
                          pointerEvents: isActive ? "none" : "auto",
                        }}
                      >
                        <span
                          style={{
                            width: 8, height: 8, borderRadius: "50%",
                            background: s.accent,
                            flexShrink: 0,
                            boxShadow: `0 0 0 4px ${s.accent}1a`,
                          }}
                        />

                        <div
                          style={{
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                            fontFamily: "var(--font-display)",
                            fontSize: 13, fontWeight: 500,
                            letterSpacing: "0.28em", textTransform: "uppercase",
                            color: "rgba(250,250,249,0.82)",
                            whiteSpace: "nowrap",
                            lineHeight: 1,
                          }}
                        >
                          {s.title}
                        </div>

                        <div
                          style={{
                            display: "flex", flexDirection: "column",
                            alignItems: "center", gap: 10, flexShrink: 0,
                          }}
                        >
                          <span style={{ width: 20, height: 1, background: "rgba(250,250,249,0.18)" }} />
                          <span
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: 11, fontWeight: 500,
                              color: "rgba(250,250,249,0.55)",
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {s.num}
                          </span>
                        </div>
                      </div>

                      <div
                        className="cap-slat-expanded"
                        style={{
                          position: "absolute",
                          top: 0, left: 0, bottom: 0,
                          width: "var(--cap-expanded-w, 1100px)",
                          padding: "40px 48px 44px",
                          display: "flex", flexDirection: "column",
                          pointerEvents: isActive ? "auto" : "none",
                        }}
                      >
                        <div
                          aria-hidden
                          style={{
                            position: "absolute", inset: 0,
                            backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
                            backgroundSize: "26px 26px",
                            maskImage: "radial-gradient(ellipse 70% 50% at 85% 15%, black 0%, transparent 75%)",
                            WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 85% 15%, black 0%, transparent 75%)",
                            pointerEvents: "none",
                          }}
                        />

                        <div
                          style={{
                            display: "flex", justifyContent: "space-between",
                            alignItems: "center", position: "relative", zIndex: 1,
                            marginBottom: 24,
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span
                              style={{
                                width: 10, height: 10, borderRadius: "50%",
                                background: s.accent,
                                boxShadow: "0 0 0 4px rgba(255,255,255,0.06)",
                              }}
                            />
                            <span
                              style={{
                                fontFamily: "var(--font-display)",
                                fontSize: 12, fontWeight: 500,
                                letterSpacing: "0.14em", textTransform: "uppercase",
                                color: "rgba(255,255,255,0.62)",
                              }}
                            >
                              Capability {s.num} <span style={{ opacity: 0.4, margin: "0 6px" }}>/</span> {s.kicker}
                            </span>
                          </div>

                          <span
                            aria-hidden
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: 48, fontWeight: 500,
                              letterSpacing: "-0.04em", lineHeight: 1,
                              color: "transparent",
                              WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {s.num}
                          </span>
                        </div>

                        <div
                          className="cap-slat-body"
                          style={{
                            flex: 1, position: "relative", zIndex: 1,
                            display: "grid", gridTemplateColumns: "1.15fr 1fr",
                            gap: 48, alignItems: "start",
                            minHeight: 0,
                          }}
                        >
                          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                            <h3
                              style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(34px, 4vw, 60px)", fontWeight: 500,
                                letterSpacing: "-0.035em", lineHeight: 0.98,
                                margin: "0 0 20px",
                              }}
                            >
                              {s.title.split(" ").map((word, wi, arr) => (
                                <span key={wi} style={{ display: "inline-block", marginRight: wi < arr.length - 1 ? "0.25em" : 0 }}>
                                  {wi === arr.length - 1 ? (
                                    <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.62)" }}>{word}</span>
                                  ) : (
                                    word
                                  )}
                                </span>
                              ))}
                            </h3>
                            <p
                              style={{
                                fontSize: 15.5, color: "rgba(255,255,255,0.62)",
                                lineHeight: 1.7, margin: "0 0 28px", maxWidth: 480,
                              }}
                            >
                              {s.desc}
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
                              {s.tags.map((t) => (
                                <span
                                  key={t}
                                  style={{
                                    padding: "6px 12px",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    borderRadius: 999, fontSize: 11, fontWeight: 500,
                                    color: "rgba(255,255,255,0.72)",
                                    letterSpacing: "0.02em",
                                  }}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div style={{ position: "relative", minHeight: 0, overflow: "hidden" }}>
                            <div
                              style={{
                                fontSize: 11, fontWeight: 600, letterSpacing: "0.16em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.62)",
                                marginBottom: 16, display: "flex",
                                alignItems: "center", gap: 10,
                              }}
                            >
                              <span style={{ width: 16, height: 1, background: "rgba(255,255,255,0.3)", display: "inline-block" }} />
                              What we deliver
                            </div>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                              {s.deliverables.map((d, di) => (
                                <li
                                  key={di}
                                  style={{
                                    padding: "12px 0",
                                    borderBottom: di < s.deliverables.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                                    display: "flex", alignItems: "center", gap: 14,
                                    fontSize: 14, color: "#fafaf9",
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 400, letterSpacing: "-0.005em",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: 10,
                                      color: "rgba(255,255,255,0.45)",
                                      fontVariantNumeric: "tabular-nums",
                                      fontWeight: 500, minWidth: 20,
                                    }}
                                  >
                                    0{di + 1}
                                  </span>
                                  <span style={{ flex: 1 }}>{d}</span>
                                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>→</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div
                          style={{
                            marginTop: 24, paddingTop: 18,
                            borderTop: "1px solid rgba(255,255,255,0.08)",
                            display: "flex", justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: 11, letterSpacing: "0.14em",
                            textTransform: "uppercase", fontWeight: 600,
                            color: "rgba(255,255,255,0.55)",
                            position: "relative", zIndex: 1,
                          }}
                        >
                          <span>{s.glyph} &nbsp; {s.kicker}</span>
                          <span style={{ fontVariantNumeric: "tabular-nums" }}>
                            {s.num} / {String(SERVICES.length).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {isMobile && (
            // ─────────────────────────────────────────────────────────
            // MOBILE — tap-to-expand accordion.
            // No pinning, no scroll-hijack, no fake vertical text.
            // Each capability is a compact card that opens inline.
            // ─────────────────────────────────────────────────────────
            <div className="cap-mobile">
              <div className="cap-mobile__header">
                <div className="cap-mobile__eyebrow">What we do best</div>
                <h2 className="cap-mobile__title">
                  Three service pillars.
                  <br />
                  <span className="cap-mobile__title-italic">One senior team.</span>
                </h2>
                <p className="cap-mobile__lead">
                  Tap any capability to see what it includes. Or jump straight
                  ahead to how we work.
                </p>
                <button
                  type="button"
                  onClick={skipToProcess}
                  className="cap-mobile__skip"
                >
                  <span style={{ opacity: 0.55, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 10, fontWeight: 600 }}>
                    Skip
                  </span>
                  <span style={{ width: 1, height: 10, background: "rgba(0,0,0,0.12)" }} />
                  <span>Jump to our process</span>
                  <svg aria-hidden width="11" height="11" viewBox="0 0 12 12">
                    <path
                      d="M6 2.5v7M3 6.5 6 9.5 9 6.5"
                      fill="none" stroke="currentColor" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <ul className="cap-mobile__list" role="list">
                {SERVICES.map((s, i) => {
                  const isOpen = mobileOpenCap === i;
                  return (
                    <li
                      key={s.num}
                      className="cap-mobile__item"
                      data-open={isOpen ? "true" : "false"}
                    >
                      <button
                        type="button"
                        className="cap-mobile__trigger"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setMobileOpenCap(isOpen ? null : i)
                        }
                      >
                        <span
                          className="cap-mobile__dot"
                          style={{ background: s.accent }}
                          aria-hidden
                        />
                        <span className="cap-mobile__num">{s.num}</span>
                        <span className="cap-mobile__name">{s.title}</span>
                        <span className="cap-mobile__chev" aria-hidden>
                          <svg width="14" height="14" viewBox="0 0 14 14">
                            <path
                              d="M3 5.5 7 9.5 11 5.5"
                              fill="none" stroke="currentColor" strokeWidth="1.4"
                              strokeLinecap="round" strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>

                      <div className="cap-mobile__panel">
                        <div className="cap-mobile__panel-inner">
                          <div className="cap-mobile__kicker">
                            Capability {s.num}{" "}
                            <span style={{ opacity: 0.5 }}>·</span>{" "}
                            {s.kicker}
                          </div>
                          <p className="cap-mobile__desc">{s.desc}</p>

                          <div className="cap-mobile__deliver-label">
                            What we deliver
                          </div>
                          <ul className="cap-mobile__deliver" role="list">
                            {s.deliverables.map((d, di) => (
                              <li key={di}>
                                <span className="cap-mobile__deliver-num">
                                  0{di + 1}
                                </span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="cap-mobile__tags">
                            {s.tags.map((t) => (
                              <span key={t}>{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>

        {/* ── PROCESS (HORIZONTAL PINNED SCROLL) ── */}
        <section
          id="process"
          className="process-pin"
          style={{
            padding: 0, background: "#0a0a0a", color: "#fafaf9",
            height: "100vh", overflow: "hidden", position: "relative",
            display: "flex", flexDirection: "column",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative", zIndex: 2,
              flexShrink: 0,
              padding: "clamp(80px, 12vh, 140px) 20px clamp(20px, 3vh, 40px)",
              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
              gap: 40,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 4.5vw, 72px)", fontWeight: 500,
                  letterSpacing: "-0.035em", lineHeight: 0.95, margin: 0,
                }}
              >
                Our <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>process.</span>
              </h2>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", maxWidth: 300, lineHeight: 1.65, margin: 0, textAlign: "right", flexShrink: 0 }}>
              Four phases. One team. A way of working<br />refined across 150+ shipped products.
            </p>
          </div>

          <div
            style={{
              flex: 1, minHeight: 0,
              display: "flex", alignItems: "center",
              position: "relative", zIndex: 1,
            }}
          >
            <div
              className="process-track"
              style={{
                display: "flex", gap: 20,
                paddingLeft: 20, paddingRight: 112,
                willChange: "transform",
                alignItems: "stretch",
              }}
            >
              {PROCESS.map((step, i) => (
                <div
                  key={i}
                  className="process-card"
                  style={{
                    width: "clamp(320px, 28vw, 440px)",
                    flexShrink: 0, padding: "clamp(28px, 3.5vh, 44px) 36px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 20, background: "rgba(255,255,255,0.02)",
                    display: "flex", flexDirection: "column",
                    justifyContent: "space-between",
                    height: "clamp(340px, 58vh, 500px)",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(24px, 4vh, 48px)" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(48px, 6vh, 72px)", fontWeight: 500,
                          color: "rgba(255,255,255,0.12)",
                          lineHeight: 1, letterSpacing: "-0.04em",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {step.num}
                      </span>
                      <span
                        style={{
                          padding: "5px 12px", borderRadius: 999,
                          border: "1px solid rgba(255,255,255,0.15)",
                          fontSize: 11, fontWeight: 500,
                          color: "rgba(255,255,255,0.65)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Phase 0{i + 1}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(26px, 3.2vh, 40px)", fontWeight: 500,
                        margin: "0 0 clamp(10px, 2vh, 20px)",
                        letterSpacing: "-0.02em", lineHeight: 1,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "clamp(13px, 1.6vh, 15px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "clamp(14px, 2.5vh, 24px)" }}>
                    {step.points.map((p) => (
                      <li
                        key={p}
                        style={{
                          fontSize: 13, color: "rgba(255,255,255,0.7)",
                          padding: "clamp(5px, 1vh, 8px) 0",
                          display: "flex", alignItems: "center", gap: 12,
                        }}
                      >
                        <span style={{ width: 14, height: 1, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div
                style={{
                  width: 300, flexShrink: 0,
                  padding: "clamp(28px, 3.5vh, 44px) 36px",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                  height: "clamp(340px, 58vh, 500px)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(22px, 2.8vh, 32px)", fontWeight: 500,
                    margin: "0 0 20px",
                    letterSpacing: "-0.025em", lineHeight: 1.1,
                  }}
                >
                  Every project.{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>No exceptions.</span>
                </h3>
                <a
                  href="mailto:hello@techbinaries.com"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "12px 22px", background: "#fafaf9", color: "#0a0a0a",
                    borderRadius: 999, fontSize: 13, fontWeight: 500,
                    textDecoration: "none", alignSelf: "flex-start", marginTop: 4,
                  }}
                >
                  Start yours →
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute", bottom: 20, left: 32,
              fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
              display: "flex", alignItems: "center", gap: 10,
            }}
          >
            <span style={{ display: "inline-block", width: 28, height: 1, background: "rgba(255,255,255,0.25)" }} />
            Scroll
          </div>
          <div
            style={{
              position: "absolute", bottom: 20, right: 32,
              fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            04 phases
          </div>
        </section>

        {/* ── STUDIO / PHILOSOPHY ── */}
        <section id="studio" style={{ padding: "160px 20px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>

            <div className="sh" style={{ opacity: 0 }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3.4vw, 52px)", fontWeight: 400,
                  lineHeight: 1.25, letterSpacing: "-0.02em", margin: 0,
                  maxWidth: 1100,
                }}
              >
                We believe the best software is built by small, senior teams who give a
                damn. No handoffs, no juniors at the helm, no theatre —{" "}
                <span style={{ fontStyle: "italic", color: "rgba(0,0,0,0.5)" }}>
                  just people who care, shipping work they&apos;re proud of.
                </span>
              </p>
            </div>

            <div
              style={{
                marginTop: 100, display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)", gap: 0,
                borderTop: "1px solid rgba(0,0,0,0.1)",
              }}
              className="principles-grid"
            >
              {[
                { n: "I.", t: "Senior by default", d: "Every engineer you talk to has shipped products at scale. No layers, no account managers." },
                { n: "II.", t: "Ship weekly", d: "Real demos every week. You stay close to the work. We stay accountable." },
                { n: "III.", t: "Built to last", d: "Architecture decisions made for the next 5 years, not the next sprint." },
              ].map((p, i) => (
                <div
                  key={p.n}
                  style={{
                    padding: "40px 32px 40px 0",
                    borderRight: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none",
                    paddingLeft: i > 0 ? 32 : 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 13, color: "rgba(0,0,0,0.35)",
                      fontWeight: 500, marginBottom: 24,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {p.n}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 22, fontWeight: 500, margin: "0 0 14px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {p.t}
                  </h3>
                  <p style={{ fontSize: 14.5, color: "rgba(0,0,0,0.58)", lineHeight: 1.65, margin: 0 }}>
                    {p.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section
          id="testimonials"
          style={{
            padding: "140px 20px",
            background: "#f5f5f4",
            borderTop: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ maxWidth: 1220, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                marginBottom: 42,
              }}
            >
              <div style={{ maxWidth: 720, marginLeft: -6 }}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(32px, 3.8vw, 56px)",
                    fontWeight: 500,
                    letterSpacing: "-0.032em",
                    lineHeight: 1.02,
                    margin: "0 0 16px",
                  }}
                >
                  What our <span style={{ color: "rgba(0,0,0,0.52)", fontWeight: 400, fontStyle: "italic" }}>clients</span> say
                </h2>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "rgba(0,0,0,0.58)", maxWidth: 620 }}>
                  Real feedback from teams we have partnered with across product, platform, and AI delivery.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                aria-label="Previous testimonial"
                onClick={slideTestimonialsPrev}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: "1px solid rgba(0,0,0,0.2)",
                  background: "#fff",
                  color: "#111",
                  fontSize: 20,
                  lineHeight: 1,
                  cursor: "pointer",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                &lt;
              </button>

              <div style={{ overflow: "hidden", flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    transform: `translateX(${testimonialTranslate}%)`,
                    transition: testimonialSlideDirection && testimonialAnimate
                      ? "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)"
                      : "none",
                  }}
                  onTransitionEnd={handleTestimonialTransitionEnd}
                >
                  {visibleTestimonials.map((t, i) => (
                    <div
                      key={`${t.initials}-${i}`}
                      style={{
                        flex: `0 0 ${100 / testimonialVisibleCount}%`,
                        padding: "0 9px",
                      }}
                    >
                      <article
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          border: "1px solid rgba(0,0,0,0.1)",
                          background: "#fafaf9",
                          padding: "28px 26px",
                          minHeight: 300,
                          height: "100%",
                        }}
                      >
                        <blockquote
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(17px, 1.65vw, 22px)",
                            lineHeight: 1.45,
                            letterSpacing: "-0.014em",
                            color: "rgba(0,0,0,0.85)",
                          }}
                        >
                          &ldquo;{t.quote}&rdquo;
                        </blockquote>

                        <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(0,0,0,0.09)", display: "flex", alignItems: "center", gap: 14 }}>
                          <div
                            style={{
                              width: 42,
                              height: 42,
                              borderRadius: "50%",
                              background: "#0a0a0a",
                              color: "#fafaf9",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 12,
                              fontWeight: 500,
                              letterSpacing: "0.05em",
                              fontFamily: "var(--font-display)",
                              flexShrink: 0,
                            }}
                          >
                            {t.initials}
                          </div>
                          <div>
                            <div style={{ fontSize: 14.5, fontWeight: 500, letterSpacing: "-0.005em", color: "#111" }}>{t.name}</div>
                            <div style={{ fontSize: 13, color: "rgba(0,0,0,0.5)", marginTop: 2 }}>{t.title}</div>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>

              <button
                aria-label="Next testimonial"
                onClick={slideTestimonialsNext}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: "1px solid rgba(0,0,0,0.2)",
                  background: "#fff",
                  color: "#111",
                  fontSize: 20,
                  lineHeight: 1,
                  cursor: "pointer",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                &gt;
              </button>
            </div>
          </div>
        </section>

        {/* ── TECH MARQUEE ── */}
        <section
          className="tech-marquee"
          onMouseEnter={handleTechMarqueeEnter}
          onMouseLeave={handleTechMarqueeLeave}
          style={{ padding: "90px 0", borderTop: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }}
        >
          <div style={{ maxWidth: 1320, margin: "0 auto 56px", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "end", gap: 40, flexWrap: "wrap" }}>
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 3.8vw, 56px)", fontWeight: 500,
                  letterSpacing: "-0.03em", lineHeight: 1, margin: 0,
                }}
              >
                Tools we <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>trust.</span>
              </h2>
            </div>
            <p style={{ fontSize: 14, color: "rgba(0,0,0,0.55)", maxWidth: 380, lineHeight: 1.65, margin: 0 }}>
              Mature, battle-tested tooling — picked for your problem, not because it&apos;s new.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ overflow: "hidden" }}>
              <div ref={marqueeLeftRef} className="marquee-track marquee-left" style={{ display: "flex", width: "max-content", gap: 0 }}>
                {[...TECH, ...TECH].map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "center", gap: 28,
                      padding: "0 24px", flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(20px, 2.4vw, 34px)",
                        fontWeight: 500, color: "#0a0a0a",
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {t}
                    </span>
                    <span
                      aria-hidden
                      style={{
                        width: 8, height: 8, background: "#0a0a0a",
                        borderRadius: "50%", opacity: 0.2,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ overflow: "hidden", marginTop: 20 }}>
              <div ref={marqueeRightRef} className="marquee-track marquee-right" style={{ display: "flex", width: "max-content", gap: 0 }}>
                {[...TECH.slice().reverse(), ...TECH.slice().reverse()].map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "center", gap: 28,
                      padding: "0 24px", flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(20px, 2.4vw, 34px)",
                        fontWeight: 400, fontStyle: "italic",
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(0,0,0,0.2)",
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {t}
                    </span>
                    <span
                      aria-hidden
                      style={{
                        width: 8, height: 8,
                        border: "1px solid rgba(0,0,0,0.2)",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="contact" style={{ padding: "0 20px 80px", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 80 }}>
          <div
            id="cta-inner"
            style={{
              borderRadius: 32, overflow: "hidden",
              padding: "120px 72px", position: "relative",
              background: "#0a0a0a", color: "#fafaf9",
              opacity: 0, maxWidth: 1320, margin: "0 auto",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute", inset: 0,
                backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                pointerEvents: "none",
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute", top: "-20%", right: "-10%",
                width: 560, height: 560,
                background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute", right: 40, bottom: -40,
                width: "clamp(260px, 28vw, 440px)",
                opacity: 0.28,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              <img
                src="/images/product-land.png"
                alt=""
                draggable={false}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>

            <div style={{ position: "relative", zIndex: 1, maxWidth: 820 }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(48px, 7vw, 108px)", fontWeight: 500,
                  letterSpacing: "-0.04em", lineHeight: 0.92,
                  margin: "0 0 36px",
                }}
              >
                Have a product<br />
                in mind?{" "}
                <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>
                  Let&apos;s talk.
                </span>
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.58)", maxWidth: 520, lineHeight: 1.65, margin: "0 0 48px" }}>
                Free 30-minute discovery call. You&apos;ll talk directly with an engineer
                and a strategist. No sales pitch, just a real conversation about your
                problem.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href="mailto:hello@techbinaries.com"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "15px 28px", background: "#fafaf9", color: "#0a0a0a",
                    textDecoration: "none", fontSize: 14, fontWeight: 500,
                    borderRadius: 999, transition: "transform 0.2s",
                  }}
                >
                  Book a discovery call
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="mailto:hello@techbinaries.com"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "15px 28px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.85)",
                    textDecoration: "none", fontSize: 14, fontWeight: 500,
                    borderRadius: 999, transition: "background 0.2s, border-color 0.2s",
                  }}
                  className="ghost-btn-dark"
                >
                  hello@techbinaries.com
                </a>
              </div>

              <div
                style={{
                  marginTop: 80, paddingTop: 32,
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32,
                }}
              >
                {[
                  { k: "Response time", v: "Within 24h" },
                  { k: "Typical project", v: "8–16 weeks" },
                  { k: "Based in", v: "Houston, US" },
                ].map((it) => (
                  <div key={it.k}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                      {it.k}
                    </div>
                    <div style={{ fontSize: 17, color: "#fafaf9", fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "-0.01em" }}>
                      {it.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer
          style={{
            background: "#fafaf9",
            color: "#0a0a0a",
            padding: "88px 20px 36px",
            position: "relative",
            overflow: "hidden",
            borderTopLeftRadius: 88,
            borderTop: "1px solid rgba(10,10,10,0.16)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(rgba(10,10,10,0.05) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              opacity: 0.22,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div
              className="footer-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(280px, 360px) max-content max-content minmax(320px, 460px)",
                columnGap: 44,
                rowGap: 48,
                marginBottom: 50,
              }}
            >
              <div>
                <a
                  href="/"
                  aria-label="TechBinaries homepage"
                  style={{
                    display: "inline-flex",
                    marginLeft: -18,
                    marginBottom: 14,
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      position: "relative",
                      width: 252,
                      height: 50,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src="/images/header-logo.png"
                      alt="TechBinaries"
                      fill
                      sizes="252px"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </span>
                </a>
                <a
                  href="mailto:hello@techbinaries.com"
                  className="footer-email"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "var(--font-display)",
                    fontSize: 19,
                    lineHeight: 1.2,
                    color: "rgba(10,10,10,0.84)",
                    textDecoration: "none",
                    marginBottom: 18,
                  }}
                >
                  <span className="footer-email-text">hello@techbinaries.com</span>
                  <span className="footer-email-arrow" style={{ transition: "transform 0.25s, color 0.25s", color: "rgba(10,10,10,0.45)" }}>↗</span>
                </a>
                <p style={{ color: "rgba(10,10,10,0.62)", lineHeight: 1.65, fontSize: 16, maxWidth: 380 }}>
                  Built in-house with care. Small senior team, direct collaboration,
                  fast execution.
                </p>
              </div>

              {[
                {
                  heading: "Capabilities",
                  links: [
                    { label: "Services", href: "#services", ext: false },
                    { label: "Process", href: "#process", ext: false },
                    { label: "Studio", href: "#studio", ext: false },
                    { label: "Contact", href: "#contact", ext: false },
                  ],
                },
                {
                  heading: "Studio",
                  links: [
                    { label: "Manifesto", href: "#studio", ext: false },
                    { label: "Testimonials", href: "#testimonials", ext: false },
                    { label: "Stack", href: "#tech-stack", ext: false },
                  ],
                },
              ].map((col) => (
                <div key={col.heading}>
                  <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(64,64,64,1)", marginBottom: 16 }}>
                    {col.heading}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13 }}>
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="footer-nav-link"
                          target={link.ext ? "_blank" : undefined}
                          rel={link.ext ? "noreferrer" : undefined}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            color: "rgba(10,10,10,0.72)",
                            textDecoration: "none",
                            fontSize: 16,
                            lineHeight: 1.35,
                            transition: "color 0.25s",
                          }}
                        >
                          <span className="footer-nav-link-text">{link.label}</span>
                          {link.ext && (
                            <span className="footer-nav-link-arrow" style={{ transition: "transform 0.22s, opacity 0.22s", opacity: 0.72 }}>
                              ↗
                            </span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div style={{ maxWidth: 460, marginLeft: 28 }}>
                  <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(64,64,64,1)", marginBottom: 16 }}>
                    The Dispatch
                  </div>
                  <p style={{ color: "rgba(10,10,10,0.65)", fontSize: 16, lineHeight: 1.6, marginBottom: 18 }}>
                    Monthly notes on product bets, technical architecture, and what we&apos;re
                    shipping in the studio.
                  </p>
                  <form
                    className="footer-newsletter-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const input = form.elements.namedItem("email") as HTMLInputElement | null;
                      const value = input?.value?.trim() || "";
                      const body = value
                        ? `Please subscribe this email to The Dispatch:%0D%0A${encodeURIComponent(value)}`
                        : "Please subscribe me to The Dispatch.";
                      window.location.href = `mailto:hello@techbinaries.com?subject=Subscribe%20to%20The%20Dispatch&body=${body}`;
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      border: "1px solid rgba(10,10,10,0.16)",
                      borderRadius: 999,
                      padding: "7px 7px 7px 16px",
                      background: "rgba(10,10,10,0.025)",
                      transition: "border-color 0.25s, background 0.25s",
                    }}
                  >
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@company.com"
                      style={{
                        flex: 1,
                        border: "none",
                        background: "transparent",
                        outline: "none",
                        color: "#0a0a0a",
                        fontSize: 14,
                        fontFamily: "var(--font-body)",
                      }}
                    />
                    <button
                      className="footer-newsletter-btn"
                      type="submit"
                      style={{
                        border: "none",
                        borderRadius: 999,
                        padding: "10px 16px",
                        background: "#0a0a0a",
                        color: "#fafaf9",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "transform 0.22s, background 0.22s",
                      }}
                    >
                      Subscribe →
                    </button>
                  </form>
              </div>
            </div>

            <div
              className="footer-bottom"
              style={{
                borderTop: "1px solid rgba(10,10,10,0.1)",
                paddingTop: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 13, color: "rgba(10,10,10,0.54)" }}>
                © 2026 TechBinaries 
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                {[
                  {
                    label: "X (Twitter)",
                    href: "https://x.com",
                    icon: (
                      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
                        <path d="M18.901 1.153h3.68l-8.04 9.188L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.472l8.6-9.829L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z" />
                      </svg>
                    ),
                  },
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com",
                    icon: (
                      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
                        <path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.5c0-1.3-.02-2.98-1.82-2.98-1.82 0-2.1 1.42-2.1 2.88V21H9z" />
                      </svg>
                    ),
                  },
                  {
                    label: "GitHub",
                    href: "https://github.com",
                    icon: (
                      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
                        <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.3 9.4 7.88 10.93.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.7 1.27 3.36.97.1-.75.4-1.27.73-1.56-2.56-.3-5.25-1.29-5.25-5.74 0-1.27.45-2.3 1.2-3.12-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.2 1.19a11.1 11.1 0 015.82 0c2.22-1.5 3.2-1.2 3.2-1.2.63 1.66.23 2.88.12 3.18.74.81 1.2 1.85 1.2 3.12 0 4.46-2.7 5.44-5.27 5.73.41.35.78 1.05.78 2.12v3.15c0 .31.2.67.8.55A11.53 11.53 0 0023.5 12C23.5 5.66 18.35.5 12 .5z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="footer-social-link"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      border: "1px solid rgba(10,10,10,0.18)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(10,10,10,0.72)",
                      textDecoration: "none",
                      transition: "all 0.22s",
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
                <span style={{ width: 1, height: 16, background: "rgba(10,10,10,0.14)", margin: "0 2px 0 2px" }} />
                {["Privacy", "Terms", "Cookies"].map((item, idx) => (
                  <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                    <a
                      href="#"
                      className="footer-legal-link"
                      style={{
                        textDecoration: "none",
                        color: "rgba(10,10,10,0.56)",
                        fontSize: 13,
                        transition: "color 0.22s",
                      }}
                    >
                      {item}
                    </a>
                    {idx < 2 && <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(10,10,10,0.28)" }} />}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { cursor: none !important; background: #fafaf9; -webkit-font-smoothing: antialiased; }
        ::selection { background: #0a0a0a; color: #fafaf9; }

        /* Marquee */
        .marquee-left, .marquee-right { will-change: transform; }

        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(22,163,74,0.45); }
          70%  { box-shadow: 0 0 0 8px rgba(22,163,74,0); }
          100% { box-shadow: 0 0 0 0 rgba(22,163,74,0); }
        }
        .pulse-green { animation: pulse-ring 2s infinite; }

        @keyframes caret-blink {
          0%, 50%   { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .caret-blink { animation: caret-blink 1.1s step-end infinite; }

        @keyframes scroll-dot-bounce {
          0%   { transform: translateY(0); opacity: 0; }
          30%  { opacity: 1; }
          80%  { transform: translateY(14px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
        .scroll-dot { animation: scroll-dot-bounce 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite; }

        @keyframes building-rotate {
          0%,  2%  { opacity: 0; transform: translateY(8px); }
          4%, 24%  { opacity: 1; transform: translateY(0); }
          26%, 100% { opacity: 0; transform: translateY(-8px); }
        }

        .hero-cta-primary::before {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(90deg, #262626, #0a0a0a);
          transform: translateX(-101%);
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
          z-index: 1;
        }
        .hero-cta-primary:hover::before { transform: translateX(0); }

        .hero-terminal { transition: filter 0.4s; }
        .hero-terminal:hover { filter: drop-shadow(0 10px 30px rgba(0,0,0,0.15)); }

        /* ── CAPABILITIES ── */
        .cap-slat { will-change: flex-grow; }
        .cap-slat:not(.is-active):hover .cap-slat-collapsed > div[style*="writing-mode"] {
          color: #fafaf9 !important;
          transition: color 0.3s ease;
        }
        .cap-slat:not(.is-active):hover {
          background: #161616 !important;
          transition: background 0.3s ease;
        }
        .cap-slat-expanded ul li {
          transition: padding-left 0.3s ease;
          cursor: default;
        }
        .cap-slat-expanded ul li:hover { padding-left: 8px; }
        .cap-slat-expanded ul li:hover > span:last-child {
          transform: translateX(4px);
          transition: transform 0.25s ease;
          color: rgba(255,255,255,0.8) !important;
        }

        .ghost-btn:hover {
          border-color: rgba(0,0,0,0.35) !important;
          color: #0a0a0a !important;
          background: rgba(255,255,255,0.9) !important;
        }
        .ghost-btn-dark:hover {
          border-color: rgba(255,255,255,0.45) !important;
          background: rgba(255,255,255,0.05) !important;
        }

        .footer-link:hover { color: #0a0a0a !important; }
        .client-logo:hover { color: #0a0a0a !important; }
        .link-underline:hover { color: #0a0a0a !important; }

        /* ── FOOTER ── */
        .footer-newsletter-form:focus-within {
          border-color: rgba(10, 10, 10, 0.28) !important;
          background: rgba(10, 10, 10, 0.04) !important;
        }
        .footer-newsletter-form input::placeholder {
          color: rgba(10, 10, 10, 0.4);
        }
        .footer-newsletter-btn:hover {
          background: #1f1f1f !important;
          transform: translateX(2px);
        }

        .footer-email:hover .footer-email-arrow {
          transform: translate(3px, -3px);
          color: #0a0a0a !important;
        }
        .footer-email .footer-email-text {
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 0% 1px;
          background-repeat: no-repeat;
          background-position: 0 100%;
          transition: background-size 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          padding-bottom: 2px;
        }
        .footer-email:hover .footer-email-text {
          background-size: 100% 1px;
        }

        .footer-nav-link:hover {
          color: #0a0a0a !important;
        }
        .footer-nav-link .footer-nav-link-text {
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 0% 1px;
          background-repeat: no-repeat;
          background-position: 0 100%;
          transition: background-size 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          padding-bottom: 2px;
        }
        .footer-nav-link:hover .footer-nav-link-text {
          background-size: 100% 1px;
        }
        .footer-nav-link:hover .footer-nav-link-arrow {
          transform: translate(2px, -2px);
          opacity: 1;
        }

        .footer-legal-link:hover {
          color: #0a0a0a !important;
        }
        .footer-social-link:hover {
          color: #0a0a0a !important;
          border-color: rgba(10,10,10,0.42) !important;
          transform: translateY(-1px);
          background: rgba(10,10,10,0.05);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .principles-grid { grid-template-columns: 1fr !important; }
          .principles-grid > div { border-right: none !important; border-bottom: 1px solid rgba(0,0,0,0.08); padding-left: 0 !important; padding-right: 0 !important; }
          .principles-grid > div:last-child { border-bottom: none; }
          .hero-main-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          .footer-grid {
            grid-template-columns: minmax(280px, 360px) max-content !important;
            gap: 48px !important;
          }
        }
        /* ── Skip pill hover — desktop capabilities header ── */
        .cap-skip-btn:hover {
          background: #0a0a0a !important;
          border-color: #0a0a0a !important;
          color: #fafaf9 !important;
        }
        .cap-skip-btn:hover .cap-skip-arrow {
          transform: translateY(2px);
        }

        /* ── MOBILE CAPABILITIES ACCORDION ── */
        .cap-mobile {
          padding: 80px 20px 80px;
          max-width: 720px;
          margin: 0 auto;
        }
        .cap-mobile__eyebrow {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(10, 10, 10, 0.45);
          margin-bottom: 14px;
        }
        .cap-mobile__title {
          font-family: var(--font-display);
          font-size: clamp(32px, 8vw, 44px);
          font-weight: 500;
          letter-spacing: -0.032em;
          line-height: 1.02;
          margin: 0 0 16px;
          color: #0a0a0a;
        }
        .cap-mobile__title-italic {
          font-style: italic;
          font-weight: 400;
          color: rgba(10, 10, 10, 0.55);
        }
        .cap-mobile__lead {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.6;
          color: rgba(10, 10, 10, 0.6);
          margin: 0 0 22px;
          max-width: 440px;
        }
        .cap-mobile__skip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: 1px solid rgba(10, 10, 10, 0.15);
          border-radius: 999px;
          background: #fff;
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 500;
          color: rgba(10, 10, 10, 0.78);
          cursor: pointer;
          margin-bottom: 40px;
          -webkit-tap-highlight-color: transparent;
        }
        .cap-mobile__skip:active {
          background: #0a0a0a;
          color: #fafaf9;
          border-color: #0a0a0a;
        }

        .cap-mobile__list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cap-mobile__item {
          background: #0a0a0a;
          color: #fafaf9;
          border-radius: 16px;
          overflow: hidden;
          transition: background 0.3s ease;
        }
        .cap-mobile__item[data-open="true"] {
          background: #111;
        }
        .cap-mobile__trigger {
          width: 100%;
          display: grid;
          grid-template-columns: auto auto 1fr auto;
          align-items: center;
          gap: 14px;
          padding: 18px 18px;
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
          text-align: left;
          -webkit-tap-highlight-color: transparent;
          font-family: var(--font-display);
        }
        .cap-mobile__dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .cap-mobile__num {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 500;
          color: rgba(250, 250, 249, 0.4);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.04em;
        }
        .cap-mobile__name {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 500;
          letter-spacing: -0.015em;
          color: #fafaf9;
          line-height: 1.2;
        }
        .cap-mobile__chev {
          width: 28px; height: 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(250, 250, 249, 0.18);
          border-radius: 50%;
          color: #fafaf9;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                      background 0.2s, border-color 0.2s;
          flex-shrink: 0;
        }
        .cap-mobile__item[data-open="true"] .cap-mobile__chev {
          transform: rotate(180deg);
          background: #fafaf9;
          color: #0a0a0a;
          border-color: #fafaf9;
        }

        .cap-mobile__panel {
          /* Pure CSS expand/collapse via grid-template-rows — most
             performant approach that also transitions cleanly. */
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cap-mobile__item[data-open="true"] .cap-mobile__panel {
          grid-template-rows: 1fr;
        }
        .cap-mobile__panel-inner {
          overflow: hidden;
          min-height: 0;
        }
        .cap-mobile__item[data-open="true"] .cap-mobile__panel-inner {
          padding: 4px 18px 22px;
        }
        .cap-mobile__kicker {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(250, 250, 249, 0.5);
          margin-bottom: 12px;
          padding-top: 4px;
        }
        .cap-mobile__desc {
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(250, 250, 249, 0.72);
          margin: 0 0 22px;
        }
        .cap-mobile__deliver-label {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(250, 250, 249, 0.5);
          margin-bottom: 10px;
        }
        .cap-mobile__deliver {
          list-style: none;
          padding: 0;
          margin: 0 0 20px;
        }
        .cap-mobile__deliver li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(250, 250, 249, 0.08);
          font-family: var(--font-display);
          font-size: 13.5px;
          color: #fafaf9;
          line-height: 1.4;
        }
        .cap-mobile__deliver li:last-child {
          border-bottom: none;
        }
        .cap-mobile__deliver-num {
          font-size: 10px;
          color: rgba(250, 250, 249, 0.4);
          font-variant-numeric: tabular-nums;
          font-weight: 500;
          min-width: 18px;
          padding-top: 2px;
        }
        .cap-mobile__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .cap-mobile__tags span {
          padding: 5px 10px;
          border: 1px solid rgba(250, 250, 249, 0.14);
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 500;
          color: rgba(250, 250, 249, 0.72);
          letter-spacing: 0.02em;
        }
        @media (max-width: 480px) {
          .cap-mobile { padding: 64px 16px 64px; }
          .cap-mobile__trigger { padding: 16px 14px; gap: 12px; }
          .cap-mobile__item[data-open="true"] .cap-mobile__panel-inner {
            padding: 4px 14px 20px;
          }
          .cap-mobile__name { font-size: 15px; }
          .cap-mobile__skip { font-size: 12px; padding: 9px 14px; }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: minmax(0, 1fr) max-content !important;
            gap: 32px 28px !important;
          }
          .footer-bottom {
            justify-content: flex-start !important;
          }
        }
        @media (max-width: 768px) {
          html, body { cursor: auto !important; }
          section, footer { padding-left: 14px !important; padding-right: 14px !important; }
          /* On small screens let the headline wrap naturally */
          .hero-line-3 { white-space: normal !important; }
          #cta-inner { padding: 72px 32px !important; border-radius: 20px !important; }
          .hero-cta { justify-content: flex-start !important; }

          .hero-stats-grid { grid-template-columns: repeat(2, 1fr) !important; row-gap: 24px; }
          .hero-stats-grid > div { border-right: none !important; padding-left: 0 !important; }

          .hf[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; row-gap: 24px; }
          .hf[style*="repeat(4, 1fr)"] > div { border-right: none !important; padding-left: 0 !important; }

          .sh[style*="1fr 1.4fr"] { grid-template-columns: 1fr !important; gap: 32px !important; }

          .process-pin {
            height: auto !important;
            overflow: visible !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .process-pin > div:first-child { padding: 80px 14px 32px !important; }
          .process-track {
            flex-direction: column !important;
            padding: 0 14px 60px !important;
            transform: none !important;
            gap: 16px !important;
            width: 100% !important;
          }
          .process-track > div { flex: 1 1 auto !important; }
          .process-card { width: 100% !important; height: auto !important; min-height: 320px !important; }
          .process-pin > div[style*="bottom: 20px"] { display: none !important; }
        }
      `}</style>
    </>
  );
}

