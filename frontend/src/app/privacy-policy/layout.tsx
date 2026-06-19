import type { Metadata } from "next";
import { withCanonical } from "@/lib/page-metadata";

export const metadata: Metadata = withCanonical("/privacy-policy", {
  title: "Privacy Policy",
  description:
    "Learn how [COMPANY NAME] collects, uses, stores, and protects personal data, usage information, and client project data.",
});

export default function PrivacyPolicyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
