#!/usr/bin/env node
/**
 * One-time script: move <RealScoutListings /> to directly after the page hero block.
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = path.resolve(import.meta.dirname, "..");

function findMatchingDivEnd(content, openTagEnd) {
  let depth = 1;
  let i = openTagEnd;
  while (i < content.length && depth > 0) {
    const nextOpen = content.indexOf("<div", i);
    const nextClose = content.indexOf("</div>", i);
    if (nextClose === -1) return -1;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 4;
    } else {
      depth -= 1;
      i = nextClose + 6;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function findHeroDivEnd(content) {
  const patterns = [
    /<div className="max-w-4xl mx-auto text-center mb-(?:12|16)">/,
    /<div className="text-center mb-12">/,
  ];

  const mainIdx = content.indexOf("<main");
  if (mainIdx === -1) return -1;

  const slice = content.slice(mainIdx);
  let bestLocal = -1;
  let bestEnd = -1;

  for (const pattern of patterns) {
    const m = slice.match(pattern);
    if (!m || m.index === undefined) continue;
    const openEnd = m.index + m[0].length;
    const end = findMatchingDivEnd(slice, openEnd);
    if (end !== -1 && (bestLocal === -1 || m.index < bestLocal)) {
      bestLocal = m.index;
      bestEnd = mainIdx + end;
    }
  }

  return bestEnd;
}

function findHomeHeroSectionEnd(content) {
  const marker = '<section className="relative bg-slate-900';
  const start = content.indexOf(marker);
  if (start === -1) return -1;
  const sectionClose = content.indexOf("</section>", start);
  if (sectionClose === -1) return -1;
  return sectionClose + "</section>".length;
}

function removeExistingListings(content) {
  let next = content;
  next = next.replace(
    /\n\s*<LazyWhenVisible minHeight=\{480\}>\s*\n\s*<RealScoutListings \/>\s*\n\s*<\/LazyWhenVisible>/g,
    ""
  );
  next = next.replace(/\n\s*<RealScoutListings \/>\s*/g, "\n");
  return next;
}

function insertListings(content, insertAt) {
  const insertion = "\n\n        <RealScoutListings />";
  if (content.slice(insertAt, insertAt + 50).includes("<RealScoutListings")) {
    return content;
  }
  return content.slice(0, insertAt) + insertion + content.slice(insertAt);
}

const files = execSync('rg -l "RealScoutListings" app --glob "page.tsx"', {
  cwd: root,
  encoding: "utf8",
})
  .trim()
  .split("\n")
  .filter(Boolean)
  .filter((f) => f !== "app/listings/page.tsx");

const results = [];

for (const rel of files) {
  const filePath = path.join(root, rel);
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  content = removeExistingListings(content);

  const normalized = rel.replace(/\\/g, "/");
  const insertAt =
    normalized === "app/page.tsx" ? findHomeHeroSectionEnd(content) : findHeroDivEnd(content);

  if (insertAt === -1) {
    results.push({ file: rel, status: "SKIP_NO_HERO" });
    continue;
  }

  content = insertListings(content, insertAt);

  if (rel === "app/page.tsx" && content.includes('import LazyWhenVisible')) {
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    results.push({ file: rel, status: "UPDATED" });
  } else {
    results.push({ file: rel, status: "UNCHANGED" });
  }
}

console.log(JSON.stringify(results, null, 2));
