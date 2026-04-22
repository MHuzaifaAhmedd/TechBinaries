"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ── DATA ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: "01",
    title: "Product Engineering",
    kicker: "Web & application platforms",
    desc: "Full-stack product development from architecture to deployment. We ship robust, scalable applications that users love.",
    deliverables: [
      "Zero-to-production web applications",
      "Platform & API development",
      "Legacy system modernization",
      "Performance audits & refactors",
    ],
    tags: ["React", "Node.js", "TypeScript", "AWS"],
    accent: "#a3e635", // lime
    glyph: "◐",
  },
  {
    num: "02",
    title: "Mobile Development",
    kicker: "iOS, Android & cross-platform",
    desc: "Native and cross-platform mobile applications built for performance and delightful user experiences.",
    deliverables: [
      "Native iOS (Swift) & Android (Kotlin)",
      "React Native & Expo apps",
      "App Store & Play Store releases",
      "Offline-first & real-time sync",
    ],
    tags: ["React Native", "Swift", "Kotlin"],
    accent: "#38bdf8", // sky
    glyph: "◑",
  },
  {
    num: "03",
    title: "Cloud & DevOps",
    kicker: "Infrastructure & reliability",
    desc: "Infrastructure as code, CI/CD pipelines, and cloud architecture that scales automatically with your growth.",
    deliverables: [
      "Multi-cloud architecture (AWS, GCP, Azure)",
      "CI/CD pipeline & GitOps",
      "Kubernetes & container orchestration",
      "Observability, SLOs, incident response",
    ],
    tags: ["Kubernetes", "Terraform", "GCP", "Docker"],
    accent: "#f472b6", // pink
    glyph: "◒",
  },
  {
    num: "04",
    title: "AI & Data Engineering",
    kicker: "Models, pipelines & intelligence",
    desc: "Machine learning models, data pipelines, and AI-powered features that give your product a competitive edge.",
    deliverables: [
      "LLM integration & fine-tuning",
      "Data pipelines & warehousing",
      "Recommendation & ranking systems",
      "RAG, embeddings, vector search",
    ],
    tags: ["Python", "PyTorch", "LangChain"],
    accent: "#fbbf24", // amber
    glyph: "◓",
  },
  {
    num: "05",
    title: "UX/UI Design",
    kicker: "Systems & interaction",
    desc: "Design systems, interaction design, and user research that transforms complex problems into elegant interfaces.",
    deliverables: [
      "Design systems & tokens",
      "Product UX & interaction design",
      "User research & usability",
      "Brand & motion direction",
    ],
    tags: ["Figma", "Framer", "Design Systems"],
    accent: "#c084fc", // purple
    glyph: "◔",
  },
  {
    num: "06",
    title: "Tech Strategy & CTO",
    kicker: "Advisory & fractional leadership",
    desc: "Fractional CTO services, architecture reviews, and technical roadmapping for startups and scale-ups.",
    deliverables: [
      "Fractional CTO engagements",
      "Architecture & code audits",
      "Tech due diligence for investors",
      "Roadmapping & hiring strategy",
    ],
    tags: ["Architecture", "Roadmap", "Audits"],
    accent: "#fafaf9", // white
    glyph: "◕",
  },
];

const STATS = [
  { value: "150+", label: "Products shipped" },
  { value: "98%", label: "Client retention" },
  { value: "12+", label: "Years building" },
  { value: "40+", label: "Engineers" },
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
];

const TECH = [
  "React", "TypeScript", "Node.js", "Python", "Go", "Rust",
  "AWS", "GCP", "Kubernetes", "PostgreSQL", "Redis", "GraphQL",
  "Next.js", "PyTorch", "Terraform", "Docker",
];

const CLIENTS = ["FinEdge", "MedCore", "ShipFast", "Atlas", "Northwind", "Orbital", "Veritas", "Helix"];

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
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [time, setTime] = useState("");

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
  // Ref to the pin's ScrollTrigger instance — click handlers use its .start/.end for exact scroll math
  const capScrollTriggerRef = useRef<ScrollTrigger | null>(null);
  // Guard flag — true while a click-scroll animation is running; snap is disabled during this
  const capProgrammaticScrollRef = useRef(false);

  // Lenis instance ref — so click handlers can use lenis.scrollTo() for smooth programmatic scroll
  const lenisRef = useRef<Lenis | null>(null);

  // Rotating verb in headline ("engineer / ship / craft / scale / architect")
  useEffect(() => {
    const id = setInterval(() => {
      setRotatingVerb((v) => (v + 1) % HERO_VERBS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  // Live clock (Karachi local feel — small studio signal)
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      setTime(`${hh}:${mm}`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  // Smooth scroll (Lenis) — tighter settings so pinned sections don't desync
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
    let mx = 0, my = 0, rx = 0, ry = 0, rafId = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
      rafId = requestAnimationFrame(animateRing);
    };
    animateRing();
    window.addEventListener("mousemove", onMove);

    const onEnter = () => {
      ring.style.width = "48px";
      ring.style.height = "48px";
      ring.style.borderColor = "rgba(0,0,0,0.6)";
    };
    const onLeave = () => {
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.borderColor = "rgba(0,0,0,0.2)";
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

  // Navbar scroll effect
  useEffect(() => {
    const nav = document.getElementById("nav");
    if (!nav) return;
    const handler = () => {
      if (window.scrollY > 40) {
        nav.style.background = "rgba(255,255,255,0.78)";
        nav.style.backdropFilter = "blur(20px)";
        (nav.style as any).WebkitBackdropFilter = "blur(20px)";
        nav.style.borderBottomColor = "rgba(0,0,0,0.06)";
      } else {
        nav.style.background = "transparent";
        nav.style.backdropFilter = "none";
        (nav.style as any).WebkitBackdropFilter = "none";
        nav.style.borderBottomColor = "transparent";
      }
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Hero mouse-reactive parallax — uses gsap.quickTo so it composes with scroll scrub
  useEffect(() => {
    if (!heroRef.current) return;
    const hero = heroRef.current;
    const glyph = heroGlyphRef.current;
    const dots = heroDotsRef.current;
    const terminal = heroTerminalRef.current;

    // quickTo setters — GSAP keeps transforms unified via its plugin
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

    // Set perspective on terminal container for 3D rotation to show
    if (terminal) gsap.set(terminal, { transformPerspective: 1400, transformStyle: "preserve-3d" });

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Hero magnetic buttons — pull cursor/button slightly toward each other
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

      // Headline char-by-char reveal
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

      // Rotating verb mask
      heroTl.fromTo(
        ".hero-verb-mask",
        { yPercent: 100 },
        { yPercent: 0, duration: 0.85, ease: "power4.out" },
        0.2
      );

      // Intro paragraph + CTAs
      heroTl.fromTo(
        ".hero-intro-col",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        0.7
      );

      // Terminal visualization
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

      // Stats row
      heroTl.fromTo(
        ".hero-stats-divider",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1, ease: "power3.inOut" },
        1.0
      );
      heroTl.fromTo(
        ".hero-stat-col",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" },
        1.1
      );

      // Scroll hint
      heroTl.fromTo(
        ".hero-scroll-hint",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        1.5
      );

      // ── Scroll-scrubbed exit: as user scrolls out, hero transforms ──
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
        // Scroll hint fades fast
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
        // Dot grid parallax on scroll — outer wrapper, so mouse parallax stays on inner
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
        // Background glyph parallax on scroll — outer wrapper
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

      // ═════════════════════════════════════════════════════════════

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
      // CAPABILITIES — vertical accordion slats (pinned, single viewport)
      // Flex widths are SCRUBBED to scroll progress via GSAP — no CSS transitions,
      // no "white splash" between states. Everything interpolates continuously.
      // ═════════════════════════════════════════════════════════════
      const capSection = document.querySelector<HTMLElement>(".cap-section");

      // Section header fade in (always)
      gsap.fromTo(
        ".cap-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".cap-header", start: "top 85%" },
        }
      );

      // Desktop-only pin & scrubbed flex animation
      const capMM = gsap.matchMedia();
      capMM.add("(min-width: 901px)", () => {
        if (!capSection) return;

        const slatEls = gsap.utils.toArray<HTMLElement>(".cap-slat");
        const slatCount = slatEls.length;
        if (slatCount === 0) return;

        // Flex values — collapsed ~1, expanded ~12 (ratio gives a ~76px-ish slat vs. wide card)
        const FLEX_COLLAPSED = 1;
        const FLEX_EXPANDED = 12;

        // Initialize starting state — first slat expanded, rest collapsed
        slatEls.forEach((el, i) => {
          gsap.set(el, { flexGrow: i === 0 ? FLEX_EXPANDED : FLEX_COLLAPSED });
          // Also prepare the collapsed label and expanded content inside each slat
          const collapsed = el.querySelector<HTMLElement>(".cap-slat-collapsed");
          const expanded = el.querySelector<HTMLElement>(".cap-slat-expanded");
          if (collapsed) gsap.set(collapsed, { autoAlpha: i === 0 ? 0 : 1 });
          if (expanded) gsap.set(expanded, { autoAlpha: i === 0 ? 1 : 0 });
        });

        // Total scroll distance allocated = slatCount × 100vh.
        const totalScroll = () => window.innerHeight * slatCount;

        const capST = ScrollTrigger.create({
          trigger: capSection,
          start: "top top",
          end: () => `+=${totalScroll()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scrub: 0.5,  // slight smoothing for buttery feel
          // Snap to each capability position — but bypass during programmatic click-scroll
          snap: {
            snapTo: (value) => {
              // If a click is driving scroll right now, return the current value (= no snap)
              if (capProgrammaticScrollRef.current) return value;
              // value is [0, 1]; snap to nearest of slatCount equal divisions
              return Math.round(value * (slatCount - 1)) / (slatCount - 1);
            },
            duration: { min: 0.2, max: 0.6 },
            delay: 0.12,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            // Continuous mapping of progress → each slat's flex + opacity
            // rawPos is a float in [0, slatCount-1] indicating current "position"
            const rawPos = self.progress * (slatCount - 1);

            slatEls.forEach((el, i) => {
              // Distance from i to current position → proximity
              const dist = Math.abs(i - rawPos);
              // Weight: 1 when dist=0 (full expansion), 0 when dist>=1 (fully collapsed)
              const weight = Math.max(0, 1 - dist);
              // Smooth the weight with an ease-out curve so it's not linear
              const eased = weight * weight * (3 - 2 * weight); // smoothstep

              const flexVal = FLEX_COLLAPSED + (FLEX_EXPANDED - FLEX_COLLAPSED) * eased;
              el.style.flexGrow = String(flexVal);

              // Asymmetric fades so the two states don't blend visibly at midpoint:
              // - Collapsed label fades OUT quickly (gone by weight=0.5)
              // - Expanded content fades IN later (starts from weight=0.5)
              const collapsedOpacity = Math.max(0, 1 - eased * 2);       // 1→0 over first half
              const expandedOpacity  = Math.max(0, (eased - 0.5) * 2);   // 0→1 over second half

              const collapsed = el.querySelector<HTMLElement>(".cap-slat-collapsed");
              const expanded = el.querySelector<HTMLElement>(".cap-slat-expanded");
              if (collapsed) {
                collapsed.style.opacity = String(collapsedOpacity);
                collapsed.style.visibility = collapsedOpacity < 0.01 ? "hidden" : "visible";
              }
              if (expanded) {
                expanded.style.opacity = String(expandedOpacity);
                expanded.style.visibility = expandedOpacity < 0.01 ? "hidden" : "visible";
              }
            });

            // Update active index for sidebar/header (snapped to nearest)
            const idx = Math.round(rawPos);
            setActiveCapability((prev) => (prev === idx ? prev : idx));
          },
        });

        // Expose the instance to click handlers so they can read .start / .end exactly
        capScrollTriggerRef.current = capST;

        // Section-level progress bar (thin line across the top of the pinned area)
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

        // Cleanup when leaving the desktop breakpoint (or unmount via ctx.revert)
        return () => {
          capScrollTriggerRef.current = null;
        };
      });
      // ═════════════════════════════════════════════════════════════

      // Process: horizontal pin — scrub: 0.8 gives smooth momentum on entry/exit
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
            scrub: 0.8,           // slight lag = smooth, physical feel on entry/exit
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

      // Tech marquee animation handled via CSS keyframes — no JS needed here

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

  // Refresh ScrollTrigger once fonts have loaded (they can shift layout heights,
  // which otherwise causes pinned sections to use stale measurements → jump)
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
          position: "fixed", top: 0, left: 0, width: 6, height: 6,
          background: "#000", borderRadius: "50%", pointerEvents: "none",
          zIndex: 9999, willChange: "transform",
        }}
      />
      <div
        ref={cursorRing}
        style={{
          position: "fixed", top: 0, left: 0, width: 32, height: 32,
          border: "1px solid rgba(0,0,0,0.2)", borderRadius: "50%",
          pointerEvents: "none", zIndex: 9998, willChange: "transform",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
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
          fontFamily: "'Inter', sans-serif",
          overflowX: "hidden",
          cursor: "none",
        }}
      >
        {/* ── NAVBAR ── */}
        <nav
          id="nav"
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            height: 64, display: "flex", alignItems: "center",
            justifyContent: "space-between", padding: "0 40px",
            borderBottom: "1px solid transparent", transition: "background 0.4s ease, border-color 0.4s ease",
          }}
        >
          <a
            href="/"
            style={{
              textDecoration: "none", color: "#0a0a0a",
              display: "flex", alignItems: "center", gap: 10,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 20, height: 20, background: "#0a0a0a",
                display: "inline-block",
                maskImage: "radial-gradient(circle at 50% 50%, #000 42%, transparent 44%)",
                WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 42%, transparent 44%)",
                boxShadow: "inset 0 0 0 2px #0a0a0a",
                borderRadius: "50%",
                position: "relative",
              }}
            />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em",
              }}
            >
              techbinaries<span style={{ color: "rgba(0,0,0,0.25)" }}>.</span>
            </span>
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="nav-links">
            {[
              { label: "Services", href: "#services" },
              { label: "Process", href: "#process" },
              { label: "Studio", href: "#studio" },
              { label: "Contact", href: "#contact" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="nav-link"
                style={{
                  color: "rgba(0,0,0,0.55)", textDecoration: "none",
                  fontSize: 13, fontWeight: 500, padding: "8px 14px",
                  borderRadius: 999, transition: "color 0.2s, background 0.2s",
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(0,0,0,0.5)" }} className="nav-clock">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 0 3px rgba(22,163,74,0.15)" }} />
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{time || "—"}</span>
              <span style={{ opacity: 0.45 }}>KHI</span>
            </div>
            <a
              href="mailto:hello@techbinaries.com"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "9px 18px", background: "#0a0a0a", color: "#fafaf9",
                borderRadius: 999, fontSize: 13, fontWeight: 500,
                textDecoration: "none", transition: "background 0.2s",
              }}
            >
              Start a project
              <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "#fafaf9" }} />
            </a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section
          ref={heroRef}
          style={{
            minHeight: "100vh", display: "flex", flexDirection: "column",
            justifyContent: "center", padding: "120px 40px 60px",
            position: "relative", overflow: "hidden",
          }}
        >
          {/* Dot grid (parallax) — outer for scroll, inner for mouse */}
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

          {/* Large faint background glyph — outer for scroll, inner for mouse */}
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
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
                fontSize: "clamp(400px, 50vw, 720px)", color: "rgba(0,0,0,0.035)",
                lineHeight: 0.8, letterSpacing: "-0.06em", userSelect: "none",
                willChange: "transform",
              }}
            >
              tb
            </div>
          </div>

          {/* Faint crosshair marks — decorative precision */}
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
            {/* ── MAIN LAYOUT — headline + visualization ── */}
            <div
              className="hero-main-grid"
              style={{
                display: "grid", gridTemplateColumns: "1.55fr 1fr",
                gap: 48, alignItems: "start", marginBottom: 56,
              }}
            >
              {/* LEFT — headline + copy + CTAs */}
              <div>
                {/* Headline with char-by-char + rotating verb */}
                <h1
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(52px, 7.6vw, 128px)",
                    fontWeight: 500, lineHeight: 0.94,
                    letterSpacing: "-0.04em", margin: "0 0 48px",
                  }}
                >
                  {/* Line 1: "We [rotating verb]" */}
                  <div style={{ overflow: "hidden", paddingBottom: "0.06em", display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.25em" }}>
                    <span style={{ display: "inline-flex", overflow: "hidden" }}>
                      {"We".split("").map((c, i) => (
                        <span key={`we-${i}`} className="hero-char" style={{ display: "inline-block", willChange: "transform" }}>
                          {c === " " ? "\u00A0" : c}
                        </span>
                      ))}
                    </span>
                    {/* Rotating verb — fixed-width mask, italic, softer color */}
                    <span
                      aria-live="polite"
                      style={{
                        position: "relative", display: "inline-block",
                        overflow: "hidden", verticalAlign: "bottom",
                        minWidth: "5.5ch",
                      }}
                    >
                      <span className="hero-verb-mask" style={{ display: "inline-block", willChange: "transform" }}>
                        {HERO_VERBS.map((v, i) => (
                          <span
                            key={v}
                            style={{
                              display: "block",
                              fontStyle: "italic", fontWeight: 400,
                              color: "rgba(0,0,0,0.7)",
                              transform: `translateY(${(i - rotatingVerb) * 100}%)`,
                              transition: "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
                              position: i === 0 ? "relative" : "absolute",
                              top: 0, left: 0, width: "100%",
                            }}
                          >
                            {v}
                          </span>
                        ))}
                      </span>
                    </span>
                  </div>
                  {/* Line 2: "software" */}
                  <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
                    {"software".split("").map((c, i) => (
                      <span key={`s-${i}`} className="hero-char" style={{ display: "inline-block", willChange: "transform" }}>
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </div>
                  {/* Line 3: "for ambitious teams." */}
                  <div style={{ overflow: "hidden" }}>
                    {"for ambitious teams.".split("").map((c, i) => (
                      <span
                        key={`a-${i}`}
                        className="hero-char"
                        style={{
                          display: "inline-block", willChange: "transform",
                          color: c === "." ? "rgba(0,0,0,0.3)" : "inherit",
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
                  <a
                    href="#process"
                    className="magnetic ghost-btn"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 10,
                      padding: "15px 28px", border: "1px solid rgba(0,0,0,0.18)",
                      color: "rgba(0,0,0,0.8)", textDecoration: "none",
                      fontSize: 14, fontWeight: 500, borderRadius: 999,
                      transition: "background 0.2s, border-color 0.2s",
                      background: "rgba(255,255,255,0.5)", willChange: "transform",
                    }}
                  >
                    Explore our process
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
                {/* The card */}
                <div
                  style={{
                    background: "#0a0a0a", color: "#fafaf9", borderRadius: 16,
                    border: "1px solid rgba(0,0,0,0.85)",
                    padding: "20px 22px 22px",
                    boxShadow: "0 30px 70px -30px rgba(0,0,0,0.45), 0 8px 24px -10px rgba(0,0,0,0.2)",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  {/* Window chrome */}
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

                  {/* Faux code lines */}
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
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

                  {/* Divider */}
                  <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "18px -22px 14px" }} />

                  {/* "Currently building" ticker */}
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
                              fontFamily: "'JetBrains Mono', monospace",
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

                  {/* Bottom row — commits & deploy */}
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
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                        <span className="stat-num" data-val="247">247</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>
                        Deploys this week
                      </div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                        <span className="stat-num" data-val="18">18</span>
                      </div>
                    </div>
                  </div>

                  {/* Subtle glow */}
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

            {/* Stats row */}
            <div style={{ position: "relative", paddingTop: 28 }}>
              <div
                className="hero-stats-divider"
                aria-hidden
                style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 1,
                  background: "rgba(0,0,0,0.12)", transformOrigin: "left center",
                }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }} className="hero-stats-grid">
                {STATS.map((s, i) => (
                  <div
                    key={i}
                    className="hero-stat-col"
                    style={{
                      padding: "4px 0", opacity: 0,
                      borderRight: i < STATS.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                      paddingLeft: i === 0 ? 0 : 32,
                    }}
                  >
                    <div
                      className="stat-num"
                      data-val={s.value}
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 500,
                        lineHeight: 1, letterSpacing: "-0.03em",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {s.value}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(0,0,0,0.5)", marginTop: 10, fontWeight: 500 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll hint — fixed bottom-center */}
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

        {/* ── TRUSTED BY ── */}
        <section
          style={{
            padding: "36px 40px", borderTop: "1px solid rgba(0,0,0,0.06)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", flexShrink: 0 }}>
              Trusted by
            </span>
            <div
              style={{
                flex: 1, display: "flex", gap: 48, alignItems: "center",
                flexWrap: "wrap", rowGap: 16,
              }}
            >
              {CLIENTS.map((c) => (
                <span
                  key={c}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em",
                    color: "rgba(0,0,0,0.35)", transition: "color 0.2s",
                  }}
                  className="client-logo"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CAPABILITIES — VERTICAL ACCORDION SLATS ── */}
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
          {/* Fixed pinned viewport */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              padding: "96px 40px 40px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Section progress bar — thin line, top of pinned area */}
            <div
              aria-hidden
              style={{
                position: "absolute", top: 64, left: 40, right: 40, height: 2,
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

            {/* Header — single-line title + tiny meta */}
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
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(36px, 4.6vw, 68px)", fontWeight: 500,
                    letterSpacing: "-0.035em", lineHeight: 1, margin: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  What we <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>do best.</span>
                </h2>
              </div>
              <div
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  fontSize: 11, letterSpacing: "0.14em", color: "rgba(0,0,0,0.4)",
                  fontWeight: 600, textTransform: "uppercase",
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
            </div>

            {/* ── SLATS ── */}
            <div
              className="cap-slats"
              style={{
                flex: 1, maxWidth: 1320, margin: "0 auto", width: "100%",
                display: "flex", gap: 12,
                alignItems: "stretch",
                minHeight: 0,
              }}
            >
              {SERVICES.map((s, i) => {
                const isActive = activeCapability === i;
                return (
                  <div
                    key={s.num}
                    className={`cap-slat ${isActive ? "is-active" : ""}`}
                    onClick={() => {
                      // Mobile: directly set active (no pin/scroll mapping exists)
                      if (window.innerWidth <= 900) {
                        setActiveCapability(i);
                        return;
                      }
                      // Desktop: use ScrollTrigger's own start/end bounds for exact math — never stale.
                      const st = capScrollTriggerRef.current;
                      if (!st) return;

                      // Slat i is fully expanded at progress = i / (slatCount - 1).
                      // Target scroll Y = st.start + progress × (st.end - st.start).
                      const slatCount = SERVICES.length;
                      const progressTarget = i / (slatCount - 1);
                      // +1px nudge to sit firmly inside slat i's snap zone
                      const targetY = st.start + progressTarget * (st.end - st.start) + 1;

                      // Scale duration with distance: short hops snappy, long jumps readable
                      const distance = Math.abs(i - activeCapability);
                      const duration = Math.min(1.6, 0.75 + distance * 0.15);

                      // Disable snap during the programmatic scroll (see snapTo callback)
                      capProgrammaticScrollRef.current = true;
                      const releaseGuard = () => {
                        capProgrammaticScrollRef.current = false;
                      };

                      // Prefer Lenis for buttery smooth scroll matching the page's feel
                      if (lenisRef.current) {
                        lenisRef.current.scrollTo(targetY, {
                          duration,
                          // easeInOutCubic — slow start, fast middle, gentle landing
                          easing: (t: number) =>
                            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
                          onComplete: releaseGuard,
                        });
                        // Safety: if onComplete doesn't fire for some reason, release after timeout
                        setTimeout(releaseGuard, duration * 1000 + 300);
                      } else {
                        // Fallback: GSAP's ScrollToPlugin
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
                      // GSAP drives flexGrow continuously — start at 1, first gets 12 on init
                      flexGrow: i === 0 ? 12 : 1,
                      flexShrink: 1,
                      flexBasis: 0,
                      borderRadius: 20,
                      overflow: "hidden",
                      // Always dark — no state-based color switch = no "white splash"
                      background: "#0a0a0a",
                      color: "#fafaf9",
                      border: "1px solid rgba(255,255,255,0.05)",
                      cursor: isActive ? "default" : "pointer",
                      minWidth: 0,
                      willChange: "flex-grow",
                    }}
                  >
                    {/* ── COLLAPSED STATE (rotated vertical label) — visible on dark bg ── */}
                    <div
                      className="cap-slat-collapsed"
                      style={{
                        position: "absolute", inset: 0,
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "space-between",
                        padding: "22px 0",
                        pointerEvents: isActive ? "none" : "auto",
                        // opacity & visibility driven by GSAP scroll-scrub
                      }}
                    >
                      {/* Top: accent dot */}
                      <span
                        style={{
                          width: 8, height: 8, borderRadius: "50%",
                          background: s.accent,
                          flexShrink: 0,
                          boxShadow: `0 0 0 4px ${s.accent}1a`,
                        }}
                      />

                      {/* Middle: rotated title */}
                      <div
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: 13, fontWeight: 500,
                          letterSpacing: "0.28em", textTransform: "uppercase",
                          color: "rgba(250,250,249,0.82)",
                          whiteSpace: "nowrap",
                          lineHeight: 1,
                        }}
                      >
                        {s.title}
                      </div>

                      {/* Bottom: number */}
                      <div
                        style={{
                          display: "flex", flexDirection: "column",
                          alignItems: "center", gap: 10, flexShrink: 0,
                        }}
                      >
                        <span style={{ width: 20, height: 1, background: "rgba(250,250,249,0.18)" }} />
                        <span
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 11, fontWeight: 500,
                            color: "rgba(250,250,249,0.55)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {s.num}
                        </span>
                      </div>
                    </div>

                    {/* ── EXPANDED STATE (rich content) — opacity driven by GSAP scroll ── */}
                    <div
                      className="cap-slat-expanded"
                      style={{
                        position: "relative",
                        height: "100%",
                        padding: "40px 48px 44px",
                        display: "flex", flexDirection: "column",
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                    >
                      {/* Faint dot grid bg */}
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

                      {/* Top row — meta */}
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
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontSize: 12, fontWeight: 500,
                              letterSpacing: "0.14em", textTransform: "uppercase",
                              color: "rgba(255,255,255,0.62)",
                            }}
                          >
                            Capability {s.num} <span style={{ opacity: 0.4, margin: "0 6px" }}>/</span> {s.kicker}
                          </span>
                        </div>

                        {/* Giant ghost number */}
                        <span
                          aria-hidden
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
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

                      {/* Main content — two columns */}
                      <div
                        className="cap-slat-body"
                        style={{
                          flex: 1, position: "relative", zIndex: 1,
                          display: "grid", gridTemplateColumns: "1.15fr 1fr",
                          gap: 48, alignItems: "start",
                          minHeight: 0,
                        }}
                      >
                        {/* LEFT — headline + desc + tags */}
                        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                          <h3
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
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

                        {/* RIGHT — deliverables */}
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
                                  fontFamily: "'Space Grotesk', sans-serif",
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

                      {/* Bottom bar */}
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
          {/* Grid overlay */}
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              pointerEvents: "none",
            }}
          />

          {/* ── HEADER ROW — flex item, always on top, never overlaps cards ── */}
          <div
            style={{
              position: "relative", zIndex: 2,
              flexShrink: 0,
              padding: "clamp(48px, 7vh, 100px) 40px clamp(20px, 3vh, 40px)",
              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
              gap: 40,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
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

          {/* ── CARDS TRACK — fills remaining height below header ── */}
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
                paddingLeft: 40, paddingRight: 120,
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
                          fontFamily: "'Space Grotesk', sans-serif",
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
                        fontFamily: "'Space Grotesk', sans-serif",
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

              {/* Trailing card */}
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
                    fontFamily: "'Space Grotesk', sans-serif",
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

          {/* Scroll hint */}
          <div
            style={{
              position: "absolute", bottom: 20, left: 40,
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
              position: "absolute", bottom: 20, right: 40,
              fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            04 phases
          </div>
        </section>

        {/* ── STUDIO / PHILOSOPHY ── */}
        <section id="studio" style={{ padding: "160px 40px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>

            <div className="sh" style={{ opacity: 0 }}>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
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

            {/* Principles grid */}
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
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 13, color: "rgba(0,0,0,0.35)",
                      fontWeight: 500, marginBottom: 24,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {p.n}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
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
        <section style={{ padding: "160px 40px", background: "#f5f5f4", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: 1020, margin: "0 auto" }}>
            <div style={{ position: "relative", minHeight: 340 }}>
              {/* Giant quote mark */}
              <div
                aria-hidden
                style={{
                  position: "absolute", top: -60, left: -30,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 240, lineHeight: 1, color: "rgba(0,0,0,0.05)",
                  fontWeight: 500, pointerEvents: "none",
                }}
              >
                &ldquo;
              </div>

              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  style={{
                    position: i === 0 ? "relative" : "absolute",
                    top: 0, left: 0, right: 0,
                    opacity: activeTestimonial === i ? 1 : 0,
                    transform: `translateY(${activeTestimonial === i ? 0 : 12}px)`,
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                    pointerEvents: activeTestimonial === i ? "auto" : "none",
                  }}
                >
                  <blockquote
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "clamp(22px, 2.6vw, 34px)", fontWeight: 400,
                      lineHeight: 1.4, color: "rgba(0,0,0,0.82)",
                      margin: "0 0 56px", letterSpacing: "-0.015em",
                      position: "relative", zIndex: 1,
                    }}
                  >
                    {t.quote}
                  </blockquote>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div
                      style={{
                        width: 44, height: 44, background: "#0a0a0a", color: "#fafaf9",
                        borderRadius: "50%", display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 12, fontWeight: 500,
                        letterSpacing: "0.04em", flexShrink: 0,
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 14.5, fontWeight: 500, letterSpacing: "-0.005em" }}>{t.name}</div>
                      <div style={{ fontSize: 13, color: "rgba(0,0,0,0.5)", marginTop: 2 }}>{t.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 80, paddingTop: 28, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
              <div style={{ display: "flex", gap: 10 }}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    aria-label={`View testimonial ${i + 1}`}
                    style={{
                      width: activeTestimonial === i ? 28 : 10, height: 3,
                      background: activeTestimonial === i ? "#0a0a0a" : "rgba(0,0,0,0.15)",
                      border: "none", cursor: "pointer", padding: 0,
                      transition: "all 0.35s ease", borderRadius: 2,
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", fontVariantNumeric: "tabular-nums", letterSpacing: "0.04em" }}>
                {String(activeTestimonial + 1).padStart(2, "0")} <span style={{ opacity: 0.35 }}>/</span> {String(TESTIMONIALS.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </section>

        {/* ── TECH MARQUEE ── */}
        <section style={{ padding: "90px 0", borderTop: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto 56px", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "end", gap: 40, flexWrap: "wrap" }}>
            <div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
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
              <div className="marquee-track marquee-left" style={{ display: "flex", width: "max-content", gap: 0 }}>
                {[...TECH, ...TECH].map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "center", gap: 28,
                      padding: "0 32px", flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "clamp(28px, 3.4vw, 48px)",
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
            {/* Second row — inverse */}
            <div style={{ overflow: "hidden", marginTop: 20 }}>
              <div className="marquee-track marquee-right" style={{ display: "flex", width: "max-content", gap: 0 }}>
                {[...TECH.slice().reverse(), ...TECH.slice().reverse()].map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "center", gap: 28,
                      padding: "0 32px", flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "clamp(28px, 3.4vw, 48px)",
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
        <section id="contact" style={{ padding: "0 40px 80px", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 80 }}>
          <div
            id="cta-inner"
            style={{
              borderRadius: 32, overflow: "hidden",
              padding: "120px 72px", position: "relative",
              background: "#0a0a0a", color: "#fafaf9",
              opacity: 0, maxWidth: 1320, margin: "0 auto",
            }}
          >
            {/* Grid */}
            <div
              aria-hidden
              style={{
                position: "absolute", inset: 0,
                backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                pointerEvents: "none",
              }}
            />
            {/* Radial glow */}
            <div
              aria-hidden
              style={{
                position: "absolute", top: "-20%", right: "-10%",
                width: 560, height: 560,
                background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />
            {/* Faint glyph */}
            <div
              aria-hidden
              style={{
                position: "absolute", right: 40, bottom: -40,
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
                fontSize: 420, color: "rgba(255,255,255,0.025)",
                lineHeight: 0.8, letterSpacing: "-0.06em", userSelect: "none",
                pointerEvents: "none",
              }}
            >
              tb
            </div>

            <div style={{ position: "relative", zIndex: 1, maxWidth: 820 }}>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
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

              {/* Small grid info */}
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
                  { k: "Based in", v: "Karachi, PK" },
                ].map((it) => (
                  <div key={it.k}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                      {it.k}
                    </div>
                    <div style={{ fontSize: 17, color: "#fafaf9", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, letterSpacing: "-0.01em" }}>
                      {it.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ padding: "60px 40px 40px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            {/* Big wordmark */}
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(80px, 15vw, 240px)", fontWeight: 500,
                letterSpacing: "-0.05em", lineHeight: 0.85,
                marginBottom: 60, color: "#0a0a0a",
                display: "flex", alignItems: "baseline", justifyContent: "space-between",
                flexWrap: "wrap", gap: 20,
              }}
            >
              <span>techbinaries</span>
              <span style={{ fontSize: "0.15em", fontWeight: 500, color: "rgba(0,0,0,0.35)", letterSpacing: "0.02em" }}>
                ↗ hello@techbinaries.com
              </span>
            </div>

            <div
              style={{
                display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
                gap: 60, paddingTop: 40,
                borderTop: "1px solid rgba(0,0,0,0.08)",
              }}
              className="footer-grid"
            >
              <div>
                <p style={{ fontSize: 14, color: "rgba(0,0,0,0.6)", lineHeight: 1.65, margin: "0 0 16px", maxWidth: 340 }}>
                  A software engineering studio building durable products for ambitious teams. Karachi · Remote · Global.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 0 3px rgba(22,163,74,0.15)" }} />
                  <span style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>Accepting Q2 engagements</span>
                </div>
              </div>

              {[
                { h: "Studio", items: ["About", "Careers", "Journal", "Contact"] },
                { h: "Services", items: ["Engineering", "Design", "Strategy", "AI & Data"] },
                { h: "Connect", items: ["Twitter", "LinkedIn", "GitHub", "Dribbble"] },
              ].map((col) => (
                <div key={col.h}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: 20 }}>
                    {col.h}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {col.items.map((it) => (
                      <li key={it}>
                        <a
                          href="#"
                          className="footer-link"
                          style={{ fontSize: 14, color: "rgba(0,0,0,0.7)", textDecoration: "none", transition: "color 0.2s" }}
                        >
                          {it}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 56, paddingTop: 24,
                borderTop: "1px solid rgba(0,0,0,0.08)",
                display: "flex", justifyContent: "space-between",
                alignItems: "center", flexWrap: "wrap", gap: 12,
              }}
            >
              <div style={{ fontSize: 12, color: "rgba(0,0,0,0.45)" }}>
                © 2026 TechBinaries. Built in-house.
              </div>
              <div style={{ display: "flex", gap: 20 }}>
                <a href="#" className="footer-link" style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", textDecoration: "none" }}>Privacy</a>
                <a href="#" className="footer-link" style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", textDecoration: "none" }}>Terms</a>
                <a href="#" className="footer-link" style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", textDecoration: "none" }}>Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { cursor: none !important; background: #fafaf9; -webkit-font-smoothing: antialiased; }
        ::selection { background: #0a0a0a; color: #fafaf9; }

        /* Marquee — seamless because content is duplicated 2x, animate to -50% */
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-left  { animation: marquee-left 55s linear infinite; will-change: transform; }
        .marquee-right { animation: marquee-right 60s linear infinite; will-change: transform; }

        /* ── HERO ANIMATIONS ── */
        /* Pulsing green status dot */
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(22,163,74,0.45); }
          70%  { box-shadow: 0 0 0 8px rgba(22,163,74,0); }
          100% { box-shadow: 0 0 0 0 rgba(22,163,74,0); }
        }
        .pulse-green { animation: pulse-ring 2s infinite; }

        /* Terminal caret blink */
        @keyframes caret-blink {
          0%, 50%   { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .caret-blink { animation: caret-blink 1.1s step-end infinite; }

        /* Scroll hint dot bouncing inside the mouse icon */
        @keyframes scroll-dot-bounce {
          0%   { transform: translateY(0); opacity: 0; }
          30%  { opacity: 1; }
          80%  { transform: translateY(14px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
        .scroll-dot { animation: scroll-dot-bounce 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite; }

        /* "Currently building" rotator — 4 items × 3s each = 12s cycle */
        @keyframes building-rotate {
          0%,  2%  { opacity: 0; transform: translateY(8px); }
          4%, 24%  { opacity: 1; transform: translateY(0); }
          26%, 100% { opacity: 0; transform: translateY(-8px); }
        }

        /* Hero CTA primary button — fill-on-hover effect */
        .hero-cta-primary::before {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(90deg, #262626, #0a0a0a);
          transform: translateX(-101%);
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
          z-index: 1;
        }
        .hero-cta-primary:hover::before { transform: translateX(0); }

        /* Preserve 3D on terminal for mouse tilt */
        .hero-terminal { transition: filter 0.4s; }
        .hero-terminal:hover { filter: drop-shadow(0 10px 30px rgba(0,0,0,0.15)); }


        /* Nav */
        .nav-link:hover { color: #0a0a0a !important; background: rgba(0,0,0,0.04) !important; }

        /* Services — legacy rules removed; capabilities uses stacked cards */

        /* ── CAPABILITIES — ACCORDION SLATS (flex-grow driven by GSAP scroll) ── */
        .cap-slat {
          will-change: flex-grow;
        }
        /* Subtle hover on a NON-active slat (brightens rotated label) */
        .cap-slat:not(.is-active):hover .cap-slat-collapsed > div[style*="writing-mode"] {
          color: #fafaf9 !important;
          transition: color 0.3s ease;
        }
        .cap-slat:not(.is-active):hover {
          background: #161616 !important;
          transition: background 0.3s ease;
        }
        /* Deliverable row hover inside expanded slat */
        .cap-slat-expanded ul li {
          transition: padding-left 0.3s ease;
          cursor: default;
        }
        .cap-slat-expanded ul li:hover {
          padding-left: 8px;
        }
        .cap-slat-expanded ul li:hover > span:last-child {
          transform: translateX(4px);
          transition: transform 0.25s ease;
          color: rgba(255,255,255,0.8) !important;
        }

        /* Ghost buttons */
        .ghost-btn:hover {
          border-color: rgba(0,0,0,0.35) !important;
          color: #0a0a0a !important;
          background: rgba(255,255,255,0.9) !important;
        }
        .ghost-btn-dark:hover {
          border-color: rgba(255,255,255,0.45) !important;
          background: rgba(255,255,255,0.05) !important;
        }

        /* Footer / client logos */
        .footer-link:hover { color: #0a0a0a !important; }
        .client-logo:hover { color: #0a0a0a !important; }

        /* Link underline */
        .link-underline:hover { color: #0a0a0a !important; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .principles-grid { grid-template-columns: 1fr !important; }
          .principles-grid > div { border-right: none !important; border-bottom: 1px solid rgba(0,0,0,0.08); padding-left: 0 !important; padding-right: 0 !important; }
          .principles-grid > div:last-child { border-bottom: none; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-main-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .nav-clock { display: none !important; }

          /* Capabilities — on mobile, slats become vertical stack with no pinning */
          .cap-section > div:first-of-type { height: auto !important; padding-top: 100px !important; }
          .cap-slats { flex-direction: column !important; gap: 10px !important; }
          .cap-slat { flex: 1 1 auto !important; min-height: 72px; }
          .cap-slat.is-active { min-height: 520px; }
          .cap-slat-collapsed { flex-direction: row !important; padding: 0 20px !important; }
          .cap-slat-collapsed > div[style*="writing-mode"] {
            writing-mode: horizontal-tb !important;
            transform: none !important;
          }
          .cap-slat-expanded { padding: 32px 24px !important; }
          .cap-slat-body { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 768px) {
          html, body { cursor: auto !important; }
          section, #nav, footer { padding-left: 20px !important; padding-right: 20px !important; }
          #cta-inner { padding: 72px 32px !important; border-radius: 20px !important; }
          .hero-cta { justify-content: flex-start !important; }

          /* Hero stats: 2x2 */
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr) !important; row-gap: 24px; }
          .hero-stats-grid > div { border-right: none !important; padding-left: 0 !important; }

          /* Any other 4-col legacy stats rows */
          .hf[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; row-gap: 24px; }
          .hf[style*="repeat(4, 1fr)"] > div { border-right: none !important; padding-left: 0 !important; }

          /* Services header stacks */
          .sh[style*="1fr 1.4fr"] { grid-template-columns: 1fr !important; gap: 32px !important; }

          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }

          /* Hide process horizontal on mobile — stack vertically */
          .process-pin {
            height: auto !important;
            overflow: visible !important;
            display: flex !important;
            flex-direction: column !important;
          }
          /* Header row already flex, no fix needed — just ensure padding */
          .process-pin > div:first-child { padding: 80px 20px 32px !important; }
          /* Cards track: stack vertically */
          .process-track {
            flex-direction: column !important;
            padding: 0 20px 60px !important;
            transform: none !important;
            gap: 16px !important;
            width: 100% !important;
          }
          .process-track > div { flex: 1 1 auto !important; }
          .process-card { width: 100% !important; height: auto !important; min-height: 320px !important; }
          /* Hide scroll hints on mobile */
          .process-pin > div[style*="bottom: 20px"] { display: none !important; }
        }
      `}</style>
    </>
  );
}