import dynamic from "next/dynamic";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/home/HeroSection";
import { HomeScrollProvider } from "@/components/home/HomeScrollProvider";
import { HomePageDecor } from "@/components/home/HomePageDecor";
import GrainOverlay from "@/components/shared/GrainOverlay";
import { withCanonical } from "@/lib/page-metadata";
import "@/styles/home-page.css";

const CapabilitiesSection = dynamic(
  () => import("@/components/home/CapabilitiesSection"),
);
const GrowthBinarySection = dynamic(
  () => import("@/components/home/GrowthBinarySection"),
  { loading: () => null },
);
const TestimonialsSection = dynamic(
  () => import("@/components/home/TestimonialsSection"),
  { loading: () => null },
);
const HomeFaqSection = dynamic(
  () => import("@/components/home/HomeFaqSection"),
  { loading: () => null },
);
const CTASection = dynamic(() => import("@/components/home/CTASection"), {
  loading: () => null,
});
const SiteFooter = dynamic(() => import("@/components/SiteFooter"), {
  loading: () => null,
});

export const metadata: Metadata = withCanonical("/");

export default function HomePage() {
  return (
    <HomeScrollProvider>
      <HomePageDecor />
      <GrainOverlay />

      <div className="home-page">
        <SiteHeader />
        <HeroSection />

        <CapabilitiesSection />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <GrowthBinarySection />
        </div>

        <TestimonialsSection />
        <HomeFaqSection />
        <CTASection />
        <SiteFooter />
      </div>
    </HomeScrollProvider>
  );
}
