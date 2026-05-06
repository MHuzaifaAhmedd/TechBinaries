export const PAGE = {
  headline1: "Android apps",
  headline2: "built for",
  headlineItalic: "scale.",
  lead:
    "Kotlin-first Android development for products that need broad device coverage, strong performance on mid-range phones, and release discipline that keeps Play Store ratings high.",
};

export const HERO_PHONE_COUNTRY_CODES = [
  "+92", "+1", "+44", "+971", "+91", "+61", "+49", "+966", "+65", "+86",
];

export const GROWTH = {
  kicker: "Why Android",
  title: "Android done right becomes a",
  titleAccent: "growth engine.",
  lead:
    "Android gives you global reach, but only if the product performs across fragmented devices and networks. Custom engineering helps you acquire broadly without sacrificing quality.",
  pillars: [
    {
      n: "01",
      k: "Device reach",
      v: "Wide compatibility",
      d: "We tune rendering, memory usage, and app size for budget and flagship devices so your product feels reliable across the Android ecosystem.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "Android app preview across multiple phone form factors",
    },
    {
      n: "02",
      k: "Performance",
      v: "Low ANR rates",
      d: "Profiling, lazy loading, and robust background-work strategies keep frame drops and ANRs under control as feature depth increases.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "Android performance dashboard showing frame and ANR stability",
    },
    {
      n: "03",
      k: "Release cadence",
      v: "Predictable updates",
      d: "CI/CD, staged rollouts, and feature flags make it safer to ship frequently without breaking critical user flows.",
      image:
        "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "Android release pipeline with staged rollout controls",
    },
    {
      n: "04",
      k: "Resilience",
      v: "Offline-aware UX",
      d: "We design fail-safe states for unstable networks so users can continue key actions even with intermittent connectivity.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "Android app operating smoothly in low-connectivity conditions",
    },
  ],
};

export const COST = {
  image:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80&auto=format&fit=crop",
  imageAlt:
    "Product owner reviewing web analytics and KPIs on a laptop after shipping a web application",
  kicker: "What hurts adoption",
  title: "The cost of shipping Android",
  titleAccent: "wrong.",
  lead:
    "Android products usually lose momentum through quality drift, not bad ideas. Early technical shortcuts often become expensive within the first few release cycles.",
  failures: [
    {
      stat: "53%",
      label: "Uninstalls in week one",
      h: "Heavy first install",
      d: "Large binaries and unoptimized assets increase drop-off before users even complete onboarding.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "Developer building a web application with HTML and JavaScript visible on a laptop screen",
      theme: "perf",
    },
    {
      stat: "4.2×",
      label: "Regression risk",
      h: "Weak module boundaries",
      d: "When app layers are tightly coupled, each new feature increases QA cost and slows team velocity.",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "Engineering team collaborating on architecture and APIs for a web platform",
      theme: "arch",
    },
    {
      stat: "67%",
      label: "Play Store complaints",
      h: "No runtime monitoring",
      d: "Without crash and ANR diagnostics, quality issues surface publicly before engineering can respond.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "Monitoring dashboard with charts for uptime and errors on a live web service",
      theme: "obs",
    },
    {
      stat: "26%",
      label: "Audience excluded",
      h: "Accessibility ignored",
      d: "Skipping TalkBack support, contrast checks, and scalable typography limits adoption and increases long-term rework.",
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
  { num: "01", title: "Market + product discovery", d: "Define key Android cohorts, network constraints, and feature priorities before build.", meta: "1-2 weeks" },
  { num: "02", title: "Android UX blueprint", d: "Design navigation and interaction patterns optimized for varied screen sizes and hardware classes.", meta: "2-3 weeks" },
  { num: "03", title: "Kotlin engineering", d: "Implement clean architecture, typed networking, and testable modules in sprint cycles.", meta: "8-14 weeks" },
  { num: "04", title: "Fragmentation QA", d: "Run validation on diverse Android versions, OEM devices, and constrained connectivity scenarios.", meta: "Continuous" },
  { num: "05", title: "Play Store rollout", d: "Prepare staged rollouts, monitoring thresholds, and rollback strategy before production traffic.", meta: "1-2 weeks" },
  { num: "06", title: "Optimize + expand", d: "Use crash, retention, and conversion data to prioritize roadmap and improve app quality each release.", meta: "Ongoing" },
];

export const STACK = [
  { group: "Frontend", items: [
    { name: "Kotlin", v: "2.x", role: "Primary language" },
    { name: "Jetpack Compose", v: "Latest", role: "UI toolkit" },
    { name: "Coroutines", v: "Latest", role: "Async workflows" },
    { name: "Material 3", v: "Latest", role: "Design system" },
  ]},
  { group: "Backend", items: [
    { name: "Node.js", v: "22 LTS", role: "API runtime" },
    { name: "GraphQL", v: "Latest", role: "Typed contracts" },
    { name: "Go", v: "1.23", role: "High-throughput services" },
    { name: "Python", v: "3.12", role: "Data/ML services" },
  ]},
  { group: "Data", items: [
    { name: "PostgreSQL", v: "17", role: "Primary store" },
    { name: "Redis", v: "7.x", role: "Caching + queues" },
    { name: "Firebase", v: "Latest", role: "Push/analytics" },
    { name: "BigQuery", v: "Latest", role: "Product analytics" },
  ]},
  { group: "Infra", items: [
    { name: "AWS", v: "-", role: "Primary cloud" },
    { name: "GCP", v: "-", role: "Alt cloud" },
    { name: "Gradle", v: "8.x", role: "Build automation" },
    { name: "Terraform", v: "1.x", role: "IaC" },
  ]},
];

export const FAQS = [
  { q: "Do you support both native Android and cross-platform?", a: "Yes. Native Kotlin is best when performance and deep platform integration are priorities. For shared iOS/Android velocity, we also design React Native architectures with native modules where required." },
  { q: "How do you handle Android device fragmentation?", a: "We define target device tiers early, then validate rendering, memory, and performance on representative real devices throughout development, not just at launch." },
  { q: "Can you improve an existing Android app?", a: "Absolutely. We audit architecture, crash patterns, and Play Store feedback, then ship a prioritized stabilization and modernization roadmap." },
  { q: "How quickly can we launch an MVP?", a: "Most Android MVPs land in 10-14 weeks with focused scope. Broader feature sets and multi-role products usually run 16-24 weeks." },
  { q: "Do you manage release operations after launch?", a: "Yes. We support staged rollouts, quality monitoring, hotfix protocols, and ongoing optimization against business KPIs." },
];

export const CTA = {
  headline: "Let's launch an Android app",
  headlineItalic: "that scales globally.",
  lead:
    "Book a technical discovery call and we will map architecture, rollout strategy, and a realistic Android launch path aligned to your market.",
  primaryCta: { label: "Book a discovery call", href: "/contact" },
  email: "hello@techbinaries.com",
  rows: [
    { k: "Response", v: "Within 24h" },
    { k: "MVP timeline", v: "10-14 weeks" },
    { k: "Release model", v: "Staged rollout" },
    { k: "Engagement", v: "Fixed or T&M" },
  ],
};
