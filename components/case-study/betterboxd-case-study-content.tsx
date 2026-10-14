import { CaseStudyImageViewer } from "./case-study-image-viewer";

function CaseStudyFigure({
  alt,
  caption,
  src,
}: {
  alt: string;
  caption: string;
  src: string;
}) {
  return (
    <figure className="case-study-figure">
      <CaseStudyImageViewer
        alt={alt}
        caption={caption}
        className="case-study-image"
        height={1464}
        sizes="(max-width: 788px) calc(100vw - 48px), 740px"
        src={src}
        width={2232}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function BetterboxdCaseStudyContent() {
  return (
    <div className="case-study-sections">
      <section className="case-study-section case-study-section--accordion">
        <div className="case-study-section__content">
          <div className="case-study-accordion">
            <details className="case-study-accordion__item" open>
              <summary>
                <h2 id="betterboxd-journaling-experience">The Main Journaling Experience</h2>
                <span aria-hidden="true" className="case-study-accordion__chevron">›</span>
              </summary>
              <div
                className="case-study-accordion__panel case-study-section__content--detailed"
                aria-labelledby="betterboxd-journaling-experience"
              >
          <CaseStudyFigure
            alt="Betterboxd journalling user flow across all screens"
            caption="Journalling User Flow - All Screens"
            src="/assets/betterboxd-journalling-user-flow-all-screens.jpg"
          />
          <article className="case-study-subsection">
            <h3>Finding the Right Balance</h3>
            <p>
              The central challenge in designing Betterboxd&apos;s journaling experience was
              balancing meaningful reflection with the user&apos;s time, attention, and autonomy.
            </p>
            <p>
              We wanted guiding prompts to serve as starting points, rather than questions users
              felt obligated to answer. Too little structure could leave users unsure where to
              begin, while too much risked turning a personal, reflective experience into
              something that felt like homework.
            </p>
            <p>
              Our goal was to encourage thoughtful engagement without demanding it, giving users
              the freedom to reflect as deeply or casually as they wished.
            </p>
          </article>

          <article className="case-study-subsection">
            <h3>Structuring the Reflection</h3>
            <p>
              Through our research, we identified four aspects of filmmaking to structure the
              experience around:
            </p>
            <ul>
              <li>Story &amp; Screenplay</li>
              <li>Cinematography</li>
              <li>Acting &amp; Performances</li>
              <li>Sound &amp; Music</li>
            </ul>
            <p>
              Rather than presenting multiple questions per category, we chose to offer one
              guiding prompt for each. This gave users a framework for exploring different
              dimensions of a film, without prescribing how much they needed to share.
            </p>
            <p>
              The intention wasn&apos;t to encourage longer responses, but to make meaningful
              reflection approachable, regardless of the time or energy users wanted to invest.
            </p>
          </article>

          <article className="case-study-subsection">
            <h3>Curating the Right Questions</h3>
            <p>
              We also explored how the guiding prompts would be generated. One possibility was
              using AI to generate questions dynamically. While this offered greater variety, we
              were concerned that it could produce prompts that lacked the specificity and
              thoughtfulness we wanted. Instead, we proposed a finite, carefully curated question
              bank, with prompts tailored to each filmmaking category.
            </p>
            <p>
              The Generate Different Question feature would draw from this collection, allowing
              users to find a prompt that resonated with them while preserving the quality and
              consistency of the experience.
            </p>
          </article>

          <article className="case-study-subsection">
            <h3>Capturing Emotion Through Voice</h3>
            <CaseStudyFigure
              caption="A familiar voice messaging interaction adapted for personal journaling."
              alt="Betterboxd voice recording feature exploration"
              src="/assets/betterboxd-voice-recording-feature.jpg"
            />
            <p>
              Inspired by our team&apos;s habit of sending voice notes to friends after watching
              films, we introduced voice recording as an alternative to typing.
            </p>
            <p>
              Beyond providing another way to express thoughts, we were drawn to the idea of
              preserving not just what someone thought about a film, but how they felt in that
              moment. Tone, excitement, and hesitation can convey emotions that written words
              alone may not fully capture, allowing users to revisit their reflections through
              the voice of their past self.
            </p>
            <p>
              For the recording interaction, we drew inspiration from Instagram&apos;s familiar voice
              messaging pattern. Rather than reinventing an established interaction, we wanted
              recording to feel natural and effortless, keeping the focus on expression rather
              than learning a new interface.
            </p>
          </article>

          <article className="case-study-subsection">
            <h3>Making progress visible and navigable</h3>
            <p>
              Although a relatively small element of the interface, the progress indicator
              required considerable exploration. We considered a continuous progress bar, a
              segmented indicator with a numerical counter, and a segmented indicator on its own.
            </p>
            <p>
              The continuous bar felt less effective at communicating progress between individual
              questions. More importantly, we wanted users to be able to navigate directly between
              prompts by tapping the corresponding segment.
            </p>
            <p>
              With a maximum of six segments, this approach gave each step a distinct, tappable
              area.
            </p>
            <p>
              We ultimately removed the numerical counter, as the segments already communicated
              both the user&apos;s current position and the remaining steps.
            </p>
            <p>
              The final design combined progress tracking and direct navigation into a single
              component, without introducing redundant information.
            </p>
          </article>

          <article className="case-study-subsection">
            <h3>Where Do Ratings Belong?</h3>
            <CaseStudyFigure
              caption="Star rating placement exploration."
              alt="Betterboxd star rating flow explorations"
              src="/assets/betterboxd-star-rating-flow-explorations.jpg"
            />
            <p>
              We explored three approaches to integrating star ratings into the journaling flow:
              presenting them before reflection, placing them after each corresponding prompt, or
              grouping them into a dedicated section at the end.
            </p>
            <p>
              Introducing ratings upfront risked framing the experience around evaluation before
              users had begun reflecting, conflicting with Betterboxd&apos;s emphasis on personal
              expression.
            </p>
            <p>
              Placing ratings after each prompt offered a potential advantage: users could
              evaluate an aspect of the film immediately after considering it. However, it also
              introduced a repeated shift between reflecting on an experience and assigning it a
              numerical score.
            </p>
            <p>
              We felt these interruptions could disrupt the reflective mindset we wanted to
              preserve.
            </p>
            <p>
              Ultimately, we chose to group ratings at the end, allowing users to focus on their
              thoughts before moving into evaluation.
            </p>
            <p>
              While this meant potentially sacrificing some rating precision, we considered it a
              worthwhile trade-off. Ratings were intended to complement the journaling experience,
              not define it.
            </p>
          </article>
              </div>
            </details>

            <details className="case-study-accordion__item">
              <summary>
                <h2>Formulating the Tab Bar</h2>
                <span aria-hidden="true" className="case-study-accordion__chevron">›</span>
              </summary>
              <div className="case-study-accordion__panel case-study-accordion__panel--empty">
                <p>Case study content coming soon.</p>
              </div>
            </details>

            <details className="case-study-accordion__item">
              <summary>
                <h2>Simplifying the search bar</h2>
                <span aria-hidden="true" className="case-study-accordion__chevron">›</span>
              </summary>
              <div className="case-study-accordion__panel case-study-accordion__panel--empty">
                <p>Case study content coming soon.</p>
              </div>
            </details>

            <details className="case-study-accordion__item">
              <summary>
                <h2>The full picture</h2>
                <span aria-hidden="true" className="case-study-accordion__chevron">›</span>
              </summary>
              <div className="case-study-accordion__panel case-study-accordion__panel--empty">
                <p>Case study content coming soon.</p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
