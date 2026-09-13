import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { business, services, areas } from "../siteData";
import ThemeToggle from "./ThemeToggle";

const navLink =
  "text-sm font-medium text-ink/80 dark:text-slate-300 hover:text-ink dark:hover:text-white transition-colors";
const navLinkActive = "text-ember font-semibold dark:text-ember";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(null); // 'services' | 'areas' | null
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "bg-paper/95 dark:bg-[#081220]/95 backdrop-blur shadow-[0_1px_0_0_#dde2ec] dark:shadow-[0_1px_0_0_#1e293b]"
          : "bg-paper/95 dark:bg-[#081220]/95 backdrop-blur"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink dark:bg-slate-800 text-paper font-display font-bold border border-transparent dark:border-slate-700">
            SE
          </span>
          <span className="font-display font-semibold text-ink dark:text-white leading-tight">
            {business.shortName}
            <span className="block text-[11px] font-body font-normal text-slate dark:text-slate-400">
              East Bangalore
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          <NavLink to="/" end className={({ isActive }) => `${navLink} ${isActive ? navLinkActive : ""}`}>
            Home
          </NavLink>

          <NavLink to="/calculator" className={({ isActive }) => `${navLink} ${isActive ? navLinkActive : ""}`}>
            <span className="flex items-center gap-1">
              <span>Calculator</span>
              <span className="rounded bg-ember/15 dark:bg-ember/25 text-ember text-[10px] font-bold px-1.5 py-0.2">
                ESTIMATE
              </span>
            </span>
          </NavLink>

          <div
            className="relative"
            onMouseEnter={() => setMenu("services")}
            onMouseLeave={() => setMenu(null)}
          >
            <button className={`${navLink} flex items-center gap-1`}>
              Services
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            {menu === "services" && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                <div className="w-72 rounded-xl border border-line dark:border-slate-700 bg-white dark:bg-[#0c1a2e] p-2 shadow-card">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm text-ink/80 dark:text-slate-200 hover:bg-paper2 dark:hover:bg-slate-800 hover:text-ink dark:hover:text-white"
                    >
                      {s.name}
                    </Link>
                  ))}
                  <Link
                    to="/services"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-ember hover:bg-paper2 dark:hover:bg-slate-800"
                  >
                    View all services →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setMenu("areas")}
            onMouseLeave={() => setMenu(null)}
          >
            <button className={`${navLink} flex items-center gap-1`}>
              Areas we serve
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            {menu === "areas" && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                <div className="grid w-[440px] grid-cols-2 gap-1 rounded-xl border border-line dark:border-slate-700 bg-white dark:bg-[#0c1a2e] p-2 shadow-card">
                  {areas.map((a) => (
                    <Link
                      key={a.slug}
                      to={`/areas/${a.slug}`}
                      className="rounded-lg px-3 py-2 text-sm text-ink/80 dark:text-slate-200 hover:bg-paper2 dark:hover:bg-slate-800 hover:text-ink dark:hover:text-white"
                    >
                      {a.name}
                    </Link>
                  ))}
                  <Link
                    to="/areas"
                    className="col-span-2 rounded-lg px-3 py-2 text-sm font-medium text-ember hover:bg-paper2 dark:hover:bg-slate-800"
                  >
                    View all areas →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <NavLink to="/about" className={({ isActive }) => `${navLink} ${isActive ? navLinkActive : ""}`}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${navLink} ${isActive ? navLinkActive : ""}`}>
            Contact
          </NavLink>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <a href={`tel:${business.phone}`} className="text-sm font-semibold text-ink dark:text-white">
            {business.phoneDisplay}
          </a>
          <Link
            to="/contact"
            className="rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-white shadow-card hover:bg-ember2 transition-colors"
          >
            Get a free quote
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-lg border border-line dark:border-slate-700 bg-white dark:bg-slate-800 text-ink dark:text-white"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line dark:border-slate-800 bg-paper dark:bg-[#081220]">
          <div className="container-x py-4 flex flex-col gap-1">
            <Link to="/" className="rounded-lg px-3 py-2 text-sm font-medium text-ink dark:text-white hover:bg-paper2 dark:hover:bg-slate-800">
              Home
            </Link>
            <Link to="/calculator" className="rounded-lg px-3 py-2 text-sm font-medium text-ember hover:bg-paper2 dark:hover:bg-slate-800 flex items-center justify-between">
              <span>Distance Cost Calculator</span>
              <span className="rounded bg-ember/20 text-ember text-[10px] font-bold px-2 py-0.5">ESTIMATE</span>
            </Link>

            <p className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate dark:text-slate-400">
              Services
            </p>
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="rounded-lg px-3 py-1.5 text-sm text-ink/80 dark:text-slate-300 hover:bg-paper2 dark:hover:bg-slate-800"
              >
                {s.name}
              </Link>
            ))}

            <p className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate dark:text-slate-400">
              Areas we serve
            </p>
            <div className="grid grid-cols-2">
              {areas.map((a) => (
                <Link
                  key={a.slug}
                  to={`/areas/${a.slug}`}
                  className="rounded-lg px-3 py-1.5 text-sm text-ink/80 dark:text-slate-300 hover:bg-paper2 dark:hover:bg-slate-800"
                >
                  {a.name}
                </Link>
              ))}
            </div>

            <Link to="/about" className="rounded-lg px-3 py-2 text-sm font-medium text-ink dark:text-white hover:bg-paper2 dark:hover:bg-slate-800 mt-2">
              About
            </Link>
            <Link to="/contact" className="rounded-lg px-3 py-2 text-sm font-medium text-ink dark:text-white hover:bg-paper2 dark:hover:bg-slate-800">
              Contact
            </Link>

            <div className="mt-3 flex gap-2">
              <a
                href={`tel:${business.phone}`}
                className="flex-1 rounded-lg border border-line dark:border-slate-700 px-4 py-2.5 text-center text-sm font-semibold text-ink dark:text-white"
              >
                Call now
              </a>
              <Link
                to="/contact"
                className="flex-1 rounded-lg bg-ember px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Free quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
