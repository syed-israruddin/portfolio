export type ProjectOverview = {
  heading: string;
  description: string;
  mockup: { src: string; width: number; height: number; offsetX?: number; offsetY: number; renderWidth?: number };
  hoverColors: [string, string, string];
  hoverTextColor?: string;
  italicText?: string;
  reversed?: boolean;
  appStoreBadge?: { alt: string; href: string };
};

export type Project = {
  slug: string;
  name: string;
  caseStudy: {
    metaTitle: string;
    metaDescription: string;
  };
  overview?: ProjectOverview;
};

export type ProjectWithOverview = Project & { overview: ProjectOverview };

export const projects: Project[] = [
  {
    slug: "omawe",
    name: "Omawe",
    caseStudy: {
      metaTitle: "Omawe Case Study — Syed Israruddin",
      metaDescription: "A product design case study for Omawe, a group trip awareness app.",
    },
    overview: {
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
  },
  {
    slug: "betterboxd",
    name: "Betterboxd",
    caseStudy: {
      metaTitle: "Betterboxd Case Study — Syed Israruddin",
      metaDescription: "A product design case study for Betterboxd, a reflective journaling space for film lovers.",
    },
    overview: {
      heading: "Rethinking how film lovers remember the movies that move them (or don’t).",
      description: "While movie apps focus on ratings and reviews, Betterboxd creates a more personal space for film lovers to reflect through guided journaling.",
      mockup: { src: "/assets/betterboxd-hifi-mockups.png", width: 1718, height: 2545, offsetY: -49 },
      hoverColors: ["#525b70", "#141A27", "#AC8361"],
      hoverTextColor: "#ffffff",
      italicText: "Betterboxd",
      reversed: true,
    },
  },
  {
    slug: "jared",
    name: "Jared",
    caseStudy: {
      metaTitle: "Jared Case Study — Syed Israruddin",
      metaDescription: "A product design case study for Jared, an AI-assisted reading companion.",
    },
    overview: {
      heading: "Helping readers pick up exactly where they left off.",
      description: "Returning to a book after time away can feel overwhelming. Inspired by television’s “Previously on...” format, Jared uses AI-generated, spoiler-free recaps to help readers re-engage with their stories.",
      mockup: { src: "/assets/jared-hifi-mockups.png", width: 1129, height: 1564, offsetX: -4, offsetY: 11, renderWidth: 306 },
      hoverColors: ["#791821", "#40291b", "#3d0e13"],
      hoverTextColor: "#ffffff",
      italicText: "Jared",
    },
  },
  {
    slug: "pastcast",
    name: "PastCast",
    caseStudy: {
      metaTitle: "PastCast Case Study — Syed Israruddin",
      metaDescription: "A product design case study for PastCast, a nostalgic weather experience.",
    },
    overview: {
      heading: "Reimagining the weather app as a tool for nostalgia, reflection and storytelling.",
      description: "Most weather apps look ahead. PastCast looks back, letting users revisit historical weather and reconnect with meaningful moments through a nostalgic, personal experience.",
      mockup: { src: "/assets/pastcast-hifi-mockup.png", width: 1591, height: 2161, offsetY: -38 },
      hoverColors: ["#5496ff", "#83b0f8", "#f5f5f5"],
      hoverTextColor: "#000000",
      italicText: "PastCast",
      reversed: true,
    },
  },
  {
    slug: "cook-or-cooked",
    name: "Cook or Cooked",
    caseStudy: {
      metaTitle: "Cook or Cooked Case Study — Syed Israruddin",
      metaDescription: "A Cook or Cooked product design case study by Syed Israruddin.",
    },
  },
];

export const overviewProjects: ProjectWithOverview[] = projects.filter(
  (project): project is ProjectWithOverview => project.overview !== undefined,
);

export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
