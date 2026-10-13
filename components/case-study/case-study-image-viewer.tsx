"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CaseStudyImageViewerProps = {
  alt: string;
  caption?: string;
  className?: string;
  fill?: boolean;
  gallery?: Array<{ alt: string; src: string }>;
  galleryIndex?: number;
  height: number;
  imageClassName?: string;
  preload?: boolean;
  sizes: string;
  src: string;
  width: number;
};

export function CaseStudyImageViewer({
  alt,
  caption,
  className = "",
  fill = false,
  gallery,
  galleryIndex = 0,
  height,
  imageClassName,
  preload = false,
  sizes,
  src,
  width,
}: CaseStudyImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(galleryIndex);
  const openerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const activeImage = gallery?.[activeGalleryIndex] ?? { alt, src };

  const close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const opener = openerRef.current;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      opener?.focus();
    };
  }, [isOpen]);

  const image = fill ? (
    <Image
      alt={alt}
      className={imageClassName}
      fill
      preload={preload}
      sizes={sizes}
      src={src}
    />
  ) : (
    <Image
      alt={alt}
      className={imageClassName}
      height={height}
      preload={preload}
      sizes={sizes}
      src={src}
      width={width}
    />
  );

  return (
    <>
      <button
        aria-label={`Open enlarged view of ${alt}`}
        className={`case-study-image-viewer__trigger ${className}`.trim()}
        onClick={() => {
          setActiveGalleryIndex(galleryIndex);
          setIsOpen(true);
        }}
        ref={openerRef}
        type="button"
      >
        {image}
      </button>

      {isOpen && (
        <div
          aria-label={`Image viewer: ${activeImage.alt}`}
          aria-modal="true"
          className="case-study-image-viewer"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          onTouchStart={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          ref={dialogRef}
          role="dialog"
          tabIndex={-1}
        >
          {gallery && gallery.length > 1 && (
            <>
              <button
                aria-label="Show previous image"
                className="case-study-image-viewer__navigation case-study-image-viewer__navigation--previous"
                disabled={activeGalleryIndex === 0}
                onClick={() => setActiveGalleryIndex((index) => index - 1)}
                type="button"
              >
                ←
              </button>
              <button
                aria-label="Show next image"
                className="case-study-image-viewer__navigation case-study-image-viewer__navigation--next"
                disabled={activeGalleryIndex === gallery.length - 1}
                onClick={() => setActiveGalleryIndex((index) => index + 1)}
                type="button"
              >
                →
              </button>
            </>
          )}
          <div
            className="case-study-image-viewer__viewport"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
            onTouchStart={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <figure className="case-study-image-viewer__figure">
              <Image
                alt={activeImage.alt}
                className="case-study-image-viewer__image"
                height={height}
                sizes="100vw"
                src={activeImage.src}
                width={width}
              />
              {caption && <figcaption>{caption}</figcaption>}
            </figure>
          </div>
        </div>
      )}
    </>
  );
}
