"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PERSON } from "@/lib/content";
import { lockScroll, scrollToId } from "@/lib/scroll";

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

type Theme = "dark" | "light";

function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    if (document.documentElement.dataset.theme === "light") setTheme("light");
  }, []);
  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  return { theme, toggle };
}

export function Header() {
  const { theme, toggle } = useTheme();
  const [menu, setMenu] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!menu) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenu(false);
    // Let the menu release the scroll lock before moving.
    requestAnimationFrame(() => scrollToId(id));
  };

  const themeLabel = theme === "dark" ? "Light" : "Dark";

  return (
    <>
      <header className="site-head">
        <a href="#top" className="site-head__name" onClick={go("top")}>
          {PERSON.name}
        </a>
        <nav className="site-head__nav" aria-label="Sections">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)}>
              {n.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="site-head__theme"
          onClick={toggle}
          aria-label={`Switch to ${themeLabel.toLowerCase()} theme`}
        >
          {themeLabel}
        </button>
        <button
          type="button"
          className="site-head__menu"
          aria-expanded={menu}
          aria-controls="phone-menu"
          onClick={() => setMenu(true)}
        >
          Menu
        </button>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="phone-menu"
            className="phone-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="phone-menu__bar">
              <span className="site-head__name">{PERSON.short}</span>
              <button type="button" className="site-head__menu is-open" onClick={() => setMenu(false)} autoFocus>
                Close
              </button>
            </div>
            <nav className="phone-menu__nav" aria-label="Sections">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  initial={{ y: "0.6em", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: reduce ? 0 : 0.12 + i * 0.05, duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <button type="button" className="phone-menu__theme" onClick={toggle}>
              Switch to {themeLabel.toLowerCase()} theme
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
