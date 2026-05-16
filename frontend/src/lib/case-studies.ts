/* ─────────────────────────────────────────────────────────────────────────
   Case studies — typed dataset.
   Replace `cover` paths with real images in /public/case-studies/<slug>.jpg.
   Until those exist, the components fall back to gradient placeholders.
   ──────────────────────────────────────────────────────────────────────── */

export type Industry =
  | "FinTech"
  | "HealthTech"
  | "SaaS"
  | "E-Commerce"
  | "AI/ML"
  | "Enterprise"
  | "Logistics";

export interface Metric {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface ProcessChapter {
  number: string;
  title: string;
  bullets: string[];
}

export interface ShowcaseVisual {
  kind: "fullbleed" | "split" | "mockup" | "video";
  src?: string;
  poster?: string;
  caption?: string;
  highlight?: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  category: Industry;
  year: string;
  cover: string;
  outcome: string;
  outcomeValue: string;
  services: string[];
  size: "featured" | "large" | "tall" | "wide" | "regular";
  hero: {
    eyebrow: string;
    headline: string;
    coverVideo?: string;
  };
  overview: {
    challenge: string;
    approach: string;
  };
  metrics: Metric[];
  process: ProcessChapter[];
  visuals: ShowcaseVisual[];
  testimonial: {
    quote: string;
    name: string;
    title: string;
    avatar?: string;
  };
  results: {
    narrative: string;
    rings: { label: string; value: number; suffix?: string }[];
  };
  beforeAfter?: {
    before: string;
    after: string;
  };
}

/** Cover / showcase background when `src` or `cover` path exists in /public */
export function caseStudyCoverStyle(
  imagePath?: string,
  angle = 135
): Record<string, string> {
  if (imagePath) {
    return {
      backgroundImage: `linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.78) 100%), url(${imagePath})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  }
  return {
    background: `linear-gradient(${angle}deg, #0a0a0a 0%, #1c1c1c 50%, #2a2a2a 100%)`,
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "naba-hussam-fashion-commerce",
    client: "Naba Hussam",
    title: "Custom RTW + Made-to-Order Commerce for a Pakistani Fashion Brand",
    category: "E-Commerce",
    year: "2025",
    cover: "/case-studies/naba-hussam-fashion-commerce-cover.jpg",
    outcome: "RTW + MTO on one platform",
    outcomeValue: "2 modes",
    services: ["Web App", "Admin Dashboard", "Backend API", "DevOps"],
    size: "featured",
    hero: {
      eyebrow: "E-Commerce · 2025",
      headline: "Commerce built for couture and cash on delivery.",
    },
    overview: {
      challenge:
        "Naba Hussam needed more than a template shop: a single experience for ready-to-wear and made-to-order lines, with deposits, modification windows, and category-specific attributes—not a one-size-fits-all cart. The Pakistan market demanded Cash on Delivery and bank transfer, not card-only checkout, plus guest checkout so first-time buyers were not forced to register. Operations had to run on dynamic categories, Karachi vs outside-Karachi shipping, size charts, and reliable product imagery at scale.",
      approach:
        "We built Clothie as three deployable surfaces—a React storefront, a dedicated admin app, and an Express + MongoDB API—containerized behind Nginx with the API kept private. One data model powers MTO vs RTW flows, COD operations, and S3-backed media. GA4/GTM e-commerce events and policy pages support trust; a layered sale engine lets merchandising run campaigns without developer deploys.",
    },
    metrics: [
      { value: 3, label: "Production services" },
      { value: 18, label: "Core platform capabilities" },
      { value: 2, label: "Active local payment methods" },
      { value: 6, label: "GA4 e-commerce event types" },
    ],
    process: [
      {
        number: "01",
        title: "Discovery",
        bullets: [
          "Mapped RTW vs MTO journeys including deposits, design categories, and bank-transfer-only rules for custom pieces.",
          "Captured Pakistan-specific requirements: COD, bank transfer proof, and within/outside Karachi delivery tiers.",
          "Defined admin personas for catalog, order operations, and centralized settings ownership.",
        ],
      },
      {
        number: "02",
        title: "Architecture",
        bullets: [
          "Split storefront, admin, and API with REST resources and JWT plus admin middleware.",
          "Selected MongoDB Atlas for flexible schemas and AWS S3 for product images, size charts, and payment proofs.",
          "Designed guest-order email linking and Nginx reverse proxy for HTTPS without exposing the raw API.",
        ],
      },
      {
        number: "03",
        title: "Design",
        bullets: [
          "Built a Tailwind-responsive storefront with product grid, slide-in cart, and RTW/MTO collection segments.",
          "Product detail flows for sizes, add-ons, size-chart modals, and sale badges on effective pricing.",
          "Admin patterns for orders, COD console, and Settings including Sales / Discount Management.",
        ],
      },
      {
        number: "04",
        title: "Engineering",
        bullets: [
          "Shipped 18+ modules spanning auth, catalog, cart, checkout, orders, COD analytics, and settings.",
          "Integrated GA4-compatible view_item, add_to_cart, begin_checkout, and purchase events via dataLayer and gtag.",
          "Implemented layered sale pricing with backend resolver and admin modals for category and product campaigns.",
        ],
      },
      {
        number: "05",
        title: "Launch",
        bullets: [
          "Deployed Docker images (linux/amd64) with Nginx routing to storefront, admin, and localhost-bound API.",
          "Published production storefront and admin hostnames with SSL via standard VPS + Certbot workflow.",
          "Completed production hardening for JWT/CORS, S3 migration, and frontend sitemap generation on build.",
        ],
      },
    ],
    visuals: [
      {
        kind: "fullbleed",
        src: "/case-studies/naba-hussam-hero-fullbleed.jpg",
        caption:
          "The Naba Hussam storefront brings editorial hero content and shoppable collections into one fast, mobile-first experience.",
      },
      {
        kind: "split",
        src: "/case-studies/naba-hussam-checkout-split.jpg",
        caption:
          "Checkout meets customers where they are—with local payment methods and regional shipping built in, not bolted on.",
        highlight: "local payment methods",
      },
      {
        kind: "mockup",
        src: "/case-studies/naba-hussam-mockup-store-admin.jpg",
        caption:
          "Shoppers configure sizes and add-ons on the phone; the team runs catalog, sales, and fulfillment from a dedicated admin—same API, one source of truth.",
      },
      {
        kind: "video",
        poster: "/case-studies/naba-hussam-admin-sale-poster.jpg",
        caption:
          "Merchandising a seasonal sale—from rule creation to live storefront pricing—in under a minute.",
      },
    ],
    testimonial: {
      quote:
        "We needed one place to sell ready-to-wear and made-to-order—not two separate workflows. The site supports COD and bank transfer the way our customers expect, and guest checkout lets people order without registering first. We manage products, sales, and orders from a dedicated admin instead of chasing scattered messages.",
      name: "Naba Hussam",
      title: "Leadership Team",
    },
    results: {
      narrative:
        "The brand runs on a purpose-built stack with dual commerce modes, local payments, and unified ops tooling. Containerized deployment and a private API reduced release risk, while analytics and policy pages support growth and trust. The sale system enables campaigns without code changes—a direct operational win from the latest release cycle.",
      rings: [
        { label: "Production services", value: 3 },
        { label: "Commerce modes", value: 2 },
        { label: "GA4 event types", value: 6 },
      ],
    },
    beforeAfter: {
      before: "/case-studies/naba-hussam-before.jpg",
      after: "/case-studies/naba-hussam-after.jpg",
    },
  },
  {
    slug: "shipfast-routing",
    client: "ShipFast",
    title: "AI route optimisation for 2M+ daily deliveries",
    category: "Logistics",
    year: "2024",
    cover: "/case-studies/shipfast-cover.jpg",
    outcome: "Saved $4M in year one",
    outcomeValue: "$4M",
    services: ["AI/ML", "Backend", "Infrastructure"],
    size: "featured",
    hero: {
      eyebrow: "Logistics · 2024",
      headline: "We taught a fleet to think.",
    },
    overview: {
      challenge:
        "ShipFast was hand-routing 2M+ daily packages across 14 cities. Operations was the bottleneck. Drivers idled, deliveries slipped, customers churned.",
      approach:
        "We built a reinforcement-learning routing engine over a hybrid graph of road network, weather, and historical pickup data — running continuously, re-optimising every 90 seconds against live conditions.",
    },
    metrics: [
      { value: 4000000, prefix: "$", label: "Saved year one" },
      { value: 31, suffix: "%", label: "Fewer miles driven" },
      { value: 99.94, suffix: "%", label: "On-time rate" },
      { value: 2.4, suffix: "M", label: "Daily routes solved" },
    ],
    process: [
      {
        number: "01",
        title: "Discovery",
        bullets: [
          "Ride-alongs with 12 drivers across 4 cities",
          "Mapped 9 dispatcher workflows",
          "Surfaced the real bottleneck: re-routing latency",
        ],
      },
      {
        number: "02",
        title: "Architecture",
        bullets: [
          "Graph DB for road network + delivery constraints",
          "Event-driven re-optimisation pipeline",
          "Edge inference for sub-second routing decisions",
        ],
      },
      {
        number: "03",
        title: "Design System",
        bullets: [
          "Dispatcher UI rebuilt around live route stream",
          "Driver app with offline-first routing",
          "Component library for ops dashboards",
        ],
      },
      {
        number: "04",
        title: "Engineering",
        bullets: [
          "PyTorch RL model with custom reward shaping",
          "Go-based routing service, p99 < 80ms",
          "Kafka for delivery state, Postgres for history",
        ],
      },
      {
        number: "05",
        title: "Launch",
        bullets: [
          "Shadow-mode rollout city by city",
          "On-call rotation co-staffed for 60 days",
          "Migration playbook handed off to internal team",
        ],
      },
    ],
    visuals: [
      {
        kind: "fullbleed",
        caption: "Live dispatcher view — 2.4M routes refreshing every 90s",
      },
      {
        kind: "split",
        caption: "The routing engine outpaces dispatchers on every metric we measured.",
        highlight: "outpaces dispatchers",
      },
      { kind: "mockup", caption: "Driver app · dispatcher console" },
      { kind: "video", caption: "Routing engine — 24 hour timelapse" },
    ],
    testimonial: {
      quote:
        "Their team understood our logistics domain immediately. The route engine they built saved us $4M in year one and the ROI was clear from week two. Best engineering partnership we've ever had.",
      name: "Priya Nair",
      title: "VP Engineering, ShipFast",
    },
    results: {
      narrative:
        "Within two quarters the routing engine had paid for itself three times over. Dispatcher headcount stayed flat as volume grew 38%. Driver retention rose from 71% to 89%.",
      rings: [
        { label: "Cost saved", value: 4, suffix: "M" },
        { label: "Miles cut", value: 31, suffix: "%" },
        { label: "On-time", value: 99.94, suffix: "%" },
      ],
    },
  },
  {
    slug: "finedge-platform",
    client: "FinEdge",
    title: "Real-time trading platform rebuild",
    category: "FinTech",
    year: "2024",
    cover: "/case-studies/finedge-cover.jpg",
    outcome: "12ms p99 order latency",
    outcomeValue: "12ms",
    services: ["Web App", "Backend", "Infrastructure"],
    size: "large",
    hero: {
      eyebrow: "FinTech · 2024",
      headline: "A trading desk, rebuilt from the metal up.",
    },
    overview: {
      challenge:
        "FinEdge's legacy desk was bleeding orders to faster venues. Their 240ms median latency made them uncompetitive on anything under one-second decisioning.",
      approach:
        "We rebuilt the order routing stack in Rust over a co-located infrastructure, redesigned the trading interface around a Canvas-rendered tape, and shipped a TypeScript SDK for institutional clients.",
    },
    metrics: [
      { value: 12, suffix: "ms", label: "p99 order latency" },
      { value: 95, suffix: "%", label: "Latency reduction" },
      { value: 1.2, suffix: "B", label: "Daily volume" },
      { value: 4, suffix: "x", label: "Throughput gain" },
    ],
    process: [
      {
        number: "01",
        title: "Discovery",
        bullets: [
          "Latency audit across 7 microservices",
          "Tape-out tracing with eBPF",
          "Interviews with 18 institutional traders",
        ],
      },
      {
        number: "02",
        title: "Architecture",
        bullets: [
          "Rust order routing core",
          "Lock-free order book",
          "Colocation in 3 financial exchanges",
        ],
      },
      {
        number: "03",
        title: "Design System",
        bullets: [
          "Canvas-rendered tape at 144fps",
          "Keyboard-first interaction model",
          "Density modes for power users",
        ],
      },
      {
        number: "04",
        title: "Engineering",
        bullets: [
          "Order matching in Rust, FIX gateway in C++",
          "WebSocket binary protocol",
          "TypeScript SDK with type-safe order primitives",
        ],
      },
      {
        number: "05",
        title: "Launch",
        bullets: [
          "Dark-pool parallel run for 6 weeks",
          "Migration of 1,200 active accounts",
          "24/7 trading-floor support window",
        ],
      },
    ],
    visuals: [
      { kind: "fullbleed", caption: "Trader desk — production view" },
      {
        kind: "split",
        caption: "The new tape renders at 144fps with zero dropped frames under peak load.",
        highlight: "zero dropped frames",
      },
      { kind: "mockup", caption: "Order ticket · positions view" },
      { kind: "video", caption: "Closing bell, live tape" },
    ],
    testimonial: {
      quote:
        "TechBinaries didn't just build our product — they challenged our assumptions, improved our roadmap, and shipped faster than any team we've worked with. Exceptional craft.",
      name: "Sarah Chen",
      title: "CTO, FinEdge",
    },
    results: {
      narrative:
        "FinEdge's order flow tripled within two quarters of launch. Latency-sensitive funds re-routed business away from competitors. The platform has run without a major incident for 11 months.",
      rings: [
        { label: "Latency cut", value: 95, suffix: "%" },
        { label: "Volume", value: 1.2, suffix: "B" },
        { label: "Uptime", value: 99.99, suffix: "%" },
      ],
    },
  },
  {
    slug: "medcore-timeline",
    client: "MedCore",
    title: "Patient timeline for 4,200 clinicians",
    category: "HealthTech",
    year: "2024",
    cover: "/case-studies/medcore-cover.jpg",
    outcome: "11 weeks idea to production",
    outcomeValue: "11 wk",
    services: ["Web App", "Design System", "HIPAA"],
    size: "tall",
    hero: {
      eyebrow: "HealthTech · 2024",
      headline: "Eleven years of records, one timeline.",
    },
    overview: {
      challenge:
        "Clinicians at MedCore were context-switching across 6 tools per patient. Critical information was buried. Documentation drift was a patient-safety risk.",
      approach:
        "We unified the patient record into a single chronological timeline — every encounter, lab, prescription and note — searchable, filterable, and ranked by clinical relevance.",
    },
    metrics: [
      { value: 11, suffix: " wk", label: "Idea to production" },
      { value: 4200, label: "Clinicians using daily" },
      { value: 73, suffix: "%", label: "Faster chart review" },
      { value: 2, suffix: "M+", label: "Patients on platform" },
    ],
    process: [
      {
        number: "01",
        title: "Discovery",
        bullets: [
          "Shadow shifts in 3 hospitals",
          "Clinical workflow mapping",
          "Patient-safety incident review",
        ],
      },
      {
        number: "02",
        title: "Architecture",
        bullets: [
          "FHIR-native data layer",
          "HIPAA-compliant audit pipeline",
          "Event sourcing for record history",
        ],
      },
      {
        number: "03",
        title: "Design System",
        bullets: [
          "Density modes for ED vs clinic",
          "Glanceable severity indicators",
          "Accessible at AAA contrast",
        ],
      },
      {
        number: "04",
        title: "Engineering",
        bullets: [
          "Next.js 14 with server components",
          "PostgreSQL with row-level encryption",
          "Edge SSR for sub-200ms p95 globally",
        ],
      },
      {
        number: "05",
        title: "Launch",
        bullets: [
          "Pilot with 40 clinicians for 3 weeks",
          "Roll-out wave by department",
          "Clinical champion programme",
        ],
      },
    ],
    visuals: [
      { kind: "fullbleed", caption: "Patient timeline — live in production" },
      {
        kind: "split",
        caption: "Chart review that took 9 minutes now takes 2. That time goes back to patients.",
        highlight: "goes back to patients",
      },
      { kind: "mockup", caption: "Mobile triage · desktop timeline" },
      { kind: "video", caption: "Day in the life — emergency department" },
    ],
    testimonial: {
      quote:
        "We went from idea to production in 11 weeks. The architecture has scaled to 2M+ patients without a single major incident. That's engineering excellence.",
      name: "Marcus Williams",
      title: "CEO, MedCore",
    },
    results: {
      narrative:
        "Chart review time dropped 73% across the pilot cohort. Documentation completeness rose 41%. The platform now serves all 4,200 clinicians and continues to expand.",
      rings: [
        { label: "Faster reviews", value: 73, suffix: "%" },
        { label: "Clinicians", value: 4.2, suffix: "k" },
        { label: "Patients", value: 2, suffix: "M+" },
      ],
    },
  },
  {
    slug: "novaretail-migration",
    client: "NovaRetail",
    title: "Headless commerce migration at scale",
    category: "E-Commerce",
    year: "2023",
    cover: "/case-studies/novaretail-cover.jpg",
    outcome: "43% faster page loads",
    outcomeValue: "43%",
    services: ["Web App", "Performance", "Migration"],
    size: "regular",
    hero: {
      eyebrow: "E-Commerce · 2023",
      headline: "A platform migration with the lights on.",
    },
    overview: {
      challenge:
        "NovaRetail's monolithic commerce stack couldn't keep up with their 400% YoY growth. Pages took 3.2s to load. Conversion was leaking.",
      approach:
        "We migrated to a headless architecture incrementally, page type by page type, with zero downtime and zero loss of SEO equity.",
    },
    metrics: [
      { value: 43, suffix: "%", label: "Faster page loads" },
      { value: 28, suffix: "%", label: "Conversion lift" },
      { value: 0, label: "Downtime hours" },
      { value: 1.4, suffix: "s", label: "LCP at p75" },
    ],
    process: [
      {
        number: "01",
        title: "Discovery",
        bullets: [
          "Performance audit across 240 page types",
          "SEO equity mapping",
          "Tech debt inventory",
        ],
      },
      {
        number: "02",
        title: "Architecture",
        bullets: [
          "Next.js + Sanity headless stack",
          "Edge CDN with stale-while-revalidate",
          "Strangler-fig migration plan",
        ],
      },
      {
        number: "03",
        title: "Design System",
        bullets: [
          "Component library with 142 primitives",
          "Theming for 4 sub-brands",
          "Tokens piped to Figma",
        ],
      },
      {
        number: "04",
        title: "Engineering",
        bullets: [
          "Page-type-by-page-type cutover",
          "Synthetic monitoring per route",
          "Automated SEO regression suite",
        ],
      },
      {
        number: "05",
        title: "Launch",
        bullets: [
          "12-week phased rollout",
          "Black Friday in flight, no incidents",
          "Internal team owns the new stack",
        ],
      },
    ],
    visuals: [
      { kind: "fullbleed", caption: "PDP — post-migration" },
      {
        kind: "split",
        caption: "Page weight dropped 62% with zero loss of brand or content density.",
        highlight: "62%",
      },
      { kind: "mockup", caption: "Mobile · tablet · desktop" },
      { kind: "video", caption: "Checkout flow" },
    ],
    testimonial: {
      quote:
        "The migration was seamless. Their team modernised our stack while keeping business continuity intact, and we saw page performance improve by 43% within the first month.",
      name: "Daniel Kim",
      title: "Head of Product, NovaRetail",
    },
    results: {
      narrative:
        "Page load times dropped from 3.2s to 1.8s at p75. Conversion lifted 28% across the catalogue. The new stack handled Black Friday at 6x normal traffic with no incidents.",
      rings: [
        { label: "Faster loads", value: 43, suffix: "%" },
        { label: "Conversion lift", value: 28, suffix: "%" },
        { label: "Black Friday", value: 6, suffix: "x" },
      ],
    },
  },
  {
    slug: "cloudaxis-platform",
    client: "CloudAxis",
    title: "Multi-tenant observability platform",
    category: "SaaS",
    year: "2023",
    cover: "/case-studies/cloudaxis-cover.jpg",
    outcome: "Two major launches ahead of schedule",
    outcomeValue: "+2 launches",
    services: ["SaaS", "Backend", "Design System"],
    size: "wide",
    hero: {
      eyebrow: "SaaS · 2023",
      headline: "Observability that scales with the customer.",
    },
    overview: {
      challenge:
        "CloudAxis was outgrowing single-tenant. Onboarding a customer took 14 days of manual work. Their architecture couldn't isolate noisy tenants from each other.",
      approach:
        "We re-architected the data plane for true multi-tenancy with per-tenant resource quotas, then rebuilt the onboarding flow as a self-serve product surface.",
    },
    metrics: [
      { value: 14, suffix: " → 4 min", label: "Onboarding time" },
      { value: 220, label: "New tenants in Q1" },
      { value: 99.97, suffix: "%", label: "Uptime" },
      { value: 6, suffix: "x", label: "Throughput" },
    ],
    process: [
      {
        number: "01",
        title: "Discovery",
        bullets: [
          "Workload profiling across 18 customers",
          "Tenant isolation requirements",
          "Quota model design",
        ],
      },
      {
        number: "02",
        title: "Architecture",
        bullets: [
          "Cell-based data plane",
          "Per-tenant ClickHouse pools",
          "Quota enforcement at ingest",
        ],
      },
      {
        number: "03",
        title: "Design System",
        bullets: [
          "Self-serve onboarding flow",
          "Dashboard builder with drag composition",
          "Density-aware data tables",
        ],
      },
      {
        number: "04",
        title: "Engineering",
        bullets: [
          "Go ingest with backpressure",
          "Terraform per-tenant provisioning",
          "Feature flags for incremental rollout",
        ],
      },
      {
        number: "05",
        title: "Launch",
        bullets: [
          "GA with 18 design partners",
          "Self-serve open for new signups",
          "Sales-engineering handoff complete",
        ],
      },
    ],
    visuals: [
      { kind: "fullbleed", caption: "Dashboard builder — production" },
      {
        kind: "split",
        caption: "Self-serve cut onboarding from days to minutes — without dropping enterprise.",
        highlight: "days to minutes",
      },
      { kind: "mockup", caption: "Onboarding flow · dashboard" },
      { kind: "video", caption: "Tenant isolation in action" },
    ],
    testimonial: {
      quote:
        "From strategy to execution, they worked like an extension of our engineering org. We launched two major features ahead of schedule with measurable customer impact.",
      name: "Elena Rodriguez",
      title: "Director of Engineering, CloudAxis",
    },
    results: {
      narrative:
        "Onboarding dropped from 14 days to 4 minutes. The platform absorbed 220 new tenants in a single quarter without operational strain. ARR grew 3.2x year-over-year.",
      rings: [
        { label: "Onboarding", value: 99, suffix: "%" },
        { label: "New tenants", value: 220 },
        { label: "ARR growth", value: 3.2, suffix: "x" },
      ],
    },
  },
  {
    slug: "northwind-ai",
    client: "Northwind",
    title: "Document intelligence for legal teams",
    category: "AI/ML",
    year: "2024",
    cover: "/case-studies/northwind-cover.jpg",
    outcome: "94% extraction accuracy",
    outcomeValue: "94%",
    services: ["AI/ML", "Web App", "Compliance"],
    size: "regular",
    hero: {
      eyebrow: "AI/ML · 2024",
      headline: "Reading 40,000 contracts a day.",
    },
    overview: {
      challenge:
        "Northwind's M&A teams were drowning in due-diligence document review. A single deal could touch 8,000 contracts. Manual review took weeks per deal.",
      approach:
        "We built a retrieval-augmented extraction pipeline tuned for legal language, with a review UI that shows reasoning beside every extracted clause.",
    },
    metrics: [
      { value: 94, suffix: "%", label: "Extraction accuracy" },
      { value: 40000, label: "Docs/day capacity" },
      { value: 87, suffix: "%", label: "Review time saved" },
      { value: 38, label: "Clause types" },
    ],
    process: [
      {
        number: "01",
        title: "Discovery",
        bullets: [
          "Worked with 6 senior associates",
          "Annotated 4,200 ground-truth clauses",
          "Mapped 38 clause types to extraction rules",
        ],
      },
      {
        number: "02",
        title: "Architecture",
        bullets: [
          "RAG over partitioned vector store",
          "LLM evaluation harness with quality gates",
          "Human-in-the-loop review queue",
        ],
      },
      {
        number: "03",
        title: "Design System",
        bullets: [
          "Side-by-side clause + source view",
          "Confidence-weighted highlighting",
          "Reviewer keyboard shortcuts",
        ],
      },
      {
        number: "04",
        title: "Engineering",
        bullets: [
          "Python ingest with OCR fallback",
          "Postgres + pgvector for embeddings",
          "Audit trail for every extraction",
        ],
      },
      {
        number: "05",
        title: "Launch",
        bullets: [
          "Pilot on 3 active deals",
          "Calibration against partner review",
          "Roll-out to all M&A practice groups",
        ],
      },
    ],
    visuals: [
      { kind: "fullbleed", caption: "Reviewer console — live deal" },
      {
        kind: "split",
        caption: "Every extraction is traceable to the source clause and to the model's reasoning.",
        highlight: "traceable to the source",
      },
      { kind: "mockup", caption: "Reviewer console · deal dashboard" },
      { kind: "video", caption: "End-to-end deal review" },
    ],
    testimonial: {
      quote:
        "The accuracy and traceability gave our partners confidence to actually use this in live deals. We're closing transactions faster with the same headcount.",
      name: "Lawrence Park",
      title: "Partner, Northwind",
    },
    results: {
      narrative:
        "Review time per deal dropped 87% across the M&A practice. Partner adoption hit 100% within a quarter. The platform has processed 1.2M contracts since launch.",
      rings: [
        { label: "Time saved", value: 87, suffix: "%" },
        { label: "Accuracy", value: 94, suffix: "%" },
        { label: "Docs/day", value: 40, suffix: "k" },
      ],
    },
  },
  {
    slug: "atlas-erp",
    client: "Atlas Industries",
    title: "ERP modernisation for 12,000 employees",
    category: "Enterprise",
    year: "2023",
    cover: "/case-studies/atlas-cover.jpg",
    outcome: "18-month migration, zero downtime",
    outcomeValue: "0 downtime",
    services: ["Enterprise", "Web App", "Migration"],
    size: "regular",
    hero: {
      eyebrow: "Enterprise · 2023",
      headline: "Modernising the system everyone depends on.",
    },
    overview: {
      challenge:
        "Atlas was running on a 22-year-old ERP. Every department had workarounds. The cost of a single hour of downtime ran into seven figures.",
      approach:
        "We executed a strangler-fig migration over 18 months — replacing one module at a time while the legacy system kept running. No big-bang cutover. No business risk.",
    },
    metrics: [
      { value: 18, suffix: " mo", label: "Migration duration" },
      { value: 0, label: "Hours downtime" },
      { value: 12000, label: "Employees migrated" },
      { value: 94, suffix: "%", label: "Adoption at 6mo" },
    ],
    process: [
      {
        number: "01",
        title: "Discovery",
        bullets: [
          "Mapped 240 business processes",
          "Catalogued 1,800 ERP customisations",
          "Risk matrix per module",
        ],
      },
      {
        number: "02",
        title: "Architecture",
        bullets: [
          "Anti-corruption layer over legacy",
          "Module-by-module strangler fig",
          "Dual-write reconciliation pipeline",
        ],
      },
      {
        number: "03",
        title: "Design System",
        bullets: [
          "Department-specific workflows",
          "Accessible at AAA contrast",
          "Localised in 9 languages",
        ],
      },
      {
        number: "04",
        title: "Engineering",
        bullets: [
          "TypeScript across the stack",
          "Per-module rollout gates",
          "Synthetic transactions for safety",
        ],
      },
      {
        number: "05",
        title: "Launch",
        bullets: [
          "Department-by-department go-live",
          "Internal champions in every region",
          "Legacy decommission, finally",
        ],
      },
    ],
    visuals: [
      { kind: "fullbleed", caption: "Procurement module — production" },
      {
        kind: "split",
        caption: "The migration completed under budget and ahead of schedule.",
        highlight: "ahead of schedule",
      },
      { kind: "mockup", caption: "Procurement · finance · HR" },
      { kind: "video", caption: "Migration timelapse" },
    ],
    testimonial: {
      quote:
        "Eighteen months, twelve thousand employees, zero downtime hours. They executed this like it was their own business on the line.",
      name: "Hannah Voss",
      title: "CIO, Atlas Industries",
    },
    results: {
      narrative:
        "The legacy system was fully decommissioned on schedule. Adoption hit 94% within six months of each module's launch. Operating costs for IT dropped 31% year-over-year.",
      rings: [
        { label: "Downtime", value: 0 },
        { label: "Adoption", value: 94, suffix: "%" },
        { label: "Cost cut", value: 31, suffix: "%" },
      ],
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function getNextCase(slug: string): CaseStudy {
  const idx = CASE_STUDIES.findIndex((c) => c.slug === slug);
  return CASE_STUDIES[(idx + 1) % CASE_STUDIES.length];
}

export const CATEGORIES: Array<Industry | "All"> = [
  "All",
  "FinTech",
  "HealthTech",
  "SaaS",
  "E-Commerce",
  "AI/ML",
  "Enterprise",
  "Logistics",
];

export const CLIENT_LOGOS = [
  "Naba Hussam",
  "FinEdge",
  "MedCore",
  "ShipFast",
  "NovaRetail",
  "CloudAxis",
  "Northwind",
  "Atlas",
  "Helix",
  "Prism",
  "Vector",
  "Quanta",
  "Beacon",
];
