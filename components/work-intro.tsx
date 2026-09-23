import Image from "next/image";

export function WorkIntro() {
  return (
    <section className="work-intro" id="work" aria-labelledby="work-title">
      <h2 id="work-title" className="work-title" aria-label="Selected works">
        <Image
          src="/assets/selected-works-typography.png"
          alt=""
          width={1552}
          height={346}
          className="work-title-image"
        />
      </h2>
      <p>
        Four projects shaped by curiosity, collaboration,
        <br />
        and a commitment to designing with intention.
      </p>
    </section>
  );
}
