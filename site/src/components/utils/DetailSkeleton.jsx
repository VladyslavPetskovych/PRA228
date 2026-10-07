import React from "react";

// Заглушка сторінки квартири, поки дані завантажуються
export default function DetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-32" aria-busy="true" aria-label="Завантаження">
      <div className="skeleton mb-3 h-10 w-2/3 max-w-md rounded-xl" />
      <div className="skeleton mb-8 h-6 w-28 rounded-full" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="skeleton h-96 rounded-2xl" />
          <div className="mt-6 flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-20 w-28 flex-none rounded-lg" />
            ))}
          </div>
        </div>
        <div className="skeleton h-80 rounded-2xl" />
      </div>
    </div>
  );
}
