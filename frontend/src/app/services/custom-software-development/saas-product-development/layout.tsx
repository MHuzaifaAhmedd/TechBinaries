import type { Metadata } from "next";
import { withCanonical } from "@/lib/page-metadata";
import "./_styles/cwa-hero-overrides.css";

export const metadata: Metadata = withCanonical("/saas-product-development", {
  title: {
    absolute: "TechBinaries Expert SaaS Development Company",
  },
  description:
    "Get premium cloud engineering from TechBinaries, a premier SaaS development company. We build multi-tenant applications engineered for growth.",
});

export default function SaasProductDevelopmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
