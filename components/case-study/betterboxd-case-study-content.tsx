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
                <h2>Designing the Entry into Journaling</h2>
                <span aria-hidden="true" className="case-study-accordion__chevron">›</span>
              </summary>
              <div className="case-study-accordion__panel case-study-section__content--detailed">
                <article className="case-study-subsection">
                  <h3>A Direct Path to Journaling</h3>
                  <p>
                    We wanted journaling to feel like a distinct experience within Betterboxd,
                    while remaining seamlessly connected to the rest of the app. As the
                    product&apos;s central feature, we felt that starting a new journal entry
                    deserved more prominence than a conventional tab bar item.
                  </p>
                  <p>
                    We introduced a dedicated Add Journal button, visually separated from the
                    rest of the navigation and positioned in the bottom-right corner. Its
                    distinctive circular treatment was intended to make the action immediately
                    recognisable and accessible, giving users a consistent entry point to the
                    journaling experience.
                  </p>
                  <p>
                    But making the button prominent was only part of the solution. We also
                    wanted to minimise the steps between deciding to journal and actually
                    beginning.
                  </p>
                  <p>
                    Rather than directing users through the app&apos;s broader search experience,
                    the button opens a dedicated, simplified film search. By removing unrelated
                    search categories and displaying only films, we kept the interface focused
                    on the task at hand.
                  </p>
                  <p>From there, users simply select a film and begin journaling.</p>
                  <p>
                    This creates a more direct alternative to the standard discovery flow, where
                    users would otherwise need to search for a film, navigate to its details
                    page, and then locate the journaling action.
                  </p>
                </article>

                <CaseStudyFigure
                  alt="Comparison of Betterboxd's standard search and dedicated journal entry flows"
                  caption="Comparing the standard search journey with a dedicated entry point designed to reduce the steps required to begin journaling."
                  src="/assets/betterboxd-journal-entry-flow-comparison.jpg"
                />

                <p>
                  By giving journaling its own entry point and streamlined search experience, we
                  aimed to make the app&apos;s most important interaction prominent, predictable,
                  and easy to initiate.
                </p>

                <article className="case-study-subsection">
                  <h3>The Buffer Page: Creating a Moment of Intentionality</h3>
                  <p>
                    While we wanted to minimise the effort required to begin journaling, we
                    didn&apos;t necessarily want the transition into reflection to feel
                    instantaneous.
                  </p>
                  <p>
                    After selecting a film, users arrive at a dedicated introductory screen
                    featuring its artwork and key details. This was a deliberate pause, designed
                    to help users acknowledge the film they were about to reflect on before
                    stepping into the journaling experience.
                  </p>
                  <p>
                    We also introduced an upward swipe gesture to begin journaling, turning the
                    transition into a small, intentional action.
                  </p>
                  <p>
                    Rather than treating every additional interaction as unnecessary friction, we
                    wanted this moment to serve a purpose: creating a clear separation between
                    finding a film and reflecting on it.
                  </p>
                </article>

                <CaseStudyFigure
                  alt="Final Betterboxd journal entry flow from film selection to reflection"
                  caption="A streamlined journey from selecting a film to entering a reflective mindset, with an intentional pause before journaling begins."
                  src="/assets/betterboxd-final-journal-entry-flow.jpg"
                />
              </div>
            </details>

            <details className="case-study-accordion__item">
              <summary>
                <h2>Simplifying Search</h2>
                <span aria-hidden="true" className="case-study-accordion__chevron">›</span>
              </summary>
              <div className="case-study-accordion__panel case-study-section__content--detailed">
                <article className="case-study-subsection">
                  <h3>Separating Discovery from Personal History</h3>
                  <p>
                    One of the challenges we faced when designing the search experience was
                    accommodating two distinct needs: exploring a broader database of films,
                    actors, and directors, and quickly finding movies users had already
                    journaled about.
                  </p>
                  <p>
                    While we wanted to provide access to useful film information, we were
                    conscious of Betterboxd&apos;s identity as a personal journaling app rather than
                    an extensive film encyclopaedia. We explored different ways to organise these
                    search experiences before drawing inspiration from Apple Music&apos;s approach to
                    separating its wider catalogue from a user&apos;s personal library.
                  </p>
                  <p>
                    Adapting this familiar pattern, we divided the search interface into two
                    tabs: All Movies and Journaled.
                  </p>
                  <p>
                    The first gives users access to the broader film database, including actors
                    and directors, while the second narrows the results to films they&apos;ve
                    previously reflected on. This distinction allowed us to accommodate discovery
                    without losing sight of Betterboxd&apos;s central purpose. Users could explore
                    the world of film while remaining one step away from their own reflections.
                  </p>
                </article>

                <CaseStudyFigure
                  alt="Betterboxd search interface showing All Movies and Journaled tabs"
                  caption="Separating the broader film catalogue from previously journaled films through a familiar tabbed search interface."
                  src="/assets/betterboxd-search-options.jpg"
                />
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
