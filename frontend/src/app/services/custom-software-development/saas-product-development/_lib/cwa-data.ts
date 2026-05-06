export const PAGE = {
  headline1: "SaaS products",
  headline2: "engineered for",
  headlineItalic: "expansion.",
  lead:
    "We build multi-tenant SaaS platforms with billing, permissions, onboarding, and analytics built in so you can move from MVP to repeatable revenue without rebuilding the core.",
};

export const HERO_PHONE_COUNTRY_CODES = [
  "+92", "+1", "+44", "+971", "+91", "+61", "+49", "+966", "+65", "+86",
];

export const GROWTH = {
  kicker: "Why SaaS architecture",
  title: "A solid SaaS foundation is a",
  titleAccent: "growth engine.",
  lead:
    "Early SaaS decisions shape margins, velocity, and churn for years. With the right platform architecture, every new customer increases momentum instead of complexity.",
  pillars: [
    {
      n: "01",
      k: "Activation",
      v: "Faster time-to-value",
      d: "Structured onboarding, guided setup, and role-aware defaults help users reach their first meaningful outcome quickly.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "Performance metrics dashboard showing fast load times",
    },
    {
      n: "02",
      k: "Scalability",
      v: "Multi-tenant ready",
      d: "Tenant isolation, usage-aware architecture, and queue-driven workloads let your platform grow without operational chaos.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "Server infrastructure visualization showing distributed scale",
    },
    {
      n: "03",
      k: "Monetization",
      v: "Billing by design",
      d: "Subscriptions, plans, seats, and metered usage are designed into your core model, not patched in later.",
      image:
        "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "Source code on a developer's monitor representing code ownership",
    },
    {
      n: "04",
      k: "Retention",
      v: "Data-informed roadmap",
      d: "Product analytics, cohort tracking, and feedback loops make roadmap decisions measurable instead of opinion-driven.",
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
  kicker: "Common SaaS mistakes",
  title: "The cost of launching SaaS",
  titleAccent: "wrong.",
  lead:
    "SaaS products often stall because core platform concerns are postponed. What looks faster short-term usually creates compounding debt after customer growth begins.",
  failures: [
    {
      stat: "53%",
      label: "Trial drop-off",
      h: "Weak activation flow",
      d: "If first-use setup is confusing, acquisition spend rises while conversion to paid remains flat.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "Developer building a web application with HTML and JavaScript visible on a laptop screen",
      theme: "perf",
    },
    {
      stat: "4.2×",
      label: "Slow feature delivery",
      h: "No product boundaries",
      d: "When everything depends on everything, each release requires broad coordination and velocity collapses.",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "Engineering team collaborating on architecture and APIs for a web platform",
      theme: "arch",
    },
    {
      stat: "67%",
      label: "Hidden churn drivers",
      h: "Missing product analytics",
      d: "Without event instrumentation and cohort analysis, teams can't identify where users disengage.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "Monitoring dashboard with charts for uptime and errors on a live web service",
      theme: "obs",
    },
    {
      stat: "26%",
      label: "Revenue leakage",
      h: "Fragile billing model",
      d: "Inconsistent invoicing and entitlement logic create failed renewals, support load, and trust erosion.",
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
  { num: "01", title: "SaaS strategy", d: "Define ICP, pricing assumptions, user roles, and north-star metrics that guide build priorities.", meta: "1-2 weeks" },
  { num: "02", title: "Platform design", d: "Design information architecture, onboarding flow, workspace model, and permissions strategy.", meta: "2-4 weeks" },
  { num: "03", title: "Core build", d: "Implement auth, tenancy, billing, and primary workflows with sprint demos and instrumentation from day one.", meta: "10-18 weeks" },
  { num: "04", title: "Reliability + QA", d: "Validate critical paths, subscription state transitions, and edge cases before growth traffic arrives.", meta: "Continuous" },
  { num: "05", title: "Go-to-market release", d: "Ship with telemetry dashboards, support playbooks, and rollback coverage for safer launch.", meta: "1-2 weeks" },
  { num: "06", title: "Scale loop", d: "Prioritize roadmap from activation, expansion, and churn analytics to compound ARR growth.", meta: "Ongoing" },
];

export const STACK = [
  { group: "Frontend", items: [
    { name: "Next.js", v: "15.x", role: "SaaS app shell" },
    { name: "React", v: "19", role: "Product UI" },
    { name: "TypeScript", v: "5.x", role: "Type safety" },
    { name: "Tailwind", v: "4.x", role: "Design implementation" },
  ]},
  { group: "Backend", items: [
    { name: "Node.js", v: "22 LTS", role: "Core APIs" },
    { name: "NestJS", v: "Latest", role: "Service architecture" },
    { name: "GraphQL", v: "Latest", role: "Typed client contracts" },
    { name: "Python", v: "3.12", role: "Automation/data" },
  ]},
  { group: "Data", items: [
    { name: "PostgreSQL", v: "17", role: "Tenant data model" },
    { name: "Redis", v: "7.x", role: "Caching + jobs" },
    { name: "ClickHouse", v: "Latest", role: "Product analytics" },
    { name: "S3", v: "-", role: "Storage" },
  ]},
  { group: "Infra", items: [
    { name: "AWS", v: "-", role: "Primary cloud" },
    { name: "Docker", v: "-", role: "Containers" },
    { name: "Kubernetes", v: "Latest", role: "Workload orchestration" },
    { name: "Terraform", v: "1.x", role: "IaC" },
  ]},
];

export const FAQS = [
  { q: "Can you build SaaS from scratch?", a: "Yes. We handle discovery through launch, including product architecture, tenant model, billing, admin controls, analytics, and post-launch scaling." },
  { q: "How do you approach multi-tenancy?", a: "We choose tenancy patterns based on compliance, pricing strategy, and expected scale, then enforce isolation at both data and application layers." },
  { q: "Do you support billing integrations?", a: "Yes. We implement subscriptions, trials, invoices, proration logic, and entitlement checks with providers like Stripe and Paddle." },
  { q: "How long does a SaaS MVP usually take?", a: "Most SaaS MVPs take 12-18 weeks depending on workflow depth, integrations, and billing complexity." },
  { q: "Can you scale the product after launch?", a: "Absolutely. We support roadmap execution, platform hardening, and performance tuning as customer volume grows." },
];

export const CTA = {
  headline: "Let's build your SaaS",
  headlineItalic: "for long-term ARR.",
  lead:
    "Talk with our SaaS product team about architecture, monetization, and execution timelines. You will leave with a practical path from concept to scalable launch.",
  primaryCta: { label: "Book a discovery call", href: "/contact" },
  email: "hello@techbinaries.com",
  rows: [
    { k: "Response", v: "Within 24h" },
    { k: "MVP timeline", v: "12-18 weeks" },
    { k: "Core focus", v: "Activation + retention" },
    { k: "Engagement", v: "Fixed or T&M" },
  ],
};
