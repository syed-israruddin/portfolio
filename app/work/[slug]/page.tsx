import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/case-study/case-study-layout";
import { SiteFooter } from "@/components/site-footer";
import { getProjectBySlug, projects } from "@/content/projects";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: project.caseStudy.metaTitle,
    description: project.caseStudy.metaDescription,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <CaseStudyLayout project={project} />
      <SiteFooter />
    </>
  );
}
