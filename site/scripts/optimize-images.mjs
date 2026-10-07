// scripts/optimize-images.mjs
// Завантажує фото квартир з WuBook і створює WebP-версії різної ширини в public/img/wb/.
// Запускається автоматично перед `npm run build` (prebuild). Вже готові файли пропускаються.
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { IMAGE_WIDTHS, optimizedBase } from "../src/utils/images.js";

sharp.cache(false);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.resolve(ROOT, "public");
const API = "https://primerestapartments.com/api/rooms";
const CONCURRENCY = 6;

async function loadUrls() {
  try {
    const res = await fetch(API, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rooms = await res.json();
    return [...new Set(rooms.flatMap((r) => r.imgUrls || []))];
  } catch (e) {
    console.warn(`⚠️  optimize-images: API недоступне (${e.message}) — пропускаю`);
    return [];
  }
}

async function processOne(url) {
  const base = optimizedBase(url);
  if (!base) return "skip";
  const outs = IMAGE_WIDTHS.map((w) => [w, path.join(PUBLIC, `${base}-${w}.webp`)]);
  if (outs.every(([, f]) => fs.existsSync(f))) return "cached";

  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());

  fs.mkdirSync(path.dirname(outs[0][1]), { recursive: true });
  for (const [w, file] of outs) {
    await sharp(input)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: w <= 480 ? 70 : 74, effort: 5 })
      .toFile(file);
  }
  return "done";
}

const urls = await loadUrls();
const stats = { done: 0, cached: 0, skip: 0, failed: 0 };
let i = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (i < urls.length) {
      const url = urls[i++];
      try {
        stats[await processOne(url)]++;
      } catch (e) {
        stats.failed++;
        console.warn(`⚠️  ${url}: ${e.message}`);
      }
    }
  })
);
console.log(
  `✓ optimize-images: ${urls.length} фото — нових ${stats.done}, з кешу ${stats.cached}, помилок ${stats.failed}`
);
