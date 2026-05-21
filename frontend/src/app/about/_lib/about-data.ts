export const HERO = {
  eyebrow: "About — Tech Binaries",
  headline1: "We build",
  headline2: "with",
  headlineItalic: "intent.",
  lead:
    "A small team focused on meaningful, high-impact software. We don't chase trends or pad timelines — we ship work we'd put our own name on.",
  stats: [
    { n: "12+", l: "years compounding" },
    { n: "40+", l: "products shipped" },
    { n: "98%", l: "client retention" },
  ],
  videoSrc: "/videos/about/about-hero.mp4",
  videoPoster: "/images/about/about-hero-mobile.webp",
  mobileImage: "/images/about/about-hero-mobile.webp",
} as const;

export const PILLARS = {
  eyebrow: "What guides us",
  title: "Three lenses,",
  titleAccent: "one focus.",
  lead:
    "Vision, mission, and the principles we hold in tension. Each one informs how we choose work, how we structure teams, and how we know when something is finished.",
  items: [
    {
      n: "01",
      kicker: "Vision",
      image: "/images/about/tlof-card-image0.jpeg",
      head: "Software that earns its keep.",
      body: "Products should prove value over time through calm UX and reliable performance.",
      meta: ["Long-term thinking", "Restraint over reach", "Outcomes over output"],
    },
    {
      n: "02",
      kicker: "Mission",
      image: "/images/about/tlof-card-image1.jpeg",
      head: "Build the thing right, then build the right thing.",
      body: "We combine engineering rigor and product judgment to ship with clear intent.",
      meta: ["Thesis-driven shipping", "Rigor + judgment", "Clarity before code"],
    },
    {
      n: "03",
      kicker: "Principles",
      image: "/images/about/tlof-card-image2.jpeg",
      head: "Five rules we don't break.",
      body: "A few non-negotiables guide every decision, every sprint, and every release.",
      meta: ["Quality is the default", "Best idea wins", "Direct, not diplomatic"],
    },
  ],
} as const;

export const CAPABILITIES = {
  eyebrow: "What we do",
  title: "Four practices.",
  titleAccent: "One standard.",
  lead:
    "We don't try to be everything. We're deep in a few disciplines and we keep them sharp by working on real production systems with real consequences.",
  items: [
    {
      n: "01",
      roman: "I",
      head: "Product Engineering",
      shortHead: "Product",
      body: "Web and mobile applications built end-to-end — architecture, implementation, infrastructure, observability. Type-safe by default, instrumented from day one.",
      tags: ["Next.js", "React Native", "Postgres", "tRPC", "Observability"],
      stat: "End-to-end",
      statLabel: "From schema to shipped",
      accent: "#d4c4a8",
      coverSrc: "/images/about/fpos-card-image0.jpeg",
      deliverables: ["Architecture", "Implementation", "Infrastructure", "Monitoring"],
    },
    {
      n: "02",
      roman: "II",
      head: "Web Platforms",
      shortHead: "Platforms",
      body: "Marketing sites, content systems, and storefronts that load fast, rank well, and stay editable by humans without a deploy.",
      tags: ["Headless CMS", "Edge", "SEO", "i18n", "A11y"],
      stat: "<1.2s",
      statLabel: "Median LCP, in production",
      accent: "#b8c4d4",
      coverSrc: "/images/about/fpos-card-image1.jpeg",
      deliverables: ["Headless CMS", "Edge runtime", "SEO foundations", "Author tooling"],
    },
    {
      n: "03",
      roman: "III",
      head: "Growth Systems",
      shortHead: "Growth",
      body: "Analytics, experimentation, lifecycle messaging, and the data plumbing underneath — designed so the metrics you watch are the ones that matter.",
      tags: ["Warehouse", "Experiments", "Lifecycle", "Attribution"],
      stat: "1 source",
      statLabel: "Of truth, always",
      accent: "#c4b8a8",
      coverSrc: "/images/about/fpos-card-image2.jpeg",
      deliverables: ["Warehouse", "Experiments", "Lifecycle flows", "Attribution"],
    },
    {
      n: "04",
      roman: "IV",
      head: "Performance & Optimization",
      shortHead: "Performance",
      body: "Bundle audits, Core Web Vitals work, database tuning, render pipelines. Speed is a feature; we treat it like one.",
      tags: ["CWV", "Bundle audit", "DB tuning", "Caching"],
      stat: "p95",
      statLabel: "Is the only honest metric",
      accent: "#a8b8c4",
      coverSrc: "/images/about/fpos-card-image3.jpeg",
      deliverables: ["CWV audit", "Bundle work", "DB tuning", "Caching strategy"],
    },
  ],
} as const;

export const CTA = {
  headline: "Let's build something",
  headlineItalic: "that matters.",
  lead:
    "Tell us what you're working on. We'll tell you, honestly, whether we're the right team for it.",
  cta: "Start a conversation",
  marquee: [
    "Built with intent",
    "Shipped with rigor",
    "Honest engineering",
    "No vanity metrics",
    "Quality is the default",
    "Compound or fade",
  ],
} as const;
