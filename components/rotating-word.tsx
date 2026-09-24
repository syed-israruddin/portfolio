"use client";

import { useEffect, useState } from "react";

type RotatingWordProps = {
  words: string[];
  interval?: number;
  startDelay?: number;
};

export function RotatingWord({ words, interval = 3000, startDelay = 0 }: RotatingWordProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    const startTimer = window.setTimeout(() => {
      timer = window.setInterval(() => {
        setIsFlipping(true);
        window.setTimeout(() => {
          setWordIndex((currentIndex) => (currentIndex + 1) % words.length);
          setIsFlipping(false);
        }, 250);
      }, interval);
    }, startDelay);

    return () => {
      window.clearTimeout(startTimer);
      if (timer) window.clearInterval(timer);
    };
  }, [interval, startDelay, words.length]);

  return (
    <strong className="hero-rotating-word">
      <span className={isFlipping ? "hero-rotating-word__text hero-rotating-word__text--flipping" : "hero-rotating-word__text"}>{words[wordIndex]}</span>
    </strong>
  );
}
