export const PAGE = {
  headline1: "Design systems",
  headline2: "built for",
  headlineItalic: "consistency.",
  lead:
    "We create UI/UX design systems that unify product teams, reduce design debt, and speed up delivery across web, mobile, and internal tools without compromising quality.",
};

export const HERO_PHONE_COUNTRY_CODES = [
  "+92", "+1", "+44", "+971", "+91", "+61", "+49", "+966", "+65", "+86",
];

export const GROWTH = {
  kicker: "Why systems thinking",
  title: "A mature design system is a",
  titleAccent: "growth engine.",
  lead:
    "Without a shared design language, teams ship inconsistent experiences and burn time on repeated decisions. A proper system turns design and engineering into a scalable delivery engine.",
  pillars: [
    { n: "01", k: "Consistency", v: "Unified UX language", d: "Tokens, components, and patterns create a coherent product experience across every surface and team.", image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1400&q=80&auto=format&fit=crop", imageAlt: "Design team collaborating on a unified interface system" },
    { n: "02", k: "Delivery speed", v: "Fewer reinventions", d: "Reusable building blocks let squads ship new features faster with less duplicated design and engineering effort.", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1400&q=80&auto=format&fit=crop", imageAlt: "Reusable UI components mapped in a design system" },
    { n: "03", k: "Governance", v: "Clear decision model", d: "Contribution standards and review workflows keep the system coherent as product complexity increases.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80&auto=format&fit=crop", imageAlt: "Design system governance and component review process" },
    { n: "04", k: "Accessibility", v: "Inclusive by default", d: "Accessibility rules are codified at the component level so teams deliver inclusive experiences consistently.", image: "https://images.unsplash.com/photo-1574887427561-d3d5d58c9273?w=1400&q=80&auto=format&fit=crop", imageAlt: "Accessible interface testing with assistive technology" },
  ],
};

export const COST = {
  image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1400&q=80&auto=format&fit=crop",
  imageAlt: "Product team reviewing inconsistent UI patterns across screens",
  kicker: "Where teams get stuck",
  title: "The cost of no design",
  titleAccent: "system.",
  lead: "Most organizations feel design debt as slow delivery and inconsistent UX. The cost compounds with every new feature and every new team.",
  failures: [
    { stat: "3x", label: "More UI rework", h: "Pattern duplication", d: "Different teams solve the same problem in different ways, creating product inconsistency and user confusion.", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80&auto=format&fit=crop", imageAlt: "Duplicated UI implementations across multiple screens", theme: "perf" },
    { stat: "42%", label: "Slower releases", h: "No reusable primitives", d: "When every screen starts from scratch, both design and engineering timelines stretch unnecessarily.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80&auto=format&fit=crop", imageAlt: "Product team planning slowed by repeated UI decisions", theme: "arch" },
    { stat: "58%", label: "QA churn", h: "Weak documentation", d: "Lack of usage guidance and component contracts causes implementation drift and repeat bug cycles.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop", imageAlt: "QA dashboard tracking repeated UI defects", theme: "obs" },
    { stat: "26%", label: "Users excluded", h: "A11y as afterthought", d: "Retroactive accessibility fixes are expensive and slow compared to system-level accessibility standards.", image: "https://images.unsplash.com/photo-1574887427561-d3d5d58c9273?w=900&q=80&auto=format&fit=crop", imageAlt: "Accessibility review of interface components", theme: "a11y" },
  ],
  close: "We establish design tokens, component governance, and accessibility baselines up front so teams move faster without quality trade-offs.",
};

export const PROCESS = [
  { num: "01", title: "Audit + alignment", d: "Map current UI inventory, team workflows, and quality pain points across products.", meta: "1-2 weeks" },
  { num: "02", title: "Foundations", d: "Define typography, spacing, color, motion, and accessibility tokens as shared design primitives.", meta: "2-3 weeks" },
  { num: "03", title: "Component system", d: "Build reusable components with usage variants, behavioral rules, and implementation guidance.", meta: "6-10 weeks" },
  { num: "04", title: "Docs + governance", d: "Ship documentation, contribution model, and release workflow for long-term maintainability.", meta: "Continuous" },
  { num: "05", title: "Adoption rollout", d: "Integrate system into active product streams and phase out legacy UI incrementally.", meta: "2-4 weeks" },
  { num: "06", title: "System evolution", d: "Expand and refine patterns through real usage telemetry and product feedback loops.", meta: "Ongoing" },
];

export const STACK = [
  { group: "Frontend", items: [{ name: "Figma", v: "Latest", role: "Design source of truth" }, { name: "React", v: "19", role: "Component implementation" }, { name: "TypeScript", v: "5.x", role: "API contracts" }, { name: "Storybook", v: "Latest", role: "Component docs" }]},
  { group: "Backend", items: [{ name: "Node.js", v: "22 LTS", role: "Docs automation" }, { name: "MDX", v: "Latest", role: "Guideline publishing" }, { name: "GraphQL", v: "Latest", role: "Schema-informed UI" }, { name: "Chromatic", v: "Latest", role: "Visual regression" }]},
  { group: "Data", items: [{ name: "Design Tokens", v: "W3C", role: "Cross-platform primitives" }, { name: "JSON Schema", v: "Latest", role: "Token validation" }, { name: "Analytics", v: "Latest", role: "Adoption tracking" }, { name: "S3", v: "-", role: "Asset hosting" }]},
  { group: "Infra", items: [{ name: "GitHub Actions", v: "Latest", role: "CI checks" }, { name: "Vercel", v: "Latest", role: "Docs deployment" }, { name: "Docker", v: "-", role: "Portable build tooling" }, { name: "Terraform", v: "1.x", role: "Infra consistency" }]},
];

export const FAQS = [
  { q: "When should we invest in a design system?", a: "As soon as multiple teams are shipping product UI in parallel or inconsistency starts slowing releases. Early investment prevents compounding design debt." },
  { q: "Do you deliver both design and engineering assets?", a: "Yes. We provide Figma foundations plus coded component libraries and documentation so design intent survives implementation." },
  { q: "Can the system work across web and mobile?", a: "Yes. We define platform-aware tokens and component rules so the experience stays coherent while respecting platform conventions." },
  { q: "How do you ensure teams adopt the system?", a: "We ship governance, documentation, contribution workflows, and migration plans tied to real product roadmaps." },
  { q: "Will this slow our current delivery?", a: "Not if phased correctly. We introduce high-impact components first so teams gain speed while legacy UI is retired incrementally." },
];

export const CTA = {
  headline: "Let's build a design system",
  headlineItalic: "your teams can scale with.",
  lead: "Book a discovery call to assess current UI debt, team workflows, and the fastest path to a system that improves both UX quality and delivery velocity.",
  primaryCta: { label: "Book a discovery call", href: "/contact" },
  email: "hello@techbinaries.com",
  rows: [
    { k: "Response", v: "Within 24h" },
    { k: "Phase one", v: "4-8 weeks" },
    { k: "Coverage", v: "Design + code" },
    { k: "Engagement", v: "Fixed or T&M" },
  ],
};
