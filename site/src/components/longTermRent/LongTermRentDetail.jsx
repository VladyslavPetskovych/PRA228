import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function LongTermRentDetail() {
  const { id } = useParams(); // idWoodoo
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Робимо запит до бекенду
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://primerestapartments.com/api/rooms/${id}`);
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
    <div className="max-w-4xl mx-auto px-4 py-10 mt-32">
      <h1 className="text-3xl font-bold mb-4">{room.name || "Квартира"}</h1>
      <p className="mb-2 text-lg">
        Тип: {room.category || `${room.numRooms}-кімнатна`}
      </p>
      <p className="mb-2 text-lg">Площа: {room.square} м²</p>
      <p className="mb-2 text-lg">Ціна: ${room.pricePerMonth} / місяць</p>
      <p className="mb-4 text-sm text-gray-600">+ Комунальні послуги</p>

      {/* Фото */}
      {room.imgUrls?.length > 0 ? (
        <img
          src={room.imgUrls[0]}
          alt={room.name}
          className="w-full h-80 object-cover rounded-lg mb-5"
        />
      ) : (
        <div className="w-full h-80 bg-gray-200 rounded-lg mb-5 flex items-center justify-center">
          Фото відсутнє
        </div>
      )}

      {/* Зручності */}
      {room.amenities?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
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
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="tel:+380777711400"
          className="flex-1 text-center rounded-xl bg-brand-orange px-4 py-2 font-golos text-white shadow hover:opacity-95"
        >
          Зателефонувати
        </a>
        <a
          href="#booking"
          className="flex-1 text-center rounded-xl border border-brand-orange px-4 py-2 font-golos text-brand-orange shadow hover:bg-brand-orange hover:text-white transition-colors"
        >
          Забронювати
        </a>
      </div>
    </div>
  );
}

export default LongTermRentDetail;
