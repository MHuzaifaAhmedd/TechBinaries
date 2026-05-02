// import type { Metadata } from "next";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "TechBinaries — Software Development Studio",
//   description:
//     "We partner with ambitious companies to design, build, and scale software products. From zero to production — and beyond.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className="h-full">
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body className="min-h-full flex flex-col antialiased">{children}</body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-jakarta",
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
    <html lang="en" className={`h-full ${plusJakartaSans.variable}`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}