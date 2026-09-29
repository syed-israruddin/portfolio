type PlaceholderImageProps = {
  label: string;
};

function PlaceholderImage({ label }: PlaceholderImageProps) {
  return <div aria-label={label} className="case-study-image-placeholder" role="img" />;
}

export function OmaweCaseStudyContent() {
  return (
    <div className="case-study-sections">
      <section className="case-study-section" aria-labelledby="omawe-concept">
        <div className="case-study-section__content">
          <h2 id="omawe-concept">The concept</h2>
          <p>
            The idea for Omawe started with a simple observation: There are many location
            sharing apps that can tell you where someone is. But what if you only needed to
            know when everyone would arrive? I imagined a shared trip where every person is
            travelling towards the same destination. Once the trip begins, Omawe calculates
            each person&apos;s distance and ETA, then surfaces that information through a Live
            Activity. Instead of constantly opening a map, checking someone&apos;s location, or
            asking “How far away are you?”, the journey would simply become visible.
          </p>
          <PlaceholderImage label="Omawe concept image placeholder" />
        </div>
      </section>

      <section className="case-study-section" aria-labelledby="omawe-experience">
        <div className="case-study-section__content case-study-section__content--detailed">
          <div className="case-study-section__intro">
            <h2 id="omawe-experience">Defining the Experience</h2>
            <p>
              Once we had the concept, we needed to turn it into a journey that felt simple
              from the moment someone opened Omawe. We centred the experience around two
              actions: Create a trip or Join a trip. Rather than using a conventional tab bar,
              we designed a custom navigation interaction. Swiping the central circle left opens
              Create, while swiping right opens Join. Tapping either side works too, and once
              inside either flow, the circle becomes a home button. The interaction gave the two
              primary actions a clear spatial relationship while keeping the interface focused
              around the trip itself.
            </p>
            <PlaceholderImage label="Custom navigation bar image placeholder" />
          </div>

          <article className="case-study-subsection">
            <h3>Creating a Trip</h3>
            <p>
              Creating a trip only requires the information needed to make the journey work:
            </p>
            <ul>
              <li>Date</li>
              <li>Time</li>
              <li>Destination</li>
              <li>Trip name</li>
            </ul>
            <p>
              Once created, Omawe generates a six-character alphanumeric code that can be
              shared with everyone joining the trip.
            </p>
            <PlaceholderImage label="Trip creation flow image placeholder" />
          </article>

          <article className="case-study-subsection">
            <h3>Joining a Trip</h3>
            <p>
              Joining is equally lightweight. A user enters the trip code, confirms that they
              want to join, and is added to the shared trip room. Before the journey begins,
              members can see who else is in the room, including their names and profile photos,
              but location sharing remains off. This distinction was important. Being part of a
              trip should not automatically mean sharing your location.
            </p>
            <PlaceholderImage label="Joining trip flow image placeholder" />
          </article>

          <article className="case-study-subsection">
            <h3>Starting a Journey</h3>
            <p>We also made an intentional decision around who could start a trip.</p>
            <p>Anyone in the trip room can start it.</p>
            <p>
              Limiting this action to the person who created the trip could create unnecessary
              friction. The creator might be further away from the destination, forget to start
              the trip, or simply not be the person who needs the journey to begin.
            </p>
            <p>Once the trip starts, location sharing begins and the Live Activity becomes active.</p>
            <p>
              From there, Omawe moves from setting up the journey to helping everyone keep up
              with it.
            </p>
          </article>
        </div>
      </section>

      <section className="case-study-section" aria-labelledby="omawe-glanceability">
        <div className="case-study-section__content case-study-section__content--detailed">
          <div className="case-study-section__intro">
            <h2 id="omawe-glanceability">Glanceability in Motion</h2>
            <p>
              A Live Activity has to communicate while the user is doing something else. To
              understand how to achieve this, we looked at Uber, Uber Eats, Grab, and GrabFood,
              where information such as a driver&apos;s arrival time or an order&apos;s progress can be
              understood almost instantly. We noticed that these experiences consistently
              prioritise one immediate question rather than trying to expose everything at once.
            </p>
            <PlaceholderImage label="Live Activities comparison image placeholder" />
          </div>
          <div className="case-study-section__body-copy">
            <p>
              For Omawe, that question became: “How far are we from our destination?” We made
              the destination and distance the primary visual information, supported by a simple
              directional cue to reinforce where the group was heading. Details such as the trip
              name, participant names, and other secondary information were deliberately kept
              within the main app rather than competing for attention in the Live Activity.
            </p>
            <p>
              The result was less about making a smaller version of Omawe and more about deciding
              what the app needs to say when there is only a second to look.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
