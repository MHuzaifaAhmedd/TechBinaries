import type { Metadata } from "next";
import { withCanonical } from "@/lib/page-metadata";
import "./_styles/cwa-hero-overrides.css";

export const metadata: Metadata = withCanonical("/high-performance-landing-page-development", {
  title: {
    absolute: "TechBinaries High-Converting Landing Page Design Services",
  },
  description:
    "Get responsive, high-performance web pages. TechBinaries offers expert landing page design services tailored to your technical requirements. Learn more!",
});

export default function HighPerformanceLandingPagesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
