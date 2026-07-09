// One-off: convert the second batch of AI-generated hero PNGs (assets/) to
// optimized WebP at public/images/hero/{key}.webp, replacing placeholders.
import sharp from "sharp";
import { existsSync } from "node:fs";
import path from "node:path";

const ASSETS_DIR =
  "C:\\Users\\geneb\\.cursor\\projects\\c-Users-geneb-Projects-cloudbreakridgehomes-com\\assets";
const OUT_DIR = path.resolve(process.cwd(), "public/images/hero");

const KEYS = [
  "del-webb-lake-las-vegas",
  "solera-anthem",
  "trilogy-summerlin",
  "heritage-stonebridge",
  "sun-city-aliante",
  "sun-city-anthem",
  "sun-city-summerlin",
  "the-ridges",
  "southern-highlands",
  "skye-canyon",
  "north-las-vegas",
  "mountains-edge",
  "inspirada",
  "centennial-hills",
  "green-valley",
  "henderson",
  "listings",
  "market-insights",
  "market-update",
  "market-report",
  "why-berkshire-hathaway",
  "services",
  "faq",
  "home-valuation",
  "relocation",
  "investment-properties",
  "seller-relocation",
  "divorce-probate",
  "downsizing",
  "move-up",
  "california-relocator",
  "first-time-buyers",
  "blog",
  "enclaves-vs-reserves",
  "floor-plans",
  "schools",
  "bring-your-realtor",
];

async function run() {
  let ok = 0;
  let missing = [];

  for (const key of KEYS) {
    const src = path.join(ASSETS_DIR, `hero-${key}.png`);
    const dest = path.join(OUT_DIR, `${key}.webp`);

    if (!existsSync(src)) {
      missing.push(key);
      continue;
    }

    const buffer = await sharp(src)
      .resize(1920, 1080, { fit: "cover", position: "attention" })
      .webp({ quality: 82 })
      .toBuffer();

    await sharp(buffer).toFile(dest);
    const kb = (buffer.length / 1024).toFixed(0);
    console.log(`✓ ${key}.webp (${kb} KB)`);
    ok++;
  }

  console.log(`\nDone: ${ok}/${KEYS.length} converted.`);
  if (missing.length) {
    console.log(`Missing source PNGs: ${missing.join(", ")}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
