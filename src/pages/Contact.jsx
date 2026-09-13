import { useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, SectionHeading } from "../components/UI";
import { business, services, areas } from "../siteData";

const initialForm = {
  name: "",
  phone: "",
  service: services[0].slug,
  area: areas[0].slug,
  moveDate: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sent | error
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Enter your name.";
    if (!/^[+\d][\d\s-]{7,15}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number.";
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setStatus("idle");
      return;
    }
    const serviceName = services.find((s) => s.slug === form.service)?.name;
    const areaName = areas.find((a) => a.slug === form.area)?.name;
    const subject = encodeURIComponent(`Moving enquiry — ${serviceName} in ${areaName}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nService: ${serviceName}\nArea: ${areaName}\nPreferred date: ${form.moveDate || "—"}\n\nMessage:\n${form.message || "—"}`
    );
    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  function handleWhatsApp() {
    const serviceName = services.find((s) => s.slug === form.service)?.name;
    const areaName = areas.find((a) => a.slug === form.area)?.name;
    const text = encodeURIComponent(
      `Hi, I'd like a quote for ${serviceName} in ${areaName}. Name: ${form.name || "—"}, Phone: ${form.phone || "—"}`
    );
    window.open(`https://wa.me/${business.whatsapp}?text=${text}`, "_blank");
  }

  return (
    <>
      <section className="border-b border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] py-10 transition-colors">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
          <SectionHeading
            eyebrow="Get in touch"
            title="Tell us about your move"
            sub="Share a few details and we'll call back with a written estimate — usually within a couple of hours during business hours."
          />
        </div>
      </section>

      <section className="py-16 bg-paper dark:bg-[#081220] transition-colors">
        <div className="container-x grid gap-10 lg:grid-cols-5">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-2xl border border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] p-6 sm:p-8 shadow-card transition-colors"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-ink dark:text-slate-200">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-line dark:border-slate-700 px-3.5 py-2.5 text-sm text-ink dark:text-white bg-white dark:bg-slate-800 focus:border-ember outline-none"
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-xs text-ember2">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="text-sm font-medium text-ink dark:text-slate-200">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-line dark:border-slate-700 px-3.5 py-2.5 text-sm text-ink dark:text-white bg-white dark:bg-slate-800 focus:border-ember outline-none"
                  placeholder="+91 90000 00000"
                />
                {errors.phone && <p className="mt-1 text-xs text-ember2">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="service" className="text-sm font-medium text-ink dark:text-slate-200">
                  Service needed
                </label>
                <select
                  id="service"
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-line dark:border-slate-700 px-3.5 py-2.5 text-sm text-ink dark:text-white focus:border-ember outline-none bg-white dark:bg-slate-800"
                >
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="area" className="text-sm font-medium text-ink dark:text-slate-200">
                  Area
                </label>
                <select
                  id="area"
                  value={form.area}
                  onChange={(e) => update("area", e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-line dark:border-slate-700 px-3.5 py-2.5 text-sm text-ink dark:text-white focus:border-ember outline-none bg-white dark:bg-slate-800"
                >
                  {areas.map((a) => (
                    <option key={a.slug} value={a.slug}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="moveDate" className="text-sm font-medium text-ink dark:text-slate-200">
                  Preferred move date
                </label>
                <input
                  id="moveDate"
                  type="date"
                  value={form.moveDate}
                  onChange={(e) => update("moveDate", e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-line dark:border-slate-700 px-3.5 py-2.5 text-sm text-ink dark:text-white bg-white dark:bg-slate-800 focus:border-ember outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="text-sm font-medium text-ink dark:text-slate-200">
                  Anything we should know?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-line dark:border-slate-700 px-3.5 py-2.5 text-sm text-ink dark:text-white bg-white dark:bg-slate-800 focus:border-ember outline-none"
                  placeholder="Number of rooms, floor, lift availability, fragile items…"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-ember py-3 text-sm font-semibold text-white hover:bg-ember2 transition-colors shadow-card"
              >
                Send enquiry
              </button>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex-1 rounded-lg border border-line dark:border-slate-700 py-3 text-sm font-semibold text-ink dark:text-white hover:bg-paper2 dark:hover:bg-slate-800 transition-colors"
              >
                Send on WhatsApp instead
              </button>
            </div>

            {status === "sent" && (
              <p className="mt-4 rounded-lg bg-paper2 dark:bg-slate-800 px-4 py-3 text-sm text-ink dark:text-white">
                Your email app should now open with the enquiry drafted — send it and we'll reply shortly.
              </p>
            )}

            <div className="mt-4 pt-4 border-t border-line dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Need an instant price estimate right now?</span>
              <Link to="/calculator" className="font-semibold text-ember hover:underline">
                Open Cost Calculator →
              </Link>
            </div>
          </form>

          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] p-6 shadow-card transition-colors">
              <p className="text-sm font-semibold text-ink dark:text-white">Call or WhatsApp</p>
              <a href={`tel:${business.phone}`} className="mt-2 block text-lg font-display font-semibold text-ink dark:text-white hover:text-ember transition-colors">
                {business.phoneDisplay}
              </a>
              <p className="mt-1 text-sm text-slate dark:text-slate-400">{business.hours}</p>
            </div>

            <div className="rounded-2xl border border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] p-6 shadow-card transition-colors">
              <p className="text-sm font-semibold text-ink dark:text-white">Email</p>
              <a href={`mailto:${business.email}`} className="mt-2 block text-sm text-ink dark:text-white hover:text-ember transition-colors">
                {business.email}
              </a>
            </div>

            <div className="rounded-2xl border border-line dark:border-slate-800 bg-white dark:bg-[#0c1a2e] p-6 shadow-card transition-colors">
              <p className="text-sm font-semibold text-ink dark:text-white">Central Dispatch Hub</p>
              <p className="mt-2 text-sm text-slate dark:text-slate-400 leading-relaxed">{business.address}</p>
            </div>

            <div className="rounded-2xl border border-ember/30 bg-ember/5 dark:bg-ember/10 p-5 text-xs text-ink dark:text-white">
              <b className="font-semibold block text-sm text-ember">Online Estimate Tool Available</b>
              <p className="mt-1 text-slate-600 dark:text-slate-300">
                You can generate a formal moving quote with distance calculations in under a minute.
              </p>
              <Link to="/calculator" className="mt-3 inline-block font-bold text-ember hover:underline">
                Launch Distance Calculator →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
