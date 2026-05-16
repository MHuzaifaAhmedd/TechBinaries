import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CaseStudiesExperience from "@/components/case-studies/CaseStudiesExperience.client";
import { CASE_STUDIES } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Selected work from our team — products we've designed and engineered for FinTech, HealthTech, SaaS, AI, and enterprise teams.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <CaseStudiesExperience cases={CASE_STUDIES} />
      </main>
      <SiteFooter />
    </>
  );
}
