"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./scroll-reveal.css";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: string;
  className?: string;
  baseOpacity?: number;
  enableBlur?: boolean;
  blurStrength?: number;
  baseRotation?: number;
  desktopBreakAfter?: string[];
}

export function ScrollReveal({
  children,
  className = "",
  baseOpacity = 0,
  enableBlur = true,
  blurStrength = 8,
  baseRotation = 0,
  desktopBreakAfter = [],
}: ScrollRevealProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const breakWords = useMemo(() => new Set(desktopBreakAfter), [desktopBreakAfter]);

  const words = useMemo(() => children.split(/(\s+)/).map((token, index) => {
    if (/^\s+$/.test(token)) return token;

    const shouldBreak = breakWords.has(token.replace(/[.,!?]$/, ""));
    return (
      <span key={`${token}-${index}`}>
        <span className="scroll-reveal-word">{token}</span>
        {shouldBreak && <br className="desktop-line-break" />}
      </span>
    );
  }), [breakWords, children]);

  useLayoutEffect(() => {
    const element = textRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const wordElements = gsap.utils.toArray<HTMLElement>(".scroll-reveal-word", element);
      const triggerOptions = {
        trigger: element,
        start: "top 90%",
        end: "bottom 20%",
        scrub: 0.5,
      };

      gsap.fromTo(
        element,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        { rotate: 0, ease: "none", scrollTrigger: { ...triggerOptions, start: "top bottom" } },
      );

      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, filter: enableBlur ? `blur(${blurStrength}px)` : "blur(0px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.08,
          ease: "none",
          scrollTrigger: triggerOptions,
        },
      );
    }, element);

    return () => context.revert();
  }, [baseOpacity, baseRotation, blurStrength, enableBlur]);

  return <p ref={textRef} className={`scroll-reveal ${className}`}>{words}</p>;
}
