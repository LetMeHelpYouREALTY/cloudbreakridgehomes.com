/**
 * Replaces plain text hero blocks with <PageHero /> across app routes.
 * Run after: node scripts/generate-page-heroes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const SKIP = new Set([
  "app/page.tsx",
  "app/google-business/page.tsx",
  "app/listings/[id]/page.tsx",
  "app/security-policy/page.tsx",
]);

function heroKeyFromAppPath(relPath) {
  const route = relPath.replace(/^app\//, "").replace(/\/page\.tsx$/, "");
  if (!route || route === "page.tsx") return "home";

  const parts = route.split("/");
  const last = parts[parts.length - 1];

  if (parts[0] === "sellers" && last === "relocation") return "seller-relocation";
  if (parts.length === 1) return last;

  const nestedKeys = new Set([
    "first-time-buyers",
    "california-relocator",
    "luxury-homes-las-vegas",
    "move-up",
    "downsizing",
    "divorce-probate",
    "summerlin",
    "henderson",
    "green-valley",
    "centennial-hills",
    "inspirada",
    "mountains-edge",
    "north-las-vegas",
    "skye-canyon",
    "southern-highlands",
    "the-ridges",
    "sun-city-summerlin",
    "sun-city-anthem",
    "sun-city-aliante",
    "heritage-stonebridge",
    "trilogy-summerlin",
    "solera-anthem",
    "del-webb-lake-las-vegas",
  ]);

  if (nestedKeys.has(last)) return last;
  return parts.join("-");
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name === "page.tsx") files.push(full);
  }
  return files;
}

const HERO_BLOCK_RE =
  /<div className="max-w-4xl mx-auto text-center mb-(?:12|16)">[\s\S]*?<\/div>\s*\n\s*(?=<RealScout|<\/div>|<section|{)/;

function patchFile(absPath) {
  const rel = path.relative(ROOT, absPath).replace(/\\/g, "/");
  if (SKIP.has(rel)) return { rel, status: "skipped" };

  let content = fs.readFileSync(absPath, "utf8");
  if (content.includes("<PageHero")) return { rel, status: "already" };

  const match = content.match(HERO_BLOCK_RE);
  if (!match) return { rel, status: "no-match" };

  const block = match[0];
  const badgeMatch = block.match(
    /<p className="[^"]*text-sm[^"]*mb-3[^"]*">([\s\S]*?)<\/p>/
  );
  const titleMatch = block.match(
    /<h1 className="[^"]*">([\s\S]*?)<\/h1>/
  );
  const subtitleMatch = block.match(
    /<p className="text-xl[^"]*">([\s\S]*?)<\/p>/
  );

  if (!titleMatch) return { rel, status: "no-title" };

  const heroKey = heroKeyFromAppPath(rel);
  const badge = badgeMatch
    ? badgeMatch[1].replace(/\s+/g, " ").trim()
    : undefined;
  const title = titleMatch[1].replace(/\s+/g, " ").trim();
  const subtitle = subtitleMatch
    ? subtitleMatch[1].replace(/\s+/g, " ").trim()
    : undefined;

  const badgeProp = badge
    ? ` badge={${JSON.stringify(badge)}}`
    : "";
  const subtitleProp = subtitle
    ? ` subtitle={${JSON.stringify(subtitle)}}`
    : "";

  const replacement = `<PageHero heroKey="${heroKey}"${badgeProp} title={${JSON.stringify(title)}}${subtitleProp} />\n\n        `;

  content = content.replace(HERO_BLOCK_RE, replacement);

  if (!content.includes('from "@/components/sections/PageHero"')) {
    content = content.replace(
      /(import Navbar[^\n]+\n)/,
      `$1import PageHero from "@/components/sections/PageHero";\n`
    );
  }

  fs.writeFileSync(absPath, content);
  return { rel, status: "patched", heroKey };
}

const pages = walk(path.join(ROOT, "app"));
const results = pages.map(patchFile);
const patched = results.filter((r) => r.status === "patched");
const missed = results.filter((r) => r.status === "no-match" || r.status === "no-title");

console.log(`Patched ${patched.length} pages:`);
for (const r of patched) console.log(`  ✓ ${r.rel} → ${r.heroKey}`);
if (missed.length) {
  console.log(`\nManual review (${missed.length}):`);
  for (const r of missed) console.log(`  - ${r.rel} (${r.status})`);
}
