import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Open Positions | TechBinaries" },
  description:
    "Current openings and how to apply at Tech Binaries. No listed role? We still read every serious introduction sent to careers@techbinaries.com.",
  openGraph: {
    title: "Open Positions | TechBinaries",
    description:
      "See open roles and apply — or reach out with your work if the right seat is not listed yet.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Open Positions | TechBinaries",
    description:
      "Current openings at Tech Binaries and how to get in touch about engineering roles.",
  },
};

export default function CareersPositionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
