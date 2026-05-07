import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "CMS & Admin Panel Development",
  description:
    "Custom CMS and admin panel development for operational control, publishing speed, and secure internal workflows.",
};

export default function CmsAdminPanelDevelopmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
