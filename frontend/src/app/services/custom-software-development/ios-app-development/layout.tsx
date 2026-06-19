import type { Metadata } from "next";
import { withCanonical } from "@/lib/page-metadata";
import "./_styles/cwa-hero-overrides.css";

export const metadata: Metadata = withCanonical("/ios-app-development", {
  title: {
    absolute: "TechBinaries Full-Cycle iOS App Development Services",
  },
  description:
    "Tech Binaries offers full-cycle iOS app development services for startups and enterprises. We build powerful apps that top the App Store charts.",
});

export default function IosAppDevelopmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
