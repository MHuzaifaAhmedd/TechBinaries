export const PAGE = {
  headline1: "iOS apps",
  headline2: "crafted for",
  headlineItalic: "retention.",
  lead:
    "From consumer apps to enterprise iPad workflows, we build iOS products with Swift and SwiftUI that feel native, stay fast under load, and meet Apple's quality bar from day one.",
};

export const HERO_PHONE_COUNTRY_CODES = [
  "+92", "+1", "+44", "+971", "+91", "+61", "+49", "+966", "+65", "+86",
];

export const GROWTH = {
  kicker: "Why iOS",
  title: "A great iOS app becomes a",
  titleAccent: "growth engine.",
  lead:
    "iPhone users reward quality with loyalty and higher lifetime value. Native iOS engineering lets you move faster on premium UX, reduce churn, and ship features users actually keep using.",
  pillars: [
    {
      n: "01",
      k: "UX polish",
      v: "Fluid at 60 FPS",
      d: "Edge-rendered pages, optimized bundles, and runtime budgets keep first interaction under a second on real devices.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "iOS app interface with fluid animations and polished interactions",
    },
    {
      n: "02",
      k: "Reliability",
      v: "Crash-free sessions",
      d: "We build defensive client architecture, typed networking, and robust offline states so your app stays stable in real-world conditions.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "iPhone diagnostics and telemetry dashboard showing stable app performance",
    },
    {
      n: "03",
      k: "Platform depth",
      v: "Apple ecosystem ready",
      d: "Deep integration with iOS capabilities like notifications, widgets, biometrics, and secure keychain storage creates differentiated product value.",
      image:
        "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "Native iOS development workflow with Swift code and Apple APIs",
    },
    {
      n: "04",
      k: "Release confidence",
      v: "Faster approvals",
      d: "Structured QA, TestFlight pipelines, and App Store compliance checks reduce rejection risk and keep release cadence predictable.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "App Store release workflow and TestFlight distribution pipeline",
    },
  ],
};

export const COST = {
  image:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80&auto=format&fit=crop",
  imageAlt:
    "Product team reviewing iOS app analytics and retention data after launch",
  kicker: "Where teams lose momentum",
  title: "The cost of building iOS",
  titleAccent: "wrong.",
  lead:
    "Most iOS products don't fail because of the idea; they fail on execution quality. The first 90 days after launch usually expose preventable engineering and UX gaps.",
  failures: [
    {
      stat: "53%",
      label: "Drop after onboarding",
      h: "Weak first-run experience",
      d: "Confusing onboarding and permission flows cause users to abandon before activation, even when acquisition looks strong.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "Mobile onboarding screens showing friction in early user journey",
      theme: "perf",
    },
    {
      stat: "4.2×",
      label: "Slower iteration",
      h: "Tangled app architecture",
      d: "Without modular boundaries and typed contracts, even small feature work becomes risky and slows releases.",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "iOS engineers planning architecture and API contracts for scalability",
      theme: "arch",
    },
    {
      stat: "67%",
      label: "Issues found too late",
      h: "No production telemetry",
      d: "If crash reports and behavioral analytics are missing, regressions get discovered in App Store reviews instead of internal alerts.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "Crash analytics and session diagnostics dashboard for a live iOS app",
      theme: "obs",
    },
    {
      stat: "26%",
      label: "Accessibility debt",
      h: "Ignoring assistive UX",
      d: "Missing Dynamic Type, VoiceOver support, and motion preferences excludes users and raises rework cost across future releases.",
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
  { num: "01", title: "Product discovery", d: "Clarify user segments, activation goals, and app-critical journeys before design starts.", meta: "1-2 weeks" },
  { num: "02", title: "iOS UX design", d: "Design native navigation patterns, onboarding, and interaction details aligned with Human Interface Guidelines.", meta: "2-3 weeks" },
  { num: "03", title: "Swift engineering", d: "Build modular features, typed API clients, and secure local persistence through sprint-based delivery.", meta: "8-14 weeks" },
  { num: "04", title: "QA across devices", d: "Test on real iPhones and iPads, validate edge cases, and run performance plus battery-impact checks.", meta: "Continuous" },
  { num: "05", title: "App Store launch", d: "Prepare release assets, compliance notes, phased rollout strategy, and telemetry baselines before submission.", meta: "1-2 weeks" },
  { num: "06", title: "Post-launch growth", d: "Iterate from retention analytics, feature usage, and crash trends to improve version over version.", meta: "Ongoing" },
];

export const STACK = [
  { group: "Frontend", items: [
    { name: "SwiftUI", v: "Latest", role: "Primary UI layer" },
    { name: "UIKit", v: "Latest", role: "Legacy/native interop" },
    { name: "Combine", v: "Latest", role: "Reactive state flows" },
    { name: "Async/Await", v: "Swift 5.9+", role: "Concurrency model" },
  ]},
  { group: "Backend", items: [
    { name: "Node.js", v: "22 LTS", role: "API runtime" },
    { name: "GraphQL", v: "Latest", role: "Typed mobile contracts" },
    { name: "gRPC", v: "Latest", role: "High-perf services" },
    { name: "Python", v: "3.12", role: "AI/automation services" },
  ]},
  { group: "Data", items: [
    { name: "PostgreSQL", v: "17", role: "Core product data" },
    { name: "Redis", v: "7.x", role: "Caching/session state" },
    { name: "S3", v: "-", role: "Media storage" },
    { name: "Segment", v: "Latest", role: "Behavior analytics" },
  ]},
  { group: "Infra", items: [
    { name: "AWS", v: "-", role: "Primary cloud" },
    { name: "Fastlane", v: "Latest", role: "Release automation" },
    { name: "Firebase", v: "Latest", role: "Push + remote config" },
    { name: "Terraform", v: "1.x", role: "Infrastructure as code" },
  ]},
];

export const FAQS = [
  { q: "Do you build native iOS or cross-platform apps?", a: "Both. We recommend native Swift/SwiftUI when interaction quality and platform depth matter most. For shared release velocity across platforms, we can architect React Native with native bridges where needed." },
  { q: "Can you handle App Store submission and compliance?", a: "Yes. We manage provisioning, release notes, screenshots, privacy declarations, and review coordination. Our process is designed to reduce review delays and avoid predictable rejection causes." },
  { q: "How long does a typical iOS app take to ship?", a: "Most iOS MVPs take 10-14 weeks from discovery to first App Store release. Complex multi-role products with advanced integrations typically run 16-24 weeks." },
  { q: "Will the app work on both iPhone and iPad?", a: "If your product benefits from iPad workflows, we design adaptive layouts from the start. If not, we optimize for iPhone first and phase iPad based on business priority." },
  { q: "How do you improve retention after launch?", a: "We instrument activation funnels, session behavior, and feature adoption from day one. Iterations are then driven by retention data, not guesswork." },
];

export const CTA = {
  headline: "Let's ship an iOS app",
  headlineItalic: "users keep opening.",
  lead:
    "Book a focused discovery call with our iOS leads. We will map scope, architecture direction, and a realistic App Store timeline tailored to your product.",
  primaryCta: { label: "Book a discovery call", href: "/contact" },
  email: "hello@techbinaries.com",
  rows: [
    { k: "Response", v: "Within 24h" },
    { k: "First release", v: "10-14 weeks" },
    { k: "Team model", v: "Dedicated iOS pod" },
    { k: "Engagement", v: "Fixed or T&M" },
  ],
};
