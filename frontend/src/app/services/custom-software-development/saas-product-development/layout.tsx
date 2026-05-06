import type { Metadata } from "next";

import "./_styles/cwa-page.css";

export const metadata: Metadata = {
  title: "SaaS Product Development",
  description:
    "End-to-end SaaS product development with multi-tenant architecture, billing systems, and growth-ready foundations.",
};

export default function SaasProductDevelopmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
