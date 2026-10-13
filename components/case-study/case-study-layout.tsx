import Link from "next/link";
import { ImageCarousel } from "@/components/case-study/image-carousel";
import { BetterboxdCaseStudyContent } from "@/components/case-study/betterboxd-case-study-content";
import { OmaweCaseStudyContent } from "@/components/case-study/omawe-case-study-content";
import type { Project } from "@/content/projects";

type CaseStudyLayoutProps = {
  project: Project;
};

export function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
  const metadata = project.caseStudy.headerMetadata;

  if (metadata) {
    const metadataItems = [
      ["Role", metadata.role],
      ["Timeline", metadata.timeline],
      ...(metadata.team ? [["Team", metadata.team]] : []),
      ...(metadata.deliverable ? [["Deliverable", metadata.deliverable]] : []),
    ];

    return (
      <main className="case-study case-study--metadata">
        <header className="case-study-metadata">
          <div className="case-study-metadata__content">
            <h1>{project.name}</h1>
            <p className="case-study-metadata__summary">{metadata.summary}</p>
            <dl
              className={`case-study-metadata__details ${
                metadataItems.length > 2 ? "case-study-metadata__details--extended" : ""
              }`.trim()}
            >
              {metadataItems.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}:</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>
        {project.caseStudy.heroCarousel && (
          <ImageCarousel
            initialIndex={project.caseStudy.heroCarousel.initialIndex}
            projectName={project.name}
            slides={project.caseStudy.heroCarousel.slides}
          />
        )}
        {project.slug === "omawe" && <OmaweCaseStudyContent />}
        {project.slug === "betterboxd" && <BetterboxdCaseStudyContent />}
      </main>
    );
  }

  return (
    <main className="case-study">
      <div className="case-study__content">
        <Link className="case-study__back" href="/#work">← Back to selected works</Link>
        <header className="case-study__header">
          <p>Case study</p>
          <h1>{project.name}</h1>
          <p>{project.caseStudy.metaDescription}</p>
        </header>
        <section className="case-study__placeholder" aria-label={`${project.name} case study content`}>
          <p>Case study coming soon.</p>
        </section>
      </div>
    </main>
  );
}
