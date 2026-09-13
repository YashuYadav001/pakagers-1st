import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import {
  business,
  DISPATCH_CENTER,
  LOCALITY_DISTANCES,
  MOVE_SIZES,
  MOVE_TIMINGS,
  FLOOR_CONDITIONS,
  CALCULATOR_ADDONS,
} from "../siteData";
import QuotationModal from "./QuotationModal";

export default function CostCalculator({ compact = false }) {
  const [selectedLocality, setSelectedLocality] = useState(LOCALITY_DISTANCES[0].slug);
  const [distanceKm, setDistanceKm] = useState(LOCALITY_DISTANCES[0].distanceKm);
  const [selectedSizeId, setSelectedSizeId] = useState("2bhk");
  const [selectedTimingId, setSelectedTimingId] = useState("standard-weekday");
  const [selectedFloorId, setSelectedFloorId] = useState("lift");
  const [selectedAddons, setSelectedAddons] = useState(["multi-pack"]);
  const [showModal, setShowModal] = useState(false);

  // GSAP tweening counters
  const priceLowObj = useRef({ val: 8200 });
  const priceHighObj = useRef({ val: 9800 });
  const [displayLow, setDisplayLow] = useState(8200);
  const [displayHigh, setDisplayHigh] = useState(9800);

  const quoteRefId = useRef(`SE-BLR-${Math.floor(1000 + Math.random() * 9000)}`);

  const handleLocalityChange = (slug) => {
    setSelectedLocality(slug);
    const loc = LOCALITY_DISTANCES.find((l) => l.slug === slug);
    if (loc && loc.slug !== "custom") {
      setDistanceKm(loc.distanceKm);
    }
  };

  const handleSliderChange = (km) => {
    const val = Number(km);
    setDistanceKm(val);
    const matched = LOCALITY_DISTANCES.find((l) => l.distanceKm === val && l.slug !== "custom");
    if (matched) {
      setSelectedLocality(matched.slug);
    } else {
      setSelectedLocality("custom");
    }
  };

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Find objects
  const selectedSize = useMemo(
    () => MOVE_SIZES.find((s) => s.id === selectedSizeId) || MOVE_SIZES[2],
    [selectedSizeId]
  );
  const selectedTiming = useMemo(
    () => MOVE_TIMINGS.find((t) => t.id === selectedTimingId) || MOVE_TIMINGS[1],
    [selectedTimingId]
  );
  const selectedFloor = useMemo(
    () => FLOOR_CONDITIONS.find((f) => f.id === selectedFloorId) || FLOOR_CONDITIONS[0],
    [selectedFloorId]
  );

  // Calculations
  const baseFare = selectedSize.baseFare;
  const distanceCharge = Math.round(selectedSize.ratePerKm * distanceKm);
  const floorCharge = selectedFloor.charge;
  const addonsTotal = useMemo(() => {
    return selectedAddons.reduce((sum, id) => {
      const item = CALCULATOR_ADDONS.find((a) => a.id === id);
      return sum + (item ? item.price : 0);
    }, 0);
  }, [selectedAddons]);

  const subtotal = baseFare + distanceCharge + floorCharge + addonsTotal;
  const timingAdjAmount = Math.round(subtotal * (selectedTiming.multiplier - 1));
  const finalCalculated = subtotal + timingAdjAmount;

  const calculatedLow = Math.round(finalCalculated);
  const calculatedHigh = Math.round(finalCalculated * 1.15);

  // GSAP tween
  useEffect(() => {
    const tweenLow = gsap.to(priceLowObj.current, {
      val: calculatedLow,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => setDisplayLow(Math.round(priceLowObj.current.val)),
    });

    const tweenHigh = gsap.to(priceHighObj.current, {
      val: calculatedHigh,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => setDisplayHigh(Math.round(priceHighObj.current.val)),
    });

    return () => {
      tweenLow.kill();
      tweenHigh.kill();
    };
  }, [calculatedLow, calculatedHigh]);

  const activeLocalityObj = LOCALITY_DISTANCES.find((l) => l.slug === selectedLocality);
  const localityDisplayName =
    activeLocalityObj && activeLocalityObj.slug !== "custom"
      ? activeLocalityObj.name
      : `${distanceKm} km transit`;

  const isTollRoute = distanceKm >= 18 || selectedLocality === "hoskote";

  const quotePayload = {
    refId: quoteRefId.current,
    localityName: localityDisplayName,
    distanceKm,
    size: selectedSize,
    timing: selectedTiming,
    floor: selectedFloor,
    addons: CALCULATOR_ADDONS.filter((a) => selectedAddons.includes(a.id)),
    baseFare,
    distanceCharge,
    floorCharge,
    addonsTotal,
    timingAdjAmount,
    displayLow,
    displayHigh,
  };

  const whatsappMsg = encodeURIComponent(
    `Hello ${business.name}! I checked an estimate for ${selectedSize.name} to ${localityDisplayName} (~${distanceKm}km). Schedule: ${selectedTiming.name}. Estimated range: ₹${displayLow.toLocaleString()} – ₹${displayHigh.toLocaleString()}. Quote Ref: ${quoteRefId.current}. Please assist with survey booking.`
  );

  return (
    <div className={`my-8 ${compact ? "max-w-4xl mx-auto" : ""}`}>
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Relocation Size */}
          <div className="rounded-2xl border border-line dark:border-slate-700 bg-white dark:bg-[#0c1a2e] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ember text-white font-display font-bold text-sm">
                1
              </span>
              <div>
                <h4 className="font-display font-bold text-ink dark:text-white text-base">
                  Choose Move Size
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select apartment volume or office fleet size
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {MOVE_SIZES.map((size) => (
                <button
                  type="button"
                  key={size.id}
                  onClick={() => setSelectedSizeId(size.id)}
                  className={`relative rounded-xl border p-3.5 text-left transition-all ${
                    selectedSizeId === size.id
                      ? "border-ember bg-ember/5 dark:bg-ember/10 shadow-sm"
                      : "border-line dark:border-slate-700 bg-paper/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <b className="font-display font-semibold text-xs sm:text-sm text-ink dark:text-white block">
                      {size.name}
                    </b>
                    {size.popular && (
                      <span className="rounded bg-ember px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {size.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">🚛 {size.vehicle.split("/")[0]}</span>
                    <span className="font-bold text-ember">₹{size.baseFare.toLocaleString()}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Vehicle Fleet Visualizer Banner */}
            {selectedSize.vehicleSpecs && (
              <div className="mt-4 rounded-xl border border-line dark:border-slate-700/80 bg-paper2 dark:bg-[#081220] p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🚚</span>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                      Vehicle Fleet Specs
                    </span>
                    <b className="text-ink dark:text-white font-semibold">
                      {selectedSize.vehicle}
                    </b>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-300 text-xs">
                  <span>📐 {selectedSize.vehicleSpecs.dimensions}</span>
                  <span>⚖️ {selectedSize.vehicleSpecs.payloadKg}</span>
                  <span className="rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 font-medium text-[10px]">
                    {selectedSize.vehicleSpecs.seal}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Distance & Corridor */}
          <div className="rounded-2xl border border-line dark:border-slate-700 bg-white dark:bg-[#0c1a2e] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ember text-white font-display font-bold text-sm">
                2
              </span>
              <div>
                <h4 className="font-display font-bold text-ink dark:text-white text-base">
                  Transit Distance &amp; Locality
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Calculated from {DISPATCH_CENTER.name}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select East Bangalore Corridor:
                </label>
                <select
                  value={selectedLocality}
                  onChange={(e) => handleLocalityChange(e.target.value)}
                  className="w-full rounded-xl border border-line dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-ink dark:text-white focus:border-ember focus:outline-none focus:ring-1 focus:ring-ember"
                >
                  {LOCALITY_DISTANCES.map((loc) => (
                    <option key={loc.slug} value={loc.slug}>
                      {loc.name} {loc.slug !== "custom" ? `(~${loc.distanceKm} km from hub)` : "(Custom distance)"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Slider */}
              <div className="rounded-xl border border-line dark:border-slate-700 bg-paper dark:bg-[#081220] p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-ink dark:text-white mb-2">
                  <span>Manual Distance Fine-Tuning</span>
                  <span className="rounded-full bg-ember px-3 py-0.5 text-xs font-bold text-white">
                    {distanceKm} km
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={distanceKm}
                  onChange={(e) => handleSliderChange(e.target.value)}
                  className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 appearance-none cursor-pointer accent-ember"
                  aria-label="Distance in kilometers"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>1 km (Local)</span>
                  <span>10 km (Whitefield)</span>
                  <span>25 km (Outer East)</span>
                  <span>60 km (Regional)</span>
                </div>
              </div>

              {/* Toll Route Advisory */}
              {isTollRoute && (
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 p-3 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                  <span>ℹ️</span>
                  <span>
                    <b>Highway Corridor Note:</b> Routes exceeding 18 km or crossing Hoskote/Outer bypass may involve NHAI/state toll points. Commercial vehicle toll charges are billed at actuals.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Step 3: Move Timing & Schedule Demand (ESSENTIAL) */}
          <div className="rounded-2xl border border-line dark:border-slate-700 bg-white dark:bg-[#0c1a2e] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ember text-white font-display font-bold text-sm">
                3
              </span>
              <div>
                <h4 className="font-display font-bold text-ink dark:text-white text-base">
                  Move Schedule &amp; Timing Demand
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Off-peak discounts vs weekend/month-end demand rates
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-2.5">
              {MOVE_TIMINGS.map((timing) => (
                <label
                  key={timing.id}
                  className={`flex items-start justify-between rounded-xl border p-3.5 cursor-pointer transition-colors ${
                    selectedTimingId === timing.id
                      ? "border-ember bg-ember/5 dark:bg-ember/10"
                      : "border-line dark:border-slate-700 bg-white dark:bg-slate-800/40 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="radio"
                      name="timing"
                      value={timing.id}
                      checked={selectedTimingId === timing.id}
                      onChange={() => setSelectedTimingId(timing.id)}
                      className="mt-1 text-ember focus:ring-ember"
                    />
                    <div>
                      <b className="font-semibold text-xs sm:text-sm text-ink dark:text-white block">
                        {timing.name}
                      </b>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        {timing.note}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold shrink-0 ${
                      timing.badgeType === "discount"
                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                        : timing.badgeType === "surge"
                        ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {timing.badge}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Step 4: Floor & Elevators */}
          <div className="rounded-2xl border border-line dark:border-slate-700 bg-white dark:bg-[#0c1a2e] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ember text-white font-display font-bold text-sm">
                4
              </span>
              <div>
                <h4 className="font-display font-bold text-ink dark:text-white text-base">
                  Floor &amp; Elevator Setup
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ergonomics and stairs carrying coordination
                </p>
              </div>
            </div>

            <div className="grid gap-2">
              {FLOOR_CONDITIONS.map((floor) => (
                <label
                  key={floor.id}
                  className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer text-xs transition-colors ${
                    selectedFloorId === floor.id
                      ? "border-ember bg-ember/5 dark:bg-ember/10"
                      : "border-line dark:border-slate-700 bg-white dark:bg-slate-800/40 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="floor"
                      value={floor.id}
                      checked={selectedFloorId === floor.id}
                      onChange={() => setSelectedFloorId(floor.id)}
                      className="text-ember focus:ring-ember"
                    />
                    <span className="text-slate-700 dark:text-slate-200">{floor.label}</span>
                  </div>
                  <b className="text-ink dark:text-white">
                    {floor.charge === 0 ? "Included" : `+₹${floor.charge}`}
                  </b>
                </label>
              ))}
            </div>
          </div>

          {/* Step 5: Safety & Add-ons */}
          <div className="rounded-2xl border border-line dark:border-slate-700 bg-white dark:bg-[#0c1a2e] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ember text-white font-display font-bold text-sm">
                5
              </span>
              <div>
                <h4 className="font-display font-bold text-ink dark:text-white text-base">
                  Protection &amp; Value Add-ons
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Optional multi-layer packaging, mounting, and storage
                </p>
              </div>
            </div>

            <div className="grid gap-2.5">
              {CALCULATOR_ADDONS.map((addon) => (
                <label
                  key={addon.id}
                  className={`flex items-center justify-between rounded-xl border p-3.5 cursor-pointer text-xs transition-colors ${
                    selectedAddons.includes(addon.id)
                      ? "border-ember bg-ember/5 dark:bg-ember/10"
                      : "border-line dark:border-slate-700 bg-white dark:bg-slate-800/40 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => toggleAddon(addon.id)}
                      className="text-ember focus:ring-ember rounded"
                    />
                    <div>
                      <b className="text-ink dark:text-white font-semibold block">{addon.label}</b>
                      <span className="text-[11px] text-slate-400">Professional technician handling</span>
                    </div>
                  </div>
                  <span className="font-bold text-ember shrink-0">+₹{addon.price.toLocaleString()}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Price & Estimation Sheet */}
        <div className="lg:col-span-5 sticky top-20">
          <div className="rounded-2xl border-2 border-ember/40 bg-white dark:bg-[#0c1a2e] p-6 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold tracking-wider text-ember uppercase">
                Estimated Price Range
              </span>
              <span className="rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-2.5 py-0.5 text-[10px] font-semibold">
                Non-Binding Estimate
              </span>
            </div>

            {/* GSAP Animated Counter */}
            <div className="rounded-xl bg-paper dark:bg-[#081220] border border-line dark:border-slate-700 p-5 text-center my-3">
              <div className="flex items-baseline justify-center gap-1.5 text-ink dark:text-white">
                <span className="text-xl font-bold">₹</span>
                <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {displayLow.toLocaleString()}
                </span>
                <span className="text-slate-400 mx-1">–</span>
                <span className="text-xl font-bold">₹</span>
                <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {displayHigh.toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                {selectedSize.name} · ~{distanceKm} km · {selectedTiming.badge}
              </p>
            </div>

            {/* Itemized Calculation */}
            <div className="mt-5 space-y-2 text-xs border-t border-b border-line dark:border-slate-800 py-3.5">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Base Moving Fare ({selectedSize.name})</span>
                <b className="text-ink dark:text-white">₹{baseFare.toLocaleString()}</b>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Transit ({distanceKm} km @ ₹{selectedSize.ratePerKm}/km)</span>
                <b className="text-ink dark:text-white">₹{distanceCharge.toLocaleString()}</b>
              </div>
              {floorCharge > 0 && (
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Floor Handling ({selectedFloor.label})</span>
                  <b className="text-ink dark:text-white">+₹{floorCharge.toLocaleString()}</b>
                </div>
              )}
              {addonsTotal > 0 && (
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Selected Add-ons ({selectedAddons.length})</span>
                  <b className="text-ink dark:text-white">+₹{addonsTotal.toLocaleString()}</b>
                </div>
              )}
              {timingAdjAmount !== 0 && (
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Demand Schedule Factor</span>
                  <b className={timingAdjAmount < 0 ? "text-emerald-600" : "text-amber-600"}>
                    {timingAdjAmount < 0 ? `-₹${Math.abs(timingAdjAmount).toLocaleString()}` : `+₹${timingAdjAmount.toLocaleString()}`}
                  </b>
                </div>
              )}
            </div>

            {/* Clear Estimation Notice */}
            <div className="mt-4 rounded-xl bg-paper2 dark:bg-[#081220] p-3 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              <b>Important Notice:</b> This tool provides a transparent planning guideline. Official quotes are confirmed via a free video or in-person inventory check to verify fragile packing and elevator access.
            </div>

            {/* CTAs */}
            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="w-full rounded-xl bg-ink dark:bg-slate-800 text-white dark:text-white py-3 text-xs font-bold hover:bg-ink2 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                📄 View Formal Quotation &amp; PDF
              </button>

              <a
                href={`https://wa.me/?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-[#25D366] text-white py-3 text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-sm"
              >
                Share Quote on WhatsApp <span>↗</span>
              </a>

              <Link
                to="/contact"
                className="w-full rounded-xl bg-ember text-white py-3 text-xs font-bold hover:bg-ember2 transition-colors flex items-center justify-center gap-1.5 shadow-card"
              >
                Book Free Pre-Move Survey <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Formal Quotation Sheet Modal */}
      <QuotationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        quoteData={quotePayload}
      />
    </div>
  );
}
