// scripts/og-gen.mjs
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// корінь проекту = один рівень вище /scripts
const ROOT = path.resolve(__dirname, "..");

// аргументи або дефолти
const SRC_IMAGE = path.resolve(ROOT, process.argv[2] || "public/prime-rest-apartments-logomark-terracotta-rgb-3000px-w-72ppi.png");
const LOGO = process.argv[3] ? path.resolve(ROOT, process.argv[3]) : null;

const OUT_DIR = path.resolve(ROOT, "public/og");

const targets = [
  { file: "og-1200x630.jpg",  w: 1200, h: 630,  quality: 82 },
  { file: "og-800x418.jpg",   w: 800,  h: 418,  quality: 82 },
  { file: "og-1200x1200.jpg", w: 1200, h: 1200, quality: 85 },
  { file: "og-1080x1350.jpg", w: 1080, h: 1350, quality: 85 },
];

function cover(img, w, h, q) {
  return img
    .resize(w, h, { fit: "cover", position: "attention" })
    .jpeg({ quality: q, progressive: true, mozjpeg: true });
}

async function run() {
  if (!fs.existsSync(SRC_IMAGE)) {
    console.error("❌ Не знайдено вихідний файл:", SRC_IMAGE);
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const t of targets) {
    let img = sharp(SRC_IMAGE);
    img = cover(img, t.w, t.h, t.quality);

    if (LOGO) {
      if (!fs.existsSync(LOGO)) {
        console.warn("⚠️ LOGO не знайдено, пропускаю:", LOGO);
      } else {
        const logoBuf = await sharp(LOGO)
          .resize(Math.round(t.w * 0.18))
          .png()
          .toBuffer();

        img = await img
          .composite([{ input: logoBuf, gravity: "southwest", left: 40, top: 40 }])
          .jpeg({ quality: t.quality, progressive: true, mozjpeg: true });
      }
    }

    const outPath = path.resolve(OUT_DIR, t.file);
    await img.toFile(outPath);

    const { size } = fs.statSync(outPath);
    console.log(`✅ ${path.relative(ROOT, outPath)}  (${Math.round(size / 1024)} KB)`);
  }

  console.log("Done.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
