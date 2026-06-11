import type { Metadata } from "next";
import "./_styles/cwa-hero-overrides.css";

export const metadata: Metadata = {  title: {
    absolute: "TechBinaries Secure Web App Development Services",
  },
  description:
    "TechBinaries is your trusted partner for custom web app development. We transform your complex business ideas into seamless digital realities.",
};

export default function CustomWebApplicationDevelopmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
