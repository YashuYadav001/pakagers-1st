// ---------------------------------------------------------------------------
// Central content file. Replace PLACEHOLDER contact details and images
// with verified information before launch (see README.md).
// ---------------------------------------------------------------------------

export const business = {
  name: "Shifting Expert Packers and Movers",
  shortName: "Shifting Expert",
  tagline: "East Bangalore's dependable movers, door to door",
  phone: "PLACEHOLDER-PHONE",
  phoneDisplay: "+91 90000 00000",
  whatsapp: "PLACEHOLDER-WHATSAPP",
  email: "hello@PLACEHOLDER-domain.example",
  address: "PLACEHOLDER address, East Bangalore, Karnataka",
  hours: "Open daily, 7:00 AM – 10:00 PM",
  founded: "2014",
  gst: "PLACEHOLDER-GSTIN",
};

export const stats = [
  { value: "11+", label: "years moving East Bangalore" },
  { value: "6,200+", label: "relocations completed" },
  { value: "40+", label: "trained crew members" },
  { value: "4.8/5", label: "average customer rating" },
];

// Free-to-use stock photography (Unsplash), matched by subject.
// Swap for genuine job-site photography before launch — see README.md.
export const images = {
  heroTruck: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=1600&q=80",
  heroCrew: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80",
  packingBoxes: "https://images.unsplash.com/photo-1618221639338-14d5f0e13d4d?auto=format&fit=crop&w=1200&q=80",
  officeMove: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
  loadingTruck: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80",
  carTransport: "https://images.unsplash.com/photo-1601929598322-8be2cd3f7cb0?auto=format&fit=crop&w=1200&q=80",
  warehouse: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
  familyMove: "https://images.unsplash.com/photo-1558442074-3c19857bc1dc?auto=format&fit=crop&w=1200&q=80",
  cityBangalore: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=80",
  crewPortrait1: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=400&q=80",
  crewPortrait2: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=400&q=80",
  crewPortrait3: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?auto=format&fit=crop&w=400&q=80",
};

export const services = [
  {
    slug: "house-shifting",
    name: "House Shifting",
    short: "Full-home relocation, room by room, with nothing left behind.",
    image: images.familyMove,
    description:
      "Our crews handle 1BHK to 5BHK homes across East Bangalore, from careful dismantling of furniture to reassembly at your new address.",
    included: [
      "Free pre-move survey and written estimate",
      "Dismantling and reassembly of beds, wardrobes and modular furniture",
      "Room-wise labelled cartons for faster unpacking",
      "Fragile item handling — glass, mirrors, electronics, art",
      "GPS-tracked vehicle for the full route",
    ],
    process: [
      { title: "Survey", detail: "We visit or video-call to scope volume and access — stairs, lift size, parking distance." },
      { title: "Pack", detail: "Crew arrives with cartons, bubble wrap and tape; every box is labelled by room." },
      { title: "Move", detail: "Loading follows a weight-balanced plan so nothing shifts in transit." },
      { title: "Unpack", detail: "Boxes go to the labelled room; furniture is reassembled the same day." },
    ],
  },
  {
    slug: "office-relocation",
    name: "Office & Commercial Relocation",
    short: "Weekend and after-hours moves that get your team working Monday morning.",
    image: images.officeMove,
    description:
      "We plan commercial moves around your business hours, tagging and inventorying workstations, server racks and files so IT and admin teams can re-set up fast.",
    included: [
      "Asset tagging and inventory sheet for every item moved",
      "Anti-static packing for computers, monitors and server equipment",
      "Modular workstation dismantling and rebuild",
      "Weekend or overnight scheduling to avoid downtime",
      "Dedicated move coordinator on site",
    ],
    process: [
      { title: "Walkthrough", detail: "A coordinator maps floors, exits and lift access at both locations." },
      { title: "Tag & pack", detail: "Every desk, cabinet and device is tagged against a numbered inventory." },
      { title: "Transport", detail: "Loading order matches your floor plan for a faster unload." },
      { title: "Set up", detail: "Furniture and IT equipment are placed to your new seating chart." },
    ],
  },
  {
    slug: "packing-unpacking",
    name: "Packing & Unpacking",
    short: "Material-grade packing for kitchenware, electronics and fragiles.",
    image: images.packingBoxes,
    description:
      "Book packing on its own or alongside a move. We bring five-ply cartons, bubble wrap, foam corners and crate boxes for anything that can't risk a scratch.",
    included: [
      "Five-ply cartons in multiple sizes",
      "Bubble wrap and foam corner protection for furniture edges",
      "Crate packing for artwork, mirrors and glass tops",
      "Kitchen and crockery packing with divider inserts",
      "Same-day unpacking on request",
    ],
    process: [
      { title: "Assess", detail: "We list fragile, valuable and bulky items that need special material." },
      { title: "Pack", detail: "Each category gets matched packing — crates for glass, cartons for books." },
      { title: "Label", detail: "Cartons are numbered and matched to a printed inventory." },
      { title: "Unpack", detail: "On request, our crew unpacks and clears wrapping on arrival." },
    ],
  },
  {
    slug: "loading-unloading",
    name: "Loading & Unloading",
    short: "Skilled labour and the right equipment for heavy, awkward items.",
    image: images.loadingTruck,
    description:
      "Have your own vehicle or already-packed goods? Our loading crews bring trolleys, ramps and lifting straps to load or unload safely and quickly.",
    included: [
      "Trained loaders with trolleys and lifting straps",
      "Ramp-assisted loading for heavy appliances",
      "Weight-balanced stacking to prevent transit damage",
      "Staircase and narrow-corridor handling",
      "Hourly or per-job pricing",
    ],
    process: [
      { title: "Check access", detail: "We confirm vehicle size, parking and any stairs or narrow turns." },
      { title: "Load", detail: "Heavy items go in first and low, balanced across the vehicle bed." },
      { title: "Secure", detail: "Straps and padding keep the load stable for the whole route." },
      { title: "Unload", detail: "Items are carried in and placed where you want them." },
    ],
  },
  {
    slug: "vehicle-transportation",
    name: "Car & Bike Transportation",
    short: "Enclosed and open carrier transport for cars and two-wheelers.",
    image: images.carTransport,
    description:
      "Moving your vehicle within Bangalore or to another city, our carrier partners offer tracked, insured transport with door-step pickup.",
    included: [
      "Open and enclosed carrier options",
      "Pickup and drop at your address",
      "Pre-transport condition report with photos",
      "Insurance coverage for transit damage",
      "Live tracking for interstate moves",
    ],
    process: [
      { title: "Book", detail: "Share vehicle type, pickup and drop points for a fixed quote." },
      { title: "Inspect", detail: "We photograph existing condition before loading." },
      { title: "Transport", detail: "Vehicle is strapped onto the carrier and tracked in transit." },
      { title: "Deliver", detail: "Drop-off with a matching condition check at your doorstep." },
    ],
  },
  {
    slug: "warehousing-storage",
    name: "Warehousing & Storage",
    short: "Short and long-term storage for household or office goods.",
    image: images.warehouse,
    description:
      "Need a gap between move-out and move-in? Our secure, monitored storage facility holds your goods safely for days or months.",
    included: [
      "CCTV-monitored, pest-controlled storage facility",
      "Palletised storage to keep cartons off the floor",
      "Flexible short-term and long-term plans",
      "Inventory list provided at check-in",
      "Scheduled redelivery when you're ready",
    ],
    process: [
      { title: "Plan", detail: "We estimate volume and recommend a storage duration and plan." },
      { title: "Move in", detail: "Goods are inventoried, wrapped and palletised at the facility." },
      { title: "Store", detail: "Your goods sit in a monitored, access-logged unit." },
      { title: "Redeliver", detail: "We schedule delivery to your new address when you're ready." },
    ],
  },
];

export const serviceBySlug = (slug) => services.find((s) => s.slug === slug);

// East Bangalore localities served — each gets its own route/page.
export const areas = [
  { slug: "whitefield", name: "Whitefield", note: "IT-corridor apartments and tech-park offices." },
  { slug: "marathahalli", name: "Marathahalli", note: "High-rise residential blocks along the ORR." },
  { slug: "kr-puram", name: "K R Puram", note: "Mixed residential and industrial layouts near the railway junction." },
  { slug: "indiranagar", name: "Indiranagar", note: "Independent houses and premium apartments." },
  { slug: "hal", name: "HAL / Old Airport Road", note: "Established residential layouts and gated communities." },
  { slug: "domlur", name: "Domlur", note: "Compact apartments close to the ORR office belt." },
  { slug: "mahadevapura", name: "Mahadevapura", note: "Dense apartment complexes near the Outer Ring Road IT hub." },
  { slug: "hoodi", name: "Hoodi", note: "New-build apartment towers near ITPL." },
  { slug: "brookefield", name: "Brookefield", note: "Established layouts and malls along the ITPL road." },
  { slug: "itpl", name: "ITPL / EPIP Zone", note: "Corporate campuses and nearby employee housing." },
  { slug: "varthur", name: "Varthur", note: "Fast-growing residential layouts near the lake." },
  { slug: "ramamurthy-nagar", name: "Ramamurthy Nagar", note: "Independent houses and mid-rise apartments." },
  { slug: "banaswadi", name: "Banaswadi", note: "Older residential layouts with narrow lane access." },
  { slug: "kalyan-nagar", name: "Kalyan Nagar", note: "Apartment complexes and PG-heavy micro-market." },
  { slug: "cv-raman-nagar", name: "C V Raman Nagar", note: "Defence and public-sector residential layouts." },
  { slug: "kadugodi", name: "Kadugodi", note: "Whitefield-adjacent new developments." },
  { slug: "hennur", name: "Hennur", note: "Growing apartment corridor toward the airport road." },
];

export const areaBySlug = (slug) => areas.find((a) => a.slug === slug);

export const testimonials = [
  {
    name: "Ananya R.",
    area: "Whitefield",
    quote:
      "Booked a 2BHK move on a Sunday and the crew had everything wrapped and loaded in under three hours. Nothing was damaged.",
    rating: 5,
  },
  {
    name: "Suresh K.",
    area: "Marathahalli",
    quote:
      "Office move happened overnight so we didn't lose a single working day. The inventory sheet made IT setup painless.",
    rating: 5,
  },
  {
    name: "Priya M.",
    area: "Indiranagar",
    quote:
      "Asked for careful handling on a lot of glassware and artwork — everything arrived intact, well past our expectations.",
    rating: 4,
  },
];

export const faqs = [
  {
    q: "How far in advance should I book?",
    a: "For weekday moves, 2–3 days' notice is usually enough. For weekends and month-end dates, book at least a week ahead as crews fill up fast.",
  },
  {
    q: "Do you provide packing material, or should I arrange it?",
    a: "We bring all cartons, tape, bubble wrap and protective material as part of the packing service — you don't need to arrange anything.",
  },
  {
    q: "Is my shipment insured during transit?",
    a: "Yes, transit insurance is available and recommended for high-value goods, vehicles and long-distance moves. We'll walk you through the options at booking.",
  },
  {
    q: "Can you move on the same day I call?",
    a: "Same-day slots are sometimes available for smaller loads — call or WhatsApp us and we'll confirm crew availability immediately.",
  },
  {
    q: "Do you charge for the estimate visit?",
    a: "No. Pre-move surveys, whether in person or over video call, are free and come with a written estimate.",
  },
];

// --- ADVANCED CALCULATOR & FLEET SPECIFICATIONS ---

export const DISPATCH_CENTER = {
  name: "East Bangalore Central Hub (Mahadevapura / KR Puram Corridor)",
  locality: "Mahadevapura",
  city: "Bangalore",
};

export const LOCALITY_DISTANCES = [
  { slug: "kr-puram", name: "KR Puram", distanceKm: 2, hubNote: "Immediate dispatch zone" },
  { slug: "mahadevapura", name: "Mahadevapura", distanceKm: 3, hubNote: "Central East hub" },
  { slug: "hoodi", name: "Hoodi", distanceKm: 5, hubNote: "Quick corridor access" },
  { slug: "ramamurthy-nagar", name: "Ramamurthy Nagar", distanceKm: 6, hubNote: "Ring road link" },
  { slug: "itpl", name: "ITPL", distanceKm: 7, hubNote: "Tech corridor" },
  { slug: "brookefield", name: "Brookefield", distanceKm: 8, hubNote: "Kundalahalli connector" },
  { slug: "kundalahalli", name: "Kundalahalli", distanceKm: 9, hubNote: "Outer Ring Road sector" },
  { slug: "whitefield", name: "Whitefield", distanceKm: 10, hubNote: "Major residential & tech corridor" },
  { slug: "marathahalli", name: "Marathahalli", distanceKm: 10, hubNote: "High density transit hub" },
  { slug: "kadugodi", name: "Kadugodi", distanceKm: 12, hubNote: "Whitefield eastern link" },
  { slug: "varthur", name: "Varthur", distanceKm: 14, hubNote: "Varthur lake corridor" },
  { slug: "hoskote", name: "Hoskote", distanceKm: 22, hubNote: "Eastern gateway (highway)" },
  { slug: "custom", name: "Custom / Other Area", distanceKm: 15, hubNote: "Adjust slider freely" },
];

export const MOVE_SIZES = [
  {
    id: "1rk",
    name: "1 RK / Studio",
    baseFare: 3800,
    ratePerKm: 65,
    vehicle: "Tata Ace / Mini",
    description: "Ideal for bachelors, single room luggage & basic cartons",
    vehicleSpecs: {
      dimensions: "7ft × 4.8ft × 4.8ft",
      payloadKg: "750 kg",
      volumeCuFt: "160 cu.ft",
      seal: "Weather-resistant closed body",
    },
  },
  {
    id: "1bhk",
    name: "1 BHK Apartment",
    baseFare: 5500,
    ratePerKm: 85,
    vehicle: "8-ft Pickup / Ace Mega",
    description: "Standard 1 bedroom, double bed, fridge, washing machine, ~15 boxes",
    vehicleSpecs: {
      dimensions: "8.5ft × 5ft × 5.5ft",
      payloadKg: "1,200 kg",
      volumeCuFt: "230 cu.ft",
      seal: "Lockable covered container",
    },
  },
  {
    id: "2bhk",
    name: "2 BHK Apartment",
    baseFare: 8200,
    ratePerKm: 110,
    vehicle: "14-ft Closed Container",
    popular: true,
    description: "Most popular: 2 beds, sofa set, dining, large electronics, 25+ boxes",
    vehicleSpecs: {
      dimensions: "14ft × 6ft × 6.5ft",
      payloadKg: "2,500 kg",
      volumeCuFt: "540 cu.ft",
      seal: "Heavy waterproof sealed container with cargo belts",
    },
  },
  {
    id: "3bhk",
    name: "3 BHK Apartment",
    baseFare: 12500,
    ratePerKm: 155,
    vehicle: "17-ft Eicher Container",
    description: "Full family household, multiple wardrobes, large appliances, balcony plants",
    vehicleSpecs: {
      dimensions: "17ft × 6.5ft × 7ft",
      payloadKg: "4,000 kg",
      volumeCuFt: "770 cu.ft",
      seal: "High-cube all-weather insulated container",
    },
  },
  {
    id: "4bhk",
    name: "4+ BHK / Villa",
    baseFare: 17500,
    ratePerKm: 210,
    vehicle: "19-ft/22-ft Heavy Truck",
    description: "High volume luxury homes, patio furniture, extensive wardrobe inventory",
    vehicleSpecs: {
      dimensions: "22ft × 7.5ft × 8ft",
      payloadKg: "7,500 kg",
      volumeCuFt: "1,300 cu.ft",
      seal: "Commercial heavy container with hydraulic tail-lift",
    },
  },
  {
    id: "office-sm",
    name: "Small Office (1-10 pax)",
    baseFare: 9500,
    ratePerKm: 130,
    vehicle: "14-ft Dedicated Truck",
    description: "Workstations, executive chairs, server rack, file storage cartons",
    vehicleSpecs: {
      dimensions: "14ft × 6ft × 6.5ft",
      payloadKg: "2,500 kg",
      volumeCuFt: "540 cu.ft",
      seal: "Dedicated padded office transit container",
    },
  },
  {
    id: "office-med",
    name: "Medium Office (10-30 pax)",
    baseFare: 19000,
    ratePerKm: 230,
    vehicle: "Multiple 17-ft Fleet",
    description: "Full floor transition, conference tables, multi-server setup",
    vehicleSpecs: {
      dimensions: "Dual 17-ft Fleet (Combined 34ft)",
      payloadKg: "8,000 kg",
      volumeCuFt: "1,500 cu.ft",
      seal: "Dedicated logistics team with IT peripheral wrapping",
    },
  },
  {
    id: "vehicle-bike",
    name: "Two-Wheeler / Bike",
    baseFare: 1600,
    ratePerKm: 35,
    vehicle: "Specialized Bike Carrier",
    description: "Motorcycles, scooters, EVs with foam padding and wheel locks",
    vehicleSpecs: {
      dimensions: "Specialized ramp carrier",
      payloadKg: "250 kg per slot",
      volumeCuFt: "Wheel-chock secure bay",
      seal: "Bubble wrap + corrugated armor covering",
    },
  },
  {
    id: "vehicle-car",
    name: "Car Relocation",
    baseFare: 3200,
    ratePerKm: 55,
    vehicle: "Hydraulic Car Carrier",
    description: "Hatchbacks, sedans, SUVs with wheel chocks and safety harness",
    vehicleSpecs: {
      dimensions: "Closed hydraulic single / twin carrier",
      payloadKg: "2,200 kg per vehicle",
      volumeCuFt: "Hydraulic lift bed",
      seal: "Full body inspection & locked transit",
    },
  },
];

export const MOVE_TIMINGS = [
  {
    id: "mid-month",
    name: "Mid-Month Weekday Saver (10th – 22nd)",
    multiplier: 0.95,
    badge: "5% Saver Discount",
    badgeType: "discount",
    note: "Light traffic corridors & maximum crew focus",
  },
  {
    id: "standard-weekday",
    name: "Standard Weekday (Mon – Thu)",
    multiplier: 1.0,
    badge: "Standard Rate",
    badgeType: "neutral",
    note: "Normal society gate slots & manageable traffic",
  },
  {
    id: "weekend",
    name: "Weekend Move (Fri – Sun)",
    multiplier: 1.08,
    badge: "+8% High Demand",
    badgeType: "surge",
    note: "High society elevator slot congestion",
  },
  {
    id: "month-end",
    name: "Month-End Peak (26th – 5th)",
    multiplier: 1.12,
    badge: "+12% Peak Rush",
    badgeType: "surge",
    note: "Highest lease renewal demand across East Bangalore",
  },
];

export const FLOOR_CONDITIONS = [
  { id: "lift", label: "Ground Floor OR Service Lift at Both Ends", charge: 0 },
  { id: "stairs-low", label: "Stairs Only (1st or 2nd Floor)", charge: 800 },
  { id: "stairs-high", label: "Stairs Only (3rd Floor or Higher)", charge: 1600 },
];

export const CALCULATOR_ADDONS = [
  { id: "multi-pack", label: "Premium 3-Layer Packing (Bubble, 5-ply cartons, film)", price: 1800 },
  { id: "insurance", label: "Transit Protection & Comprehensive Damage Certificate", price: 999 },
  { id: "carpentry", label: "Professional Carpentry (Bed / TV / Geyser Dismantle & Fitting)", price: 1200 },
  { id: "storage", label: "15-Day Warehousing Holding Facility", price: 3500 },
];

export const CHAT_SUGGESTIONS = [
  "Do you serve Whitefield?",
  "How much to move a 2BHK 10km?",
  "What areas in East Bangalore do you cover?",
  "Are packing materials included?",
  "Can you move my bike or car?",
  "How do I schedule a pre-move survey?",
];

