/**
 * Removes premature </div> closings inserted after <PageHero /> by apply-page-heroes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name === "page.tsx") files.push(full);
  }
  return files;
}

/** Find closing /> of <PageHero ...> outside of quoted strings. */
function findPageHeroEnd(content, startIdx) {
  let i = startIdx;
  let inString = false;
  let stringChar = "";

  while (i < content.length - 1) {
    const c = content[i];
    const prev = content[i - 1];

    if (!inString && (c === '"' || c === "'")) {
      inString = true;
      stringChar = c;
    } else if (inString && c === stringChar && prev !== "\\") {
      inString = false;
    } else if (!inString && c === "/" && content[i + 1] === ">") {
      return i + 2;
    }
    i++;
  }
  return -1;
}

function fixContent(content) {
  const heroIdx = content.indexOf("<PageHero");
  if (heroIdx === -1) return { content, changed: false };

  const closeIdx = findPageHeroEnd(content, heroIdx);
  if (closeIdx === -1) return { content, changed: false };

  const after = content.slice(closeIdx);
  const lines = after.split("\n");
  let removeCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    if (/^<\/div>$/.test(trimmed)) {
      removeCount++;
      continue;
    }
    break;
  }

  if (removeCount === 0) return { content, changed: false };

  let removed = 0;
  const kept = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (removed < removeCount && (trimmed === "" || /^<\/div>$/.test(trimmed))) {
      if (/^<\/div>$/.test(trimmed)) removed++;
      continue;
    }
    kept.push(line);
  }

  return {
    content: content.slice(0, closeIdx) + kept.join("\n"),
    changed: true,
    removeCount,
  };
}

const pages = walk(path.join(ROOT, "app"));
let fixed = 0;

for (const absPath of pages) {
  const rel = path.relative(ROOT, absPath).replace(/\\/g, "/");
  let content = fs.readFileSync(absPath, "utf8");
  const result = fixContent(content);
  if (result.changed) {
    fs.writeFileSync(absPath, result.content);
    console.log(`✓ ${rel} (removed ${result.removeCount} stray </div>)`);
    fixed++;
  }
}

console.log(`\nFixed ${fixed} files.`);
