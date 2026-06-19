import { PHONE_COUNTRY_OPTIONS } from "@/lib/phone-country-options";

export const SUB_SERVICES = [
  {
    num: "01",
    bin: "0001",
    title: "Custom Web Application Development",
    desc: "Production-grade web apps built for performance, scale, and long-term maintainability.",
    href: "/custom-web-application-development",
    accent: "#d4d4d8",
    tags: ["Next.js", "React", "Node", "Postgres"],
  },
  {
    num: "02",
    bin: "0010",
    title: "iOS App Development",
    desc: "Native Swift and cross-platform iOS experiences tuned for performance, polish, and App Store readiness.",
    href: "/ios-app-development",
    accent: "#a3a3a3",
    tags: ["Swift", "UIKit", "SwiftUI", "React Native"],
  },
  {
    num: "03",
    bin: "0011",
    title: "Android App Development",
    desc: "Kotlin-first Android apps and shared codebases that feel native and scale with your product roadmap.",
    href: "/android-app-development",
    accent: "#b8b8b8",
    tags: ["Kotlin", "Jetpack", "Play Store", "React Native"],
  },
  {
    num: "04",
    bin: "0100",
    title: "SaaS Product Development",
    desc: "Multi-tenant SaaS platforms with billing, auth, analytics, and growth loops baked in.",
    href: "/saas-product-development",
    accent: "#e5e5e5",
    tags: ["Multi-tenant", "Billing", "Auth", "Analytics"],
  },
  {
    num: "05",
    bin: "0101",
    title: "UI/UX Design Systems",
    desc: "Design systems, component libraries, and product UX engineered for consistency at scale.",
    href: "/ui-ux-design-systems",
    accent: "#737373",
    tags: ["Design Systems", "Figma", "Tokens", "A11y"],
  },
  {
    num: "06",
    bin: "0110",
    title: "CMS & Admin Panel Development",
    desc: "Content systems and internal tools that empower teams without slowing them down.",
    href: "/cms-admin-panel-development",
    accent: "#bdbdbd",
    tags: ["Headless CMS", "Admin UI", "RBAC", "Workflows"],
  },
  {
    num: "07",
    bin: "0111",
    title: "High-Performance Landing Pages",
    desc: "Pixel-perfect, conversion-tuned landing pages with sub-second load and SEO baked in.",
    href: "/high-performance-landing-page-development",
    accent: "#8a8a8a",
    tags: ["Core Web Vitals", "SEO", "A/B Ready", "CRO"],
  },
];

export const WE_BUILD = [
  { id: "saas", bin: "01", label: "SaaS Platforms", desc: "Multi-tenant products with billing, dashboards, and integrations for custom fintech and retail software." },
  { id: "dashboard", bin: "10", label: "Business Dashboards", desc: "Real-time analytics surfaces wired to your live data for custom healthcare software." },
  { id: "mobile", bin: "11", label: "Mobile Apps", desc: "Native iOS, Android, and cross-platform consumer apps for custom real estate and custom educational software." },
  { id: "internal", bin: "00", label: "Internal Tools", desc: "Admin panels and ops tooling that replace spreadsheets." },
  { id: "mvp", bin: "01", label: "MVPs", desc: "Ship-fast prototypes built on an architecture that can scale for custom logistics and custom manufacturing software." },
  { id: "market", bin: "10", label: "Marketplaces", desc: "Two-sided platforms with payments, search, and trust systems for custom ecommerce app development." },
];

export const VALUE_PROPS = [
  {
    id: "performance",
    title: "High-Performance That Engages Users",
    desc: "We build fast, optimized platforms that keep users engaged, improve Core Web Vitals, and deliver measurable performance gains across all devices.",
  },
  {
    id: "architecture",
    title: "Scalable Architecture for Long-Term Growth",
    desc: "Our software development solutions are designed to scale seamlessly, helping your business grow without technical limitations, downtime, or costly rebuilds in the future.",
  },
  {
    id: "design-system",
    title: "User-Centric Design That Converts",
    desc: "We create intuitive, consistent design systems that reduce friction, enhance usability, and improve conversions across web, mobile, and digital platforms.",
  },
  {
    id: "delivery",
    title: "Faster Delivery, Continuous Improvement",
    desc: "With agile workflows and weekly iterations, we deliver faster releases, gather real feedback, and continuously improve your product for sustained business growth.",
  },
];

export const PROCESS = [
  { num: "01", title: "Discovery & Strategy", desc: "We analyze your business goals, user needs, and technical requirements to define a clear roadmap aligned with long-term growth objectives.", points: ["Insightful", "Strategic", "Focused"] },
  { num: "02", title: "Planning & Architecture", desc: "We structure scalable system architecture, define workflows, and select the right technology stack to ensure performance, flexibility, and future readiness.", points: ["Scalable", "Structured", "Reliable"] },
  { num: "03", title: "UI/UX Design", desc: "We design intuitive, user-centric interfaces that enhance engagement, simplify interactions, and deliver seamless digital experiences across all devices and platforms.", points: ["Intuitive", "Engaging", "User-first"] },
  { num: "04", title: "Development", desc: "Our expert developers build secure, high-performance applications using modern frameworks, ensuring clean code, scalability, and seamless functionality across all integrated systems.", points: ["Robust", "Efficient", "Scalable"] },
  { num: "05", title: "Testing & Optimization", desc: "We rigorously test for performance, security, and usability, identifying issues early and optimizing the product to ensure a flawless, reliable user experience.", points: ["Thorough", "Reliable", "Optimized"] },
  { num: "06", title: "Launch & Growth", desc: "We deploy your solution smoothly and provide continuous support, updates, and improvements to ensure long-term scalability, performance, and business success.", points: ["Seamless", "Adaptive", "Growth-driven"] },
];

export const TECH = [
  "React", "Next.js", "TypeScript", "Vue", "Svelte", "Tailwind",
  "Node.js", "Python", "Go", "Rust", "GraphQL", "PostgreSQL",
  "Swift", "Kotlin", "React Native", "Flutter",
  "AWS", "GCP", "Kubernetes", "Docker", "Terraform", "Redis",
];

export const RESULTS = [
  {
    id: "performance-scores",
    metric: "98%+",
    project: "High-performance scores",
    desc: "High-performance scores ensure fast, smooth, and reliable user experiences.",
  },
  {
    id: "user-engagement",
    metric: "3×",
    project: "Increase in user engagement",
    desc: "Increase in user engagement through optimized design and performance improvements.",
  },
  {
    id: "load-times",
    metric: "50%+",
    project: "Reduction in load times",
    desc: "Reduction in load times for faster, more responsive digital experiences.",
  },
  {
    id: "system-uptime",
    metric: "99.9%",
    project: "System uptime",
    desc: "System uptime ensures reliability, stability, and uninterrupted business operations.",
  },
];

export const FAQS = [
  {
    q: "What is included in custom software development for startups?",
    a: "Tailored software solutions for startups involve building tailored digital products designed to fit unique business models, helping startups launch faster, scale efficiently, and stay competitive.",
  },
  {
    q: "What is the cost of custom software development?",
    a: "Custom software development cost depends on project complexity, features, and timeline. Simple solutions cost less, while scalable, enterprise-level systems require higher investment.",
  },
  {
    q: "Is custom software development suitable for small businesses?",
    a: "Yes, custom software development for small businesses helps automate operations, improve efficiency, and create tailored solutions that support long-term growth and scalability. These can include custom application development.",
  },
  {
    q: "How do I choose the best custom software development companies?",
    a: "Look for experience, portfolio, client reviews, and technical expertise. The best custom enterprise software development companies align solutions with your business goals and growth plans.",
  },
  {
    q: "Where can I find custom software development near me?",
    a: "You can find custom software development near you through local agencies or global companies offering remote services with strong communication and proven delivery processes.",
  },
  {
    q: "What makes top custom software development companies stand out?",
    a: "Top custom software development companies stand out through innovation, scalability, strong technical teams, and the ability to deliver reliable, high-performance solutions consistently.",
  },
  {
    q: "What is custom MVP development?",
    a: "Custom MVP development focuses on building a minimum viable product with core features, allowing businesses to test ideas quickly and gather real user feedback before scaling.",
  },
  {
    q: "Why should I outsource custom software development?",
    a: "Outsource custom software development to reduce costs, access global talent, speed up delivery, and focus on core business operations while experts handle technical execution.",
  },
];

export const HERO_PHONE_COUNTRY_OPTIONS = PHONE_COUNTRY_OPTIONS.map((option) => ({
  code: option.dialCode,
  flag: option.emojiFlag,
  iso2: option.iso2.toLowerCase(),
  country: option.countryName,
}));

export const HERO_PHONE_COUNTRY_CODES = HERO_PHONE_COUNTRY_OPTIONS.map((option) => option.code);
