import React, { useMemo } from "react";
import { Link } from "react-router-dom";

// запасна картинка
const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop";

const Badge = ({ children, color = "green" }) => {
  const bg =
    color === "green"
      ? "bg-emerald-100 text-emerald-800"
      : color === "gold"
      ? "bg-brand-beige text-brand-black"
      : "bg-brand-blue/15 text-brand-black";
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${bg}`}>
      {children}
    </span>
  );
};

const AmenityPill = ({ children }) => (
  <span className="rounded-full border border-brand-beige/70 bg-brand-beige/30 px-2.5 py-1 text-xs text-brand-black">
    {children}
  </span>
);

function useNormalized(apartment) {
  return useMemo(() => {
    const imgUrl = apartment?.imgUrls?.[0] || apartment?.image || FALLBACK_IMG;
    const title = apartment?.name || "Квартира";
    const type =
      apartment?.category ||
      (apartment?.numRooms > 1 ? `${apartment?.numRooms}-кімнатна` : "Студія");
    const areaStr = apartment?.square || "";
    const area = Number(String(areaStr).match(/\d+(\.\d+)?/)?.[0] || 0) || 35;
    const priceMonth = Number(apartment?.pricePerMonth || 0) || 600;

    return {
      idWoodoo: apartment?.idWoodoo || apartment?._id || apartment?.id, // для посилань
      imgUrl,
      title,
      address: apartment?.address || "",
      rooms: apartment?.numRooms ?? 1,
      area,
      priceMonth,
      type,
      available: true,
      amenities: apartment?.amenities || [],
      guests: apartment?.guests ?? undefined,
      beds: apartment?.beds ?? undefined,
    };
  }, [apartment]);
}

export default function ApartmentCard({ apartment }) {
  const a = useNormalized(apartment);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition-shadow hover:shadow-2xl">
      {/* Фото */}
      <div className="relative h-44 w-full overflow-hidden bg-gray-100 md:h-52">
        <img
          src={a.imgUrl}
          alt={a.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
        />

        {/* бейджі */}
        <div className="pointer-events-none absolute left-3 top-3 flex gap-2">
          <Badge color="gold">{a.type}</Badge>
        </div>

        <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-brand-black shadow">
          <span className="ml-2">🌙 Мін. 1 місяць</span>
        </div>
      </div>

      {/* Контент */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="mb-1 line-clamp-2 font-moderustic text-xl font-extrabold text-brand-black">
          {a.title}
        </h3>

        <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-brand-black/80">
          <span>🛏 {a.rooms} кімн.</span>
          <span>▢ {a.area} м²</span>
          {a.beds !== undefined && <span>🛌 {a.beds} ліжка</span>}
          {a.guests !== undefined && <span>👥 до {a.guests} гостей</span>}
        </div>

        {/* зручності */}
        {a.amenities?.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {a.amenities.slice(0, 6).map((am, i) => (
              <AmenityPill key={i}>{String(am)}</AmenityPill>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-col gap-3">
          {/* Ціна зверху */}
          <div>
            <div className="font-moderustic text-xl font-extrabold text-brand-black">
              ${Number(a.priceMonth).toLocaleString("en-US")}
              <span className="ml-1 text-base font-normal text-brand-black/70">
                / місяць
              </span>
            </div>
            <div className="text-sm text-brand-black/70">
              + Комунальні послуги
            </div>
          </div>

          {/* Кнопки знизу */}
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Link
              to={`/long-term-rent/${a.idWoodoo}`}
              className="flex-1 text-center rounded-xl border border-brand-orange px-4 py-2 font-golos text-brand-orange shadow hover:bg-brand-orange hover:text-white transition-colors"
            >
              Детальніше
            </Link>
            <a
              href="tel:+380777711400"
              className="flex-1 text-center rounded-xl bg-brand-orange px-4 py-2 font-golos text-white shadow hover:opacity-95"
            >
              Зателефонувати
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
