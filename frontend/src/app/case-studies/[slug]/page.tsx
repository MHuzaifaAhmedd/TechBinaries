import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CaseDetailExperience from "@/components/case-studies/CaseDetailExperience.client";
import { CASE_STUDIES, getCaseStudy, getNextCase } from "@/lib/case-studies";
import { withCanonical } from "@/lib/page-metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return withCanonical("/case-studies", { title: "Case study" });
  return withCanonical(`/case-studies/${slug}`, {
    title: `${c.client} — ${c.title}`,
    description: c.overview.challenge.slice(0, 160),
  });
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  const next = getNextCase(slug);
  return (
    <>
      <SiteHeader />
      <main>
        <CaseDetailExperience c={c} next={next} />
      </main>
      <SiteFooter />
    </>
  );
}
