export const PAGE = {
  headline1: "Web apps",
  headline2: "engineered for",
  headlineItalic: "performance.",
  lead:
    "Production-grade web applications built on modern stacks — Next.js, React, Node, Postgres — tuned for speed, resilience, and architecture that won't need a rewrite in two years.",
};

export const HERO_PHONE_COUNTRY_CODES = [
  "+92", "+1", "+44", "+971", "+91", "+61", "+49", "+966", "+65", "+86",
];

export const GROWTH = {
  kicker: "Why custom",
  title: "A custom web app is a",
  titleAccent: "growth engine.",
  lead:
    "Off-the-shelf software flattens you against competitors. A purpose-built web application becomes the operational backbone — faster to evolve, cheaper to scale, aligned to how your business actually works.",
  pillars: [
    {
      n: "01",
      k: "Speed",
      v: "Sub-second load",
      d: "Edge-rendered pages, optimized bundles, and runtime budgets keep first interaction under a second on real devices.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "Performance metrics dashboard showing fast load times",
    },
    {
      n: "02",
      k: "Scale",
      v: "10× headroom",
      d: "Stateless services, queue-backed workers, and observability from day one. Traffic spikes don't become incidents.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "Server infrastructure visualization showing distributed scale",
    },
    {
      n: "03",
      k: "Ownership",
      v: "Your code, your IP",
      d: "Full source, infrastructure, credentials transfer to you. No vendor lock-in, no licensing tax, no surprises at renewal.",
      image:
        "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "Source code on a developer's monitor representing code ownership",
    },
    {
      n: "04",
      k: "Velocity",
      v: "Weekly releases",
      d: "Feature-flagged deploys and CI/CD pipelines let your team ship to production every week without rollout anxiety.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "CI/CD pipeline and code deployment workflow",
    },
  ],
};

export const COST = {
  image:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80&auto=format&fit=crop",
  imageAlt:
    "Product owner reviewing web analytics and KPIs on a laptop after shipping a web application",
  kicker: "What goes wrong",
  title: "The cost of getting it",
  titleAccent: "wrong.",
  lead:
    "Most failed web apps don't fail at launch — they fail in the first 90 days. The pattern is consistent and almost always preventable.",
  failures: [
    {
      stat: "53%",
      label: "Bounce above 3s",
      h: "Bloated bundles",
      d: "Megabytes of unused JavaScript collapse mobile performance and quietly kill conversion on slower networks.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "Developer building a web application with HTML and JavaScript visible on a laptop screen",
      theme: "perf",
    },
    {
      stat: "4.2×",
      label: "Slower velocity",
      h: "Brittle architecture",
      d: "Tightly coupled services and shared databases turn every new feature into a coordination tax.",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "Engineering team collaborating on architecture and APIs for a web platform",
      theme: "arch",
    },
    {
      stat: "67%",
      label: "Bugs found by users",
      h: "Missing observability",
      d: "Without structured logs, traces, and RUM, you discover regressions from customer tickets — not dashboards.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "Monitoring dashboard with charts for uptime and errors on a live web service",
      theme: "obs",
    },
    {
      stat: "26%",
      label: "Excluded users",
      h: "No accessibility",
      d: "Skipping WCAG and keyboard support narrows your audience and makes refactors dramatically more expensive.",
      image:
        "https://images.unsplash.com/photo-1574887427561-d3d5d58c9273?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "Person using a refreshable braille display—assistive technology for accessing web and digital content",
      theme: "a11y",
    },
  ],
  close:
    "We engineer around every one of these failure modes — performance, architecture, observability, accessibility — as defaults, not upsells.",
};

export const PROCESS = [
  { num: "01", title: "Discovery & architecture",  d: "Stakeholder interviews, technical audit, written architecture brief.",   meta: "2 weeks · fixed price" },
  { num: "02", title: "UX & interface design",      d: "Flows, wireframes, high-fidelity UI tied to a token-based design system.", meta: "2–4 weeks"            },
  { num: "03", title: "Engineering sprints",        d: "Two-week sprints, weekly demos, CI/CD from day one. Working software every Friday.", meta: "8–16 weeks"   },
  { num: "04", title: "QA & performance",           d: "Automated suites, cross-device QA, Lighthouse budgets, load testing before traffic.", meta: "Continuous" },
  { num: "05", title: "Launch & monitor",           d: "Phased rollout with feature flags, real-user monitoring, rollback plan written before go-live.", meta: "1–2 weeks" },
  { num: "06", title: "Iterate & support",          d: "SLA-backed retainer covering bug fixes, security patches, roadmap work.", meta: "Ongoing"               },
];

export const STACK = [
  { group: "Frontend", items: [
    { name: "Next.js",    v: "15.x", role: "App framework"     },
    { name: "React",      v: "19",   role: "UI library"        },
    { name: "TypeScript", v: "5.x",  role: "Type system"       },
    { name: "Tailwind",   v: "4.x",  role: "Styling"           },
  ]},
  { group: "Backend", items: [
    { name: "Node.js",    v: "22 LTS", role: "Runtime"         },
    { name: "Python",     v: "3.12",   role: "Services / ML"   },
    { name: "Go",         v: "1.23",   role: "High-throughput" },
    { name: "GraphQL",    v: "—",      role: "API contract"    },
  ]},
  { group: "Data", items: [
    { name: "PostgreSQL", v: "17",  role: "Primary store"    },
    { name: "Redis",      v: "7.x", role: "Cache · queues"   },
    { name: "Elasticsearch", v: "8.x", role: "Search"        },
    { name: "S3",         v: "—",   role: "Object storage"   },
  ]},
  { group: "Infra", items: [
    { name: "AWS",        v: "—",   role: "Primary cloud"    },
    { name: "GCP",        v: "—",   role: "Alt cloud"        },
    { name: "Docker",     v: "—",   role: "Containers"       },
    { name: "Terraform",  v: "1.x", role: "IaC"              },
  ]},
];

export const FAQS = [
  { q: "How much does a custom web application cost?", a: "Most builds fall between $40K and $180K depending on scope, integrations, and team size. We provide fixed-price proposals after a paid two-week discovery sprint, so the budget is locked before engineering begins." },
  { q: "How long does it take to build?",              a: "MVPs typically take 8–12 weeks. Full production builds run 14–22 weeks. We share a detailed milestone schedule during proposal, with weekly demos you can hold us to." },
  { q: "What stack do you use?",                       a: "TypeScript end-to-end is our default — React or Next.js on the frontend, Node on the backend, Postgres for data, AWS or GCP for infrastructure. We choose tooling based on your problem, not because it's trendy." },
  { q: "Do you handle design too?",                    a: "Yes. UX flows, wireframes, high-fidelity UI, and a design token system are part of the standard engagement. If you have a design partner already, we plug in cleanly with Figma handoff." },
  { q: "What happens after launch?",                   a: "We offer SLA-backed maintenance retainers covering monitoring, security patches, bug fixes, and feature work. Many clients keep us on as a fractional engineering team. All code and infrastructure transfer to you on day one." },
];

export const CTA = {
  headline: "Let's build the web app",
  headlineItalic: "you actually want.",
  lead:
    "Free 30-minute discovery call. You'll talk directly with an engineer and a strategist — no sales pitch, just a real conversation about your problem and timeline.",
  primaryCta: { label: "Book a discovery call", href: "/contact" },
  email: "hello@techbinaries.com",
  rows: [
    { k: "Response",    v: "Within 24h"      },
    { k: "MVP timeline", v: "8–12 weeks"     },
    { k: "Engagement",  v: "Fixed or T&M"    },
    { k: "Based",       v: "Global · remote" },
  ],
};
