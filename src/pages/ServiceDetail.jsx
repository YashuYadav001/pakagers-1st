import { Link, Navigate, useParams } from "react-router-dom";
import Reveal from "../components/Reveal";
import { Breadcrumbs, CTABand } from "../components/UI";
import { services, serviceBySlug, areas, business } from "../siteData";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceBySlug(slug);

  if (!service) return <Navigate to="/services" replace />;

  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="border-b border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] py-10 transition-colors">
        <div className="container-x">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Services", to: "/services" },
              { label: service.name },
            ]}
          />
          <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-semibold text-ink dark:text-white leading-tight">
                {service.name}
              </h1>
              <p className="mt-4 text-slate dark:text-slate-300 leading-relaxed text-sm sm:text-base">{service.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/calculator"
                  className="rounded-lg bg-ember px-5 py-3 text-sm font-semibold text-white hover:bg-ember2 transition-colors shadow-card"
                >
                  Estimate Cost →
                </Link>
                <Link
                  to="/contact"
                  className="rounded-lg border border-line dark:border-slate-700 px-5 py-3 text-sm font-semibold text-ink dark:text-white hover:bg-paper2 dark:hover:bg-slate-800 transition-colors"
                >
                  Get a free quote
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
              <img src={service.image} alt={service.name} className="h-72 w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-paper dark:bg-[#081220] transition-colors">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-display font-semibold text-ink dark:text-white">What's included</h2>
            <ul className="mt-5 space-y-3">
              {service.included.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-ink/85 dark:text-slate-200">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ember/10 text-ember">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-2xl font-display font-semibold text-ink dark:text-white">How it works</h2>
            <ol className="mt-5 space-y-5">
              {service.process.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink dark:bg-slate-800 text-xs font-semibold text-white border border-transparent dark:border-slate-700">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-ink dark:text-white text-sm">{step.title}</p>
                    <p className="mt-1 text-sm text-slate dark:text-slate-400 leading-relaxed">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper2 dark:bg-[#050d18] py-16 border-t border-line dark:border-slate-800 transition-colors">
        <div className="container-x">
          <h2 className="text-2xl font-display font-semibold text-ink dark:text-white">
            Available across East Bangalore
          </h2>
          <p className="mt-2 text-slate dark:text-slate-300">
            {service.name} is offered in every locality we serve, including:
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {areas.slice(0, 10).map((a) => (
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

      <section className="py-16 bg-paper dark:bg-[#081220] transition-colors">
        <div className="container-x">
          <h2 className="text-2xl font-display font-semibold text-ink dark:text-white">Other services</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="rounded-xl border border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] p-4 hover:shadow-card transition"
              >
                <img src={s.image} alt={s.name} className="h-28 w-full rounded-lg object-cover" />
                <p className="mt-3 font-semibold text-ink dark:text-white text-sm">{s.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
