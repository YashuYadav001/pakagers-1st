import { Link } from "react-router-dom";
import { business, services, areas } from "../siteData";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold text-white">{business.shortName}</p>
          <p className="mt-3 text-sm leading-relaxed">
            {business.tagline}. Serving households and businesses across East Bangalore since {business.founded}.
          </p>
          <p className="mt-4 text-sm">{business.hours}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Services &amp; Tools</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/calculator" className="text-ember font-semibold hover:text-white transition-colors">
                Cost Calculator →
              </Link>
            </li>
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="hover:text-white transition-colors">{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Popular areas</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {areas.slice(0, 8).map((a) => (
              <li key={a.slug}>
                <Link to={`/areas/${a.slug}`} className="hover:text-white transition-colors">{a.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href={`tel:${business.phone}`} className="hover:text-white transition-colors">{business.phoneDisplay}</a></li>
            <li><a href={`mailto:${business.email}`} className="hover:text-white transition-colors">{business.email}</a></li>
            <li>{business.address}</li>
          </ul>
          <Link
            to="/contact"
            className="mt-4 inline-block rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-white hover:bg-ember2 transition-colors"
          >
            Request a quote
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <p>GSTIN: {business.gst}</p>
        </div>
      </div>
    </footer>
  );
}
