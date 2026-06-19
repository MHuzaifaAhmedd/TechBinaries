import type { Metadata } from "next";
import { withCanonical } from "@/lib/page-metadata";

export const metadata: Metadata = withCanonical("/blogs", {
  title: "Blogs",
  description:
    "Engineering notes, product decisions, and insights from the TechBinaries team.",
});

export default function BlogsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
