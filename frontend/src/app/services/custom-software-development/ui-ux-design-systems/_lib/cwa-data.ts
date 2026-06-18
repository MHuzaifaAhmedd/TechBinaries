export const PAGE = {
  headline1: "User-Centric UI UX",
  headline2: "Design ",
  headlineItalic: "Agency",
  lead:
    "Tech Binaries is a dedicated UI UX design company delivering strategic, data-driven interfaces that maximize user retention and boost your conversion rates.",
};

export const HERO_PHONE_COUNTRY_CODES = [
  "+92", "+1", "+44", "+971", "+91", "+61", "+49", "+966", "+65", "+86",
];

export const GROWTH = {
  kicker: "Why systems thinking",
  title: "Our Product",
  titleAccent: "Design Scope",
  lead:
    "We deliver end-to-end user experiences, transforming complex digital ideas into functional, beautifully engineered software products.",
  pillars: [
    { n: "01", k: "UI/UX Design for Web", v: "Responsive web design", d: "As a top design system agency, we create beautiful, responsive websites that optimize desktop and mobile engagement for global brands.", image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1400&q=80&auto=format&fit=crop", imageAlt: "Responsive web UI design on desktop and mobile screens" },
    { n: "02", k: "UI/UX Design for Mobile", v: "iOS & Android UX", d: "Our UI UX design and development services deliver fast, intuitive, and high-performing iOS and Android interfaces that keep users coming back seamlessly.", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1400&q=80&auto=format&fit=crop", imageAlt: "Mobile app UI design for iOS and Android interfaces" },
    { n: "03", k: "Wireframing & Prototyping", v: "Figma & Adobe XD", d: "We map user journeys in Figma and Adobe XD, creating strategic wireframes that reduce development time and production costs.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80&auto=format&fit=crop", imageAlt: "Wireframing and prototyping user journeys in design tools" },
    { n: "04", k: "Usability Testing & Research", v: "Evidence-backed UX", d: "Hire UI UX designers who use real user testing and research data to eliminate friction points, ensuring evidence-backed digital products.", image: "https://images.unsplash.com/photo-1574887427561-d3d5d58c9273?w=1400&q=80&auto=format&fit=crop", imageAlt: "Usability testing and user research session" },
  ],
};

export const COST = {
  image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1400&q=80&auto=format&fit=crop",
  imageAlt: "Product team reviewing inconsistent UI patterns across screens",
  kicker: "Where teams get stuck",
  title: "The Real Cost of Bad",
  titleAccent: "UI UX",
  lead: "When an interface is confusing, users don't try to figure it out; they simply leave.",
  failures: [
    {
      stat: "100x",
      label: "Development Waste",
      d: "Fixing a usability flaw post-launch costs up to 100 times more than addressing it early during the initial Figma design phase.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80&auto=format&fit=crop",
      imageAlt: "Figma design phase wireframes and usability planning",
      theme: "perf",
    },
    {
      stat: "88%",
      label: "Immediate Churn",
      d: "Online users will completely abandon a digital product or website and never return after encountering a single bad user experience.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80&auto=format&fit=crop",
      imageAlt: "User abandoning a frustrating digital product experience",
      theme: "arch",
    },
    {
      stat: "400%",
      label: "Conversion Uplift",
      d: "While a clean interface design (UI) can boost conversions by 200%, a truly optimized user journey (UX) drives conversion rates up by 400%.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
      imageAlt: "Conversion analytics showing uplift from optimized UX",
      theme: "obs",
    },
    {
      stat: "$1.4T",
      label: "Lost Annual Revenue",
      d: "Frustrating digital experiences and friction points collectively cost global enterprises over $1.4 trillion in lost revenue every single year.",
      image: "https://images.unsplash.com/photo-1574887427561-d3d5d58c9273?w=900&q=80&auto=format&fit=crop",
      imageAlt: "Enterprise revenue loss from poor digital experiences",
      theme: "a11y",
    },
  ],
  close: "UI UX services without research aren't saving budget. It is merely delaying an expensive, emergency post-launch rebuild.",
};

export const PROCESS = [
  {
    num: "01",
    title: "Research and Strategy Making",
    d: "We analyze users and competitors to build a custom, data-driven design strategy that aligns perfectly with your core business goals.",
    meta: "",
  },
  {
    num: "02",
    title: "Wireframing",
    d: "Our mobile app UI UX design team sketches structural blueprints to map layouts and user flows, finalizing product architecture before adding visual design elements.",
    meta: "",
  },
  {
    num: "03",
    title: "Prototyping and Visual Design",
    d: "We build interactive prototypes to test functionality, then apply premium graphics, colors, and branding to create captivating, scalable interfaces.",
    meta: "",
  },
  {
    num: "04",
    title: "Usability Testing and Iterative Design",
    d: "Real users test the interface while we analyze behavior, gathering critical feedback to refine journeys and eliminate hidden friction points.",
    meta: "",
  },
  {
    num: "05",
    title: "Implementation",
    d: "After receiving positive user validation, we seamlessly integrate the finalized assets into your product's production-ready design system framework.",
    meta: "",
  },
  {
    num: "06",
    title: "Handoff, QA & Launch Support",
    d: "We provide developers with meticulous specifications and conduct strict visual quality audits, ensuring a flawless, pixel-perfect engineering launch.",
    meta: "",
  },
];

export const STACK = [
  { group: "Frontend", items: [{ name: "Figma", v: "Latest", role: "Design source of truth" }, { name: "React", v: "19", role: "Component implementation" }, { name: "TypeScript", v: "5.x", role: "API contracts" }, { name: "Storybook", v: "Latest", role: "Component docs" }]},
  { group: "Backend", items: [{ name: "Node.js", v: "22 LTS", role: "Docs automation" }, { name: "MDX", v: "Latest", role: "Guideline publishing" }, { name: "GraphQL", v: "Latest", role: "Schema-informed UI" }, { name: "Chromatic", v: "Latest", role: "Visual regression" }]},
  { group: "Data", items: [{ name: "Design Tokens", v: "W3C", role: "Cross-platform primitives" }, { name: "JSON Schema", v: "Latest", role: "Token validation" }, { name: "Analytics", v: "Latest", role: "Adoption tracking" }, { name: "S3", v: "-", role: "Asset hosting" }]},
  { group: "Infra", items: [{ name: "GitHub Actions", v: "Latest", role: "CI checks" }, { name: "Vercel", v: "Latest", role: "Docs deployment" }, { name: "Docker", v: "-", role: "Portable build tooling" }, { name: "Terraform", v: "1.x", role: "Infra consistency" }]},
];

export const FAQS = [
  {
    q: "What is included in your UI UX design services in the USA?",
    a: "Our comprehensive UI UX development services in the USA cover everything from initial user research and wireframing to high-fidelity visual design, interactive prototyping, and usability testing. We focus on aligning your business goals with user needs to build scalable digital products that drive engagement and retention.",
  },
  {
    q: "Why should we partner with a top UI UX design agency in the USA?",
    a: "Partnering with an experienced design system agency in the USA ensures your product is engineered according to world-class standards and local market expectations. We bring a data-driven approach, cross-industry expertise, and modern design frameworks to help your product stand out in competitive digital spaces.",
  },
  {
    q: "Do you offer specialized mobile UI UX design services?",
    a: "Yes. Our mobile UI UX design services focus on creating intuitive layouts, smooth gestures, and responsive interfaces specifically optimized for smaller screens. We ensure your application provides a fluid, natural feel that satisfies mobile-first users across all device types.",
  },
  {
    q: "How does your team approach mobile app UI UX design services for iOS and Android?",
    a: "Our mobile app user interface and user experience design services leverage native design guidelines, including Apple's Human Interface Guidelines and Google's Material Design rules. We test every touchpoint, button placement, and menu structure to guarantee seamless navigation and high user retention on both operating systems.",
  },
  {
    q: "Why is specialized UX design for startups so critical early on?",
    a: "Investing in specialized UX design firms for startups allows you to validate your Minimum Viable Product (MVP) with real users before spending heavy budgets on coding. It minimizes development rework, helps attract early investors, and ensures your product solves actual user pain points from day one.",
  },
  {
    q: "How do your enterprise UX design solutions handle complex legacy systems?",
    a: "Our enterprise SaaS UX design solutions simplify complex workflows, multi-tiered user permissions, and massive data sets into clean, accessible dashboards. We focus on boosting internal operational efficiency, reducing training times, and modernizing large-scale software systems without breaking critical functionality.",
  },
  {
    q: "What makes a high-converting SaaS UI?",
    a: "An exceptional SaaS UI focuses on reducing user friction during onboarding, maximizing feature discoverability, and presenting data clearly through clean dashboards. We design software-as-a-service interfaces that drive product-led growth and lower user churn rates.",
  },
  {
    q: "Why is compliance important in fintech UX design?",
    a: "Effective fintech UX design requires a perfect balance between strict security, regulatory compliance, and absolute user trust. We design financial interfaces that simplify complex transactions, present data securely, and make financial management feel effortless and reassuring for the end user.",
  },
  {
    q: "What are the benefits of working with a unified UI UX design and development company?",
    a: "Choosing a consolidated UI UX design and development company like TechBinaries eliminates the traditional friction between designers and engineers. This unified approach guarantees that the pixel-perfect layouts approved in Figma are implemented flawlessly into production-ready code.",
  },
  {
    q: "When should a business invest in UX audit services?",
    a: "You should consider UX audit services if your digital product is experiencing low conversion rates, high drop-offs, or an uptick in customer support complaints. Our team conducts a thorough behavioral and structural analysis to pinpoint exactly where users are getting stuck and how to fix it.",
  },
];

export const CTA = {
  headline: "Stop losing users to bad design.",
  headlineItalic: "Let's fix it!",
  lead: "Partner with TechBinaries to transform frustrating digital friction into seamless, high-converting user experiences.",
  primaryCta: { label: "Book a discovery call", href: "/contact" },
  email: "hello@techbinaries.com",
  rows: [
    { k: "Response", v: "Within 24h" },
    { k: "Phase one", v: "4-8 weeks" },
    { k: "Coverage", v: "Design + code" },
    { k: "Engagement", v: "Fixed or T&M" },
  ],
};
