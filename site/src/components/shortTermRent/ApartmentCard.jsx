import React, { useMemo } from "react";
import { FaStar } from "react-icons/fa";
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

// невеличка нормалізація даних з API
function useNormalized(apartment) {
  return React.useMemo(() => {
    // 1) фото
    const imgUrl =
      apartment?.imgUrls?.[0] ||
      apartment?.image || // локальний fallback
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop";

    // 2) базові поля
    const title = apartment?.name || "Квартира";
    const type =
      apartment?.category ||
      (apartment?.numRooms > 1 ? `${apartment?.numRooms}-кімнатна` : "Студія");

    // 3) площа (рядок типу "50 м²" → 50)
    const areaStr = apartment?.square || "";
    const area = Number(String(areaStr).match(/\d+(\.\d+)?/)?.[0] || 0) || 35;

    // 4) ціна
    const price =
      Number(apartment?.pricePerDay || apartment?.pricePerMonth || 0) || 1200;

    // 5) зручності/параметри
    const amenities = apartment?.amenities || [];
    const rooms = apartment?.numRooms ?? 1;
    const beds = apartment?.beds ?? undefined;
    const guests = apartment?.guests ?? undefined;

    // 6) інше
    const rating = 4.8; // якщо в тебе з’явиться поле — підставимо реальне
    const reviewsCount = 24; // так само

    return {
      id: apartment?._id || apartment?.id || apartment?.idWoodoo,
      imgUrl,
      title,
      address: apartment?.address || "", // якщо буде — відобразимо
      rating,
      reviewsCount,
      rooms,
      area,
      price,
      type,
      available: true, // якщо матимеш флаг — підставимо apartment.available
      amenities,
      guests,
      beds,
      idWoodoo: apartment?.idWoodoo,
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

        {/* рейтинг */}
        <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-brand-black shadow">
       
          <span className="ml-2">🌙 Мін. 2 ночі</span>
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

        <p className="mb-3 line-clamp-2 text-sm text-brand-black/80">
          {a.shortDesc}
        </p>

        {/* параметри */}
        <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-brand-black/80">
          <span>🛏 {a.rooms} кімн.</span>
          <span>▢ {a.area} м²</span>
        </div>

        {/* зручності (перші 6) */}
        {a.amenities?.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {a.amenities.slice(0, 6).map((am, i) => (
              <AmenityPill key={i}>{String(am)}</AmenityPill>
            ))}
          </div>
        )}

        {/* низ */}
        <div className="mt-auto flex items-center justify-between">
          <div className="font-moderustic text-2xl font-extrabold text-brand-black">
            <span className="text-base font-normal text-brand-black/70">
              Від{" "}
            </span>
            ₴{Number(a.price).toLocaleString("uk-UA")}{" "}
            <span className="text-base font-normal text-brand-black/70">
              / ніч
            </span>
          </div>
          <Link
            to="/book"
            className="inline-block rounded-xl bg-brand-orange px-5 py-2.5 font-golos text-white shadow hover:opacity-95 active:scale-[0.99]"
            onClick={() => {
              console.log("Забронювати:", a.title);
            }}
          >
            Забронювати
          </Link>
        </div>
      </div>
    </div>
  );
}
