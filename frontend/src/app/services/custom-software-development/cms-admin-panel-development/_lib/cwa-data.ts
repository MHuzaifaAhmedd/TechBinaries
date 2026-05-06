export const PAGE = {
  headline1: "CMS & admin",
  headline2: "platforms for",
  headlineItalic: "operations.",
  lead:
    "We build content systems and admin panels that help teams publish faster, manage workflows safely, and operate complex products without engineering bottlenecks.",
};

export const HERO_PHONE_COUNTRY_CODES = [
  "+92", "+1", "+44", "+971", "+91", "+61", "+49", "+966", "+65", "+86",
];

export const GROWTH = {
  kicker: "Why internal platforms",
  title: "A strong admin layer is an",
  titleAccent: "execution engine.",
  lead:
    "Most teams lose speed in day-to-day operations, not product ideas. Purpose-built CMS and admin tools reduce manual work, improve governance, and unlock faster iteration.",
  pillars: [
    { n: "01", k: "Publishing velocity", v: "Faster updates", d: "Structured content models and approval workflows help teams publish confidently without waiting on developers.", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80&auto=format&fit=crop", imageAlt: "Content team publishing updates through a structured CMS" },
    { n: "02", k: "Operational control", v: "Role-based access", d: "Granular permissions, audit logs, and action safeguards reduce risk in high-impact internal operations.", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80&auto=format&fit=crop", imageAlt: "Admin dashboard with role-based permissions and workflow states" },
    { n: "03", k: "Workflow automation", v: "Less manual overhead", d: "Custom automations and bulk actions eliminate repetitive tasks and keep teams focused on higher-value work.", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=80&auto=format&fit=crop", imageAlt: "Operations workflow automation displayed in an admin interface" },
    { n: "04", k: "Data visibility", v: "Real-time oversight", d: "Embedded analytics and status panels provide operational clarity for product, support, and leadership teams.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop", imageAlt: "Admin analytics panel showing key operational metrics" },
  ],
};

export const COST = {
  image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80&auto=format&fit=crop",
  imageAlt: "Operations team reviewing inefficient manual admin workflows",
  kicker: "What slows teams down",
  title: "The cost of weak admin",
  titleAccent: "infrastructure.",
  lead: "When internal tools are generic or fragmented, teams waste time, create errors, and struggle to scale operations.",
  failures: [
    { stat: "31%", label: "Time lost weekly", h: "Manual workflows", d: "Teams spend hours on repetitive tasks that should be automated through admin tooling.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80&auto=format&fit=crop", imageAlt: "Operations team performing repetitive manual admin tasks", theme: "perf" },
    { stat: "2.8x", label: "More production errors", h: "Missing guardrails", d: "Without validations and permission controls, high-impact mistakes become frequent and costly.", image: "https://images.unsplash.com/photo-1551817958-20204f19c8e1?w=900&q=80&auto=format&fit=crop", imageAlt: "Admin interface showing error-prone input and missing validations", theme: "arch" },
    { stat: "47%", label: "Delayed content ops", h: "Rigid CMS model", d: "Poor content architecture forces engineering support for simple editorial changes.", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&q=80&auto=format&fit=crop", imageAlt: "Content team blocked by inflexible CMS setup", theme: "obs" },
    { stat: "24%", label: "Audit gaps", h: "No traceability", d: "Lack of change history and accountability increases compliance and governance risk.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop", imageAlt: "Compliance checklist and audit logs for admin actions", theme: "a11y" },
  ],
  close: "We design CMS and admin ecosystems around your workflows, governance model, and team structure so operations become faster and safer.",
};

export const PROCESS = [
  { num: "01", title: "Workflow discovery", d: "Map content, support, and operations flows to identify bottlenecks and risk points.", meta: "1-2 weeks" },
  { num: "02", title: "System blueprint", d: "Design content schema, admin IA, permissions model, and workflow states.", meta: "2-3 weeks" },
  { num: "03", title: "Platform build", d: "Implement CMS APIs, admin UI modules, and operational automation in iterative sprints.", meta: "8-14 weeks" },
  { num: "04", title: "Quality + controls", d: "Validate edge cases, role boundaries, and operational safeguards before rollout.", meta: "Continuous" },
  { num: "05", title: "Rollout + onboarding", d: "Launch in phases and train internal teams for smooth adoption and minimal disruption.", meta: "1-2 weeks" },
  { num: "06", title: "Optimize operations", d: "Refine workflows using analytics and team feedback to continuously improve throughput.", meta: "Ongoing" },
];

export const STACK = [
  { group: "Frontend", items: [{ name: "React", v: "19", role: "Admin UI" }, { name: "Next.js", v: "15.x", role: "Dashboard framework" }, { name: "TypeScript", v: "5.x", role: "Type safety" }, { name: "Tailwind", v: "4.x", role: "Design system implementation" }]},
  { group: "Backend", items: [{ name: "Node.js", v: "22 LTS", role: "CMS services" }, { name: "GraphQL", v: "Latest", role: "Content APIs" }, { name: "REST", v: "OpenAPI", role: "Admin integrations" }, { name: "Python", v: "3.12", role: "Workflow automation" }]},
  { group: "Data", items: [{ name: "PostgreSQL", v: "17", role: "Content + ops data" }, { name: "Redis", v: "7.x", role: "Caching + jobs" }, { name: "Elasticsearch", v: "8.x", role: "Content search" }, { name: "S3", v: "-", role: "Asset storage" }]},
  { group: "Infra", items: [{ name: "AWS", v: "-", role: "Primary cloud" }, { name: "Docker", v: "-", role: "Containers" }, { name: "Kubernetes", v: "Latest", role: "Ops workloads" }, { name: "Terraform", v: "1.x", role: "IaC" }]},
];

export const FAQS = [
  { q: "Can you build custom admin panels for complex workflows?", a: "Yes. We design admin tooling around your exact workflows, not generic templates, including role-based controls and operation-specific safeguards." },
  { q: "Do you integrate with headless CMS platforms?", a: "Yes. We can implement custom CMS solutions or integrate platforms like Sanity, Contentful, and Strapi based on your content and governance needs." },
  { q: "How do you handle permissions and security?", a: "We implement robust RBAC, audit logs, approval states, and action-level safeguards to keep sensitive operations controlled and traceable." },
  { q: "Can internal teams use it without engineering help?", a: "That is a core goal. We optimize for operational autonomy so marketing, support, and product ops can execute safely without constant developer involvement." },
  { q: "Will this replace our spreadsheets and disconnected tools?", a: "In most cases, yes. We consolidate fragmented workflows into a unified operational interface with automation where it matters most." },
];

export const CTA = {
  headline: "Let's build your CMS & admin",
  headlineItalic: "for real operations.",
  lead: "Schedule a discovery call and we will map your workflow bottlenecks, governance requirements, and the fastest path to a high-impact internal platform.",
  primaryCta: { label: "Book a discovery call", href: "/contact" },
  email: "hello@techbinaries.com",
  rows: [
    { k: "Response", v: "Within 24h" },
    { k: "Phase one", v: "6-10 weeks" },
    { k: "Core focus", v: "Ops + governance" },
    { k: "Engagement", v: "Fixed or T&M" },
  ],
};
