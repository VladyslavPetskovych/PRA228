import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RoomGallery from "./RentDetail/RoomGallery";
import RoomStats from "../shortTermRent/RoomStats";

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
      </div>

      {/* Основний макет */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Фото + характеристики */}
        <div className="lg:col-span-2">
          <RoomGallery imgUrls={room.imgUrls} roomName={room.name} />

          <RoomStats room={room} />

          {/* Зручності */}
          {room.amenities?.length > 0 && (
            <div className="mt-6">
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
            </div>
          )}
        </div>

        {/* Блок бронювання */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6 flex flex-col gap-4 h-fit">
          <div>
            <p className="text-2xl font-bold text-brand-black">
              Від {room.pricePerMonth}{" "}$ {" "}
              <span className="text-base font-normal"> за місяць</span>
            </p>
            <p className="text-sm text-gray-600">+ Комунальні послуги</p>
          </div>

          <a
            href="/book"
            className="w-full text-center rounded-xl bg-brand-orange px-4 py-3 font-semibold text-white shadow hover:opacity-95 transition"
          >
            Забронювати зараз
          </a>

          <div className="text-sm">
            <p className="font-semibold mb-1">Контакти :</p>
            <p className="mb-1 flex items-center gap-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M144.27,45.93a8,8,0,0,1,9.8-5.66,86.22,86.22,0,0,1,61.66,61.66,8,8,0,0,1-5.66,9.8A8.23,8.23,0,0,1,208,112a8,8,0,0,1-7.73-5.94,70.35,70.35,0,0,0-50.33-50.33A8,8,0,0,1,144.27,45.93Zm-2.33,41.8c13.79,3.68,22.65,12.54,26.33,26.33A8,8,0,0,0,176,120a8.23,8.23,0,0,0,2.07-.27,8,8,0,0,0,5.66-9.8c-5.12-19.16-18.5-32.54-37.66-37.66a8,8,0,1,0-4.13,15.46Zm81.94,95.35A56.26,56.26,0,0,1,168,232C88.6,232,24,167.4,24,88A56.26,56.26,0,0,1,72.92,32.12a16,16,0,0,1,16.62,9.52l21.12,47.15,0,.12A16,16,0,0,1,109.39,104c-.18.27-.37.52-.57.77L88,129.45c7.49,15.22,23.41,31,38.83,38.51l24.34-20.71a8.12,8.12,0,0,1,.75-.56,16,16,0,0,1,15.17-1.4l.13.06,47.11,21.11A16,16,0,0,1,223.88,183.08Zm-15.88-2s-.07,0-.11,0h0l-47-21.05-24.35,20.71a8.44,8.44,0,0,1-.74.56,16,16,0,0,1-15.75,1.14c-18.73-9.05-37.4-27.58-46.46-46.11a16,16,0,0,1,1-15.7,6.13,6.13,0,0,1,.57-.77L96,95.15l-21-47a.61.61,0,0,1,0-.12A40.2,40.2,0,0,0,40,88,128.14,128.14,0,0,0,168,216,40.21,40.21,0,0,0,208,181.07Z"></path>
                </svg>
              </span>{" "}
              <span>+380777711400</span>
            </p>
            <p className="flex items-center gap-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                </svg>
              </span>{" "}
              <span>Відповідь - до 30хв </span>
            </p>
          </div>

          <div className="text-sm">
            <p className="font-semibold mb-1">Правила проживання:</p>
            <p>Заїзд: 14:00</p>
            <p>Виїзд: 11:00</p>
            <p>Мін. термін: 2 ночі</p>
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
