export const PAGE = {
  headline1: "iOS App Development",
  headline2: "Services Built for",
  headlineItalic: "High Performance",
  lead:
    "At TechBinaries, we combine creativity and technical excellence to deliver premium iOS application development services in the USA. Our team builds intuitive, high-performance applications designed to delight Apple users and drive business growth.",
};

export const HERO_PHONE_COUNTRY_CODES = [
  "+92", "+1", "+44", "+971", "+91", "+61", "+49", "+966", "+65", "+86",
];

export const GROWTH = {
  kicker: "Why iOS",
  title: "Custom iOS App Development",
  titleLine2: "for the",
  titleAccent: "Apple Ecosystem",
  lead:
    "We build powerful, user-friendly applications tailored to deliver seamless experiences across all Apple devices.",
  pillars: [
    {
      n: "01",
      k: "iOS Development",
      v: "Native iPhone apps",
      d: "We are technology-agnostic, using the best iOS programming tools to build high-performance, visually stunning apps tailored to your business needs.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "iOS app interface with fluid animations and polished interactions",
    },
    {
      n: "02",
      k: "MacOS Development",
      v: "Mac-optimized apps",
      d: "Our developers have deep expertise in the tools and frameworks required to build seamless, high-performance applications specifically optimized for Mac devices.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "Mac application development on Apple desktop hardware",
    },
    {
      n: "03",
      k: "WatchOS Development",
      v: "Apple Watch apps",
      d: "We build custom, user-friendly apps for Apple Watches that offer a smooth, intuitive experience perfectly optimized for wearable tech.",
      image:
        "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "Apple Watch app development and wearable interface design",
    },
    {
      n: "04",
      k: "iPadOS Development",
      v: "Tablet-first apps",
      d: "We build custom, high-performance iPad app development optimized specifically for iPads, helping you deliver a seamless tablet experience to a wider customer base.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "iPad app development with tablet-optimized user interface",
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
    "Cutting corners or partnering with the wrong iOS app development company doesn't just hurt your app; it actively drains your capital.",
  failures: [
    {
      stat: "66%",
      label: "Project failure rate",
      d: "Two-thirds of software projects fail to meet their original goals, ending up significantly over budget, delayed, or completely canceled due to poor planning.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80&auto=format&fit=crop",
      imageAlt: "Software project planning and delivery timeline review",
      theme: "perf",
    },
    {
      stat: "100×",
      label: "The late-fix penalty",
      d: "Fixes caught post-launch cost up to 100 times more than addressing them during the initial discovery and design phases. Technical debt accumulates exponentially.",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80&auto=format&fit=crop",
      imageAlt: "Development team reviewing product discovery and design documentation",
      theme: "arch",
    },
    {
      stat: "70%",
      label: "Immediate user churn",
      d: "Apple users demand perfection. Nearly three-quarters of mobile users will uninstall an application within 48 hours if it experiences a single crash or performance lag.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
      imageAlt: "Mobile app performance analytics and user retention metrics",
      theme: "obs",
    },
    {
      stat: "50%",
      label: "Wasted development budget",
      d: "Poorly executed digital products end up burning half of their entire engineering budget purely on fixing bugs and rewriting bad code, instead of building new features.",
      image:
        "https://images.unsplash.com/photo-1574887427561-d3d5d58c9273?w=900&q=80&auto=format&fit=crop",
      imageAlt: "Engineering team addressing technical debt and bug fixes",
      theme: "a11y",
    },
  ],
  close:
    "Within iPhone app development services, poor execution in the Apple ecosystem leads to compounding financial penalties and immediate user churn.",
};

export const PROCESS = [
  {
    num: "01",
    title: "Discovery & Strategy",
    d: "We define your project scope, align business workflows, and map technical requirements to protect your capital.",
    meta: "",
  },
  {
    num: "02",
    title: "Architecture & Design",
    d: "Our team drafts database structures and human-centric UI/UX prototypes before a single line of code is written.",
    meta: "",
  },
  {
    num: "03",
    title: "Agile Development",
    d: "We build your platform in sprints, engineering clean, scalable, and highly secure apps tailored to your goals.",
    meta: "",
  },
  {
    num: "04",
    title: "Quality Assurance",
    d: "Rigorous automated and manual testing eliminates structural defects, ensuring optimal performance and complete data transparency.",
    meta: "",
  },
  {
    num: "05",
    title: "Deployment & Launch",
    d: "We seamlessly transition your iOS application to a live, optimized cloud environment with zero operational disruption.",
    meta: "",
  },
  {
    num: "06",
    title: "Maintenance & Scaling",
    d: "We provide ongoing technical support, monitoring system health, and optimizing code as your business user base grows.",
    meta: "",
  },
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
  {
    q: "What is the average iOS app development cost?",
    a: "The total iOS development services cost varies significantly depending on the scope and complexity of your project. Simple applications or Minimum Viable Products (MVPs) require fewer development hours, whereas advanced enterprise platforms with custom databases and AI integrations demand a greater investment. Because every digital product is unique, we recommend reaching out to our team to get a tailored cost breakdown for your specific requirements.",
  },
  {
    q: "What major factors influence the overall iPhone app development cost?",
    a: "Your final iOS software development services cost is primarily driven by three things: app complexity (the number of custom screens, user flows, and features), backend infrastructure requirements, and the integration of third-party APIs. Advanced features like custom UI animations, secure payment processing gateways, and real-time data synchronization will also affect the final budget. To get a clear estimate for your project, contact our team today.",
  },
  {
    q: "Why should a business invest in custom iOS app development services?",
    a: "Choosing an iPhone app development company ensures your software is built from the ground up to match your exact business operations and scaling goals. Unlike generic templates, custom engineering allows for precise integration with existing corporate tools, implements specialized security protocols, and delivers a unique user interface that sets your brand apart in the App Store.",
  },
  {
    q: "What is the best model to hire an iOS developer for a long-term project?",
    a: "When looking to hire iOS app developer talent, you can choose between dedicated staff augmentation or full turnkey agency outsourcing. For long-term or highly iterative projects, hiring dedicated developers on a monthly retainer model is usually the most efficient approach, providing continuous access to specialized architecture skills without the overhead of building an internal team.",
  },
  {
    q: "How do I choose the right iOS app development company in the USA?",
    a: "To select the ideal iOS app development company in the USA, evaluate their portfolio for technical depth, strict adherence to Apple's Human Interface Guidelines, and past success in handling App Store deployments. A reliable US-based agency should offer a transparent product discovery phase, strong quality assurance practices, and clear communication frameworks to safeguard your development timeline.",
  },
  {
    q: "Should I build separate native apps or opt for joint iOS and Android app development?",
    a: "The choice between iOS native app development builds and unified iOS and Android app development depends on your target audience and budget. If your users require heavy device hardware integration (like complex Bluetooth controls or advanced on-device processing), dual native apps are best. However, if you need to reach both markets quickly with a shared feature set, cross-platform options are highly efficient.",
  },
  {
    q: "What are the benefits of partnering with specialized iOS app development services in the USA?",
    a: "Working directly with an iOS mobile app development company in the USA gives you access to teams fully aligned with local market compliance regulations, data privacy standards, and corporate security expectations. Local teams offer overlapping time zones for seamless project management and collaborative workshops, which minimizes communication gaps during critical development phases.",
  },
  {
    q: "When is Flutter iOS development the right choice for a business?",
    a: "Choosing Flutter iOS development is highly advantageous when you want to deploy your product to both iOS and Android platforms simultaneously using a single, unified codebase. It allows you to optimize your initial engineering timeline and speed up your time-to-market, all while maintaining native-like performance and pixel-perfect UI consistency across different device sizes.",
  },
];

export const CTA = {
  headline: "Get your code",
  headlineItalic: "stack",
  headlineSuffix: "configured.",
  lead:
    "Partner with TechBinaries to build a secure, scalable iOS application optimized for business growth.",
  primaryCta: { label: "Let's Map Out Your Product Roadmap", href: "/contact" },
  email: "hello@techbinaries.com",
  rows: [
    { k: "Response", v: "Within 24h" },
    { k: "First release", v: "10-14 weeks" },
    { k: "Team model", v: "Dedicated iOS pod" },
    { k: "Engagement", v: "Fixed or T&M" },
  ],
};
