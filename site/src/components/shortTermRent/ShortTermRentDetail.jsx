import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 mt-32 text-black">
      {/* Фото зверху */}
      {room.imgUrls?.length > 0 ? (
        <img
          src={room.imgUrls[0]}
          alt={room.name}
          className="w-full h-80 object-cover rounded-2xl mb-6 shadow"
        />
      ) : (
        <div className="w-full h-80 bg-gray-200 rounded-2xl mb-6 flex items-center justify-center text-lg">
          Фото відсутнє
        </div>
      )}

      {/* Заголовок */}
      <h1 className="text-2xl font-bold mb-2">{room.name || "Квартира"}</h1>

      {/* Основна інформація */}
      <div className="space-y-2 mb-6">
        <p className="text-lg">
          Тип: {room.category || `${room.numRooms}-кімнатна`}
        </p>
        <p className="text-lg">Площа: {room.square} м²</p>
      </div>

      {/* Ціна над кнопками */}
      <div className="text-center mb-6">
        <p className="text-2xl font-bold">${room.pricePerMonth} / місяць</p>
        <p className="text-sm">+ Комунальні послуги</p>
      </div>

      {/* Зручності */}
      {room.amenities?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {room.amenities.map((am, i) => (
            <span
              key={i}
              className="rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-sm"
            >
              {am}
            </span>
          ))}
        </div>
      )}

      {/* Кнопки */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="tel:+380777711400"
          className="flex-1 text-center rounded-xl bg-brand-orange px-4 py-3 font-semibold text-white shadow hover:opacity-95 transition"
        >
          Зателефонувати
        </a>
        <a
          href="#booking"
          className="flex-1 text-center rounded-xl border border-brand-orange px-4 py-3 font-semibold text-brand-orange shadow hover:bg-brand-orange hover:text-white transition"
        >
          Забронювати
        </a>
      </div>
    </div>
  );
}

export default ShortTermRentDetail;
