import type Lenis from "lenis";

// One Lenis instance for the whole page. Null when reduced motion is on.
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;

export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (instance) instance.scrollTo(target, { duration: 1.4 });
  else target.scrollIntoView({ behavior: "auto", block: "start" });
}

export function lockScroll(locked: boolean) {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
