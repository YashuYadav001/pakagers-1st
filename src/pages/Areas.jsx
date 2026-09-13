import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { Breadcrumbs, CTABand, SectionHeading } from "../components/UI";
import { areas } from "../siteData";

export default function Areas() {
  return (
    <>
      <section className="border-b border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] py-10 transition-colors">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Areas we serve" }]} />
          <SectionHeading
            eyebrow="Coverage"
            title="Every East Bangalore locality, one call away"
            sub="Our crews are based across the east side of the city, so dispatch and travel time stay short wherever you are."
          />
        </div>
      </section>

      <section className="py-16 bg-paper dark:bg-[#081220] transition-colors">
        <div className="container-x">
          <Reveal as="div" stagger={0.04} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <Link
                key={a.slug}
                to={`/areas/${a.slug}`}
                className="group rounded-2xl border border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] p-5 shadow-card hover:-translate-y-1 transition-all"
              >
                <h3 className="font-display font-semibold text-ink dark:text-white">
                  Packers &amp; Movers in {a.name}
                </h3>
                <p className="mt-2 text-sm text-slate dark:text-slate-300 leading-relaxed">{a.note}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-ember">
                  View details →
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
