import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MotionContext = createContext({
  isSmoothActive: true,
  toggleSmooth: () => {},
  prefersReduced: false,
});

let globalLenis = null;

export function MotionProvider({ children }) {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isSmoothActive, setIsSmoothActive] = useState(true);
  const lenisRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const saved = localStorage.getItem("se_smooth_scroll");
    let initialActive = true;
    if (saved !== null) {
      initialActive = saved === "true";
    } else if (mediaQuery.matches) {
      initialActive = false;
    }
    setIsSmoothActive(initialActive);

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;
    globalLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    if (!initialActive) {
      lenis.stop();
    }

    const onMediaChange = (e) => {
      setPrefersReduced(e.matches);
      if (localStorage.getItem("se_smooth_scroll") === null) {
        setIsSmoothActive(!e.matches);
        if (e.matches) lenis.stop();
        else lenis.start();
      }
    };
    mediaQuery.addEventListener("change", onMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", onMediaChange);
      lenis.destroy();
      gsap.ticker.remove(update);
      lenisRef.current = null;
      globalLenis = null;
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (isSmoothActive) {
      lenisRef.current.start();
    } else {
      lenisRef.current.stop();
    }
  }, [isSmoothActive]);

  const toggleSmooth = () => {
    setIsSmoothActive((prev) => {
      const next = !prev;
      localStorage.setItem("se_smooth_scroll", String(next));
      return next;
    });
  };

  return React.createElement(
    MotionContext.Provider,
    { value: { isSmoothActive, toggleSmooth, prefersReduced } },
    children
  );
}

export function useMotionControl() {
  return useContext(MotionContext);
}

export function useSmoothScroll() {
  return useMotionControl();
}

export { gsap, ScrollTrigger };
