export const SUB_SERVICES = [
  {
    num: "01",
    bin: "0001",
    title: "Custom Web Application Development",
    desc: "Production-grade web apps built for performance, scale, and long-term maintainability.",
    href: "/services/custom-software-development/custom-web-application-development",
    accent: "#d4d4d8",
    tags: ["Next.js", "React", "Node", "Postgres"],
  },
  {
    num: "02",
    bin: "0010",
    title: "iOS App Development",
    desc: "Native Swift and cross-platform iOS experiences tuned for performance, polish, and App Store readiness.",
    href: "/services/custom-software-development/ios-app-development",
    accent: "#a3a3a3",
    tags: ["Swift", "UIKit", "SwiftUI", "React Native"],
  },
  {
    num: "03",
    bin: "0011",
    title: "Android App Development",
    desc: "Kotlin-first Android apps and shared codebases that feel native and scale with your product roadmap.",
    href: "/services/custom-software-development/android-app-development",
    accent: "#b8b8b8",
    tags: ["Kotlin", "Jetpack", "Play Store", "React Native"],
  },
  {
    num: "04",
    bin: "0100",
    title: "SaaS Product Development",
    desc: "Multi-tenant SaaS platforms with billing, auth, analytics, and growth loops baked in.",
    href: "/services/custom-software-development/saas-product-development",
    accent: "#e5e5e5",
    tags: ["Multi-tenant", "Billing", "Auth", "Analytics"],
  },
  {
    num: "05",
    bin: "0101",
    title: "UI/UX Design Systems",
    desc: "Design systems, component libraries, and product UX engineered for consistency at scale.",
    href: "/services/custom-software-development/ui-ux-design-systems",
    accent: "#737373",
    tags: ["Design Systems", "Figma", "Tokens", "A11y"],
  },
  {
    num: "06",
    bin: "0110",
    title: "CMS & Admin Panel Development",
    desc: "Content systems and internal tools that empower teams without slowing them down.",
    href: "/services/custom-software-development/cms-admin-panel-development",
    accent: "#bdbdbd",
    tags: ["Headless CMS", "Admin UI", "RBAC", "Workflows"],
  },
  {
    num: "07",
    bin: "0111",
    title: "High-Performance Landing Pages",
    desc: "Pixel-perfect, conversion-tuned landing pages with sub-second load and SEO baked in.",
    href: "/services/custom-software-development/high-performance-landing-page-development",
    accent: "#8a8a8a",
    tags: ["Core Web Vitals", "SEO", "A/B Ready", "CRO"],
  },
];

export const WE_BUILD = [
  { id: "saas", bin: "01", label: "SaaS Platforms", desc: "Multi-tenant products with billing, dashboards, and integrations." },
  { id: "dashboard", bin: "10", label: "Business Dashboards", desc: "Real-time analytics surfaces wired to your live data." },
  { id: "mobile", bin: "11", label: "Mobile Apps", desc: "Native iOS, Android, and cross-platform consumer apps." },
  { id: "internal", bin: "00", label: "Internal Tools", desc: "Admin panels and ops tooling that replace spreadsheets." },
  { id: "mvp", bin: "01", label: "MVPs", desc: "Ship-fast prototypes built on architecture that can scale." },
  { id: "market", bin: "10", label: "Marketplaces", desc: "Two-sided platforms with payments, search, and trust systems." },
];

export const VALUE_PROPS = [
  {
    id: "performance",
    metric: "98%+",
    metricLabel: "Avg Lighthouse",
    title: "Performance that keeps users engaged",
    desc: "Runtime budgets, stable interactions, and measurable gains across Lighthouse, Core Web Vitals, and real-device testing.",
  },
  {
    id: "architecture",
    metric: "10×",
    metricLabel: "Growth headroom",
    title: "Architecture that scales as you grow",
    desc: "Clear boundaries and observability let you ship faster with fewer incidents and less rework.",
  },
  {
    id: "design-system",
    metric: "1 system",
    metricLabel: "Design coverage",
    title: "Design systems that reduce UX friction",
    desc: "Tokens and reusable components keep web, mobile, and internal tools consistent as teams scale.",
  },
  {
    id: "delivery",
    metric: "Weekly",
    metricLabel: "Shipped iterations",
    title: "Delivery cadence that accelerates momentum",
    desc: "Weekly demos and feature-flagged releases help you learn quickly and reduce rollout risk.",
  },
];

export const PROCESS = [
  { num: "01", title: "Discovery", desc: "Deep-dive into your business, users, and technical landscape to uncover what actually needs to be built.", points: ["Stakeholder interviews", "Technical audit", "Opportunity mapping"] },
  { num: "02", title: "Design", desc: "We design the experience — flows, wireframes, and high-fidelity UI — before a single line of production code is written.", points: ["UX flows & wireframes", "High-fidelity UI", "Design tokens"] },
  { num: "03", title: "Development", desc: "Agile sprints with weekly demos. You stay close to the work. We ship fast without cutting corners.", points: ["Weekly demos", "CI/CD pipeline", "Code review"] },
  { num: "04", title: "Testing", desc: "Automated and manual QA across devices, browsers, and edge cases. Performance, accessibility, and security baked in.", points: ["Automated test suites", "Cross-device QA", "Performance budgets"] },
  { num: "05", title: "Launch", desc: "Phased rollout with monitoring, observability, and rollback plans. We don't ship and pray.", points: ["Phased rollout", "Monitoring & alerts", "Rollback ready"] },
  { num: "06", title: "Support", desc: "Post-launch support, iteration, and growth. We don't disappear after go-live.", points: ["SLA-backed support", "Continuous improvement", "Roadmap planning"] },
];

export const TECH = [
  "React", "Next.js", "TypeScript", "Vue", "Svelte", "Tailwind",
  "Node.js", "Python", "Go", "Rust", "GraphQL", "PostgreSQL",
  "Swift", "Kotlin", "React Native", "Flutter",
  "AWS", "GCP", "Kubernetes", "Docker", "Terraform", "Redis",
];

export const RESULTS = [
  { metric: "43%", label: "Faster page loads", project: "FinEdge · Trading dashboard", desc: "Migrated from a legacy SPA to an edge-rendered Next.js stack. LCP dropped from 3.4s to 1.9s in the first sprint." },
  { metric: "2.4×", label: "Conversion lift", project: "NovaRetail · Checkout flow", desc: "Re-architected the checkout funnel with progressive enhancement and inline validation. Cart-to-purchase rate doubled." },
  { metric: "$4M", label: "Annual savings", project: "ShipFast · Logistics engine", desc: "Replaced a hand-tuned routing heuristic with an ML-powered optimization service. Fuel + ops costs cut in year one." },
  { metric: "2M+", label: "Users served", project: "MedCore · Patient platform", desc: "Designed a multi-region, HIPAA-compliant architecture from scratch. Scaled to 2M+ MAU without a single major incident." },
];

export const FAQS = [
  { q: "How much does custom software development cost?", a: "Most projects fall between $40K and $250K depending on scope, team size, and timeline. We provide fixed-price proposals after a paid discovery sprint so there are no surprises mid-build. For exploratory MVPs, we also offer time-and-materials engagements with weekly cost ceilings." },
  { q: "How long does it take to build a custom application?", a: "MVPs typically take 8–12 weeks. Full production builds run 16–24 weeks. We share a detailed Gantt during the proposal phase, with weekly milestones you can hold us to. Tight deadlines are doable when scope is clear — we'll tell you honestly what fits." },
  { q: "What technologies do you specialize in?", a: "Our default stack is TypeScript end-to-end (React, Next.js, Node), Postgres, and AWS or GCP. For mobile we ship native (Swift, Kotlin) when performance matters and React Native when speed-to-market wins. We choose tooling based on your problem, not because it's trendy." },
  { q: "Do you handle the entire process or just one part?", a: "Both. We can own discovery → design → engineering → launch → support end-to-end, or we can plug into your existing team in any of those phases. Most clients start with a discovery sprint and expand the engagement based on what's working." },
  { q: "What happens after the product launches?", a: "We offer SLA-backed maintenance retainers covering monitoring, security patches, bug fixes, and small feature work. Many clients keep us on as a fractional engineering team. You're never locked in — all code, infrastructure, and credentials transfer to you." },
  { q: "Can you work with our existing team or codebase?", a: "Yes. We do legacy modernization, codebase audits, and team augmentation. We're comfortable inheriting messy code, untangling architecture, and shipping alongside your engineers. No ego, no rewrites for the sake of rewriting." },
  { q: "How do you handle data security and compliance?", a: "SOC 2-aligned engineering practices by default. We've shipped HIPAA, PCI-DSS, and GDPR-compliant systems. Security reviews, penetration testing, and threat modeling are part of our standard delivery, not an upsell." },
  { q: "Do you sign NDAs before discovery calls?", a: "Of course. Send us your NDA before the call and we'll have it back signed within the day. We also have a mutual NDA template if you'd prefer to use ours." },
];

export const HERO_PHONE_COUNTRY_CODES = [
  "+92", "+1", "+44", "+971", "+91", "+61", "+49", "+966", "+65", "+86",
];
