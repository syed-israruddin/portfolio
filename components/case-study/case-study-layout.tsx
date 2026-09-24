import Link from "next/link";
import type { Project } from "@/content/projects";

type CaseStudyLayoutProps = {
  project: Project;
};

export function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
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
