import DotGrid from "@/components/dot-grid";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-name">
      <DotGrid className="hero-dot-grid" />
      <div className="hero-content">
        <p className="hero-kicker">Turning ideas into products that <strong>Inspire.</strong></p>
        <h1 id="hero-name">
          <span>Syed</span>
          <span>Israruddin.</span>
        </h1>
        <p className="hero-specialisms">UX/UI Design · Product Thinking · Design Engineering</p>
      </div>
    </section>
  );
}
