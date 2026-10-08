import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Resume — Syed Israruddin",
  description: "Resume of Syed Israruddin, product designer and design engineer.",
};

const resumeUrl = "/assets/syed-israruddin-cv-2026.pdf";

export default function ResumePage() {
  return (
    <>
      <main className="resume-page">
        <section className="resume-page__content" aria-labelledby="resume-title">
          <header className="resume-page__header">
            <h1 id="resume-title">Resume</h1>
            <div className="resume-page__actions">
              <a download href={resumeUrl}>
                Download PDF
              </a>
              <a href={resumeUrl} rel="noreferrer" target="_blank">
                Open in new tab
              </a>
            </div>
          </header>
          <iframe className="resume-page__viewer" src={resumeUrl} title="Syed Israruddin CV 2026">
            <p>
              Your browser cannot display the PDF. <a href={resumeUrl}>Open the CV PDF</a> instead.
            </p>
          </iframe>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
