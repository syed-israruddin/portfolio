import Image from "next/image";
import Link from "next/link";

type ProjectCaseStudyPreviewProps = {
  ctaLabel?: string;
  description: string;
  href: string;
  image: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
  imagePosition?: "left" | "right";
  priority?: boolean;
  tags: readonly string[];
  title: string;
};

export function ProjectCaseStudyPreview({
  ctaLabel = "View Case Study",
  description,
  href,
  image,
  imagePosition = "left",
  priority = false,
  tags,
  title,
}: ProjectCaseStudyPreviewProps) {
  const titleId = `${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}-preview-title`;

  return (
    <section className={`work-desktop-preview${imagePosition === "right" ? " work-desktop-preview--image-right" : ""}`} aria-labelledby={titleId}>
      <div className="work-desktop-preview__image">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 1200px) 44vw, 520px"
          priority={priority}
        />
      </div>
      <div className="work-desktop-preview__content">
        <h3 id={titleId}>{title}</h3>
        <ul aria-label={`${title} disciplines`}>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <p>{description}</p>
        <Link href={href}>{ctaLabel}</Link>
      </div>
    </section>
  );
}
