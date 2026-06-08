import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.7, changeFrequency: "weekly" },
  { path: "/careers/positions", priority: 0.6, changeFrequency: "weekly" },
  { path: "/case-studies", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blogs", priority: 0.7, changeFrequency: "weekly" },
  { path: "/services/custom-software-development", priority: 0.9, changeFrequency: "monthly" },
  {
    path: "/services/custom-software-development/android-app-development",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/services/custom-software-development/cms-admin-panel-development",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/services/custom-software-development/custom-web-application-development",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/services/custom-software-development/high-performance-landing-page-development",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/services/custom-software-development/ios-app-development",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/services/custom-software-development/saas-product-development",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/services/custom-software-development/ui-ux-design-systems",
    priority: 0.7,
    changeFrequency: "monthly",
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  return STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
