import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import {
  business,
  areas,
  services,
  MOVE_SIZES,
  CHAT_SUGGESTIONS,
} from "../siteData";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: `Hello! 👋 I am the ${business.shortName} Assistant. How can I help you plan your East Bangalore move today?`,
      suggestions: CHAT_SUGGESTIONS.slice(0, 3),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const panelRef = useRef(null);
  const messagesEndRef = useRef(null);
  const dotsRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const panel = panelRef.current;
    if (isOpen && panel) {
      gsap.fromTo(
        panel,
        { opacity: 0, scale: 0.88, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "back.out(1.3)" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (isTyping && dotsRef.current) {
      const dots = dotsRef.current.children;
      const tween = gsap.to(dots, {
        y: -4,
        stagger: {
          each: 0.15,
          repeat: -1,
          yoyo: true,
        },
        duration: 0.35,
        ease: "power1.inOut",
      });
      return () => tween.kill();
    }
  }, [isTyping]);

  const generateBotReply = (rawInput) => {
    const q = rawInput.toLowerCase().trim();

    // 1. Dynamic Cost calculation (e.g., "2bhk 10km", "how much for 1bhk 5 km")
    let detectedSize = null;
    let detectedKm = null;

    if (q.includes("1 rk") || q.includes("studio") || q.includes("1rk")) {
      detectedSize = MOVE_SIZES.find((s) => s.id === "1rk");
    } else if (q.includes("1 bhk") || q.includes("1bhk")) {
      detectedSize = MOVE_SIZES.find((s) => s.id === "1bhk");
    } else if (q.includes("2 bhk") || q.includes("2bhk")) {
      detectedSize = MOVE_SIZES.find((s) => s.id === "2bhk");
    } else if (q.includes("3 bhk") || q.includes("3bhk")) {
      detectedSize = MOVE_SIZES.find((s) => s.id === "3bhk");
    } else if (q.includes("4 bhk") || q.includes("4bhk") || q.includes("villa")) {
      detectedSize = MOVE_SIZES.find((s) => s.id === "4bhk");
    } else if (q.includes("bike") || q.includes("two wheeler") || q.includes("scooter")) {
      detectedSize = MOVE_SIZES.find((s) => s.id === "vehicle-bike");
    } else if (q.includes("car") || q.includes("sedan") || q.includes("suv")) {
      detectedSize = MOVE_SIZES.find((s) => s.id === "vehicle-car");
    } else if (q.includes("office")) {
      detectedSize = MOVE_SIZES.find((s) => s.id === "office-sm");
    }

    const kmMatch = q.match(/(\d+)\s*(?:km|kms|kilometer|kilometre)/);
    if (kmMatch) {
      detectedKm = parseInt(kmMatch[1], 10);
    }

    if (detectedSize && detectedKm !== null) {
      const base = detectedSize.baseFare;
      const dist = detectedSize.ratePerKm * detectedKm;
      const low = Math.round(base + dist);
      const high = Math.round(low * 1.16);
      return {
        text: `🚚 **Instant Estimate**: For shifting a **${detectedSize.name}** over **${detectedKm} km** in East Bangalore, our estimated range is **₹${low.toLocaleString()} – ₹${high.toLocaleString()}**.\n\nThis includes the carrier truck (${detectedSize.vehicle}), driver, loading team, and base handling. You can fine-tune add-ons or download a formal quotation in our calculator.`,
        action: { label: "Open Cost Calculator", url: "/calculator" },
      };
    }

    if (detectedSize && (q.includes("cost") || q.includes("price") || q.includes("rate") || q.includes("how much"))) {
      return {
        text: `The base fare for a **${detectedSize.name}** starts at **₹${detectedSize.baseFare.toLocaleString()}** + approx **₹${detectedSize.ratePerKm}/km**. How many kilometers is your move, or which areas are you shifting between?`,
        action: { label: "Use Calculator", url: "/calculator" },
      };
    }

    // 2. Locality Matching
    for (const a of areas) {
      if (q.includes(a.name.toLowerCase()) || q.includes(a.slug.toLowerCase())) {
        return {
          text: `✅ **Yes! We actively serve ${a.name}** and surrounding corridors.\n\nOur crew frequently handles gated apartment complexes, security loading window permits, and elevator shifting across ${a.name}.`,
          action: { label: `Explore ${a.name} Details`, url: `/areas/${a.slug}` },
        };
      }
    }

    if (q.includes("area") || q.includes("location") || q.includes("where") || q.includes("serve")) {
      return {
        text: `📍 We cover all major corridors across **East Bangalore**, including Whitefield, KR Puram, Hoodi, Mahadevapura, ITPL, Brookefield, Marathahalli, Varthur, Kadugodi, and Hoskote.`,
        action: { label: "View All Areas", url: "/areas" },
      };
    }

    // 3. Service Matching
    if (q.includes("house") || q.includes("home") || q.includes("flat") || q.includes("apartment")) {
      return {
        text: `🏠 **House Shifting**: Full-home relocation, room-by-room packing with labelled boxes, furniture dismantling, and reassembly at your destination.`,
        action: { label: "House Shifting Service", url: "/services/house-shifting" },
      };
    }

    if (q.includes("office") || q.includes("commercial") || q.includes("workstation")) {
      return {
        text: `🏢 **Office Relocation**: Workstations, IT equipment, server racks, and office furniture shifted with scheduled weekend transit to prevent workday downtime.`,
        action: { label: "Office Shifting Service", url: "/services/office-shifting" },
      };
    }

    if (q.includes("vehicle") || q.includes("car") || q.includes("bike")) {
      return {
        text: `🚗 **Vehicle Relocation**: Specialized two-wheeler foam wrapping and hydraulic car carrier transport with door-to-door delivery.`,
        action: { label: "Vehicle Transport", url: "/services/vehicle-transport" },
      };
    }

    // 4. Contact / Survey
    if (q.includes("survey") || q.includes("quote") || q.includes("book") || q.includes("phone") || q.includes("contact") || q.includes("whatsapp")) {
      return {
        text: `📋 We provide free, zero-obligation pre-move surveys (in-person or over video call) with written binding estimates. You can also call us directly at ${business.phoneDisplay}.`,
        action: { label: "Book Free Survey", url: "/contact" },
      };
    }

    // 5. Friendly Fallback
    return {
      text: `I'd be glad to help you with that! For special items, exact inventories, or custom schedules, our local coordinator is available to help right now:`,
      action: { label: "Try Cost Calculator", url: "/calculator" },
      suggestions: [
        "Do you serve Whitefield?",
        "How much to move a 2BHK 10km?",
        "Are packing materials included?",
      ],
    };
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateBotReply(text);
      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: reply.text,
        action: reply.action,
        suggestions: reply.suggestions,
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 450);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        className="fixed bottom-20 lg:bottom-6 right-5 z-40 h-14 w-14 rounded-full bg-ember text-white shadow-xl hover:bg-ember2 transition-transform active:scale-95 flex items-center justify-center border-2 border-white dark:border-slate-800"
      >
        {isOpen ? <span className="text-xl font-bold">✕</span> : <span className="text-2xl">💬</span>}
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed bottom-36 lg:bottom-24 right-5 z-50 w-[min(380px,calc(100vw-32px))] h-[520px] rounded-2xl bg-white dark:bg-[#0c1a2e] border border-line dark:border-slate-700 shadow-2xl flex flex-col overflow-hidden text-ink dark:text-white"
        >
          {/* Header */}
          <div className="bg-ink dark:bg-[#081220] text-white p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded bg-ember text-white font-bold text-xs">
                SE
              </span>
              <div>
                <b className="text-sm block leading-tight">{business.shortName} Assistant</b>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Local AI • Instant Answers
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white text-lg leading-none p-1"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-paper dark:bg-[#081220]/60">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    m.sender === "user"
                      ? "bg-ember text-white rounded-br-none shadow-sm"
                      : "bg-white dark:bg-[#0c1a2e] text-ink dark:text-slate-100 border border-line dark:border-slate-700 rounded-bl-none shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>

                {m.action && (
                  <div className="mt-1.5">
                    <Link
                      to={m.action.url}
                      onClick={() => setIsOpen(false)}
                      className="inline-block rounded-lg bg-ember/10 dark:bg-ember/20 text-ember px-3 py-1 text-[11px] font-bold hover:bg-ember hover:text-white transition-colors border border-ember/30"
                    >
                      {m.action.label} →
                    </Link>
                  </div>
                )}

                {m.suggestions && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.suggestions.map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => handleSend(sug)}
                        className="rounded-full border border-line dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1 text-[10px] text-slate-700 dark:text-slate-200 hover:border-ember hover:text-ember transition-colors"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white dark:bg-[#0c1a2e] border border-line dark:border-slate-700 rounded-2xl rounded-bl-none px-3.5 py-2 w-fit">
                <span className="text-[11px] text-slate-400">Typing</span>
                <div ref={dotsRef} className="flex gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-ember" />
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-[#0c1a2e] border-t border-line dark:border-slate-700 flex gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about area, price, 2BHK 10km..."
              className="flex-1 rounded-xl border border-line dark:border-slate-700 bg-paper dark:bg-slate-800 px-3 py-2 text-xs text-ink dark:text-white focus:outline-none focus:border-ember"
            />
            <button
              type="submit"
              className="rounded-xl bg-ember text-white px-4 py-2 text-xs font-semibold hover:bg-ember2 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
