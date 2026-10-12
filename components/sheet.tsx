"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useDragControls, useReducedMotion } from "motion/react";
import { fmtPeriod, isBurning } from "@/lib/content";
import { lockScroll } from "@/lib/scroll";
import { useMedia } from "@/lib/use-media";
import type { SheetItem } from "./providers";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Sheet({ item, onClose }: { item: SheetItem | null; onClose: () => void }) {
  const wide = useMedia("(min-width: 48rem)");
  const reduce = useReducedMotion();
  const drag = useDragControls();
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!item) return;
    returnTo.current = document.activeElement as HTMLElement | null;
    lockScroll(true);
    const t = window.setTimeout(() => closeRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      returnTo.current?.focus({ preventScroll: true });
    };
  }, [item, onClose]);

  const duration = reduce ? 0 : 0.55;
  const offscreen = wide ? { x: "100%" } : { y: "100%" };
  const onscreen = wide ? { x: 0 } : { y: 0 };

  return (
    <AnimatePresence>
      {item && (
        <div className="sheet-layer" key="layer">
          <motion.div
            className="sheet-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            className={wide ? "sheet sheet--side" : "sheet sheet--bottom"}
            initial={offscreen}
            animate={onscreen}
            exit={offscreen}
            transition={{ duration, ease: EASE }}
            drag={wide ? false : "y"}
            dragControls={drag}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.7 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 110 || info.velocity.y > 600) onClose();
            }}
          >
            {!wide && (
              <div className="sheet__grip" onPointerDown={(e) => drag.start(e)} aria-hidden="true">
                <span />
              </div>
            )}
            <div className="sheet__bar">
              <button ref={closeRef} type="button" className="sheet__close" onClick={onClose}>
                Close
              </button>
            </div>
            <div className="sheet__scroll" data-lenis-prevent>
              {item.type === "stop" ? <StopDetail item={item} /> : <ProjectDetail item={item} />}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function StopDetail({ item }: { item: Extract<SheetItem, { type: "stop" }> }) {
  const s = item.stop;
  return (
    <article className="detail">
      <h2 id="sheet-title" className="detail__title">{s.org}</h2>
      <p className="detail__role">{s.role}</p>
      <p className="detail__when">
        {fmtPeriod(s)}
        {isBurning(s) && <span className="detail__burning">Still burning</span>}
      </p>
      <ul className="detail__points">
        {s.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <dl className="detail__facts">
        <dt>Worked with</dt>
        <dd>{s.worked.join(", ")}</dd>
      </dl>
      {s.link && (
        <a className="detail__link" href={s.link.href} target="_blank" rel="noreferrer">
          {s.link.label}
        </a>
      )}
    </article>
  );
}

function ProjectDetail({ item }: { item: Extract<SheetItem, { type: "project" }> }) {
  const p = item.project;
  return (
    <article className="detail">
      <h2 id="sheet-title" className="detail__title">{p.name}</h2>
      <p className={`detail__status is-${p.status}`}>
        <i aria-hidden="true" />
        {p.statusLabel}
      </p>
      <p className="detail__lede">{p.summary}</p>
      <ul className="detail__points">
        {p.points.map((pt) => (
          <li key={pt}>{pt}</li>
        ))}
      </ul>
      <dl className="detail__facts">
        <dt>Written in</dt>
        <dd>{p.lang}</dd>
        <dt>Topics</dt>
        <dd>{p.topics.join(", ")}</dd>
      </dl>
      {p.link && (
        <a className="detail__link" href={p.link.href} target="_blank" rel="noreferrer">
          {p.link.label}
        </a>
      )}
    </article>
  );
}
