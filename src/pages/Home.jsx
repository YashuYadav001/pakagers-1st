import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";
import Reveal from "../components/Reveal";
import { SectionHeading, Stars, CTABand } from "../components/UI";
import CountUpStats from "../components/CountUpStats";
import PinnedProcess from "../components/PinnedProcess";
import CostCalculator from "../components/CostCalculator";
import {
  business,
  services,
  areas,
  testimonials,
  faqs,
  images,
} from "../siteData";

function Hero() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-eyebrow", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 })
        .fromTo(".hero-title", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.3")
        .fromTo(".hero-sub", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(".hero-cta", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.35")
        .fromTo(".hero-image", { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 1.1 }, "-=0.9")
        .fromTo(".hero-badge", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.4");

      // Scrubbed Parallax on hero image
      if (imageRef.current && window.innerWidth >= 768) {
        gsap.to(imageRef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-ink dark:bg-[#050d18] transition-colors">
      <div className="container-x relative z-10 grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="hero-eyebrow text-sm font-semibold text-ember">
            Packers &amp; movers · East Bangalore
          </p>
          <h1 className="hero-title mt-3 text-4xl sm:text-5xl font-display font-semibold leading-[1.08] text-white">
            Your move, planned to the last carton.
          </h1>
          <p className="hero-sub mt-5 max-w-md text-white/70 leading-relaxed text-sm sm:text-base">
            {business.shortName} handles house shifts, office relocations and
            everything in between across Whitefield, Marathahalli, Indiranagar
            and the rest of East Bangalore — with a written estimate before
            anything moves.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/calculator"
              className="hero-cta rounded-lg bg-ember px-6 py-3.5 text-sm font-semibold text-white shadow-card hover:bg-ember2 transition-colors flex items-center gap-1.5"
            >
              <span>Calculate Move Fare</span>
              <span>→</span>
            </Link>
            <Link
              to="/contact"
              className="hero-cta rounded-lg border border-white/25 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Free Survey
            </Link>
            <a
              href={`tel:${business.phone}`}
              className="hero-cta rounded-lg border border-white/20 px-5 py-3.5 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors hidden sm:inline-block"
            >
              Call {business.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="hero-image overflow-hidden rounded-2xl shadow-2xl">
            <img
              ref={imageRef}
              src={images.heroTruck}
              alt="Moving truck loaded for a house shift in Bangalore"
              className="h-72 w-full object-cover sm:h-96 will-change-transform"
            />
          </div>
          <div className="hero-badge absolute -bottom-6 -left-4 sm:-left-8 rounded-xl bg-white dark:bg-[#0c1a2e] border border-line dark:border-slate-700 p-4 shadow-card text-ink dark:text-white">
            <div className="flex items-center gap-3">
              <Stars count={5} />
              <span className="text-sm font-semibold">4.8/5</span>
            </div>
            <p className="mt-1 text-xs text-slate dark:text-slate-400">from 900+ verified moves</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section className="py-20 bg-paper dark:bg-[#081220] transition-colors">
      <div className="container-x">
        <SectionHeading
          eyebrow="What we do"
          title="Every stage of the move, covered"
          sub="Book one service or the full package — our crews scale to a single room or an entire office floor."
        />
        <Reveal
          as="div"
          stagger={0.08}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="group rounded-2xl border border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] p-5 shadow-card hover:-translate-y-1 transition-all"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={s.image}
                  alt={s.name}
                  className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-display font-semibold text-ink dark:text-white">{s.name}</h3>
              <p className="mt-1.5 text-sm text-slate dark:text-slate-400 leading-relaxed">{s.short}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-ember">
                Learn more →
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function AreasGrid() {
  return (
    <section className="bg-paper2 dark:bg-[#050d18] py-20 border-t border-line dark:border-slate-850 transition-colors">
      <div className="container-x">
        <SectionHeading
          eyebrow="Where we work"
          title="Local crews across East Bangalore"
          sub="Each locality has its own access quirks — narrow lanes, gated societies, tower lifts. Our crews already know them."
        />
        <Reveal
          as="div"
          stagger={0.04}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        >
          {areas.map((a) => (
            <Link
              key={a.slug}
              to={`/areas/${a.slug}`}
              className="rounded-xl border border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] px-4 py-4 hover:border-ember/40 hover:shadow-card transition"
            >
              <p className="font-display font-semibold text-ink dark:text-white text-sm">{a.name}</p>
              <p className="mt-1 text-xs text-slate dark:text-slate-400 leading-relaxed">{a.note}</p>
            </Link>
          ))}
        </Reveal>
        <div className="mt-8 text-center">
          <Link to="/areas" className="text-sm font-semibold text-ember">
            View all areas we serve →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-20 bg-paper dark:bg-[#081220] transition-colors">
      <div className="container-x">
        <SectionHeading
          eyebrow="Customer stories"
          title="What East Bangalore residents say"
          align="left"
        />
        <Reveal as="div" stagger={0.1} className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] p-6 shadow-card">
              <Stars count={t.rating} />
              <p className="mt-4 text-sm text-ink/85 dark:text-slate-200 leading-relaxed">“{t.quote}”</p>
              <p className="mt-4 text-sm font-semibold text-ink dark:text-white">{t.name}</p>
              <p className="text-xs text-slate dark:text-slate-400">{t.area}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="bg-paper2 dark:bg-[#050d18] py-20 border-t border-line dark:border-slate-800 transition-colors">
      <div className="container-x max-w-3xl">
        <SectionHeading eyebrow="Questions" title="Frequently asked" align="left" />
        <Reveal as="div" stagger={0.06} className="mt-8 divide-y divide-line dark:divide-slate-800 rounded-2xl border border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e]">
          {faqs.map((f) => (
            <details key={f.q} className="group px-6 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink dark:text-white">
                {f.q}
                <span className="shrink-0 text-slate dark:text-slate-400 transition-transform group-open:rotate-45">＋</span>
              </summary>
              <p className="mt-2 text-sm text-slate dark:text-slate-300 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <CountUpStats />

      {/* Featured Distance-Based Cost Calculator Section */}
      <section className="py-20 bg-paper2 dark:bg-[#050d18] border-b border-line dark:border-slate-850 transition-colors">
        <div className="container-x">
          <SectionHeading
            eyebrow="Instant Estimation Engine"
            title="Calculate Your Relocation Fare in Seconds"
            sub="Pick your East Bangalore corridor, home/office volume, and move timing for an animated price range with vehicle specifications."
          />
          <CostCalculator compact />
        </div>
      </section>

      <ServicesGrid />
      <PinnedProcess />
      <AreasGrid />
      <Testimonials />
      <FAQSection />
      <CTABand />
    </>
  );
}
