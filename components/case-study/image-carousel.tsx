"use client";

import { useEffect, useRef, useState } from "react";
import { CaseStudyImageViewer } from "./case-study-image-viewer";

type ImageCarouselProps = {
  initialIndex?: number;
  projectName: string;
  slides: Array<{
    alt: string;
    label: string;
    src?: string;
  }>;
};

export function ImageCarousel({ initialIndex = 0, projectName, slides }: ImageCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const gallerySlides = slides.filter(
    (slide): slide is { alt: string; label: string; src: string } => slide.src !== undefined,
  );

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
    const centerInitialSlide = () => scrollToSlide(initialIndex, "auto");
    const frame = requestAnimationFrame(centerInitialSlide);
    window.addEventListener("resize", centerInitialSlide);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", centerInitialSlide);
    };
  }, [initialIndex]);

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
          {slides.map((slide, index) => (
            <div
              className="image-carousel__slide"
              key={slide.label}
              ref={(element) => {
                slideRefs.current[index] = element;
              }}
            >
              {slide.src && (
                <CaseStudyImageViewer
                  alt={slide.alt ?? ""}
                  className="image-carousel__slide-viewer"
                  fill
                  gallery={gallerySlides.map(({ alt, src }) => ({ alt, src }))}
                  galleryIndex={gallerySlides.findIndex(({ src }) => src === slide.src)}
                  height={480}
                  imageClassName="image-carousel__slide-image"
                  preload={index === 1}
                  sizes="(max-width: 740px) calc(100vw - 48px), 740px"
                  src={slide.src}
                  width={740}
                />
              )}
              {!slide.src && (
                <div
                  aria-label={slide.alt}
                  className="image-carousel__placeholder"
                  role="img"
                />
              )}
            </div>
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
          disabled={activeIndex === slides.length - 1}
          onClick={() => scrollToSlide(activeIndex + 1)}
          type="button"
        >
          →
        </button>
      </div>
    </section>
  );
}
