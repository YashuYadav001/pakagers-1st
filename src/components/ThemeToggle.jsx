import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();
  const iconRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { rotate: isDark ? -90 : 90, scale: 0.6, opacity: 0 },
        { rotate: 0, scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }
      );
    }
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-ink dark:text-amber-300 shadow-sm transition-colors hover:border-ember dark:hover:border-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember ${className}`}
    >
      <span ref={iconRef} className="text-base select-none leading-none">
        {isDark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
