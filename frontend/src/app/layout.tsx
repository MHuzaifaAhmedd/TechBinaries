import type { Metadata } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";
import { LayoutClientWidgets } from "@/components/LayoutClientWidgets";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-jakarta",
  adjustFontFallback: true,
});

const kamerik = localFont({
  src: [
    {
      path: "../../public/fonts/kamerik-105-cyrillic-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/kamerik-105-cyrillic-regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/kamerik-105-cyrillic-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/kamerik-105-cyrillic-black.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-kamerik",
  display: "swap",
  fallback: ["var(--font-jakarta)", "system-ui", "sans-serif"],
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "TechBinaries | Software Development Studio",
    template: "%s | TechBinaries",
  },
  description:
    "We partner with ambitious companies to design, build, and scale software products. From zero to production — and beyond.",
  icons: {
    icon: "/images/favicon.png",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full ${plusJakartaSans.variable} ${kamerik.variable}`}
    >
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <LayoutClientWidgets />
      </body>
    </html>
  );
}
