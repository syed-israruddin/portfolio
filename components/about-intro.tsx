import Image from "next/image";

export function AboutIntro() {
  return (
    <section className="about-intro" aria-labelledby="about-me-title">
      <h2 id="about-me-title" className="about-title" aria-label="About me">
        <Image
          src="/assets/about-me-typographic-header.png"
          alt=""
          width={836}
          height={336}
          className="about-title-image"
        />
      </h2>
      <p>A little about myself</p>
    </section>
  );
}
