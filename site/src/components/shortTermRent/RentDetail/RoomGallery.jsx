import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SmartImage from "../../utils/SmartImage";
import { GALLERY_SIZES, optimizedSources } from "../../../utils/images";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop";

// Підвантажуємо сусідні фото заздалегідь, щоб перемикання було миттєвим
function preload(url) {
  const opt = optimizedSources(url);
  const img = new Image();
  if (opt) {
    img.sizes = GALLERY_SIZES;
    img.srcset = opt.srcSet;
  }
  img.src = opt ? opt.src : url;
}

function RoomGallery({ imgUrls = [], roomName }) {
  const safeImgs = useMemo(
    () => (imgUrls.length > 0 ? imgUrls : [FALLBACK_IMG]),
    [imgUrls]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbsRef = useRef(null);
  const count = safeImgs.length;

  const go = (delta) => setActiveIndex((prev) => (prev + delta + count) % count);

  useEffect(() => {
    if (count < 2) return;
    const t = setTimeout(() => {
      preload(safeImgs[(activeIndex + 1) % count]);
      preload(safeImgs[(activeIndex - 1 + count) % count]);
    }, 300);
    // активна мініатюра — у полі зору
    thumbsRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    return () => clearTimeout(t);
  }, [activeIndex, count, safeImgs]);

  return (
    <div>
      {/* Головне фото */}
      <div className="rounded-2xl overflow-hidden shadow relative h-96 bg-gray-200">
        <SmartImage
          key={safeImgs[activeIndex]}
          src={safeImgs[activeIndex]}
          alt={`${roomName || "Квартира"} — фото ${activeIndex + 1}`}
          sizes={GALLERY_SIZES}
          priority={activeIndex === 0}
          fallback={FALLBACK_IMG}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Ліво-право стрілки */}
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Попереднє фото"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-lg transition hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              type="button"
              aria-label="Наступне фото"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-lg transition hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">
              {activeIndex + 1} / {count}
            </span>
          </>
        )}
      </div>

      {/* Мініатюри */}
      {count > 1 && (
        <div
          ref={thumbsRef}
          className="mt-3 p-3 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-200"
        >
          <div className="flex gap-2">
            {safeImgs.map((url, i) => (
              <button
                key={i}
                type="button"
                data-index={i}
                aria-label={`Фото ${i + 1}`}
                onClick={() => setActiveIndex(i)}
                className={`relative h-20 w-28 flex-none overflow-hidden rounded-lg bg-gray-200 shadow transition duration-300
                ${
                  activeIndex === i
                    ? "ring-2 ring-brand-orange scale-105"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                <SmartImage
                  src={url}
                  alt=""
                  sizes="112px"
                  fallback={FALLBACK_IMG}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomGallery;
