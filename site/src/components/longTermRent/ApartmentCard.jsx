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
          <Link
            to={`/long-term-rent/${a.idWoodoo}`}
            className="hover:underline"
          >
            {a.title}
          </Link>
        </h3>

        <div className="mb-3 flex flex-wrap justify-start gap-6 text-sm text-brand-black/80">
          <span className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M240,208h-8V72a8,8,0,0,0-8-8H184V40a8,8,0,0,0-8-8H80a8,8,0,0,0-8,8V96H32a8,8,0,0,0-8,8V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM40,112H80a8,8,0,0,0,8-8V48h80V72a8,8,0,0,0,8,8h40V208H152V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40H40Zm96,96H120V176h16ZM112,72a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H120A8,8,0,0,1,112,72Zm0,32a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H120A8,8,0,0,1,112,104Zm56,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,104ZM88,136a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H80A8,8,0,0,1,88,136Zm0,32a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H80A8,8,0,0,1,88,168Zm24-32a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H120A8,8,0,0,1,112,136Zm56,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,168Z"></path>
            </svg>
            <span>{a.rooms} кімн.</span>
          </span>

          <span className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M152,40a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,40Zm-8,168H112a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM208,32H184a8,8,0,0,0,0,16h24V72a8,8,0,0,0,16,0V48A16,16,0,0,0,208,32Zm8,72a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V112A8,8,0,0,0,216,104Zm0,72a8,8,0,0,0-8,8v24H184a8,8,0,0,0,0,16h24a16,16,0,0,0,16-16V184A8,8,0,0,0,216,176ZM40,152a8,8,0,0,0,8-8V112a8,8,0,0,0-16,0v32A8,8,0,0,0,40,152Zm32,56H48V184a8,8,0,0,0-16,0v24a16,16,0,0,0,16,16H72a8,8,0,0,0,0-16ZM72,32H48A16,16,0,0,0,32,48V72a8,8,0,0,0,16,0V48H72a8,8,0,0,0,0-16Z"></path>
            </svg>
            <span>{a.area} м²</span>
          </span>

          {a.beds !== undefined && (
            <span className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M216,72H32V48a8,8,0,0,0-16,0V208a8,8,0,0,0,16,0V176H240v32a8,8,0,0,0,16,0V112A40,40,0,0,0,216,72ZM32,88h72v72H32Zm88,72V88h96a24,24,0,0,1,24,24v48Z"></path>
              </svg>
              <span>{a.beds} ліжка</span>
            </span>
          )}

          {a.guests !== undefined && (
            <span className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
              </svg>
              <span>до {a.guests} осіб</span>
            </span>
          )}
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
