import { ScrollReveal } from "@/components/scroll-reveal";

export function Introduction() {
  return (
    <section className="introduction" id="about" aria-labelledby="what-i-do">
      <p className="eyebrow" id="what-i-do">What I do</p>
      <div className="introduction-copy">
        <ScrollReveal
          desktopBreakAfter={["by", "in"]}
          baseOpacity={0}
          baseRotation={0}
          blurStrength={8}
        >
          I design thoughtful digital experiences by uncovering overlooked opportunities in everyday interactions.
        </ScrollReveal>
        <ScrollReveal
          desktopBreakAfter={["careful", "products", "genuinely"]}
          baseOpacity={0}
          baseRotation={0}
          blurStrength={8}
        >
          Through research, empathy and careful iteration, I transform insights into products that feel intuitive, purposeful and genuinely enjoyable to use.
        </ScrollReveal>
      </div>
    </section>
  );
}
