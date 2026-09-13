import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";

const processStages = [
  { num: "01", title: "Free Survey & Access Scoping", desc: "We review carton volume, stairs, elevator size, and society parking slots in advance.", badge: "Pre-Move" },
  { num: "02", title: "Written Binding Estimate", desc: "You receive a transparent price based on your exact inventory with zero hidden extras.", badge: "Price Lock" },
  { num: "03", title: "Multi-Layer Packing & Labelling", desc: "Bubble wrap for electronics, corrugated sheets for furniture, and room-coded boxes.", badge: "Care Handling" },
  { num: "04", title: "Secure Vehicle Loading", desc: "Trained company staff stack and strap goods inside our closed, weatherproof container fleet.", badge: "Safety Check" },
  { num: "05", title: "Corridor Transit & Tracking", desc: "Smooth transit scheduled around peak traffic corridors with direct phone/WhatsApp driver sync.", badge: "Door-to-Door" },
  { num: "06", title: "Unloading & Room Setup", desc: "Cartons placed into corresponding rooms and modular beds/wardrobes reassembled.", badge: "Move Complete" },
];

export default function PinnedProcess() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 860;
    if (isMobile) return;

    const sec = sectionRef.current;
    const track = trackRef.current;
    const line = progressLineRef.current;
    if (!sec || !track) return;

    const totalWidth = track.scrollWidth - track.clientWidth;
    if (totalWidth <= 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          pin: true,
          start: "top top",
          end: () => `+=${Math.max(totalWidth + 500, 1100)}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      tl.to(track, { x: -totalWidth, ease: "none" });
      if (line) {
        tl.to(line, { scaleX: 1, ease: "none" }, 0);
      }
    }, sec);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-ink dark:bg-[#050d18] text-white py-20 border-t border-b border-white/10">
      <div className="container-x">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold tracking-wider text-ember uppercase">
              Standout Moving Timeline
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold text-white">
              How Your Relocation Unfolds
            </h2>
            <p className="mt-2 max-w-lg text-sm text-white/70">
              A pinned, transparent relocation sequence planned around your inventory, building access, and timing.
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end gap-2">
            <span className="text-[11px] font-semibold text-ember uppercase tracking-wider">
              Scrub to advance
            </span>
            <div className="w-48 h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div
                ref={progressLineRef}
                className="h-full bg-gradient-to-r from-ember to-amber-400 origin-left scale-x-[0.1]"
              />
            </div>
          </div>
        </div>

        {/* Track */}
        <div className="overflow-x-auto md:overflow-hidden -mx-5 px-5 md:mx-0 md:px-0">
          <div ref={trackRef} className="flex gap-5 w-max py-2">
            {processStages.map((stage, idx) => (
              <div
                key={stage.num}
                className="w-72 sm:w-80 rounded-2xl border border-white/15 bg-white/5 dark:bg-white/[0.03] backdrop-blur p-6 flex flex-col justify-between hover:border-ember/60 transition-colors shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-ember text-white font-display font-bold text-sm shadow-md">
                      {stage.num}
                    </span>
                    <span className="text-[11px] font-medium text-white/60">
                      Step {idx + 1} of {processStages.length}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-white/50">{stage.badge}</span>
                  <span className="font-semibold text-emerald-400">✓ Verified Protocol</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/calculator"
            className="rounded-lg bg-ember px-5 py-2.5 text-xs font-semibold text-white hover:bg-ember2 transition-colors shadow-card"
          >
            Calculate Move Cost →
          </Link>
          <Link
            to="/contact"
            className="rounded-lg border border-white/25 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Schedule Free Survey
          </Link>
        </div>
      </div>
    </section>
  );
}
