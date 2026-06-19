import type { Metadata } from "next";
import { withCanonical } from "@/lib/page-metadata";
import "./_styles/cwa-hero-overrides.css";

export const metadata: Metadata = withCanonical("/ui-ux-design-systems", {
  title: {
    absolute: "TechBinaries UI UX Design Services for Modern Apps",
  },
  description:
    "Drive engagement and retention. TechBinaries offers premium UI UX design services that align your business goals with seamless, intuitive user journeys.",
});

export default function UiUxDesignSystemsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
