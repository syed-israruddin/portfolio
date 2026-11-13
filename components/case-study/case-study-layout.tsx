import Link from "next/link";
import { ImageCarousel } from "@/components/case-study/image-carousel";
import { BetterboxdCaseStudyContent } from "@/components/case-study/betterboxd-case-study-content";
import type { Project } from "@/content/projects";

type CaseStudyLayoutProps = {
  project: Project;
};

export function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
  const metadata = project.caseStudy.headerMetadata;
  const inProgressDetails = project.caseStudy.inProgressDetails;

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
        {project.slug === "betterboxd" && <BetterboxdCaseStudyContent />}
      </main>
    );
  }

  return (
    <main className="case-study">
      <div className="case-study__content">
        <Link className="case-study__back" href="/#work">← Back to selected works</Link>
        <header className="case-study__header">
          <p>{inProgressDetails?.label ?? "Case study"}</p>
          <h1>{project.name}</h1>
          <p className="case-study__summary">{inProgressDetails?.summary ?? project.caseStudy.metaDescription}</p>
          {inProgressDetails?.cta && (
            <a
              className="case-study__app-store-link"
              href={inProgressDetails.cta.href}
              rel="noreferrer"
              target="_blank"
            >
              {inProgressDetails.cta.label}
            </a>
          )}
          {inProgressDetails && (
            <dl className="case-study__details">
              {inProgressDetails.metadata.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </header>
      </div>
      {project.caseStudy.heroCarousel && (
        <div className="case-study__carousel">
          <ImageCarousel
            initialIndex={project.caseStudy.heroCarousel.initialIndex}
            projectName={project.name}
            slides={project.caseStudy.heroCarousel.slides}
          />
        </div>
      )}
      {!inProgressDetails && (
        <div className="case-study__content">
          <section className="case-study__placeholder" aria-label={`${project.name} case study content`}>
            <p>Case study coming soon.</p>
          </section>
        </div>
      )}
    </main>
  );
}
