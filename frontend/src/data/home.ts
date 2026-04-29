// ── Shared data constants used across home page sections ─────────────────────

export const SERVICES = [
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
    accent: "#a3e635",
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
    accent: "#38bdf8",
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
    accent: "#f472b6",
    glyph: "◒",
  },
];

export const PROCESS = [
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

export const TESTIMONIALS = [
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

export const TECH = [
  "React", "TypeScript", "Node.js", "Python", "Go", "Rust",
  "AWS", "GCP", "Kubernetes", "PostgreSQL", "Redis", "GraphQL",
  "Next.js", "PyTorch", "Terraform", "Docker",
];

export const HERO_VERBS = ["engineer", "ship", "craft", "architect", "scale"];

export const BUILDING_NOW = [
  { tag: "SHIPPING", label: "FinEdge · v2.4 · Monday release" },
  { tag: "DESIGNING", label: "MedCore · patient timeline view" },
  { tag: "SCALING",  label: "ShipFast · route engine, 10x throughput" },
  { tag: "AUDITING", label: "Northwind · infra review, 4-week engagement" },
];

export const FOOTER_NAV_COLS = [
  {
    heading: "Services",
    links: [
      { label: "Growth & Performance Engineering", href: "#services", ext: false },
      { label: "Search Visibility & Digital Authority", href: "#services", ext: false },
      { label: "Custom Software & Digital Solutions", href: "#services", ext: false },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "place", href: "/place", ext: false },
      { label: "about us", href: "/about", ext: false },
      { label: "contact", href: "/contact", ext: false },
      { label: "Blogs", href: "/blogs", ext: false },
      { label: "careers", href: "/careers", ext: false },
    ],
  },
];

export const FOOTER_SOCIAL = [
  {
    label: "X (Twitter)",
    href: "https://x.com",
    svgPath: "M18.901 1.153h3.68l-8.04 9.188L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.472l8.6-9.829L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    svgPath: "M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.5c0-1.3-.02-2.98-1.82-2.98-1.82 0-2.1 1.42-2.1 2.88V21H9z",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    svgPath: "M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.3 9.4 7.88 10.93.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.7 1.27 3.36.97.1-.75.4-1.27.73-1.56-2.56-.3-5.25-1.29-5.25-5.74 0-1.27.45-2.3 1.2-3.12-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.2 1.19a11.1 11.1 0 015.82 0c2.22-1.5 3.2-1.2 3.2-1.2.63 1.66.23 2.88.12 3.18.74.81 1.2 1.85 1.2 3.12 0 4.46-2.7 5.44-5.27 5.73.41.35.78 1.05.78 2.12v3.15c0 .31.2.67.8.55A11.53 11.53 0 0023.5 12C23.5 5.66 18.35.5 12 .5z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    svgPath: "M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.8A3.95 3.95 0 003.8 7.75v8.5a3.95 3.95 0 003.95 3.95h8.5a3.95 3.95 0 003.95-3.95v-8.5a3.95 3.95 0 00-3.95-3.95h-8.5zm8.95 1.45a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.8A3.2 3.2 0 1015.2 12 3.2 3.2 0 0012 8.8z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    svgPath: "M13.5 21v-7.2H16l.4-3h-2.9V8.9c0-.87.24-1.47 1.49-1.47H16.5V4.74c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.82 1.38-3.82 3.92v2.26H8v3h2.4V21h3.1z",
  },
];
