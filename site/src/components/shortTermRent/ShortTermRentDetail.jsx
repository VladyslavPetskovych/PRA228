import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RoomGallery from "./RentDetail/RoomGallery";
import RoomStats from "./RoomStats";
import Contacts from "./Contacts";
import { Helmet } from "react-helmet";
import Rules from "../utils/rules";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop";

function ShortTermRentDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://primerestapartments.com/api/rooms/${id}`
        );
        setRoom(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) return <div className="text-center py-10">Завантаження...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-600">
        Помилка завантаження: {error.message}
      </div>
    );
  if (!room)
    return <div className="text-center py-10">Квартира не знайдена</div>;

  const pageTitle = room.name || "Квартира у Львові";
  const pageDescription =
    room.description?.substring(0, 160) ||
    `${room.numRooms}-кімнатна квартира у Львові на короткострокову оренду.`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-32 text-brand-black/70">
      {/* SEO */}
      <Helmet>
        <title>{pageTitle} | Prime Rest Apartments</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={room.imgUrls?.[0] || FALLBACK_IMG} />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href={`https://primerestapartments.com/rooms/${id}`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Apartment",
            name: room.name,
            description: room.description,
            image: room.imgUrls?.[0] || FALLBACK_IMG,
            numberOfRooms: room.numRooms,
            floorSize: room.square,
            address: {
              "@type": "PostalAddress",
              streetAddress: "вул. Замарстинівська, 76 б",
              addressLocality: "Львів",
              addressCountry: "UA",
            },
            price: room.pricePerDay,
            priceCurrency: "UAH",
            availability: "https://schema.org/InStock",
          })}
        </script>
      </Helmet>

      {/* Заголовок */}
      <header className="mb-8">
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
      </header>

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
        <aside className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6 flex flex-col gap-4 h-fit">
          <div>
            <p className="text-2xl font-bold text-brand-black">
              Від {room.pricePerDay}{" "}
              <span className="text-base font-normal">грн / ніч</span>
            </p>
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
            <p>Мін. термін: 2 ночі</p>
          </div>
        </aside>
      </main>

      {/* Опис */}
      {room.description && (
        <section className="mt-10 p-6 rounded-2xl bg-gray-50 border border-gray-200 shadow">
          <h2 className="text-2xl font-bold mb-3 text-brand-black">
            Опис квартири
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {room.description}
          </p>
        </section>
      )}
      <section className="my-10">
        <Rules type="short" />
      </section>
    </div>
  );
}

export default ShortTermRentDetail;
