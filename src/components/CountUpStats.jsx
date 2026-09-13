import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";

const statItems = [
  { target: 11, suffix: "+", label: "Years in East Bangalore", sub: "Since 2014 dispatching daily", decimals: 0 },
  { target: 6200, suffix: "+", label: "Relocations Completed", sub: "Verified household & office shifts", decimals: 0 },
  { target: 40, suffix: "+", label: "Trained Company Crew", sub: "Zero unverified daily-wage hires", decimals: 0 },
  { target: 4.8, suffix: "/5", label: "Customer Rating", sub: "From 900+ genuine Google reviews", decimals: 1 },
];

export default function CountUpStats() {
  const containerRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      statItems.forEach((item, index) => {
        const numEl = numberRefs.current[index];
        if (!numEl) return;

        const counter = { val: 0 };
        gsap.to(counter, {
          val: item.target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            if (numEl) {
              const formatted = item.decimals > 0
                ? counter.val.toFixed(item.decimals)
                : Math.round(counter.val).toLocaleString();
              numEl.innerText = `${formatted}${item.suffix}`;
            }
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="border-b border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] transition-colors">
      <div className="container-x grid grid-cols-2 gap-6 py-12 sm:grid-cols-4">
        {statItems.map((s, i) => (
          <div key={s.label} className="text-center sm:text-left">
            <p
              ref={(el) => (numberRefs.current[i] = el)}
              className="text-3xl sm:text-4xl font-display font-bold text-ink dark:text-white"
            >
              0{s.suffix}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {s.label}
            </p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {s.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
