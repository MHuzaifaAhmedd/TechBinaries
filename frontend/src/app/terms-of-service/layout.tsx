import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms and conditions governing software development services, engagements, and use of [COMPANY NAME] websites and platforms.",
};

export default function TermsOfServiceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
