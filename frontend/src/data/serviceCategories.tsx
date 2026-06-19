import type { ReactNode } from "react";

export type SubLink = { label: string; href: string };

export type ServiceCategory = {
  id: string;
  title: string;
  href: string;
  blurb: string;
  accent: string;
  icon: ReactNode;
  links: SubLink[];
};

/** Canonical service taxonomy — shared by SiteHeader mega-menu and lead forms. */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "custom-software-development",
    title: "Custom Software Development",
    href: "/custom-software-development",
    blurb: "Product engineering from UX systems to SaaS and mobile delivery.",
    accent: "#f472b6",
    icon: (
      <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden>
        <path
          d="M5 12h8a3 3 0 0 0 .3-5.97 4.5 4.5 0 0 0-8.7.97A3 3 0 0 0 5 12Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
    links: [
      { label: "Custom Web Application Development", href: "/custom-web-application-development" },
      { label: "iOS App Development", href: "/ios-app-development" },
      { label: "Android App Development", href: "/android-app-development" },
      { label: "SaaS Product Development", href: "/saas-product-development" },
      { label: "UI/UX Design Systems", href: "/ui-ux-design-systems" },
      { label: "CMS & Admin Panel Development", href: "/cms-admin-panel-development" },
      { label: "High-Performance Landing Pages", href: "/high-performance-landing-page-development" },
    ],
  },
  {
    id: "growth-performance-engineering",
    title: "Growth & Performance Engineering",
    href: "/growth-performance-engineering",
    blurb: "Conversion systems, analytics, and experimentation frameworks.",
    accent: "#a3e635",
    icon: (
      <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden>
        <path
          d="M6 4 2.5 9 6 14 M12 4l3.5 5L12 14 M10.5 3.5 7.5 14.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    links: [
      { label: "Conversion-Focused Landing Systems", href: "/conversion-landing-page-design" },
      { label: "Funnel Architecture & Optimization", href: "/sales-funnel-architecture-optimization" },
      { label: "Performance Tracking Dashboards", href: "/marketing-performance-tracking-dashboards" },
      { label: "User Behavior Analytics Integration", href: "/user-behavior-analytics-integration" },
      { label: "A/B Testing & Experimentation Systems", href: "/ab-testing-experimentation" },
      { label: "Data-Driven Growth Optimization", href: "/data-driven-growth-optimization" },
    ],
  },
  {
    id: "search-visibility-seo",
    title: "Search Visibility SEO",
    href: "/search-visibility-seo",
    blurb: "Technical SEO systems and long-term search growth operations.",
    accent: "#38bdf8",
    icon: (
      <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden>
        <rect
          x="5" y="2" width="8" height="14" rx="1.6"
          fill="none" stroke="currentColor" strokeWidth="1.4"
        />
        <line x1="8" y1="13.5" x2="10" y2="13.5"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    links: [
      { label: "Technical SEO Optimization", href: "/technical-seo-optimization" },
      { label: "Website Performance & Indexing Improvements", href: "/website-performance-indexing" },
      { label: "Scalable Content Architecture", href: "/scalable-content-architecture" },
      { label: "Keyword & Search Intent Mapping", href: "/keyword-search-intent-mapping" },
      { label: "Competitor & Market Analysis Tools", href: "/competitor-market-analysis" },
      { label: "Search Growth Monitoring Systems", href: "/search-growth-monitoring" },
    ],
  },
];
