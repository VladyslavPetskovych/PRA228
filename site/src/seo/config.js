// Єдине джерело SEO-даних: використовується і React-компонентом <Seo />,
// і скриптом пре-рендеру (scripts/prerender-seo.mjs), тому без JSX та імпортів Vite.
import { withPlural, BEDS, GUESTS_UPTO } from "../components/utils/plural.js";

export const SITE_URL = "https://primerestapartments.com";
export const SITE_NAME = "Prime Rest Apartments";
export const DEFAULT_IMAGE = `${SITE_URL}/og/og-1200x630.jpg`;
export const DEFAULT_IMAGE_ALT = "Prime Rest Apartments — сучасні квартири в оренду у Львові";

export const BUSINESS = {
  name: SITE_NAME,
  phones: ["+380777711400", "+380685637315"],
  street: "вул. Замарстинівська, 76Б",
  city: "Львів",
  region: "Львівська область",
  country: "UA",
  checkIn: "14:00",
  checkOut: "11:00",
  sameAs: [
    "https://www.instagram.com/prime.rest.apartments/",
    "https://t.me/prime_rest_apartments",
  ],
};

export const absoluteUrl = (path = "/") =>
  path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "/" : path.replace(/\/+$/, "")}`;

// Статичні сторінки. intro/links використовуються для пре-рендеру вмісту для пошукових роботів.
export const PAGES = {
  "/": {
    title: "Оренда квартир у Львові подобово та довгостроково | Prime Rest",
    description:
      "Сучасні квартири в оренду у Львові без посередників: подобово та на тривалий термін. Дизайнерський ремонт, закрита територія, паркування, підтримка 24/7.",
    h1: "Оренда квартир у Львові — Prime Rest Apartments",
    priority: 1.0,
    changefreq: "weekly",
  },
  "/short-term-rent": {
    crumb: "Подобова оренда",
    title: "Квартири подобово у Львові без посередників | Prime Rest",
    description:
      "Подобова оренда стильних квартир у Львові на вул. Замарстинівській. Заселення з 14:00, щотижневе прибирання, кондиціонер, Wi-Fi. Бронюйте онлайн.",
    h1: "Квартири подобово у Львові",
    priority: 0.9,
    changefreq: "daily",
  },
  "/long-term-rent": {
    crumb: "Довгострокова оренда",
    title: "Довгострокова оренда квартир у Львові | Prime Rest",
    description:
      "Довгострокова оренда квартир у Львові від 1 місяця без рієлторських комісій. Меблі та техніка, щотижневе прибирання, закрита територія з паркуванням.",
    h1: "Довгострокова оренда квартир у Львові",
    priority: 0.9,
    changefreq: "daily",
  },
  "/book": {
    crumb: "Бронювання",
    title: "Онлайн-бронювання квартири у Львові | Prime Rest",
    description:
      "Забронюйте квартиру Prime Rest у Львові онлайн: актуальні ціни та вільні дати в реальному часі. Миттєве підтвердження бронювання.",
    h1: "Онлайн-бронювання квартир Prime Rest",
    priority: 0.8,
    changefreq: "weekly",
  },
  "/contacts": {
    crumb: "Контакти",
    title: "Контакти — Prime Rest Apartments, Львів",
    description:
      "Контакти Prime Rest у Львові: вул. Замарстинівська, 76Б. Телефон, Telegram та Instagram — на зв'язку 24/7. Допоможемо підібрати квартиру.",
    h1: "Контакти Prime Rest Apartments",
    priority: 0.7,
    changefreq: "monthly",
  },
  "/terms-and-conditions": {
    crumb: "Правила та умови",
    title: "Правила та умови бронювання | Prime Rest",
    description:
      "Умови бронювання, оплати та скасування, правила проживання й туристичний збір у квартирах Prime Rest у Львові.",
    h1: "Правила та умови користування сайтом",
    priority: 0.3,
    changefreq: "yearly",
  },
};

export const NOT_FOUND = {
  title: "Сторінку не знайдено | Prime Rest",
  description: "Такої сторінки не існує або її було переміщено.",
};

const truncate = (text = "", max = 160) => {
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, clean.lastIndexOf(" ", max - 1)).replace(/[,.;:—–-]+$/, "") + "…";
};

// ---------- Структуровані дані ----------
const postalAddress = () => ({
  "@type": "PostalAddress",
  streetAddress: BUSINESS.street,
  addressLocality: BUSINESS.city,
  addressRegion: BUSINESS.region,
  addressCountry: BUSINESS.country,
});

export const businessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS.name,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  image: DEFAULT_IMAGE,
  description:
    "Сучасні квартири у Львові для подобової та довгострокової оренди без посередників.",
  telephone: BUSINESS.phones[0],
  address: postalAddress(),
  checkinTime: BUSINESS.checkIn,
  checkoutTime: BUSINESS.checkOut,
  priceRange: "₴₴",
  currenciesAccepted: "UAH, USD",
  openingHours: "Mo-Su 00:00-23:59",
  petsAllowed: true,
  sameAs: BUSINESS.sameAs,
});

export const breadcrumbJsonLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: absoluteUrl(path),
  })),
});

const LIST_LABEL = {
  short: ["Подобова оренда", "/short-term-rent"],
  long: ["Довгострокова оренда", "/long-term-rent"],
};

// SEO для сторінки конкретної квартири (kind: "short" | "long")
export function apartmentSeo(room, kind) {
  const id = room.idWoodoo || room.id;
  const path = `/${kind === "long" ? "long" : "short"}-term-rent/${id}`;
  const name = (room.name || "Квартира").trim();
  const stats = [
    room.square,
    room.beds ? withPlural(room.beds, BEDS) : null,
    room.guests ? `до ${withPlural(room.guests, GUESTS_UPTO)}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  const title =
    kind === "long"
      ? `${name} — оренда у Львові${room.pricePerMonth ? ` від $${room.pricePerMonth}/міс` : " на місяць"} | Prime Rest`
      : `${name} подобово у Львові${room.pricePerDay ? ` від ${room.pricePerDay} грн` : ""} | Prime Rest`;

  const lead =
    kind === "long"
      ? `${name} у Львові на довгострокову оренду від 1 місяця`
      : `${name} у Львові подобово`;
  const description = truncate(
    `${lead}${stats ? `: ${stats}` : ""}. ${room.description || "Сучасний ремонт, кондиціонер, Wi-Fi, закрита територія."}`
  );

  const images = (room.imgUrls || []).slice(0, 6);
  const image = images[0] || DEFAULT_IMAGE;

  const offer =
    kind === "long"
      ? room.pricePerMonth && {
          "@type": "Offer",
          price: room.pricePerMonth,
          priceCurrency: "USD",
          url: absoluteUrl(path),
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: room.pricePerMonth,
            priceCurrency: "USD",
            unitCode: "MON",
          },
        }
      : room.pricePerDay && {
          "@type": "Offer",
          price: room.pricePerDay,
          priceCurrency: "UAH",
          url: absoluteUrl(path),
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: room.pricePerDay,
            priceCurrency: "UAH",
            unitCode: "DAY",
          },
        };

  const area = Number(String(room.square || "").match(/\d+(\.\d+)?/)?.[0]);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Apartment",
      "@id": `${absoluteUrl(path)}#apartment`,
      name,
      description: room.description || description,
      url: absoluteUrl(path),
      image: images.length ? images : [DEFAULT_IMAGE],
      numberOfRooms: room.numRooms || 1,
      ...(room.beds && { numberOfBedrooms: room.numRooms || 1, bed: withPlural(room.beds, BEDS) }),
      ...(room.guests && {
        occupancy: { "@type": "QuantitativeValue", maxValue: room.guests },
      }),
      ...(area && {
        floorSize: { "@type": "QuantitativeValue", value: area, unitCode: "MTK" },
      }),
      ...(room.amenities?.length && {
        amenityFeature: room.amenities.map((a) => ({
          "@type": "LocationFeatureSpecification",
          name: String(a).replace(/^[^\p{L}\p{N}]+/u, "").trim(),
          value: true,
        })),
      }),
      petsAllowed: true,
      address: postalAddress(),
      containedInPlace: { "@id": `${SITE_URL}/#business` },
      ...(offer && { offers: offer }),
    },
    breadcrumbJsonLd([["Головна", "/"], LIST_LABEL[kind], [name, path]]),
  ];

  return { title, description, path, image, imageAlt: name, jsonLd, type: "website" };
}

// Хлібні крихти для статичних сторінок
export function pageJsonLd(path) {
  if (path === "/") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: "Prime Rest",
        url: `${SITE_URL}/`,
        inLanguage: "uk-UA",
        publisher: { "@id": `${SITE_URL}/#business` },
      },
    ];
  }
  const page = PAGES[path];
  if (!page) return [];
  return [breadcrumbJsonLd([["Головна", "/"], [page.crumb || page.h1, path]])];
}

// Повний набір тегів <head> для сторінки — спільний для <Seo /> і пре-рендеру.
export function buildHead({
  path,
  title,
  description,
  image = DEFAULT_IMAGE,
  imageAlt = DEFAULT_IMAGE_ALT,
  type = "website",
  jsonLd,
  noindex = false,
} = {}) {
  const page = (path && PAGES[path]) || {};
  const metaTitle = title || page.title || SITE_NAME;
  const metaDescription = description || page.description;
  const url = path ? absoluteUrl(path) : null;

  const meta = (key, name, content) => content && { tag: "meta", attrs: { [key]: name, content: String(content) } };
  const tags = [
    meta("name", "description", metaDescription),
    meta(
      "name",
      "robots",
      noindex
        ? "noindex, follow"
        : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    ),
    url && !noindex && { tag: "link", attrs: { rel: "canonical", href: url } },
    meta("property", "og:type", type),
    meta("property", "og:site_name", SITE_NAME),
    meta("property", "og:locale", "uk_UA"),
    meta("property", "og:title", metaTitle),
    meta("property", "og:description", metaDescription),
    meta("property", "og:url", url),
    meta("property", "og:image", image),
    meta("property", "og:image:alt", imageAlt),
    image === DEFAULT_IMAGE && meta("property", "og:image:width", 1200),
    image === DEFAULT_IMAGE && meta("property", "og:image:height", 630),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", metaTitle),
    meta("name", "twitter:description", metaDescription),
    meta("name", "twitter:image", image),
  ].filter(Boolean);

  return {
    title: metaTitle,
    description: metaDescription,
    tags,
    jsonLd: jsonLd || (path ? pageJsonLd(path) : []),
  };
}
