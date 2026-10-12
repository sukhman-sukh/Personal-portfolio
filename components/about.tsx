import { ABOUT } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <h2 id="about-title" className="section-title">
        {ABOUT.title}
      </h2>
      <p className="about__lead">{ABOUT.lead}</p>
      <div className="about__body">
        <div className="about__range">
          <p className="about__range-intro">{ABOUT.rangeIntro}</p>
          {/* Ordered from the metal up to where I am now. */}
          <ol className="range">
            {ABOUT.range.map((r) => (
              <li key={r.domain} className={r.now ? "range__row is-now" : "range__row"}>
                <span className="range__domain">{r.domain}</span>
                <span className="range__detail">{r.detail}</span>
              </li>
            ))}
          </ol>
        </div>
        <dl className="about__facts">
          {ABOUT.facts.map((f) => (
            <div key={f.term} className="about__fact">
              <dt>{f.term}</dt>
              <dd>{f.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
