import DotGrid from "@/components/dot-grid";
import { RotatingWord } from "@/components/rotating-word";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-name">
      <DotGrid className="hero-dot-grid" />
      <div className="hero-content">
        <p className="hero-kicker">Turning ideas into products that <RotatingWord words={["inspire.", "excite.", "work."]} startDelay={6000} /></p>
        <h1 id="hero-name">
          <span>Syed</span>
          <span>Israruddin.</span>
        </h1>
        <p className="hero-specialisms">
          <span>UX/UI Design · Product Thinking</span>
          <span className="hero-specialisms__desktop-separator" aria-hidden="true"> · </span>
          <span>Design Engineering</span>
        </p>
      </div>
    </section>
  );
}
