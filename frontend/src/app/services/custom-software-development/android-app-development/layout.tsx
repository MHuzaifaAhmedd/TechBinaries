import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Android App Development",
  description:
    "Kotlin-first Android app engineering for broad device compatibility, stable releases, and scalable product growth.",
};

export default function AndroidAppDevelopmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
