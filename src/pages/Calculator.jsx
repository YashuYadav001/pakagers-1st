import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CostCalculator from "../components/CostCalculator";
import { SectionHeading, CTABand } from "../components/UI";
import { business } from "../siteData";

const calcFaqs = [
  {
    q: "How does the distance-based pricing work?",
    a: "We calculate the road transit distance from our central East Bangalore dispatch hub in Mahadevapura/KR Puram to your destination. The fare includes the carrier vehicle, fuel, driver, and base inventory handling.",
  },
  {
    q: "Why do month-end and weekend dates cost slightly more?",
    a: "Bangalore apartment communities have strict weekend elevator booking windows, and month-end lease expiries cause peak demand across moving crews and container fleets. Booking mid-month weekdays offers maximum savings.",
  },
  {
    q: "Is this estimate final or could it change on moving day?",
    a: "This calculator gives a dependable estimate range based on average room volumes. We provide a guaranteed, binding written quote once we complete a free in-person or video survey of your exact inventory list.",
  },
  {
    q: "What if I need dismantling for ACs, TV units, or heavy wardrobes?",
    a: "You can check the 'Carpentry & Technician Support' add-on in the calculator. Our crew arrives with power tools to dismantle and re-fit appliances and modular beds safely.",
  },
];

export default function Calculator() {
  useEffect(() => {
    document.title = `Moving Cost Calculator | ${business.name}`;
  }, []);

  return (
    <div className="bg-paper dark:bg-[#081220] min-h-screen transition-colors duration-200">
      {/* Hero Header */}
      <section className="bg-ink dark:bg-[#050d18] text-white py-14 md:py-20 border-b border-line dark:border-slate-800">
        <div className="container-x text-center max-w-2xl">
          <span className="text-xs font-semibold tracking-wider text-ember uppercase">
            Transparent Pricing Engine
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
            East Bangalore Relocation Cost Calculator
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed">
            Estimate your moving fare based on road distance from our central dispatch hub, property size, schedule timing, and packaging scope.
          </p>
        </div>
      </section>

      {/* Main Calculator */}
      <div className="container-x py-10">
        <CostCalculator />
      </div>

      {/* Pricing FAQs */}
      <section className="border-t border-line dark:border-slate-800 py-16 bg-white dark:bg-[#0c1a2e]">
        <div className="container-x max-w-3xl">
          <SectionHeading
            eyebrow="Pricing FAQs"
            title="How Our Relocation Rates Work"
            description="Clear, honest answers about our Bangalore moving scopes, surcharges, and survey guarantees."
          />
          <div className="mt-8 space-y-4">
            {calcFaqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-line dark:border-slate-700 bg-paper dark:bg-[#081220] p-5"
              >
                <h3 className="font-display font-semibold text-base text-ink dark:text-white">
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
