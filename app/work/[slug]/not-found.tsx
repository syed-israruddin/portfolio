import Link from "next/link";

export default function CaseStudyNotFound() {
  return (
    <main className="case-study case-study--not-found">
      <div className="case-study__content">
        <p>404</p>
        <h1>Case study not found.</h1>
        <Link className="case-study__back" href="/#work">Back to selected works</Link>
      </div>
    </main>
  );
}
