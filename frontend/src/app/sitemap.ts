import type { MetadataRoute } from "next";
import { LIVE_SERVICE_SLUGS } from "@/lib/service-routes";
import { getSiteUrl } from "@/lib/site-url";

const STATIC_ROUTES: string[] = [
  "",
  "/about",
  "/contact",
  "/careers",
  "/careers/positions",
  "/case-studies",
  "/blogs",
  ...LIVE_SERVICE_SLUGS.map((slug) => `/${slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  return STATIC_ROUTES.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
  }));
}
