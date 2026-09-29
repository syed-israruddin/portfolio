"use client";

import { useEffect, useRef, useState } from "react";

type ImageCarouselProps = {
  projectName: string;
};

const placeholderSlides = ["First", "Second", "Third"];

export function ImageCarousel({ projectName }: ImageCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(1);

  const scrollToSlide = (index: number, behavior: ScrollBehavior = "smooth") => {
    const viewport = viewportRef.current;
    const slide = slideRefs.current[index];
    if (!viewport || !slide) return;

    viewport.scrollTo({
      left: slide.offsetLeft - (viewport.clientWidth - slide.clientWidth) / 2,
      behavior,
    });
    setActiveIndex(index);
  };

  useEffect(() => {
    const centerSecondSlide = () => scrollToSlide(1, "auto");
    const frame = requestAnimationFrame(centerSecondSlide);
    window.addEventListener("resize", centerSecondSlide);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", centerSecondSlide);
    };
  }, []);

  const updateActiveSlide = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    const nearestIndex = slideRefs.current.reduce((closestIndex, slide, index) => {
      if (!slide) return closestIndex;

      const closest = slideRefs.current[closestIndex];
      if (!closest) return index;

      const distance = Math.abs(slide.offsetLeft + slide.clientWidth / 2 - viewportCenter);
      const closestDistance = Math.abs(
        closest.offsetLeft + closest.clientWidth / 2 - viewportCenter,
      );

      return distance < closestDistance ? index : closestIndex;
    }, 0);

    setActiveIndex(nearestIndex);
  };

  return (
    <section className="image-carousel" aria-label={`${projectName} image carousel`}>
      <div
        className="image-carousel__viewport"
        onScroll={updateActiveSlide}
        ref={viewportRef}
      >
        <div className="image-carousel__track">
          {placeholderSlides.map((label, index) => (
            <div
              aria-label={`${label} ${projectName} image placeholder`}
              className="image-carousel__slide"
              key={label}
              ref={(element) => {
                slideRefs.current[index] = element;
              }}
              role="group"
            />
          ))}
        </div>
      </div>
      <div className="image-carousel__controls" aria-label="Carousel controls">
        <button
          aria-label="Show previous image"
          disabled={activeIndex === 0}
          onClick={() => scrollToSlide(activeIndex - 1)}
          type="button"
        >
          ←
        </button>
        <button
          aria-label="Show next image"
          disabled={activeIndex === placeholderSlides.length - 1}
          onClick={() => scrollToSlide(activeIndex + 1)}
          type="button"
        >
          →
        </button>
      </div>
    </section>
  );
}
