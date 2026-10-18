"use client";

import Image from "next/image";
import { useScrollReveal } from "@/components/use-scroll-reveal";

export function WorkIntro() {
  const { isVisible, ref } = useScrollReveal();

  return (
    <section ref={ref} className={`work-intro scroll-reveal${isVisible ? " scroll-reveal--visible" : ""}`} id="work" aria-labelledby="work-title">
      <h2 id="work-title" className="work-title scroll-reveal__text" aria-label="Selected works">
        <Image
          src="/assets/selected-works-typography.png"
          alt=""
          width={1552}
          height={346}
          className="work-title-image"
        />
      </h2>
      <p className="scroll-reveal__text">
        Projects shaped by curiosity, collaboration,
        <br />
        and a commitment to designing with intention.
      </p>
    </section>
  );
}
