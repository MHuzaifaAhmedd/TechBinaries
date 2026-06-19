import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import { SERVICE_PAGE_ROUTES } from "./src/lib/service-routes";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["gsap", "@studio-freight/lenis"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/fonts/:font*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return Object.entries(SERVICE_PAGE_ROUTES).map(([slug, destination]) => ({
      source: `/${slug}`,
      destination,
    }));
  },
  async redirects() {
    return [
      {
        source: "/services/custom-software-digital-solutions",
        destination: "/custom-software-development",
        permanent: true,
      },
      {
        source: "/services/custom-software-digital-solutions/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/services/custom-software-development/mobile-app-development-ios-android",
        destination: "/ios-app-development",
        permanent: true,
      },
      {
        source: "/services/custom-software-development/high-performance-landing-pages",
        destination: "/high-performance-landing-page-development",
        permanent: true,
      },
      {
        source: "/services/growth-performance-engineering/conversion-focused-landing-systems",
        destination: "/conversion-landing-page-design",
        permanent: true,
      },
      {
        source: "/services/growth-performance-engineering/funnel-architecture-optimization",
        destination: "/sales-funnel-architecture-optimization",
        permanent: true,
      },
      {
        source: "/services/growth-performance-engineering/performance-tracking-dashboards",
        destination: "/marketing-performance-tracking-dashboards",
        permanent: true,
      },
      {
        source: "/services/growth-performance-engineering/ab-testing-experimentation-systems",
        destination: "/ab-testing-experimentation",
        permanent: true,
      },
      {
        source: "/services/search-visibility-seo/website-performance-indexing-improvements",
        destination: "/website-performance-indexing",
        permanent: true,
      },
      {
        source: "/services/search-visibility-seo/competitor-market-analysis-tools",
        destination: "/competitor-market-analysis",
        permanent: true,
      },
      {
        source: "/services/search-visibility-seo/search-growth-monitoring-systems",
        destination: "/search-growth-monitoring",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/custom-software-development",
        permanent: true,
      },
      {
        source: "/services/:category/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/services/:slug",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
