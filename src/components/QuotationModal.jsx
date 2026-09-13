import React, { useState } from "react";
import { business } from "../siteData";

export default function QuotationModal({
  isOpen,
  onClose,
  quoteData,
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !quoteData) return null;

  const {
    refId,
    localityName,
    distanceKm,
    size,
    timing,
    floor,
    addons,
    baseFare,
    distanceCharge,
    floorCharge,
    addonsTotal,
    timingAdjAmount,
    displayLow,
    displayHigh,
  } = quoteData;

  const formattedQuoteText = `
*${business.name.toUpperCase()}*
*PRE-MOVE ESTIMATION SHEET*
Reference ID: ${refId}
Date: ${new Date().toLocaleDateString("en-IN")}
----------------------------------------
📍 Origin Hub: Mahadevapura / KR Puram Dispatch
📍 Delivery Corridor: ${localityName} (~${distanceKm} km)
📦 Relocation Scope: ${size.name}
🚛 Assigned Carrier: ${size.vehicle}
   Specs: ${size.vehicleSpecs?.dimensions || "Standard closed truck"} (${size.vehicleSpecs?.payloadKg || "Full capacity"})
🗓️ Moving Timing: ${timing.name} (${timing.badge})
🏢 Elevator / Floor Access: ${floor.label}
🛡️ Inclusions: ${addons.length > 0 ? addons.map((a) => a.label).join(", ") : "Standard transit handling"}
----------------------------------------
ESTIMATED PRICE BREAKDOWN:
• Base Relocation Fare: ₹${baseFare.toLocaleString()}
• Transit Distance Charge (${distanceKm} km): ₹${distanceCharge.toLocaleString()}
• Floor / Carrying Handling: ${floorCharge === 0 ? "Included" : `+₹${floorCharge.toLocaleString()}`}
• Add-ons & Packaging: ₹${addonsTotal.toLocaleString()}
• Timing Demand Adjustment: ${timingAdjAmount === 0 ? "₹0" : timingAdjAmount > 0 ? `+₹${timingAdjAmount.toLocaleString()} (${timing.badge})` : `-₹${Math.abs(timingAdjAmount).toLocaleString()} (${timing.badge})`}
----------------------------------------
*ESTIMATED COST RANGE: ₹${displayLow.toLocaleString()} – ₹${displayHigh.toLocaleString()}*
----------------------------------------
*Notice:* Non-binding estimate. Final price is confirmed following a free physical/video inventory survey.
Phone: ${business.phoneDisplay} | WhatsApp: Available
`.trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedQuoteText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(formattedQuoteText)}`;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:p-0 print:bg-white">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0c1a2e] text-ink dark:text-slate-100 p-6 sm:p-8 shadow-2xl border border-line dark:border-slate-700 print:max-h-none print:shadow-none print:border-0">
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-line dark:border-slate-700 pb-5 print:border-b-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded bg-ember text-white font-display font-bold text-sm">
                SE
              </span>
              <h3 className="font-display text-xl font-bold text-ink dark:text-white">
                {business.name}
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              East Bangalore Moving &amp; Relocation Estimate Sheet
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block rounded-full bg-paper2 dark:bg-slate-800 px-3 py-1 font-mono text-xs font-semibold text-ember">
              {refId}
            </span>
            <p className="mt-1 text-[11px] text-slate-400">
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <button
              onClick={onClose}
              className="mt-2 text-slate-400 hover:text-ink dark:hover:text-white print:hidden text-lg leading-none"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scope Matrix */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 rounded-xl bg-paper dark:bg-[#081220] p-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Destination</span>
            <b className="font-semibold text-ink dark:text-white">{localityName}</b>
            <span className="text-slate-500 block text-[10px]">~{distanceKm} km from central hub</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Move Scope</span>
            <b className="font-semibold text-ink dark:text-white">{size.name}</b>
            <span className="text-slate-500 block text-[10px]">Standard Household</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Assigned Carrier</span>
            <b className="font-semibold text-ink dark:text-white">{size.vehicle}</b>
            <span className="text-slate-500 block text-[10px]">{size.vehicleSpecs?.payloadKg} payload</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Schedule Window</span>
            <b className="font-semibold text-ink dark:text-white">{timing.badge}</b>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Access Conditions</span>
            <b className="font-semibold text-ink dark:text-white">{floor.label}</b>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Enclosure Guarantee</span>
            <b className="font-semibold text-ink dark:text-white">Weatherproof</b>
          </div>
        </div>

        {/* Financial Breakdown Table */}
        <div className="mt-6 space-y-2.5 text-sm">
          <div className="flex justify-between py-1.5 border-b border-line/60 dark:border-slate-800">
            <span className="text-slate-600 dark:text-slate-400">Base Fare ({size.name})</span>
            <span className="font-medium text-ink dark:text-white">₹{baseFare.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-line/60 dark:border-slate-800">
            <span className="text-slate-600 dark:text-slate-400">
              Corridor Transit ({distanceKm} km @ ₹{size.ratePerKm}/km)
            </span>
            <span className="font-medium text-ink dark:text-white">₹{distanceCharge.toLocaleString()}</span>
          </div>
          {floorCharge > 0 && (
            <div className="flex justify-between py-1.5 border-b border-line/60 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Floor Handling ({floor.label})</span>
              <span className="font-medium text-ink dark:text-white">+₹{floorCharge.toLocaleString()}</span>
            </div>
          )}
          {addons.length > 0 && (
            <div className="flex justify-between py-1.5 border-b border-line/60 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">
                Packaging &amp; Add-ons ({addons.length} items)
              </span>
              <span className="font-medium text-ink dark:text-white">+₹{addonsTotal.toLocaleString()}</span>
            </div>
          )}
          {timingAdjAmount !== 0 && (
            <div className="flex justify-between py-1.5 border-b border-line/60 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">
                Timing Demand Factor ({timing.name})
              </span>
              <span className={`font-medium ${timingAdjAmount < 0 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                {timingAdjAmount < 0 ? `-₹${Math.abs(timingAdjAmount).toLocaleString()}` : `+₹${timingAdjAmount.toLocaleString()}`}
              </span>
            </div>
          )}
        </div>

        {/* Highlighted Total Box */}
        <div className="mt-6 rounded-xl bg-gradient-to-br from-ember/10 to-amber-500/10 border border-ember/30 p-5 text-center">
          <span className="text-xs font-semibold tracking-wider text-ember uppercase">
            Estimated Cost Range
          </span>
          <div className="mt-1 text-3xl sm:text-4xl font-display font-bold text-ink dark:text-white">
            ₹{displayLow.toLocaleString()} – ₹{displayHigh.toLocaleString()}
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            *Final quote confirmed after pre-move physical or video inventory inspection.
          </p>
        </div>

        {/* Buttons Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg border border-line dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-ink dark:text-white hover:bg-paper2 transition-colors flex items-center gap-1.5"
            >
              {copied ? "✓ Copied to Clipboard!" : "📋 Copy Estimate"}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="rounded-lg border border-line dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-ink dark:text-white hover:bg-paper2 transition-colors flex items-center gap-1.5"
            >
              🖨️ Print / PDF
            </button>
          </div>
          <div className="flex gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#25D366] text-white px-5 py-2.5 text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              Share via WhatsApp
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-ember text-white px-5 py-2.5 text-xs font-semibold hover:bg-ember2 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
