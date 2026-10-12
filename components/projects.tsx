"use client";

import { PROJECTS } from "@/lib/content";
import { useOpenSheet } from "./providers";

export function Projects() {
  const open = useOpenSheet();
  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="projects__head">
        <h2 id="projects-title" className="section-title">
          Things I&rsquo;ve built
        </h2>
        <p className="projects__sub">The glowing ones are still burning. Open any of them for the full story.</p>
      </div>
      <ul className="tickets">
        {PROJECTS.map((p) => (
          <li key={p.id}>
            <button type="button" className={`ticket is-${p.status}`} onClick={() => open({ type: "project", project: p })}>
              <span className="ticket__main">
                <span className="ticket__name">{p.name}</span>
                <span className="ticket__summary">{p.summary}</span>
                <span className="ticket__more">
                  <span>
                    <span className="ticket__body">{p.body}</span>
                    <span className="ticket__topics">{p.topics.join(", ")}</span>
                  </span>
                </span>
              </span>
              <span className="ticket__stub">
                <span className="ticket__lang">{p.lang}</span>
                <span className="ticket__status">
                  <i aria-hidden="true" />
                  {p.statusLabel}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
