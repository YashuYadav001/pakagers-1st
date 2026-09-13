import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMotionControl } from "../lib/smoothScroll";

export default function MotionToggle() {
  const { isSmoothActive, toggleSmooth, prefersReduced } = useMotionControl();
  const knobRef = useRef(null);
  const trackRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const knob = knobRef.current;
    const track = trackRef.current;
    if (!knob || !track) return;

    const targetX = isSmoothActive ? 20 : 2;
    const trackBg = isSmoothActive ? "#e8622c" : "#94a3b8";

    if (isFirstRender.current) {
      gsap.set(knob, { x: targetX });
      gsap.set(track, { backgroundColor: trackBg });
      isFirstRender.current = false;
    } else {
      gsap.to(knob, { x: targetX, duration: 0.3, ease: "back.out(1.7)" });
      gsap.to(track, { backgroundColor: trackBg, duration: 0.3 });
    }
  }, [isSmoothActive]);

  return (
    <div
      className="fixed bottom-20 lg:bottom-6 left-5 z-40 flex items-center gap-2.5 rounded-full border border-line dark:border-slate-700 bg-white/95 dark:bg-[#0c1a2e]/95 backdrop-blur px-3 py-1.5 shadow-card text-xs text-ink dark:text-white select-none transition-colors"
      title={
        prefersReduced
          ? "System prefers reduced motion. Toggle to turn on/off smooth scrolling."
          : "Toggle Lenis smooth-scrolling"
      }
    >
      <button
        type="button"
        role="switch"
        aria-checked={isSmoothActive}
        aria-label="Toggle smooth scrolling"
        onClick={toggleSmooth}
        className="flex items-center cursor-pointer p-0 bg-transparent border-0"
      >
        <div
          ref={trackRef}
          className="relative h-5 w-10 rounded-full flex items-center shadow-inner transition-shadow"
          style={{ background: isSmoothActive ? "#e8622c" : "#94a3b8" }}
        >
          <div
            ref={knobRef}
            className="h-4 w-4 rounded-full bg-white shadow-md"
          />
        </div>
      </button>

      <span className="text-[11px] font-medium flex items-center gap-1">
        <span className="text-slate-500 dark:text-slate-400">Scroll:</span>
        <b className={isSmoothActive ? "text-ember font-bold" : "text-slate-400"}>
          {isSmoothActive ? "Smooth" : "Classic"}
        </b>
      </span>
    </div>
  );
}
