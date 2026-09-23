import Image from "next/image";

export function AboutInfo() {
  return (
    <section className="about-info" aria-label="About Syed Israruddin">
      <div className="about-info__copy">
        <p>I’ve been drawn to design for as long as I can remember. When I was seven, I got my first computer and opened Microsoft Word, not to write anything in particular, but to try every font I could find. I was fascinated by how much a few words could change simply through their presentation.</p>
        <p>Today, I’m a product designer with a background in graphic design and Software Engineering. I care deeply about understanding the people I’m designing for, then creating experiences that feel intuitive, considered, and, where appropriate, a little unexpected. My technical background helps me understand how products are built and design with real constraints, while my visual background has taught me how to push typography, composition, hierarchy, and the small details that make an experience feel more human.</p>
        <p>I’m still early in my career, but that’s part of what makes it exciting. I’m constantly exploring new technologies, interactions, animations, and ways of making digital experiences more expressive. I love getting completely absorbed in a prototype and watching an idea in my head slowly become something real. And seeing people actually use something I’ve designed is still the best part.</p>
      </div>
      <div className="about-info__signoff">
        <Image src="/assets/portfolio-headshot.png" alt="Syed Israruddin at the coast" width={1017} height={738} sizes="339px" priority />
        <p>Syed.</p>
      </div>
    </section>
  );
}
