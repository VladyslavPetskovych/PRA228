import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RoomGallery from "./RentDetail/RoomGallery"; 

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop";

function LongTermRentDetail() {
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-32 text-brand-black/70">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
          {room.name || "Квартира"}
        </h1>
        <div className="flex items-center gap-3 text-gray-600 text-base">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
            {room.category || `${room.numRooms}-кімнатна`}
          </span>
          <span className="text-gray-400">•</span>
          <span className="flex items-center gap-1">
            📍 {"Замарстинівська 76 б, Львів"}
          </span>
        </div>
      </div>

      {/* Основний макет */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Фото + характеристики */}
        <div className="lg:col-span-2">
          <RoomGallery imgUrls={room.imgUrls} roomName={room.name} />

          {/* Характеристики */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-lg font-bold">{room.numRooms || 1}</p>
              <p className="text-sm text-gray-600">кімнати</p>
            </div>
            <div>
              <p className="text-lg font-bold">{room.square}</p>
              <p className="text-sm text-gray-600">площа</p>
            </div>
            <div>
              <p className="text-lg font-bold">{room.guests}👥</p>
              <p className="text-sm text-gray-600">гості</p>
            </div>
            <div>
              <p className="text-lg font-bold">{room.beds}🛏</p>
              <p className="text-sm text-gray-600">ліжка</p>
            </div>
          </div>

          {/* Зручності */}
          {room.amenities?.length > 0 && (
            <div className="mt-6">
              <h2 className="font-semibold mb-2">Зручності</h2>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((am, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-sm"
                  >
                    {am}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Блок бронювання */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6 flex flex-col gap-4 h-fit">
          <div>
            <p className="text-2xl font-bold text-brand-black">
              ${room.pricePerMonth}{" "}
              <span className="text-base font-normal">/ місяць</span>
            </p>
            <p className="text-sm text-gray-600">+ Комунальні послуги</p>
          </div>

          <a
            href="#booking"
            className="w-full text-center rounded-xl bg-brand-orange px-4 py-3 font-semibold text-white shadow hover:opacity-95 transition"
          >
            Забронювати зараз
          </a>

          <div className="text-sm">
            <p className="font-semibold mb-1">Контакти:</p>
            <p className="mb-1">📞 +380777711400</p>
            <p>⏱ Відповідь до 30хв </p>
          </div>

          <div className="text-sm">
            <p className="font-semibold mb-1">Правила проживання:</p>
            <p>Заїзд: 14:00</p>
            <p>Виїзд: 11:00</p>
            <p>Мін. термін: 1 місяць</p>
          </div>
        </div>
      </div>

      {/* Опис */}
      {room.description && (
        <div className="mt-10 p-6 rounded-2xl bg-gray-50 border border-gray-200 shadow">
          <h2 className="text-2xl font-bold mb-3 text-brand-black">
            Опис квартири
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {room.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default LongTermRentDetail;
