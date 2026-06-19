/**
 * Public SEO-friendly service URLs (flat, no /services/ prefix) mapped to
 * internal App Router paths. Rewrites in next.config.ts serve pages at the
 * public slugs; legacy /services/* URLs 301 to these paths.
 */
export const SERVICE_PAGE_ROUTES: Record<string, string> = {
  "custom-software-development": "/services/custom-software-development",
  "custom-web-application-development":
    "/services/custom-software-development/custom-web-application-development",
  "ios-app-development": "/services/custom-software-development/ios-app-development",
  "android-app-development": "/services/custom-software-development/android-app-development",
  "saas-product-development": "/services/custom-software-development/saas-product-development",
  "ui-ux-design-systems": "/services/custom-software-development/ui-ux-design-systems",
  "cms-admin-panel-development":
    "/services/custom-software-development/cms-admin-panel-development",
  "high-performance-landing-page-development":
    "/services/custom-software-development/high-performance-landing-page-development",
  "growth-performance-engineering": "/services/growth-performance-engineering",
  "conversion-landing-page-design":
    "/services/growth-performance-engineering/conversion-landing-page-design",
  "sales-funnel-architecture-optimization":
    "/services/growth-performance-engineering/sales-funnel-architecture-optimization",
  "marketing-performance-tracking-dashboards":
    "/services/growth-performance-engineering/marketing-performance-tracking-dashboards",
  "user-behavior-analytics-integration":
    "/services/growth-performance-engineering/user-behavior-analytics-integration",
  "ab-testing-experimentation":
    "/services/growth-performance-engineering/ab-testing-experimentation",
  "data-driven-growth-optimization":
    "/services/growth-performance-engineering/data-driven-growth-optimization",
  "search-visibility-seo": "/services/search-visibility-seo",
  "technical-seo-optimization": "/services/search-visibility-seo/technical-seo-optimization",
  "website-performance-indexing":
    "/services/search-visibility-seo/website-performance-indexing",
  "scalable-content-architecture":
    "/services/search-visibility-seo/scalable-content-architecture",
  "keyword-search-intent-mapping":
    "/services/search-visibility-seo/keyword-search-intent-mapping",
  "competitor-market-analysis":
    "/services/search-visibility-seo/competitor-market-analysis",
  "search-growth-monitoring": "/services/search-visibility-seo/search-growth-monitoring",
};

export function servicePublicPath(slug: string): string {
  return `/${slug}`;
}

export function isServicePagePath(pathname: string): boolean {
  const slug = pathname.replace(/^\//, "").split("/")[0];
  return slug in SERVICE_PAGE_ROUTES;
}

/** Slugs with a built page (included in sitemap). */
export const LIVE_SERVICE_SLUGS = [
  "custom-software-development",
  "custom-web-application-development",
  "ios-app-development",
  "android-app-development",
  "saas-product-development",
  "ui-ux-design-systems",
  "cms-admin-panel-development",
  "high-performance-landing-page-development",
] as const;
