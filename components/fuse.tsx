"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FUSE_RANGE,
  SPARKS,
  STOPS,
  TODAY,
  fmtMonth,
  fmtPeriod,
  fuseFrac,
  isBurning,
  monthIndex,
  type Stop,
} from "@/lib/content";
import { useOpenSheet } from "./providers";
import { Sparks } from "./sparks";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const REM_PER_YEAR = 38;
const ORIGIN = fuseFrac(STOPS[0].start);
const NOW = fuseFrac(TODAY);
const YEARS: number[] = [];
for (let y = Number(FUSE_RANGE.from.slice(0, 4)) + 1; y <= Number(TODAY.slice(0, 4)); y++) YEARS.push(y);
const TRACK_REM = ((monthIndex(FUSE_RANGE.to) - monthIndex(FUSE_RANGE.from)) / 12) * REM_PER_YEAR;

const pct = (f: number) => `${(f * 100).toFixed(3)}%`;

type Entry =
  | { kind: "stop"; date: string; stop: Stop }
  | { kind: "spark"; date: string; label: string; detail: string; id: string };

const ENTRIES: Entry[] = [
  ...STOPS.map((stop) => ({ kind: "stop" as const, date: stop.start, stop })),
  ...SPARKS.map((s) => ({ kind: "spark" as const, ...s })),
].sort((a, b) => monthIndex(a.date) - monthIndex(b.date));

export function Fuse() {
  const open = useOpenSheet();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { desktop: "(min-width: 62rem)", phone: "(max-width: 61.99rem)", reduce: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };
          const el = root.current!;

          if (desktop) {
            const stage = el.querySelector<HTMLElement>(".fuse__pin")!;
            const viewport = el.querySelector<HTMLElement>(".hfuse__viewport")!;
            const track = el.querySelector<HTMLElement>(".hfuse__track")!;
            const spark = el.querySelector<HTMLElement>(".hfuse .spark")!;
            const ash = el.querySelector<HTMLElement>(".hfuse__ash")!;
            const lit = [...el.querySelectorAll<HTMLElement>(".hfuse [data-at]")];
            const canvas = el.querySelector<HTMLCanvasElement>(".hfuse__canvas")!;
            const yearNow = el.querySelector<HTMLElement>(".hfuse__year-now")!;
            const from = monthIndex(FUSE_RANGE.from);
            const span = monthIndex(FUSE_RANGE.to) - from;

            const update = (q: number) => {
              const f = ORIGIN + q * (NOW - ORIGIN);
              const shift = Math.max(0, track.offsetWidth + 2 * track.offsetLeft - viewport.clientWidth);
              gsap.set(track, { x: -q * shift });
              spark.style.left = pct(f);
              ash.style.width = pct(f - ORIGIN);
              lit.forEach((n) => n.classList.toggle("is-lit", f >= Number(n.dataset.at) - 0.002));
              const year = String(Math.floor((from + f * span) / 12));
              if (yearNow.textContent !== year) yearNow.textContent = year;
            };

            if (reduce) {
              update(1);
              return;
            }

            const state = { q: 0 };
            update(0);
            gsap.to(state, {
              q: 1,
              ease: "none",
              onUpdate: () => update(state.q),
              scrollTrigger: {
                trigger: stage,
                start: "top top",
                end: () => `+=${Math.max(window.innerHeight * 1.6, (track.offsetWidth + 2 * track.offsetLeft - viewport.clientWidth) * 1.4)}`,
                pin: true,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            });

            const sparks = new Sparks(canvas, () => {
              const a = spark.getBoundingClientRect();
              const b = canvas.getBoundingClientRect();
              return { x: a.left + a.width / 2 - b.left, y: a.top + a.height / 2 - b.top };
            });
            return () => sparks.destroy();
          }

          // Phone and tablet: a vertical cord; the spark sits wherever the reader is.
          const wrap = el.querySelector<HTMLElement>(".vfuse")!;
          const spark = el.querySelector<HTMLElement>(".vfuse .spark")!;
          const ash = el.querySelector<HTMLElement>(".vfuse__ash")!;
          const items = [...el.querySelectorAll<HTMLElement>(".vfuse [data-y]")];
          const canvas = el.querySelector<HTMLCanvasElement>(".vfuse__canvas")!;
          const last = el.querySelector<HTMLElement>(".vtoday")!;

          const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
          const update = (q: number) => {
            const end = last.offsetTop + 0.75 * rem;
            const y = q * end;
            spark.style.transform = `translate3d(0, ${y / rem}rem, 0)`;
            ash.style.height = `${y / rem}rem`;
            items.forEach((n) => n.classList.toggle("is-lit", y >= n.offsetTop + 0.5 * rem));
          };

          if (reduce) {
            update(1);
            return;
          }

          update(0);
          ScrollTrigger.create({
            trigger: wrap,
            start: "top 70%",
            end: () => `+=${last.offsetTop}`,
            scrub: 0.4,
            invalidateOnRefresh: true,
            onUpdate: (self) => update(self.progress),
          });

          const sparks = new Sparks(canvas, () => ({ x: canvas.clientWidth / 2, y: canvas.clientHeight / 2 }), {
            base: 0.25,
            vertical: true,
          });
          return () => sparks.destroy();
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="experience" className="fuse" ref={root} aria-labelledby="fuse-title">
      <div className="fuse__pin">
        <div className="fuse__head">
          <h2 id="fuse-title" className="section-title">
            The fuse, so far
          </h2>
          <p className="fuse__sub">Lit at IIT Roorkee in 2022. Still burning.</p>
        </div>

        {/* Desktop: pinned, horizontal, drawn to scale */}
        <p className="hfuse__year-now" aria-hidden="true">
          {STOPS[0].start.slice(0, 4)}
        </p>
        <div className="hfuse">
          <div className="hfuse__viewport">
            <div className="hfuse__track" style={{ width: `${TRACK_REM}rem` }}>
              <div className="hfuse__cord" style={{ left: pct(ORIGIN) }} />
              <div className="hfuse__ash" style={{ left: pct(ORIGIN) }} />
              {YEARS.map((y) => (
                <span key={y} className="hfuse__year" style={{ left: pct(fuseFrac(`${y}-01`)) }}>
                  {y}
                </span>
              ))}
              {SPARKS.map((s, i) => (
                <span
                  key={s.id}
                  className={`hfleck lane-${i % 2}`}
                  style={{ left: pct(fuseFrac(s.date)) }}
                  data-at={fuseFrac(s.date)}
                  tabIndex={0}
                >
                  <span className="hfleck__dot" aria-hidden="true" />
                  <span className="hfleck__label">
                    {s.label}
                    <span className="hfleck__detail">{s.detail}</span>
                  </span>
                </span>
              ))}
              {STOPS.map((stop, i) => (
                <div
                  key={stop.id}
                  className={`hstop ${i % 2 === 0 ? "is-down" : "is-up"}${isBurning(stop) ? " is-burning" : ""}`}
                  style={{ left: pct(fuseFrac(stop.start)) }}
                  data-at={fuseFrac(stop.start)}
                >
                  <span className="hstop__stem" aria-hidden="true" />
                  <span className="hstop__node" aria-hidden="true" />
                  <button type="button" className="hstop__card" onClick={() => open({ type: "stop", stop })}>
                    <span className="hstop__when">{fmtPeriod(stop)}</span>
                    <span className="hstop__org">{stop.org}</span>
                    <span className="hstop__role">{stop.role}</span>
                    <span className="hstop__more">
                      <span>
                        <span className="hstop__summary">{stop.summary}</span>
                        <span className="hstop__hint">Click for the full story</span>
                      </span>
                    </span>
                  </button>
                </div>
              ))}
              <span className="hfuse__today" style={{ left: pct(NOW) }}>
                Today
              </span>
              <span className="spark" style={{ left: pct(ORIGIN) }} aria-hidden="true">
                <i />
              </span>
            </div>
          </div>
          <canvas className="hfuse__canvas" aria-hidden="true" />
        </div>

        {/* Phone and tablet: vertical cord down the left edge */}
        <div className="vfuse">
          <div className="vfuse__cord" aria-hidden="true" />
          <div className="vfuse__ash" aria-hidden="true" />
          <span className="spark" aria-hidden="true">
            <i />
            <canvas className="vfuse__canvas" />
          </span>
          <ol className="vfuse__list">
            {ENTRIES.map((e) =>
              e.kind === "stop" ? (
                <li key={e.stop.id} className={`vstop${isBurning(e.stop) ? " is-burning" : ""}`} data-y>
                  <span className="vfuse__node" aria-hidden="true" />
                  <button type="button" className="vstop__card" onClick={() => open({ type: "stop", stop: e.stop })}>
                    <span className="vstop__when">{fmtPeriod(e.stop)}</span>
                    <span className="vstop__org">{e.stop.org}</span>
                    <span className="vstop__role">{e.stop.role}</span>
                    <span className="vstop__summary">{e.stop.summary}</span>
                  </button>
                </li>
              ) : (
                <li key={e.id} className="vfleck" data-y>
                  <span className="vfuse__fleck" aria-hidden="true" />
                  <span className="vfleck__when">{fmtMonth(e.date)}</span>
                  <span className="vfleck__text">
                    <b>{e.label}.</b> {e.detail}
                  </span>
                </li>
              ),
            )}
            <li className="vtoday" data-y>
              <span className="vfuse__node is-now" aria-hidden="true" />
              Today, {fmtMonth(TODAY)}. Still burning.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
