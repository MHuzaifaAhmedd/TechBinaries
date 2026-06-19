import type { Metadata } from "next";
import { withCanonical } from "@/lib/page-metadata";
import "./_styles/custom-software-page.css";
import "./_styles/cwa-page.shared.css";

export const metadata: Metadata = withCanonical("/custom-software-development", {
  title: {
    absolute: "TechBinaries Custom Software Development Services",
  },
  description:
    "Upgrade your business with custom software development services by TechBinaries. We build secure and user-centric solutions that drive growth.",
});

export default function CustomSoftwareDevelopmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
