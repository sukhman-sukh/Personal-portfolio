import { LINKS, PERSON } from "@/lib/content";

export function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="contact__title">
        Building something hard? Tell me about it.
      </h2>
      <a className="contact__email" href={`mailto:${PERSON.email}`}>
        Send me an email
      </a>
      <ul className="contact__links">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <footer className="colophon">
        <p>&copy; 2026 {PERSON.name}</p>
      </footer>
    </section>
  );
}
