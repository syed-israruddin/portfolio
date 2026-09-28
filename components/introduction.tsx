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

export function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

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

  let lineIndex = 0;

  return (
    <section
      ref={sectionRef}
      className={`introduction${isRevealed ? " introduction--revealed" : ""}`}
      id="about"
      aria-labelledby="what-i-do"
    >
      <p className="eyebrow" id="what-i-do">What I do</p>
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
    </section>
  );
}
