// Оптимізовані версії фото з WuBook (оригінали 2000px, ~150–300 КБ).
// Під час збірки scripts/optimize-images.mjs створює WebP різних ширин у /img/wb/,
// а тут ми будуємо на них src/srcset. Якщо версії немає (фото додали після збірки),
// <SmartImage> автоматично повертається до оригіналу.

export const IMAGE_WIDTHS = [480, 960, 1600];

// ширина головного фото галереї на сторінці квартири (див. RoomGallery)
export const GALLERY_SIZES = "(min-width: 1024px) 720px, 100vw";

const WUBOOK_RE = /^https?:\/\/wubook\.net\/wbkd\/wbkimgs\/([\w/-]+)\.(?:jpe?g|png|webp)$/i;

// шлях без розширення, напр. "/img/wb/room/1079088"
export function optimizedBase(url) {
  const m = typeof url === "string" && url.match(WUBOOK_RE);
  return m ? `/img/wb/${m[1]}` : null;
}

export function optimizedSources(url, defaultWidth = 960) {
  const base = optimizedBase(url);
  if (!base) return null;
  return {
    src: `${base}-${defaultWidth}.webp`,
    srcSet: IMAGE_WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(", "),
  };
}
