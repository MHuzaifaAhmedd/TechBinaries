import type { Metadata } from "next";
import { withCanonical } from "@/lib/page-metadata";

export const metadata: Metadata = withCanonical("/contact", {
  title: "Contact Us",
  description:
    "Get in touch with TechBinaries about your product, timeline, and goals. We reply to every serious inquiry.",
});

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
