"use client";

import Image from "next/image";
import { useScrollReveal } from "@/components/use-scroll-reveal";

export function AboutIntro() {
  const { isVisible, ref } = useScrollReveal();

  return (
    <section ref={ref} className={`about-intro scroll-reveal${isVisible ? " scroll-reveal--visible" : ""}`} id="about-me" aria-labelledby="about-me-title">
      <h2 id="about-me-title" className="about-title scroll-reveal__text" aria-label="About me">
        <Image
          src="/assets/about-me-typographic-header.png"
          alt=""
          width={836}
          height={336}
          className="about-title-image"
        />
      </h2>
      <p className="scroll-reveal__text">A little about myself</p>
    </section>
  );
}
