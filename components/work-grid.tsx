import type { CSSProperties } from "react";
import Image from "next/image";
import Grainient from "@/components/grainient";

type ProjectOverview = {
  name: string;
  heading: string;
  description: string;
  mockup: { src: string; width: number; height: number; offsetX?: number; offsetY: number; renderWidth?: number };
  hoverColors: [string, string, string];
  hoverTextColor?: string;
  italicText?: string;
  reversed?: boolean;
  appStoreBadge?: { alt: string; href: string };
};

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

const projects: ProjectOverview[] = [
  {
    name: "Omawe",
    heading: "Transforming passive location sharing into active trip awareness.",
    description: "Group travel means constant map checks and “Where are you?” messages. Omawe uses Live Activities to make everyone’s progress and ETA visible at a glance.",
    mockup: { src: "/assets/omawe-hifi-mockups.png", width: 823, height: 1408, offsetY: -36 },
    hoverColors: ["#cccccc", "#7FD4CB", "#085149"],
    italicText: "Omawe",
    appStoreBadge: {
      alt: "Download Omawe on the App Store",
      href: "https://apps.apple.com/id/app/omawe-group-trip-tracker/id6788641544?itscg=30200&itsct=apps_box_link&mttnsubad=6788641544",
    },
  },
  {
    name: "Betterboxd",
    heading: "Rethinking how film lovers remember the movies that move them (or don’t).",
    description: "While movie apps focus on ratings and reviews, Betterboxd creates a more personal space for film lovers to reflect through guided journaling.",
    mockup: { src: "/assets/betterboxd-hifi-mockups.png", width: 1718, height: 2545, offsetY: -49 },
    hoverColors: ["#525b70", "#141A27", "#AC8361"],
    hoverTextColor: "#ffffff",
    italicText: "Betterboxd",
    reversed: true,
  },
  {
    name: "Jared",
    heading: "Helping readers pick up exactly where they left off.",
    description: "Returning to a book after time away can feel overwhelming. Inspired by television’s “Previously on...” format, Jared uses AI-generated, spoiler-free recaps to help readers re-engage with their stories.",
    mockup: { src: "/assets/jared-hifi-mockups.png", width: 1129, height: 1564, offsetX: -4, offsetY: 11, renderWidth: 306 },
    hoverColors: ["#791821", "#40291b", "#3d0e13"],
    hoverTextColor: "#ffffff",
    italicText: "Jared",
  },
  {
    name: "PastCast",
    heading: "Reimagining the weather app as a tool for nostalgia, reflection and storytelling.",
    description: "Most weather apps look ahead. PastCast looks back, letting users revisit historical weather and reconnect with meaningful moments through a nostalgic, personal experience.",
    mockup: { src: "/assets/pastcast-hifi-mockup.png", width: 1591, height: 2161, offsetY: -38 },
    hoverColors: ["#5496ff", "#83b0f8", "#f5f5f5"],
    hoverTextColor: "#000000",
    italicText: "PastCast",
    reversed: true,
  },
];

function ProjectOverviewCard({ project }: { project: ProjectOverview }) {
  const [color1, color2, color3] = project.hoverColors;
  const cardStyle = { "--hover-text-color": project.hoverTextColor ?? "var(--ink)" } as CSSProperties;
  const mockupStyle = {
    "--mockup-offset-x": `${project.mockup.offsetX ?? 0}px`,
    "--mockup-offset-y": `${project.mockup.offsetY}px`,
    "--mockup-render-width": project.mockup.renderWidth ? `${project.mockup.renderWidth}px` : "100%",
  } as CSSProperties;
  const descriptionSegments = project.italicText ? project.description.split(project.italicText) : [project.description];

  return (
    <article className={`project-card project-card--${project.name.toLowerCase()}${project.reversed ? " project-card--reversed" : ""}`} style={cardStyle} aria-label={`${project.name} project overview`}>
      <div className="project-card__grainient" aria-hidden="true">
        <Grainient color1={color1} color2={color2} color3={color3} {...grainientSettings} />
      </div>
      <div className="project-card__mockup" style={mockupStyle} aria-hidden="true">
        <Image src={project.mockup.src} alt="" width={project.mockup.width} height={project.mockup.height} sizes="(max-width: 700px) calc(100vw - 68px), 302px" priority={project.name === "Omawe"} />
      </div>
      <div className="project-card__content">
        <h3>{project.heading}</h3>
        <p>
          {descriptionSegments.map((segment, index) => (
            <span key={`${segment}-${index}`}>
              {segment}
              {index < descriptionSegments.length - 1 && <em>{project.italicText}</em>}
            </span>
          ))}
        </p>
        {project.appStoreBadge && (
          <a href={project.appStoreBadge.href} target="_blank" rel="noreferrer" aria-label={project.appStoreBadge.alt}>
            <Image src="/assets/app-store-badge.svg" alt="" width={120} height={40} className="project-card__app-store-badge" />
          </a>
        )}
      </div>
    </article>
  );
}

export function WorkGrid() {
  return <section className="work-grid" aria-label="Selected projects">{projects.map((project) => <ProjectOverviewCard key={project.name} project={project} />)}</section>;
}
