import type { Metadata } from "next";
import { withCanonical } from "@/lib/page-metadata";
import "./_styles/cwa-hero-overrides.css";

export const metadata: Metadata = withCanonical("/cms-admin-panel-development", {
  title: {
    absolute: "TechBinaries Web & CMS Development Services",
  },
  description:
    "Get secure, high-performance CMS development services from TechBinaries. We build custom platforms that grow alongside your business.",
});

export default function CmsAdminPanelDevelopmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
