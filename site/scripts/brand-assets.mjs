// scripts/brand-assets.mjs
// Генерує favicon, іконки PWA, логотипи та OG-зображення з вихідних логотипів.
// Запуск: node scripts/brand-assets.mjs
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

sharp.cache(false);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const r = (...p) => path.resolve(ROOT, ...p);

const BRAND = "#B86F21";
const DARK = "#1C1C1C";

// вихідні файли
const MARK_SRC = r("public/prime-rest-apartments-logomark-terracotta-rgb-3000px-w-72ppi.png");
const LOGO_SRC = r("src/assets/logo/logoShortVertical.png");
const OG_PHOTO = r("public/hero/smart.jpg");

const PUBLIC = r("public");
const LOGO_OUT = r("src/assets/logo");

// логотип без порожніх полів
const mark = await sharp(MARK_SRC).trim().png().toBuffer();
const logo = await sharp(LOGO_SRC).trim().png().toBuffer();

// перефарбувати логотип в один колір, зберігши прозорість
async function tint(buf, color) {
  const { width, height } = await sharp(buf).metadata();
  const alpha = await sharp(buf).ensureAlpha().extractChannel(3).toBuffer();
  return sharp({ create: { width, height, channels: 3, background: color } })
    .joinChannel(alpha)
    .png()
    .toBuffer();
}

// квадратна іконка: знак по центру з полями (scale — частка сторони)
async function icon(size, { scale = 0.8, background = null, src = mark } = {}) {
  const inner = Math.round(size * scale);
  const glyph = await sharp(src).resize(inner, inner, { fit: "contain", background: "#0000" }).toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: background || "#0000" },
  })
    .composite([{ input: glyph, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// ICO з PNG-кадрами (підтримується всіма сучасними браузерами)
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const dir = Buffer.alloc(16 * pngs.length);
  let offset = 6 + dir.length;
  pngs.forEach(({ size, buf }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(buf.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, dir, ...pngs.map((p) => p.buf)]);
}

const write = (file, buf) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buf);
  console.log("✓", path.relative(ROOT, file), `${(buf.length / 1024).toFixed(1)} KB`);
};

// ---------- Favicon ----------
const fav = {};
for (const size of [16, 32, 48, 96]) fav[size] = await icon(size, { scale: size <= 32 ? 0.94 : 0.88 });
write(r(PUBLIC, "favicon.ico"), ico([16, 32, 48].map((size) => ({ size, buf: fav[size] }))));
write(r(PUBLIC, "favicon-16x16.png"), fav[16]);
write(r(PUBLIC, "favicon-32x32.png"), fav[32]);
write(r(PUBLIC, "favicon-96x96.png"), fav[96]);

// ---------- Apple / PWA ----------
write(r(PUBLIC, "apple-touch-icon.png"), await icon(180, { scale: 0.7, background: "#FFFFFF" }));
write(r(PUBLIC, "icon-192x192.png"), await icon(192, { scale: 0.86 }));
write(r(PUBLIC, "icon-512x512.png"), await icon(512, { scale: 0.86 }));
// maskable: знак у безпечній зоні (≈ 60%) на брендовому фоні
const markWhite = await tint(mark, "#FFFFFF");
write(r(PUBLIC, "web-app-manifest-192x192.png"), await icon(192, { scale: 0.56, background: BRAND, src: markWhite }));
write(r(PUBLIC, "web-app-manifest-512x512.png"), await icon(512, { scale: 0.56, background: BRAND, src: markWhite }));

// ---------- Логотипи ----------
// для структурованих даних (Google вимагає ≥112px, квадрат на білому)
write(r(PUBLIC, "logo.png"), await icon(512, { scale: 0.8, background: "#FFFFFF" }));
// горизонтальний логотип для шапки та футера
const logoSmall = await sharp(logo).resize({ height: 160 }).png({ compressionLevel: 9 }).toBuffer();
write(r(LOGO_OUT, "logo.png"), logoSmall);

// ---------- Open Graph ----------
async function og(w, h) {
  const photo = await sharp(OG_PHOTO).rotate().resize(w, h, { fit: "cover", position: "attention" }).toBuffer();
  const logoW = Math.round(w * 0.24);
  const logoWhite = await sharp(await tint(logo, "#FFFFFF")).resize({ width: logoW }).toBuffer();
  const { height: logoH } = await sharp(logoWhite).metadata();
  const pad = Math.round(w * 0.06);
  const title = h >= w ? 64 : 58;
  const textTop = pad + logoH + Math.round(title * 1.15) + Math.round(h * 0.1);

  const overlay = Buffer.from(`
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${DARK}" stop-opacity="0.92"/>
      <stop offset="0.55" stop-color="${DARK}" stop-opacity="0.65"/>
      <stop offset="1" stop-color="${DARK}" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="${pad}" y="${textTop - title * 1.35}" width="64" height="5" fill="${BRAND}"/>
  <g font-family="Segoe UI, Arial, Helvetica, sans-serif" fill="#FFFFFF">
    <text x="${pad}" y="${textTop}" font-size="${title}" font-weight="700">Оренда квартир</text>
    <text x="${pad}" y="${textTop + title * 1.12}" font-size="${title}" font-weight="700">у Львові</text>
    <text x="${pad}" y="${textTop + title * 1.12 + 56}" font-size="28" fill-opacity="0.85">Подобово та довгостроково · без посередників</text>
  </g>
  <text x="${pad}" y="${h - pad * 0.8}" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="${BRAND}" font-weight="600">primerestapartments.com</text>
</svg>`);

  return sharp(photo)
    .composite([
      { input: overlay, left: 0, top: 0 },
      { input: logoWhite, left: pad, top: pad },
    ])
    .jpeg({ quality: 84, progressive: true, mozjpeg: true })
    .toBuffer();
}
write(r(PUBLIC, "og/og-1200x630.jpg"), await og(1200, 630));
write(r(PUBLIC, "og/og-1200x1200.jpg"), await og(1200, 1200));

// ---------- Стиснення важких фото ----------
async function compress(file, width) {
  const before = fs.statSync(file).size;
  if (before < 600 * 1024) return;
  const buf = await sharp(fs.readFileSync(file)).rotate().resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 78, progressive: true, mozjpeg: true }).toBuffer();
  write(file, buf);
}
await compress(r("src/assets/homePage/placeholder.jpg"), 1920);
await compress(r("src/assets/AvalonYard/dvir.jpg"), 1920);
