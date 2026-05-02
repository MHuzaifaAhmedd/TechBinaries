import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Web Application Development",
  description:
    "Production-grade web applications on modern stacks — engineered for speed, resilience, and architecture that lasts.",
};

export default function CustomWebApplicationDevelopmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
