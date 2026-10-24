"use client";

import { type PointerEvent, useRef } from "react";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const updateGridFocus = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;

    const hero = heroRef.current;
    if (!hero) return;

    const { left, top } = hero.getBoundingClientRect();
    hero.style.setProperty("--hero-grid-x", `${event.clientX - left}px`);
    hero.style.setProperty("--hero-grid-y", `${event.clientY - top}px`);
    hero.style.setProperty("--hero-grid-opacity", "1");
  };

  return (
    <section
      ref={heroRef}
      className="hero"
      aria-labelledby="hero-name"
      onPointerMove={updateGridFocus}
      onPointerLeave={() => heroRef.current?.style.setProperty("--hero-grid-opacity", "0")}
    >
      <div className="hero-content">
        <h1 id="hero-name">
          <span>Syed</span>
          <span>Israruddin</span>
        </h1>
        <p className="hero-specialisms">
          <span>User Experience Design • Design Engineering</span>
        </p>
      </div>
    </section>
  );
}
