import type { Metadata } from "next";

import "./_styles/cwa-page.css";

export const metadata: Metadata = {
  title: "iOS App Development",
  description:
    "Native iOS app development with Swift and SwiftUI focused on retention, performance, and App Store-ready delivery.",
};

export default function IosAppDevelopmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
