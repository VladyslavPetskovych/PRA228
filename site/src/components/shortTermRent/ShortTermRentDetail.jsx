import React from "react";
import { useParams } from "react-router-dom";
import RoomGallery from "./RentDetail/RoomGallery";
import RoomStats from "./RoomStats";
import Contacts from "./Contacts";
import Seo from "../utils/Seo";
import Reveal from "../utils/Reveal";
import DetailSkeleton from "../utils/DetailSkeleton";
import useRoom from "../../hooks/useRoom";
import { apartmentSeo } from "../../seo/config";
import Rules from "../utils/rules";
import TouristTaxInfo from "../utils/TouristTaxInfo";

function ShortTermRentDetail() {
  const { id } = useParams();
  const { room, loading, error } = useRoom(id);

  if (loading) return <DetailSkeleton />;
  if (error || !room)
    return (
      <div className="text-center py-10 pt-32">
        <Seo title="Квартира не знайдена | Prime Rest" noindex />
        {error && error.response?.status !== 404 ? (
          <span className="text-red-600">Помилка завантаження: {error.message}</span>
        ) : (
          "Квартира не знайдена"
        )}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-32 text-brand-black/70">
      <Seo {...apartmentSeo(room, "short")} />

      {/* Заголовок */}
      <Reveal as="header" className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
          {room.name || "Квартира"}
        </h1>
        <div className="flex items-center gap-3 text-gray-600 text-base">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
            {room.category || `${room.numRooms}-кімнатна`}
          </span>
          <span className="text-gray-400">•</span>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Львів, вул. Замарстинівська, 76 б"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1  hover:text-orange-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
              className="animate-pulse"
            >
              <path d="M112,80a16,16,0,1,1,16,16A16,16,0,0,1,112,80ZM64,80a64,64,0,0,1,128,0c0,59.95-57.58,93.54-60,94.95a8,8,0,0,1-7.94,0C121.58,173.54,64,140,64,80Zm16,0c0,42.2,35.84,70.21,48,78.5,12.15-8.28,48-36.3,48-78.5a48,48,0,0,0-96,0Zm122.77,67.63a8,8,0,0,0-5.54,15C213.74,168.74,224,176.92,224,184c0,13.36-36.52,32-96,32s-96-18.64-96-32c0-7.08,10.26-15.26,26.77-21.36a8,8,0,0,0-5.54-15C29.22,156.49,16,169.41,16,184c0,31.18,57.71,48,112,48s112-16.82,112-48C240,169.41,226.78,156.49,202.77,147.63Z"></path>
            </svg>
            Львів, вул. Замарстинівська, 76 б
          </a>
        </div>
      </Reveal>

      {/* Основний макет */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Фото + характеристики */}
        <div className="lg:col-span-2">
          <RoomGallery imgUrls={room.imgUrls} roomName={room.name} />

          <RoomStats room={room} />

          {/* Зручності */}
          {room.amenities?.length > 0 && (
            <section className="mt-6">
              <h2 className="font-semibold mb-2">Зручності</h2>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((am, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-brand-beige/70 bg-brand-beige/30 px-2.5 py-1 text-xs text-brand-black"
                  >
                    {am}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Блок бронювання */}
        <Reveal
          as="aside"
          from="right"
          delay={120}
          className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6 flex flex-col gap-4 h-fit">
          <div>
            <p className="text-2xl font-bold text-brand-black">
              Від {room.pricePerDay}{" "}
              <span className="text-base font-normal">грн / ніч</span>
            </p>
            <TouristTaxInfo className="mt-1" />
          </div>

          <a
            href="/book"
            className="w-full text-center rounded-xl bg-brand-orange px-4 py-3 font-semibold text-white shadow hover:opacity-95 transition"
          >
            Забронювати зараз
          </a>

          <Contacts />

          <div className="text-sm">
            <p className="font-semibold mb-1">Правила проживання:</p>
            <p>Заїзд: 14:00</p>
            <p>Виїзд: 11:00</p>
            <p>Мін. термін: 1 ніч</p>
          </div>
        </Reveal>
      </main>

      {/* Опис */}
      {room.description && (
        <Reveal as="section" className="mt-10 p-6 rounded-2xl bg-gray-50 border border-gray-200 shadow">
          <h2 className="text-2xl font-bold mb-3 text-brand-black">
            Опис квартири
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {room.description}
          </p>
        </Reveal>
      )}
      <Reveal as="section" className="my-10">
        <Rules type="short" />
      </Reveal>
    </div>
  );
}

export default ShortTermRentDetail;
