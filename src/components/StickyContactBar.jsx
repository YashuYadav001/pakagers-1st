import { Link } from "react-router-dom";
import { business } from "../siteData";

export default function StickyContactBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-line dark:border-slate-800 bg-white/95 dark:bg-[#081220]/95 backdrop-blur px-3 py-2 flex gap-2 shadow-lg transition-colors">
      <Link
        to="/calculator"
        className="flex-1 rounded-lg border border-line dark:border-slate-700 bg-paper2 dark:bg-slate-800 py-2.5 text-center text-xs font-semibold text-ink dark:text-white flex items-center justify-center gap-1"
      >
        <span>📊</span>
        <span>Estimate</span>
      </Link>
      <a
        href={`tel:${business.phone}`}
        className="flex-1 rounded-lg bg-ink dark:bg-slate-700 py-2.5 text-center text-xs font-semibold text-white flex items-center justify-center gap-1"
      >
        <span>☎</span>
        <span>Call</span>
      </a>
      <a
        href={`https://wa.me/${business.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="flex-1 rounded-lg bg-ember py-2.5 text-center text-xs font-semibold text-white flex items-center justify-center gap-1 shadow-sm"
      >
        <span>◉</span>
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
