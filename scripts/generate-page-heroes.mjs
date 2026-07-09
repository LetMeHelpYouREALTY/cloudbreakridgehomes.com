/**
 * Generates thematic 1920x1080 WebP hero images per page route.
 * Run: node scripts/generate-page-heroes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/images/hero");

/** @type {Record<string, { sky: [string,string], accent: string, label: string, scene: string }>} */
const HERO_THEMES = {
  home: {
    sky: ["#0f2744", "#3d5a80"],
    accent: "#e8b86d",
    label: "Cloudbreak Ridge",
    scene: "gated-mountains",
  },
  enclaves: {
    sky: ["#1a365d", "#4a6fa5"],
    accent: "#c9a227",
    label: "Enclaves",
    scene: "single-story",
  },
  reserves: {
    sky: ["#1e3a5f", "#5b7c99"],
    accent: "#d4a574",
    label: "Reserves",
    scene: "two-story",
  },
  "la-madre-peaks": {
    sky: ["#2d1b4e", "#6b4c9a"],
    accent: "#f0c987",
    label: "La Madre Peaks",
    scene: "mountains",
  },
  "bring-your-realtor": {
    sky: ["#1a3c40", "#2d6a6f"],
    accent: "#ffffff",
    label: "Buyer Representation",
    scene: "keys",
  },
  neighborhoods: {
    sky: ["#1e293b", "#475569"],
    accent: "#38bdf8",
    label: "Summerlin West",
    scene: "map",
  },
  schools: {
    sky: ["#1e3a8a", "#3b82f6"],
    accent: "#fbbf24",
    label: "Schools",
    scene: "campus",
  },
  "floor-plans": {
    sky: ["#312e81", "#6366f1"],
    accent: "#a5b4fc",
    label: "Floor Plans",
    scene: "blueprint",
  },
  "enclaves-vs-reserves": {
    sky: ["#134e4a", "#0d9488"],
    accent: "#fef3c7",
    label: "Compare Collections",
    scene: "split-homes",
  },
  blog: {
    sky: ["#422006", "#b45309"],
    accent: "#fde68a",
    label: "Community News",
    scene: "gated-mountains",
  },
  buyers: {
    sky: ["#14532d", "#22c55e"],
    accent: "#bbf7d0",
    label: "Home Buyers",
    scene: "keys",
  },
  "first-time-buyers": {
    sky: ["#166534", "#4ade80"],
    accent: "#ffffff",
    label: "First-Time Buyers",
    scene: "keys",
  },
  "california-relocator": {
    sky: ["#1e40af", "#60a5fa"],
    accent: "#f97316",
    label: "California to Vegas",
    scene: "highway",
  },
  "luxury-homes-las-vegas": {
    sky: ["#0c0a09", "#44403c"],
    accent: "#d4af37",
    label: "Luxury Homes",
    scene: "estate",
  },
  sellers: {
    sky: ["#7c2d12", "#ea580c"],
    accent: "#fed7aa",
    label: "Home Sellers",
    scene: "sold",
  },
  "move-up": {
    sky: ["#9a3412", "#fb923c"],
    accent: "#fff7ed",
    label: "Move-Up Sellers",
    scene: "two-story",
  },
  downsizing: {
    sky: ["#4c1d95", "#8b5cf6"],
    accent: "#e9d5ff",
    label: "Downsizing",
    scene: "single-story",
  },
  "divorce-probate": {
    sky: ["#374151", "#6b7280"],
    accent: "#e5e7eb",
    label: "Sensitive Sales",
    scene: "keys",
  },
  "seller-relocation": {
    sky: ["#0e7490", "#22d3ee"],
    accent: "#cffafe",
    label: "Seller Relocation",
    scene: "highway",
  },
  "new-construction": {
    sky: ["#1c1917", "#57534e"],
    accent: "#facc15",
    label: "New Construction",
    scene: "construction",
  },
  "luxury-homes": {
    sky: ["#171717", "#525252"],
    accent: "#ca8a04",
    label: "Luxury Living",
    scene: "estate",
  },
  "investment-properties": {
    sky: ["#064e3b", "#10b981"],
    accent: "#a7f3d0",
    label: "Investments",
    scene: "multi",
  },
  relocation: {
    sky: ["#1d4ed8", "#93c5fd"],
    accent: "#ffffff",
    label: "Relocation",
    scene: "highway",
  },
  "home-valuation": {
    sky: ["#713f12", "#d97706"],
    accent: "#fef3c7",
    label: "Home Value",
    scene: "chart",
  },
  about: {
    sky: ["#1e3a5f", "#64748b"],
    accent: "#93c5fd",
    label: "Dr. Jan Duffy",
    scene: "office",
  },
  contact: {
    sky: ["#0f766e", "#2dd4bf"],
    accent: "#ffffff",
    label: "Contact",
    scene: "phone",
  },
  faq: {
    sky: ["#4338ca", "#818cf8"],
    accent: "#e0e7ff",
    label: "FAQ",
    scene: "questions",
  },
  services: {
    sky: ["#115e59", "#14b8a6"],
    accent: "#ccfbf1",
    label: "Services",
    scene: "keys",
  },
  "why-berkshire-hathaway": {
    sky: ["#7f1d1d", "#dc2626"],
    accent: "#fecaca",
    label: "Berkshire Hathaway",
    scene: "office",
  },
  "market-report": {
    sky: ["#1e293b", "#334155"],
    accent: "#22d3ee",
    label: "Market Report",
    scene: "chart",
  },
  "market-update": {
    sky: ["#0f172a", "#1e40af"],
    accent: "#38bdf8",
    label: "Market Update",
    scene: "chart",
  },
  "market-insights": {
    sky: ["#581c87", "#a855f7"],
    accent: "#f3e8ff",
    label: "Market Insights",
    scene: "chart",
  },
  listings: {
    sky: ["#0369a1", "#0ea5e9"],
    accent: "#e0f2fe",
    label: "Listings",
    scene: "multi",
  },
  summerlin: {
    sky: ["#1e40af", "#60a5fa"],
    accent: "#bfdbfe",
    label: "Summerlin",
    scene: "parks",
  },
  henderson: {
    sky: ["#047857", "#34d399"],
    accent: "#d1fae5",
    label: "Henderson",
    scene: "suburban",
  },
  "green-valley": {
    sky: ["#15803d", "#86efac"],
    accent: "#ffffff",
    label: "Green Valley",
    scene: "parks",
  },
  "centennial-hills": {
    sky: ["#6b21a8", "#c084fc"],
    accent: "#f3e8ff",
    label: "Centennial Hills",
    scene: "mountains",
  },
  inspirada: {
    sky: ["#b45309", "#fbbf24"],
    accent: "#fffbeb",
    label: "Inspirada",
    scene: "suburban",
  },
  "mountains-edge": {
    sky: ["#92400e", "#f59e0b"],
    accent: "#fef3c7",
    label: "Mountains Edge",
    scene: "mountains",
  },
  "north-las-vegas": {
    sky: ["#1d4ed8", "#93c5fd"],
    accent: "#eff6ff",
    label: "North Las Vegas",
    scene: "suburban",
  },
  "skye-canyon": {
    sky: ["#0c4a6e", "#38bdf8"],
    accent: "#e0f2fe",
    label: "Skye Canyon",
    scene: "mountains",
  },
  "southern-highlands": {
    sky: ["#713f12", "#fbbf24"],
    accent: "#fff7ed",
    label: "Southern Highlands",
    scene: "estate",
  },
  "the-ridges": {
    sky: ["#0f172a", "#334155"],
    accent: "#fbbf24",
    label: "The Ridges",
    scene: "estate",
  },
  "55-plus-communities": {
    sky: ["#be185d", "#f472b6"],
    accent: "#fce7f3",
    label: "55+ Living",
    scene: "golf",
  },
  "sun-city-summerlin": {
    sky: ["#9d174d", "#ec4899"],
    accent: "#fdf2f8",
    label: "Sun City Summerlin",
    scene: "golf",
  },
  "sun-city-anthem": {
    sky: ["#a21caf", "#e879f9"],
    accent: "#fae8ff",
    label: "Sun City Anthem",
    scene: "golf",
  },
  "sun-city-aliante": {
    sky: ["#c2410c", "#fb923c"],
    accent: "#ffedd5",
    label: "Sun City Aliante",
    scene: "golf",
  },
  "heritage-stonebridge": {
    sky: ["#4d7c0f", "#a3e635"],
    accent: "#ecfccb",
    label: "Heritage at Stonebridge",
    scene: "golf",
  },
  "trilogy-summerlin": {
    sky: ["#0e7490", "#67e8f9"],
    accent: "#cffafe",
    label: "Trilogy Summerlin",
    scene: "golf",
  },
  "solera-anthem": {
    sky: ["#7e22ce", "#c084fc"],
    accent: "#f3e8ff",
    label: "Solera at Anthem",
    scene: "golf",
  },
  "del-webb-lake-las-vegas": {
    sky: ["#0369a1", "#7dd3fc"],
    accent: "#e0f2fe",
    label: "Del Webb Lake Las Vegas",
    scene: "lake",
  },
};

function sceneSvg(scene, accent) {
  const scenes = {
    mountains: `<path d="M0 520 L320 280 L560 420 L800 220 L1120 380 L1440 200 L1920 360 L1920 1080 L0 1080Z" fill="${accent}" opacity="0.35"/><path d="M0 620 L400 400 L720 520 L1100 340 L1500 500 L1920 420 L1920 1080 L0 1080Z" fill="#0f172a" opacity="0.5"/>`,
    "gated-mountains": `<path d="M0 500 L280 300 L520 440 L760 260 L1080 400 L1400 240 L1920 380 L1920 1080 L0 1080Z" fill="${accent}" opacity="0.3"/><rect x="760" y="560" width="400" height="220" rx="8" fill="#f8fafc" opacity="0.15"/><path d="M860 560 L860 480 L1060 480 L1060 560" stroke="#f8fafc" stroke-width="6" fill="none" opacity="0.4"/>`,
    "single-story": `<rect x="560" y="580" width="800" height="220" rx="12" fill="#f8fafc" opacity="0.2"/><polygon points="520,580 960,460 1400,580" fill="${accent}" opacity="0.35"/>`,
    "two-story": `<rect x="520" y="520" width="880" height="280" rx="12" fill="#f8fafc" opacity="0.18"/><rect x="600" y="560" width="120" height="100" fill="${accent}" opacity="0.25"/><rect x="1200" y="560" width="120" height="100" fill="${accent}" opacity="0.25"/><polygon points="480,520 960,400 1440,520" fill="${accent}" opacity="0.3"/>`,
    "split-homes": `<rect x="320" y="580" width="520" height="200" rx="8" fill="#f8fafc" opacity="0.2"/><rect x="1080" y="500" width="520" height="280" rx="8" fill="#f8fafc" opacity="0.2"/>`,
    keys: `<circle cx="960" cy="620" r="120" fill="none" stroke="${accent}" stroke-width="8" opacity="0.5"/><rect x="1020" y="600" width="180" height="40" rx="6" fill="${accent}" opacity="0.4"/>`,
    golf: `<ellipse cx="960" cy="760" rx="700" ry="120" fill="#166534" opacity="0.45"/><circle cx="960" cy="640" r="8" fill="#ffffff" opacity="0.8"/>`,
    chart: `<polyline points="320,720 520,580 720,640 920,500 1120,560 1320,420 1520,480" fill="none" stroke="${accent}" stroke-width="10" opacity="0.6"/>`,
    highway: `<path d="M0 780 Q480 620 960 720 T1920 680 L1920 1080 L0 1080Z" fill="#334155" opacity="0.5"/><path d="M900 680 L1020 680 L960 1080 Z" fill="${accent}" opacity="0.35"/>`,
    estate: `<rect x="420" y="480" width="1080" height="320" rx="16" fill="#f8fafc" opacity="0.12"/><rect x="520" y="560" width="200" height="160" fill="${accent}" opacity="0.2"/><rect x="1200" y="560" width="200" height="160" fill="${accent}" opacity="0.2"/>`,
    construction: `<rect x="480" y="520" width="960" height="280" fill="#78716c" opacity="0.25"/><line x1="480" y1="520" x2="1440" y2="520" stroke="${accent}" stroke-width="6" opacity="0.5"/>`,
    suburban: `<rect x="240" y="620" width="280" height="160" rx="6" fill="#f8fafc" opacity="0.15"/><rect x="580" y="600" width="300" height="180" rx="6" fill="#f8fafc" opacity="0.18"/><rect x="960" y="630" width="260" height="150" rx="6" fill="#f8fafc" opacity="0.15"/><rect x="1280" y="610" width="320" height="170" rx="6" fill="#f8fafc" opacity="0.17"/>`,
    multi: `<rect x="200" y="560" width="360" height="240" rx="8" fill="#f8fafc" opacity="0.14"/><rect x="620" y="540" width="400" height="260" rx="8" fill="#f8fafc" opacity="0.16"/><rect x="1080" y="570" width="340" height="230" rx="8" fill="#f8fafc" opacity="0.14"/>`,
    parks: `<ellipse cx="960" cy="700" rx="620" ry="140" fill="#15803d" opacity="0.4"/><circle cx="700" cy="660" r="40" fill="${accent}" opacity="0.35"/><circle cx="1100" cy="640" r="55" fill="${accent}" opacity="0.3"/>`,
    lake: `<ellipse cx="960" cy="760" rx="760" ry="160" fill="#0284c7" opacity="0.45"/><path d="M200 760 Q560 680 960 760 T1720 740" fill="none" stroke="${accent}" stroke-width="4" opacity="0.4"/>`,
    campus: `<rect x="360" y="520" width="1200" height="280" rx="20" fill="#f8fafc" opacity="0.1"/><rect x="420" y="580" width="180" height="140" fill="${accent}" opacity="0.25"/><rect x="760" y="560" width="400" height="180" fill="${accent}" opacity="0.2"/><rect x="1320" y="590" width="160" height="130" fill="${accent}" opacity="0.25"/>`,
    blueprint: `<line x1="280" y1="480" x2="1640" y2="480" stroke="${accent}" stroke-width="2" opacity="0.3"/><line x1="280" y1="560" x2="1640" y2="560" stroke="${accent}" stroke-width="2" opacity="0.3"/><rect x="480" y="520" width="520" height="320" fill="none" stroke="${accent}" stroke-width="4" opacity="0.45"/><rect x="1120" y="540" width="360" height="280" fill="none" stroke="${accent}" stroke-width="4" opacity="0.4"/>`,
    map: `<circle cx="960" cy="640" r="280" fill="none" stroke="${accent}" stroke-width="6" opacity="0.35"/><path d="M760 640 L960 500 L1160 640 L960 780Z" fill="${accent}" opacity="0.25"/>`,
    office: `<rect x="520" y="480" width="880" height="320" rx="12" fill="#f8fafc" opacity="0.12"/><rect x="600" y="560" width="720" height="40" fill="${accent}" opacity="0.3"/><rect x="600" y="640" width="520" height="24" fill="${accent}" opacity="0.2"/>`,
    phone: `<rect x="820" y="520" width="280" height="520" rx="40" fill="#f8fafc" opacity="0.12"/><circle cx="960" cy="880" r="36" fill="${accent}" opacity="0.35"/>`,
    questions: `<text x="960" y="680" text-anchor="middle" font-size="220" fill="${accent}" opacity="0.35" font-family="Georgia, serif">?</text>`,
    sold: `<rect x="620" y="560" width="680" height="260" rx="12" fill="#f8fafc" opacity="0.15"/><text x="960" y="720" text-anchor="middle" font-size="96" fill="${accent}" opacity="0.5" font-family="Arial, sans-serif" font-weight="700">SOLD</text>`,
  };
  return scenes[scene] ?? scenes.mountains;
}

function buildSvg(key, theme) {
  const [top, bottom] = theme.sky;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${top}"/>
      <stop offset="100%" stop-color="${bottom}"/>
    </linearGradient>
    <radialGradient id="sun" cx="75%" cy="20%" r="35%">
      <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#sky)"/>
  <rect width="1920" height="1080" fill="url(#sun)"/>
  ${sceneSvg(theme.scene, theme.accent)}
  <rect width="1920" height="1080" fill="#020617" opacity="0.25"/>
</svg>`;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let count = 0;
  for (const [key, theme] of Object.entries(HERO_THEMES)) {
    const svg = Buffer.from(buildSvg(key, theme));
    const out = path.join(OUT_DIR, `${key}.webp`);
    await sharp(svg).webp({ quality: 82 }).toFile(out);
    const size = fs.statSync(out).size;
    console.log(`✓ ${key}.webp (${Math.round(size / 1024)} KB)`);
    count++;
  }
  console.log(`\nGenerated ${count} hero images in public/images/hero/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
