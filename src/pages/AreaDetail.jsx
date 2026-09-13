import { Link, Navigate, useParams } from "react-router-dom";
import Reveal from "../components/Reveal";
import { Breadcrumbs, CTABand, Stars } from "../components/UI";
import { areaBySlug, areas, services, business, images, testimonials } from "../siteData";

export default function AreaDetail() {
  const { slug } = useParams();
  const area = areaBySlug(slug);

  if (!area) return <Navigate to="/areas" replace />;

  const nearby = areas.filter((a) => a.slug !== slug).slice(0, 6);
  const localTestimonial = testimonials[0];

  return (
    <>
      <section className="border-b border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] py-10 transition-colors">
        <div className="container-x">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Areas we serve", to: "/areas" },
              { label: area.name },
            ]}
          />
          <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-semibold text-ink dark:text-white leading-tight">
                Packers and Movers in {area.name}
              </h1>
              <p className="mt-4 text-slate dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {business.shortName} runs a dedicated crew for {area.name} and
                the surrounding streets — {area.note.toLowerCase()} We know
                the lift sizes, parking rules and society timing windows
                before we arrive.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/calculator"
                  className="rounded-lg bg-ember px-5 py-3 text-sm font-semibold text-white hover:bg-ember2 transition-colors shadow-card"
                >
                  Estimate {area.name} Fare →
                </Link>
                <Link
                  to="/contact"
                  className="rounded-lg border border-line dark:border-slate-700 px-5 py-3 text-sm font-semibold text-ink dark:text-white hover:bg-paper2 dark:hover:bg-slate-800 transition-colors"
                >
                  Free Survey
                </Link>
                <a
                  href={`tel:${business.phone}`}
                  className="rounded-lg border border-line dark:border-slate-700 px-5 py-3 text-sm font-semibold text-ink dark:text-white hover:bg-paper2 dark:hover:bg-slate-800 transition-colors"
                >
                  Call {business.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-line dark:border-slate-700 shadow-xl">
              <img
                src={images.heroCrew}
                alt={`Moving crew serving ${area.name}, East Bangalore`}
                className="h-72 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-paper dark:bg-[#081220] transition-colors">
        <div className="container-x">
          <h2 className="text-2xl font-display font-semibold text-ink dark:text-white">
            Services available in {area.name}
          </h2>
          <Reveal as="div" stagger={0.06} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="rounded-xl border border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] p-4 hover:shadow-card transition"
              >
                <img src={s.image} alt={s.name} className="h-28 w-full rounded-lg object-cover" />
                <p className="mt-3 font-semibold text-ink dark:text-white text-sm">{s.name}</p>
                <p className="mt-1 text-xs text-slate dark:text-slate-400 leading-relaxed">{s.short}</p>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-paper2 dark:bg-[#050d18] py-16 border-t border-line dark:border-slate-800 transition-colors">
        <div className="container-x max-w-2xl">
          <h2 className="text-2xl font-display font-semibold text-ink dark:text-white">
            Recently in {area.name}
          </h2>
          <div className="mt-6 rounded-2xl border border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] p-6 shadow-card">
            <Stars count={localTestimonial.rating} />
            <p className="mt-4 text-sm text-ink/85 dark:text-slate-200 leading-relaxed">“{localTestimonial.quote}”</p>
            <p className="mt-4 text-sm font-semibold text-ink dark:text-white">{localTestimonial.name}</p>
            <p className="text-xs text-slate dark:text-slate-400">{area.name}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-paper dark:bg-[#081220] transition-colors">
        <div className="container-x">
          <h2 className="text-2xl font-display font-semibold text-ink dark:text-white">Nearby areas we serve</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {nearby.map((a) => (
              <Link
                key={a.slug}
                to={`/areas/${a.slug}`}
                className="rounded-full border border-line dark:border-slate-700 bg-white dark:bg-[#0c1a2e] px-4 py-2 text-sm text-ink/80 dark:text-slate-200 hover:border-ember/40 hover:text-ink dark:hover:text-white transition"
              >
                {a.name}
              </Link>
            ))}
            <Link to="/areas" className="rounded-full bg-ink dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-white">
              View all areas →
            </Link>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
