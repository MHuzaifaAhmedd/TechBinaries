import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "UI/UX Design Systems",
  description:
    "Scalable UI/UX design systems with tokens, reusable components, and governance that accelerate product delivery.",
};

export default function UiUxDesignSystemsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
