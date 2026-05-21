import type { Metadata } from "next";
import "./_styles/about-page.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about TechBinaries — who we are, how we work, and what we build with our partners.",
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
