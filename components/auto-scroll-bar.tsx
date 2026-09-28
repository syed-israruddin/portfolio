"use client";

import { Fragment } from "react";
import { useRef } from "react";

const disciplines = [
  "Prototyping",
  "Interface Design",
  "User Research",
  "Visual Design",
  "Design Systems",
  "Product Thinking",
];

function DisciplineSequence({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="auto-scroll-bar__sequence" aria-hidden={hidden || undefined}>
      {disciplines.map((discipline) => (
        <Fragment key={discipline}>
          <span>{discipline}</span>
          <span className="auto-scroll-bar__separator" aria-hidden="true">
            •
          </span>
        </Fragment>
      ))}
    </div>
  );
}

export function AutoScrollBar() {
  const trackRef = useRef<HTMLDivElement>(null);

  const setScrollSpeed = (playbackRate: number) => {
    const animation = trackRef.current?.getAnimations()[0];

    if (animation) {
      animation.playbackRate = playbackRate;
    }
  };

  return (
    <section
      className="auto-scroll-bar"
      aria-label="Design disciplines"
      onPointerEnter={() => setScrollSpeed(0.4)}
      onPointerLeave={() => setScrollSpeed(1)}
    >
      <div ref={trackRef} className="auto-scroll-bar__track">
        <DisciplineSequence />
        <DisciplineSequence hidden />
      </div>
    </section>
  );
}
