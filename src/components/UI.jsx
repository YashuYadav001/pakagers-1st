import { Link } from "react-router-dom";
import { business } from "../siteData";

export function Eyebrow({ children }) {
  return <p className="text-sm font-semibold text-ember">{children}</p>;
}

export function SectionHeading({ eyebrow, title, sub, align = "left" }) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-2 text-3xl sm:text-4xl font-display font-semibold text-ink dark:text-white leading-tight">
        {title}
      </h2>
      {sub && <p className="mt-3 text-slate dark:text-slate-300 leading-relaxed text-sm sm:text-base">{sub}</p>}
    </div>
  );
}

export function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5 text-gold" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 20 20" fill={i < count ? "currentColor" : "#e6e9f0"}>
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

export function CTABand() {
  return (
    <section className="bg-ink dark:bg-[#050d18] border-t border-white/10 transition-colors">
      <div className="container-x py-14 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white">
            Ready to plan your move?
          </h3>
          <p className="mt-2 text-white/70 text-sm sm:text-base">
            Tell us your pickup and drop points — we'll call back with a clear estimate.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/calculator"
            className="rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Calculate Fare 📊
          </Link>
          <Link
            to="/contact"
            className="rounded-lg bg-ember px-5 py-3 text-sm font-semibold text-white hover:bg-ember2 transition-colors shadow-card"
          >
            Get a free quote
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate dark:text-slate-400">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-line dark:text-slate-700">/</span>}
            {item.to ? (
              <Link to={item.to} className="hover:text-ink dark:hover:text-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink dark:text-slate-200 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
