import Image from "next/image";
import Grainient from "@/components/grainient";

export function WorkGrid() {
  return (
    <section className="work-grid" aria-label="Selected projects">
      <article className="project-card project-card--omawe">
        <div className="project-card__grainient" aria-hidden="true">
          <Grainient color1="#cccccc" color2="#7FD4CB" color3="#085149" timeSpeed={1} colorBalance={0.0} warpStrength={3.2} warpFrequency={5.0} warpSpeed={2.0} warpAmplitude={50.0} blendAngle={6} blendSoftness={0.05} rotationAmount={800} noiseScale={2.0} grainAmount={0.1} grainScale={2.0} grainAnimated={false} contrast={1.5} gamma={1.0} saturation={1.1} centerX={0.0} centerY={0.0} zoom={1.3} />
        </div>
        <div className="project-card__mockup" aria-hidden="true">
          <Image
            src="/assets/omawe-hifi-mockups.png"
            alt=""
            width={823}
            height={1408}
            sizes="(max-width: 700px) calc(100vw - 68px), 302px"
            priority
          />
        </div>
        <div className="project-card__content">
          <h3>Transforming passive location sharing into active trip awareness.</h3>
          <p>
            Group travel means constant map checks and “Where are you?” messages. <em>Omawe</em> uses Live Activities to make everyone’s progress and ETA visible at a glance.
          </p>
          <Image
            src="/assets/app-store-badge.svg"
            alt="Download Omawe on the App Store"
            width={120}
            height={40}
            className="project-card__app-store-badge"
          />
        </div>
      </article>
    </section>
  );
}
