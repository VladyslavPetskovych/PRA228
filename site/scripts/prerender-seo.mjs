// scripts/prerender-seo.mjs
// Запускається після `vite build`. Для кожної сторінки створює dist/<route>/index.html
// з власними title/description/canonical/OG/JSON-LD та базовим HTML-вмістом,
// який бачать пошукові роботи й соцмережі ще до виконання JavaScript.
// Також генерує sitemap.xml та 404.html.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  SITE_URL,
  PAGES,
  NOT_FOUND,
  BUSINESS,
  buildHead,
  apartmentSeo,
  businessJsonLd,
  absoluteUrl,
} from "../src/seo/config.js";
import { withPlural, BEDS, GUESTS_UPTO } from "../src/components/utils/plural.js";
import { optimizedSources, GALLERY_SIZES } from "../src/utils/images.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.resolve(ROOT, "dist");
const API = `${SITE_URL}/api/rooms`;

const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// JSON всередині <script>: не допускаємо закриття тегу
const jsonScript = (data, managed = true) =>
  `<script${managed ? ' data-react-helmet="true"' : ""} type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

async function loadApartments() {
  try {
    const res = await fetch(API, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data) || !data.length) throw new Error("порожня відповідь");
    console.log(`✓ API: ${data.length} квартир`);
    return data;
  } catch (e) {
    console.warn(`⚠️  API недоступне (${e.message}) — використовую public/apartments.json`);
    return JSON.parse(fs.readFileSync(path.resolve(ROOT, "public/apartments.json"), "utf8"));
  }
}

function renderHead(template, head) {
  const tags = [
    `<title>${esc(head.title)}</title>`,
    ...head.tags.map(({ tag, attrs }) => {
      const a = Object.entries(attrs)
        .map(([k, v]) => `${k}="${esc(v)}"`)
        .join(" ");
      return `<${tag} data-react-helmet="true" ${a} />`;
    }),
    ...head.jsonLd.map((d) => jsonScript(d)),
  ].join("\n    ");

  const out = template.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, tags);
  if (out === template) throw new Error("У index.html не знайдено блоку <!-- seo:start --> … <!-- seo:end -->");
  return out;
}

// ---------- Базовий HTML-вміст для роботів (замінюється React після завантаження) ----------
const NAV = [
  ["/", "Головна"],
  ["/short-term-rent", "Подобова оренда"],
  ["/long-term-rent", "Довгострокова оренда"],
  ["/book", "Бронювання"],
  ["/contacts", "Контакти"],
];

const shell = (inner) => `
      <div class="prerender" style="max-width:72rem;margin:0 auto;padding:8rem 1rem 3rem;font-family:'Golos Text',sans-serif;color:#1C1C1C">
        <nav aria-label="Навігація"><ul style="display:flex;flex-wrap:wrap;gap:1rem;list-style:none;padding:0">${NAV.map(
          ([href, label]) => `<li><a href="${href}">${esc(label)}</a></li>`
        ).join("")}</ul></nav>
        ${inner}
        <footer style="margin-top:2rem">
          <p>${esc(BUSINESS.name)} · ${esc(BUSINESS.street)}, ${esc(BUSINESS.city)} · ${BUSINESS.phones
            .map((p) => `<a href="tel:${p}">${p}</a>`)
            .join(" · ")}</p>
        </footer>
      </div>`;

const apartmentLinks = (apartments, kind) =>
  `<ul>${apartments
    .map((a) => {
      const price =
        kind === "long"
          ? a.pricePerMonth && `від $${a.pricePerMonth}/міс`
          : a.pricePerDay && `від ${a.pricePerDay} грн/доба`;
      return `<li><a href="/${kind}-term-rent/${esc(a.idWoodoo || a.id)}">${esc((a.name || "Квартира").trim())}</a>${
        a.square ? `, ${esc(a.square)}` : ""
      }${price ? ` — ${esc(price)}` : ""}</li>`;
    })
    .join("")}</ul>`;

function pageBody(route, apartments) {
  const page = PAGES[route];
  let extra = "";
  if (route === "/" || route === "/short-term-rent")
    extra += `<h2>Квартири подобово</h2>${apartmentLinks(apartments, "short")}`;
  if (route === "/" || route === "/long-term-rent")
    extra += `<h2>Довгострокова оренда</h2>${apartmentLinks(apartments, "long")}`;
  if (route === "/contacts")
    extra += `<address>${esc(BUSINESS.street)}, ${esc(BUSINESS.city)}<br>${BUSINESS.phones
      .map((p) => `<a href="tel:${p}">${p}</a>`)
      .join("<br>")}<br>${BUSINESS.sameAs.map((u) => `<a href="${u}">${esc(u)}</a>`).join("<br>")}</address>`;
  return shell(`<h1>${esc(page.h1)}</h1><p>${esc(page.description)}</p>${extra}`);
}

function apartmentBody(room, kind, seo) {
  const name = (room.name || "Квартира").trim();
  const facts = [
    room.square && `Площа: ${room.square}`,
    room.numRooms && `Кімнат: ${room.numRooms}`,
    room.beds && withPlural(room.beds, BEDS),
    room.guests && `До ${withPlural(room.guests, GUESTS_UPTO)}`,
    kind === "long"
      ? room.pricePerMonth && `Від $${room.pricePerMonth} за місяць + комунальні послуги`
      : room.pricePerDay && `Від ${room.pricePerDay} грн за добу`,
    `Заїзд з ${BUSINESS.checkIn}, виїзд до ${BUSINESS.checkOut}`,
  ].filter(Boolean);
  const img = room.imgUrls?.[0];
  return shell(`
        <h1>${esc(name)}</h1>
        ${img ? `<img src="${esc(img)}" alt="${esc(name)}" width="1200" height="800" style="max-width:100%;height:auto">` : ""}
        <ul>${facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        ${room.amenities?.length ? `<h2>Зручності</h2><ul>${room.amenities.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>` : ""}
        <h2>Опис квартири</h2>
        <p>${esc(room.description || seo.description)}</p>
        <p><a href="/book">Забронювати</a></p>`);
}

// Попереднє завантаження головного фото сторінки (LCP)
function preloadImage(url, sizes) {
  if (!url) return "";
  const opt = optimizedSources(url);
  return opt
    ? `<link rel="preload" as="image" href="${esc(opt.src)}" imagesrcset="${esc(opt.srcSet)}" imagesizes="${esc(sizes)}" fetchpriority="high" />`
    : `<link rel="preload" as="image" href="${esc(url)}" fetchpriority="high" />`;
}

// Для відвідувачів з JS ховаємо HTML-заготовку (React замінить її за мить),
// але показуємо через 3 с, якщо скрипт раптом не завантажився.
const BOOT = `<script>document.documentElement.classList.add("js-on")</script>
    <style>.js-on .prerender{opacity:0;animation:pr-show 0s 3s forwards}@keyframes pr-show{to{opacity:1}}</style>`;

function write(route, html) {
  const file = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

async function run() {
  const apartments = (await loadApartments()).filter((a) => a.idWoodoo || a.id);

  // дані квартир прямо в HTML — сторінки рендеряться без очікування API
  const data = `<script>window.__APARTMENTS__=${JSON.stringify(apartments).replace(/</g, "\\u003c")}</script>`;
  const template = fs
    .readFileSync(path.join(DIST, "index.html"), "utf8")
    .replace(
      "<!-- ld:business -->",
      [jsonScript(businessJsonLd(), false), BOOT, data].join("\n    ")
    );

  const render = (head, body, preload = "") =>
    renderHead(template, head)
      .replace("<!-- prerender -->", body)
      .replace("</head>", preload ? `  ${preload}\n  </head>` : "</head>");
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];

  for (const route of Object.keys(PAGES)) {
    const heroImg = route === "/" ? preloadImage(apartments[0]?.imgUrls?.[0], "100vw") : "";
    write(route, render(buildHead({ path: route }), pageBody(route, apartments), heroImg));
    urls.push({ loc: absoluteUrl(route), priority: PAGES[route].priority, changefreq: PAGES[route].changefreq });
  }

  for (const room of apartments) {
    for (const kind of ["short", "long"]) {
      const seo = apartmentSeo(room, kind);
      const galleryImg = preloadImage(room.imgUrls?.[0], GALLERY_SIZES);
      write(seo.path, render(buildHead(seo), apartmentBody(room, kind, seo), galleryImg));
      urls.push({
        loc: absoluteUrl(seo.path),
        priority: 0.8,
        changefreq: "weekly",
        images: (room.imgUrls || []).slice(0, 10).map((src) => ({ src })),
      });
    }
  }

  // Оболонка SPA без canonical — для квартир, доданих після збірки (див. nginx.conf)
  fs.writeFileSync(path.join(DIST, "app-shell.html"), render(buildHead({}), ""));

  // 404: окремий файл, щоб сервер міг віддавати справжній статус 404
  fs.writeFileSync(
    path.join(DIST, "404.html"),
    render(buildHead({ ...NOT_FOUND, noindex: true }), "")
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (u) => `  <url>
    <loc>${esc(u.loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>${(u.images || [])
      .map(
        (i) => `
    <image:image><image:loc>${esc(i.src)}</image:loc></image:image>`
      )
      .join("")}
  </url>`
  )
  .join("\n")}
</urlset>
`;
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap);
  console.log(`✓ Пре-рендер: ${urls.length} сторінок + 404.html, sitemap.xml оновлено`);
}

run().catch((e) => {
  console.error("❌ prerender-seo:", e);
  process.exit(1);
});
