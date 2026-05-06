import type { Metadata } from "next";

import "./_styles/cwa-page.css";

export const metadata: Metadata = {
  title: "High-Performance Landing Pages",
  description:
    "Conversion-focused high-performance landing page development with Core Web Vitals optimization and experiment-ready architecture.",
};

export default function HighPerformanceLandingPagesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
