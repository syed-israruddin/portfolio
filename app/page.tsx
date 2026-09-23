import { Hero } from "@/components/hero";
import { Introduction } from "@/components/introduction";
import { SiteHeader } from "@/components/site-header";
import { WorkGrid } from "@/components/work-grid";
import { WorkIntro } from "@/components/work-intro";

export default function HomePage() {
  return (
    <main>
      <div className="page-shell">
        <SiteHeader />
        <Hero />
        <Introduction />
        <WorkIntro />
        <WorkGrid />
      </div>
    </main>
  );
}
