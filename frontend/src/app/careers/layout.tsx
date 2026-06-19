import type { Metadata } from "next";
import "./_styles/careers-page.css";

export const metadata: Metadata = {
  title: "Tech Binaries Careers | Software Developer Jobs",
  description:
    "Skip the corporate bureaucracy. TechBinaries is hiring engineers who want true product autonomy, remote flexibility, and zero fluff. Apply today!",
  keywords: [
    "Tech Binaries careers",
    "software engineering jobs",
    "developer careers",
    "remote software jobs",
    "product engineering team",
  ],
  openGraph: {
    title: "Tech Binaries Careers | Software Developer Jobs",
    description:
      "Skip the corporate bureaucracy. TechBinaries is hiring engineers who want true product autonomy, remote flexibility, and zero fluff. Apply today!",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Binaries Careers | Software Developer Jobs",
    description:
      "Skip the corporate bureaucracy. TechBinaries is hiring engineers who want true product autonomy, remote flexibility, and zero fluff. Apply today!",
  },
};

export default function CareersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
