import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/services/custom-software-digital-solutions",
        destination: "/services/custom-software-development",
        permanent: true,
      },
      {
        source: "/services/custom-software-digital-solutions/:path*",
        destination: "/services/custom-software-development/:path*",
        permanent: true,
      },
      {
        source: "/services/custom-software-development/mobile-app-development-ios-android",
        destination: "/services/custom-software-development/ios-app-development",
        permanent: true,
      },
      {
        source: "/services/custom-software-development/high-performance-landing-pages",
        destination: "/services/custom-software-development/high-performance-landing-page-development",
        permanent: true,
      },
      {
        source: "/services/growth-performance-engineering/conversion-focused-landing-systems",
        destination: "/services/growth-performance-engineering/conversion-landing-page-design",
        permanent: true,
      },
      {
        source: "/services/growth-performance-engineering/funnel-architecture-optimization",
        destination: "/services/growth-performance-engineering/sales-funnel-architecture-optimization",
        permanent: true,
      },
      {
        source: "/services/growth-performance-engineering/performance-tracking-dashboards",
        destination: "/services/growth-performance-engineering/marketing-performance-tracking-dashboards",
        permanent: true,
      },
      {
        source: "/services/growth-performance-engineering/ab-testing-experimentation-systems",
        destination: "/services/growth-performance-engineering/ab-testing-experimentation",
        permanent: true,
      },
      {
        source: "/services/search-visibility-seo/website-performance-indexing-improvements",
        destination: "/services/search-visibility-seo/website-performance-indexing",
        permanent: true,
      },
      {
        source: "/services/search-visibility-seo/competitor-market-analysis-tools",
        destination: "/services/search-visibility-seo/competitor-market-analysis",
        permanent: true,
      },
      {
        source: "/services/search-visibility-seo/search-growth-monitoring-systems",
        destination: "/services/search-visibility-seo/search-growth-monitoring",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
