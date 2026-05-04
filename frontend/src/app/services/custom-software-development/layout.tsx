import type { Metadata } from "next";
import "./_styles/custom-software-page.css";

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
