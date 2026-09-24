"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Grainient from "@/components/grainient";
import { overviewProjects, type ProjectWithOverview } from "@/content/projects";

const grainientSettings = {
  timeSpeed: 1,
  colorBalance: 0,
  warpStrength: 3.2,
  warpFrequency: 5,
  warpSpeed: 2,
  warpAmplitude: 50,
  blendAngle: 6,
  blendSoftness: 0.05,
  rotationAmount: 800,
  noiseScale: 2,
  grainAmount: 0.1,
  grainScale: 2,
  grainAnimated: false,
  contrast: 1.5,
  gamma: 1,
  saturation: 1.1,
  centerX: 0,
  centerY: 0,
  zoom: 1.3,
} as const;

function ProjectOverviewCard({
  project,
  projectIndex,
  isActive,
  cardRef,
}: {
  project: ProjectWithOverview;
  projectIndex: number;
  isActive: boolean;
  cardRef: (card: HTMLElement | null) => void;
}) {
  const { overview } = project;
  const [color1, color2, color3] = overview.hoverColors;
  const cardStyle = { "--hover-text-color": overview.hoverTextColor ?? "var(--ink)" } as CSSProperties;
  const mockupStyle = {
    "--mockup-offset-x": `${overview.mockup.offsetX ?? 0}px`,
    "--mockup-offset-y": `${overview.mockup.offsetY}px`,
    "--mockup-render-width": overview.mockup.renderWidth ? `${overview.mockup.renderWidth}px` : "100%",
  } as CSSProperties;
  const descriptionSegments = overview.italicText ? overview.description.split(overview.italicText) : [overview.description];

  return (
    <article ref={cardRef} data-project-index={projectIndex} className={`project-card project-card--${project.slug}${overview.reversed ? " project-card--reversed" : ""}${isActive ? " project-card--active" : ""}`} style={cardStyle} aria-label={`${project.name} project overview`}>
      <div className="project-card__grainient" aria-hidden="true">
        <Grainient color1={color1} color2={color2} color3={color3} {...grainientSettings} />
      </div>
      <Link className="project-card__case-study-link" href={`/work/${project.slug}`} aria-label={`View the ${project.name} case study`} />
      <div className="project-card__mockup" style={mockupStyle} aria-hidden="true">
        <Image src={overview.mockup.src} alt="" width={overview.mockup.width} height={overview.mockup.height} sizes="(max-width: 700px) calc(100vw - 68px), 302px" priority={project.name === "Omawe"} />
      </div>
      <div className="project-card__content">
        <h3>{overview.heading}</h3>
        <p>
          {descriptionSegments.map((segment, index) => (
            <span key={`${segment}-${index}`}>
              {segment}
              {index < descriptionSegments.length - 1 && <em>{overview.italicText}</em>}
            </span>
          ))}
        </p>
        {overview.appStoreBadge && (
          <a className="project-card__app-store-link" href={overview.appStoreBadge.href} target="_blank" rel="noreferrer" aria-label={overview.appStoreBadge.alt}>
            <Image src="/assets/app-store-badge.svg" alt="" width={120} height={40} className="project-card__app-store-badge" />
          </a>
        )}
      </div>
    </article>
  );
}

export function WorkGrid() {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 700px)");
    const visibleCards = new Map<number, number>();
    let observer: IntersectionObserver | undefined;

    const selectMostVisibleCard = () => {
      const activeCard = [...visibleCards.entries()].sort(([, firstRatio], [, secondRatio]) => secondRatio - firstRatio)[0];
      setActiveProjectIndex(activeCard?.[0] ?? null);
    };

    const observeCards = () => {
      observer?.disconnect();
      visibleCards.clear();
      setActiveProjectIndex(null);

      if (!mobileQuery.matches) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = Number((entry.target as HTMLElement).dataset.projectIndex);
            if (entry.isIntersecting) {
              visibleCards.set(index, entry.intersectionRatio);
            } else {
              visibleCards.delete(index);
            }
          });
          selectMostVisibleCard();
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );

      cardRefs.current.forEach((card) => card && observer?.observe(card));
    };

    observeCards();
    mobileQuery.addEventListener("change", observeCards);

    return () => {
      observer?.disconnect();
      mobileQuery.removeEventListener("change", observeCards);
    };
  }, []);

  return (
    <section className="work-grid" aria-label="Selected projects">
      {overviewProjects.map((project, index) => (
        <ProjectOverviewCard
          key={project.name}
          project={project}
          isActive={activeProjectIndex === index}
          cardRef={(card) => {
            cardRefs.current[index] = card;
          }}
          projectIndex={index}
        />
      ))}
    </section>
  );
}
