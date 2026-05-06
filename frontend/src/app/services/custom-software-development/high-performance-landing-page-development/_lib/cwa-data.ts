export const PAGE = {
  headline1: "Landing pages",
  headline2: "optimized for",
  headlineItalic: "conversion.",
  lead:
    "We design and build high-performance landing pages that load fast, rank well, and convert consistently across paid campaigns, organic traffic, and product launches.",
};

export const HERO_PHONE_COUNTRY_CODES = [
  "+92", "+1", "+44", "+971", "+91", "+61", "+49", "+966", "+65", "+86",
];

export const GROWTH = {
  kicker: "Why performance pages",
  title: "A fast landing page is a",
  titleAccent: "revenue engine.",
  lead:
    "In paid traffic environments, milliseconds and messaging clarity directly affect CPA and conversion. High-performance landing pages compound acquisition efficiency over time.",
  pillars: [
    { n: "01", k: "Speed", v: "Core Web Vitals first", d: "Optimized rendering, image strategy, and script discipline keep pages responsive on real devices and networks.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop", imageAlt: "Landing page performance dashboard with Core Web Vitals metrics" },
    { n: "02", k: "Conversion", v: "CRO-ready structure", d: "Clear hierarchy, persuasive copy framing, and behavioral UX patterns reduce friction in high-intent funnels.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80&auto=format&fit=crop", imageAlt: "Conversion funnel analysis for a landing page campaign" },
    { n: "03", k: "Experimentation", v: "A/B test capable", d: "Modular sections and event tracking make iterative experimentation straightforward for growth teams.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80&auto=format&fit=crop", imageAlt: "A/B testing workflow for landing page variants" },
    { n: "04", k: "Search visibility", v: "SEO embedded", d: "Technical SEO foundations and semantic content structure improve discoverability without hurting performance.", image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1400&q=80&auto=format&fit=crop", imageAlt: "SEO and page performance strategy for campaign pages" },
  ],
};

export const COST = {
  image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80&auto=format&fit=crop",
  imageAlt: "Marketing team reviewing underperforming campaign landing pages",
  kicker: "Where campaigns fail",
  title: "The cost of weak landing",
  titleAccent: "execution.",
  lead: "Most campaign pages lose efficiency through preventable issues in speed, clarity, and tracking instrumentation.",
  failures: [
    { stat: "53%", label: "Visitors drop", h: "Slow page load", d: "Heavy scripts and unoptimized assets increase bounce before users even consume your value proposition.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop", imageAlt: "Analytics chart showing high bounce rate from slow page speed", theme: "perf" },
    { stat: "2.1x", label: "Higher CPA", h: "Weak message hierarchy", d: "If offers and proof points are unclear, paid traffic gets wasted on confused visitors.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop", imageAlt: "Paid campaign dashboard with rising cost per acquisition", theme: "arch" },
    { stat: "46%", label: "Missed insights", h: "Bad tracking setup", d: "Without event instrumentation, teams cannot diagnose where conversion funnels break.", image: "https://images.unsplash.com/photo-1551817958-20204f19c8e1?w=900&q=80&auto=format&fit=crop", imageAlt: "Event analytics panel showing incomplete funnel tracking", theme: "obs" },
    { stat: "29%", label: "Accessibility risk", h: "Non-inclusive UX", d: "Ignoring accessibility and mobile readability reduces reachable audience and conversion potential.", image: "https://images.unsplash.com/photo-1574887427561-d3d5d58c9273?w=900&q=80&auto=format&fit=crop", imageAlt: "Accessible mobile landing page design review", theme: "a11y" },
  ],
  close: "We combine performance engineering, conversion psychology, and instrumentation so every campaign page is measurable and built to improve over time.",
};

export const PROCESS = [
  { num: "01", title: "Campaign discovery", d: "Align offer, audience intent, and acquisition channel goals before page structure is defined.", meta: "3-5 days" },
  { num: "02", title: "Conversion UX design", d: "Design message hierarchy, social proof positioning, and CTA flow for high-intent journeys.", meta: "1-2 weeks" },
  { num: "03", title: "Performance build", d: "Implement fast-loading sections, responsive media handling, and analytics-ready components.", meta: "2-4 weeks" },
  { num: "04", title: "QA + instrumentation", d: "Validate device behavior, event tracking, and conversion path reliability before launch.", meta: "Continuous" },
  { num: "05", title: "Launch + monitor", d: "Release with baseline dashboards and segment-level performance views for immediate feedback.", meta: "2-4 days" },
  { num: "06", title: "Optimize loop", d: "Run A/B experiments and incremental content/performance improvements from real conversion data.", meta: "Ongoing" },
];

export const STACK = [
  { group: "Frontend", items: [{ name: "Next.js", v: "15.x", role: "Page framework" }, { name: "React", v: "19", role: "Interactive UI" }, { name: "TypeScript", v: "5.x", role: "Reliability" }, { name: "Tailwind", v: "4.x", role: "Design implementation" }]},
  { group: "Backend", items: [{ name: "Node.js", v: "22 LTS", role: "Campaign APIs" }, { name: "Edge Functions", v: "Latest", role: "Low-latency logic" }, { name: "GraphQL", v: "Latest", role: "Content delivery" }, { name: "Python", v: "3.12", role: "Attribution analysis" }]},
  { group: "Data", items: [{ name: "GA4", v: "Latest", role: "Event analytics" }, { name: "PostHog", v: "Latest", role: "Funnel insights" }, { name: "BigQuery", v: "Latest", role: "Attribution modeling" }, { name: "S3", v: "-", role: "Asset delivery" }]},
  { group: "Infra", items: [{ name: "Vercel", v: "Latest", role: "Global edge hosting" }, { name: "Cloudflare", v: "Latest", role: "Caching + DNS" }, { name: "Docker", v: "-", role: "Build portability" }, { name: "Terraform", v: "1.x", role: "IaC" }]},
];

export const FAQS = [
  { q: "How fast can you deliver a campaign landing page?", a: "Most high-quality pages launch in 2-4 weeks depending on design complexity, integrations, and tracking requirements." },
  { q: "Do you handle both design and development?", a: "Yes. We own conversion strategy, UX design, implementation, and instrumentation so performance can be optimized as one system." },
  { q: "Can you integrate with ad and analytics platforms?", a: "Absolutely. We configure measurement for GA4, Meta, Google Ads, and custom event layers to support reliable attribution." },
  { q: "Do you support A/B testing workflows?", a: "Yes. We structure page architecture and tracking so growth teams can run controlled experiments without engineering rework each time." },
  { q: "Will the page be SEO friendly too?", a: "Yes. We balance technical SEO, semantic markup, and speed optimization so pages rank while preserving conversion outcomes." },
];

export const CTA = {
  headline: "Let's launch landing pages",
  headlineItalic: "that convert at speed.",
  lead: "Book a growth-focused discovery call to map offer, messaging, funnel instrumentation, and the fastest path to a high-performing campaign page.",
  primaryCta: { label: "Book a discovery call", href: "/contact" },
  email: "hello@techbinaries.com",
  rows: [
    { k: "Response", v: "Within 24h" },
    { k: "Launch window", v: "2-4 weeks" },
    { k: "Primary focus", v: "CRO + speed" },
    { k: "Engagement", v: "Fixed or T&M" },
  ],
};
