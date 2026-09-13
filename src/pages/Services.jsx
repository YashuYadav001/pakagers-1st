import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { Breadcrumbs, CTABand, SectionHeading } from "../components/UI";
import { services } from "../siteData";

export default function Services() {
  return (
    <>
      <section className="border-b border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] py-10 transition-colors">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Services" }]} />
          <SectionHeading
            eyebrow="Services"
            title="Moving services built for East Bangalore homes and offices"
            sub="Pick a single service or combine them into a full door-to-door move — every job starts with a free estimate."
          />
        </div>
      </section>

      <section className="py-16 bg-paper dark:bg-[#081220] transition-colors">
        <div className="container-x">
          <Reveal as="div" stagger={0.08} className="grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] shadow-card sm:flex-row hover:-translate-y-1 transition-all"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="h-48 w-full object-cover sm:h-auto sm:w-48 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-5 flex flex-col justify-center">
                  <h3 className="font-display font-semibold text-ink dark:text-white">{s.name}</h3>
                  <p className="mt-1.5 text-sm text-slate dark:text-slate-300 leading-relaxed">{s.short}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-ember">
                    View details →
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
