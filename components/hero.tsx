import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { INTRO, PERSON, QUOTE } from "@/lib/content";

const Word = ({ d, hot, children }: { d: number; hot?: boolean; children: string }) => (
  <span className={hot ? "burn burn--hot" : "burn"} style={{ "--d": `${d}s` } as React.CSSProperties}>
    {children}
  </span>
);

// Drop the portrait into /public under one of these names.
const findPortrait = () =>
  ["me.webp", "me.png", "me.jpg", "me.jpeg"].find((f) => fs.existsSync(path.join(process.cwd(), "public", f)));

function Portrait({ file }: { file?: string }) {
  if (file) {
    return (
      <figure className="hero__portrait">
        <div className="hero__frame">
          <Image src={`/${file}`} alt={`Portrait of ${PERSON.name}`} fill priority sizes="(max-width: 40rem) 34vw, 45vw" />
        </div>
      </figure>
    );
  }
  // Only shown while developing, so the slot is visible until the image exists.
  if (process.env.NODE_ENV === "production") return null;
  return (
    <figure className="hero__portrait">
      <div className="hero__frame hero__frame--empty">
        <span>Add your portrait as public/me.png</span>
      </div>
    </figure>
  );
}

// The one orchestrated moment: heat passes through the quote once, left to right.
// "and let it kill you" keeps burning afterwards. Pure CSS, so it runs before hydration.
export function Hero() {
  const portrait = findPortrait();
  return (
    <section id="top" className={portrait || process.env.NODE_ENV !== "production" ? "hero has-portrait" : "hero"}>
      <div className="hero__top">
        <h1 className="hero__quote">
          <span className="hero__lead">
            <Word d={0.15}>Find</Word>
            <br className="br-phone" /> <Word d={0.3}>what</Word>
            <br className="br-desk" /> <Word d={0.45}>you</Word>
            <br className="br-phone" /> <Word d={0.6}>love</Word>
          </span>
          <span className="hero__tail">
            <Word d={0.95} hot>
              {QUOTE.tail}
            </Word>
            <span className="hero__ember" aria-hidden="true">
              .
            </span>
          </span>
        </h1>
        <Portrait file={portrait} />
      </div>

      <div className="hero__foot">
        <p className="hero__intro">{INTRO}</p>
        <a className="hero__cue" href="#experience">
          Scroll to light the fuse
        </a>
      </div>
    </section>
  );
}
