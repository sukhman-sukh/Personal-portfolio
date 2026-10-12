"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/scroll";
import type { Project, Stop } from "@/lib/content";
import { Sheet } from "./sheet";

gsap.registerPlugin(ScrollTrigger);

export type SheetItem = { type: "stop"; stop: Stop } | { type: "project"; project: Project };

const SheetContext = createContext<(item: SheetItem) => void>(() => {});
export const useOpenSheet = () => useContext(SheetContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<SheetItem | null>(null);
  const open = useCallback((next: SheetItem) => setItem(next), []);
  const close = useCallback(() => setItem(null), []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.9, anchors: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <SheetContext.Provider value={open}>
      {children}
      <Sheet item={item} onClose={close} />
    </SheetContext.Provider>
  );
}
