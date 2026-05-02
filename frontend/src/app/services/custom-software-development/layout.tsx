import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Software Development",
  description:
    "Custom software, web apps, mobile, and product engineering — built for performance, scale, and maintainability.",
};

export default function CustomSoftwareDevelopmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
