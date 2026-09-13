import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";

export default function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    gsap.set(el, { transformOrigin: "left center", scaleX: 0 });

    const tween = gsap.to(el, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none bg-black/5 dark:bg-white/5"
    >
      <div
        ref={barRef}
        className="w-full h-full bg-gradient-to-r from-ember via-amber-500 to-emerald-500 shadow-[0_0_8px_rgba(232,98,44,0.6)]"
      />
    </div>
  );
}
