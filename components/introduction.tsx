"use client";

import { useEffect, useRef, useState } from "react";

const introductionParagraphs = [
  [
    "I design thoughtful digital experiences by",
    "uncovering overlooked opportunities in",
    "everyday interactions.",
  ],
  [
    "Through research, empathy and careful",
    "iteration, I transform insights into products",
    "that feel intuitive, purposeful and genuinely",
    "enjoyable to use.",
  ],
];

function IntroductionContent({ cursorCopy = false }: { cursorCopy?: boolean }) {
  let lineIndex = 0;

  return (
    <>
      <p className="eyebrow" id={cursorCopy ? undefined : "what-i-do"}>What I do</p>
      <div className="introduction-copy">
        {introductionParagraphs.map((paragraph, paragraphIndex) => (
          <p key={paragraphIndex}>
            {paragraph.map((line) => {
              const currentLineIndex = lineIndex++;

              return (
                <span
                  className="introduction-copy__line"
                  key={line}
                  style={{ animationDelay: `${currentLineIndex * 160}ms` }}
                >
                  {line}
                </span>
              );
            })}
          </p>
        ))}
      </div>
    </>
  );
}

export function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCursorActive, setIsCursorActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.7 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const updateCursorPosition = (x: number, y: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const { left, top } = section.getBoundingClientRect();
    section.style.setProperty("--introduction-cursor-x", `${x}px`);
    section.style.setProperty("--introduction-cursor-y", `${y}px`);
    section.style.setProperty("--introduction-cursor-local-x", `${x - left}px`);
    section.style.setProperty("--introduction-cursor-local-y", `${y - top}px`);
  };

  return (
    <section
      ref={sectionRef}
      className={`introduction${isRevealed ? " introduction--revealed" : ""}${isCursorActive ? " introduction--cursor-active" : ""}`}
      id="about"
      aria-labelledby="what-i-do"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        updateCursorPosition(event.clientX, event.clientY);
        setIsCursorActive(true);
      }}
      onPointerMove={(event) => {
        if (event.pointerType === "mouse") {
          updateCursorPosition(event.clientX, event.clientY);
        }
      }}
      onPointerLeave={() => setIsCursorActive(false)}
      >
      <div className="introduction__content">
        <IntroductionContent />
      </div>
      <span className="introduction__cursor" aria-hidden="true" />
      <div className="introduction__cursor-copy" aria-hidden="true">
        <div className="introduction__content">
          <IntroductionContent cursorCopy />
        </div>
      </div>
    </section>
  );
}
