import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop";

function RoomGallery({ imgUrls = [], roomName }) {
  const safeImgs = imgUrls.length > 0 ? imgUrls : [FALLBACK_IMG];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {/* Головне фото */}
      <div className="rounded-2xl overflow-hidden shadow relative">
        <img
          src={safeImgs[activeIndex]}
          alt={roomName}
          className="w-full h-96 object-cover transition-all duration-500"
          onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
        />

        {/* Ліво-право стрілки */}
        {safeImgs.length > 1 && (
          <>
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? safeImgs.length - 1 : prev - 1
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-lg transition"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === safeImgs.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-lg transition"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}
      </div>

      {/* Мініатюри */}
      {safeImgs.length > 1 && (
        <div className="mt-3 p-3 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-200">
          <div className="flex gap-2">
            {safeImgs.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Фото ${i + 1}`}
                onClick={() => setActiveIndex(i)}
                className={`h-20 w-28 flex-none object-cover rounded-lg shadow cursor-pointer transition
                ${
                  activeIndex === i
                    ? "ring-2 ring-brand-orange scale-105"
                    : "hover:opacity-80"
                }`}
                onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomGallery;
