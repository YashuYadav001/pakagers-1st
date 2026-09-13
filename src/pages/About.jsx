import Reveal from "../components/Reveal";
import { Breadcrumbs, CTABand, SectionHeading } from "../components/UI";
import { business, stats, images } from "../siteData";

const values = [
  {
    title: "Written estimates, no surprises",
    detail: "Every job starts with a free survey and a quote in writing — the price you agree is the price you pay.",
  },
  {
    title: "Trained, background-checked crew",
    detail: "Our loaders and packers go through an onboarding process before they're sent to a customer's home.",
  },
  {
    title: "Local knowledge",
    detail: "Crews are assigned by locality, so they already know the lift sizes and access rules for your building.",
  },
];

export default function About() {
  return (
    <>
      <section className="border-b border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] py-10 transition-colors">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />
          <SectionHeading
            eyebrow="About us"
            title={`${business.shortName}, built for East Bangalore's pace of moving`}
            sub={`Founded in ${business.founded}, we started with a single truck serving Whitefield's early apartment blocks. Today our crews cover every major locality on the east side of the city.`}
          />
        </div>
      </section>

      <section className="py-16 bg-paper dark:bg-[#081220] transition-colors">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal className="overflow-hidden rounded-2xl shadow-xl border border-line dark:border-slate-800">
            <img src={images.crewPortrait2} alt="Shifting Expert crew member" className="h-80 w-full object-cover" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-2xl font-display font-semibold text-ink dark:text-white">Why customers choose us</h2>
            <div className="mt-6 space-y-6">
              {values.map((v) => (
                <div key={v.title} className="flex gap-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-ember" />
                  <div>
                    <p className="font-semibold text-ink dark:text-white text-sm">{v.title}</p>
                    <p className="mt-1 text-sm text-slate dark:text-slate-400 leading-relaxed">{v.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink dark:bg-[#050d18] py-16 transition-colors">
        <div className="container-x grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-display font-semibold text-white">{s.value}</p>
              <p className="mt-1 text-sm text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
