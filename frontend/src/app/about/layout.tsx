import type { Metadata } from "next";
import "./_styles/about-page.css";

export const metadata: Metadata = {
  title: {
    absolute: "Who We Are | TechBinaries Software Development Company USA",
  },
  description:
    "TechBinaries is a results-driven software development company USA specializing in custom software, web, and mobile app development for businesses.",
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
