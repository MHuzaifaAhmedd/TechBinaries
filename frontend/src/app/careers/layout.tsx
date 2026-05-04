import type { Metadata } from "next";
import "./_styles/careers-page.css";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Tech Binaries — a deliberate team of engineers and builders who ship with ownership, precision, and honest craft. See how we hire and what it's like to work here.",
  keywords: [
    "Tech Binaries careers",
    "software engineering jobs",
    "developer careers",
    "remote software jobs",
    "product engineering team",
  ],
  openGraph: {
    title: "Careers | TechBinaries",
    description:
      "We're not looking for people who want a job — we're looking for people who want ownership. Explore careers at Tech Binaries.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | TechBinaries",
    description:
      "Join a team that treats every line of code like it has our name on it — because it does.",
  },
};

export default function CareersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
