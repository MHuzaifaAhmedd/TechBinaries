import type { Metadata } from "next";
import "./_styles/cwa-hero-overrides.css";

export const metadata: Metadata = {
  title: {
    absolute: "TechBinaries Android App Development Services",
  },
  description:
    "Drive growth with premium Android app development services by TechBinaries. We design innovative, secure, and user-friendly mobile apps.",
};

export default function AndroidAppDevelopmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
