import { AboutInfo } from "@/components/about-info";
import { AboutIntro } from "@/components/about-intro";
import { AutoScrollBar } from "@/components/auto-scroll-bar";
import { Hero } from "@/components/hero";
import { Introduction } from "@/components/introduction";
import { SiteFooter } from "@/components/site-footer";
import { WorkGrid } from "@/components/work-grid";
import { WorkIntro } from "@/components/work-intro";

export default function HomePage() {
  return (
    <main>
      <div className="page-shell">
        <Hero />
        <AutoScrollBar />
        <Introduction />
        <section id="work" aria-labelledby="work-title">
          <WorkIntro />
          <WorkGrid />
        </section>
        <AboutIntro />
        <AboutInfo />
      </div>
      <SiteFooter />
    </main>
  );
}
