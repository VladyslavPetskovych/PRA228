import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApartments } from "../../redux/apartmentsSlice";
import ApartmentCard from "./ApartmentCard";

const SkeletonCard = () => (
  <div className="animate-pulse rounded-3xl border border-gray-200 bg-white p-5 shadow-lg">
    <div className="mb-4 h-44 w-full rounded-2xl bg-gray-200" />
    <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
    <div className="mb-4 h-4 w-1/2 rounded bg-gray-200" />
    <div className="mb-6 h-4 w-full rounded bg-gray-200" />
    <div className="mt-4 h-8 w-28 rounded bg-gray-200" />
  </div>
);

export default function ApartmentsGrid() {
  const dispatch = useDispatch();
  const { items = [], loading, error } = useSelector((s) => s.apartments);

  useEffect(() => {
    if (!items || items.length === 0) dispatch(fetchApartments());
  }, [dispatch]); // без items — щоб не перетягувати повторно

  return (
    <section className="relative py-10 sm:py-14 bg-[#F6F7F9]">
      <div className="mx-auto max-w-6xl px-4">
        {/* Заголовок секції */}
        <header className="mb-8 sm:mb-10">
          <h2 className="text-center font-golos font-extrabold tracking-tight text-brand-black leading-tight text-4xl sm:text-5xl">
            Наші <span className="text-brand-orange">квартири</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-brand-black/70 text-lg">
            Оберіть ідеальну квартиру з нашої ретельно підібраної колекції.
            Кожна квартира пропонує унікальний досвід та максимальний комфорт.
          </p>
        </header>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
            Помилка завантаження: {String(error)}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && (!items || items.length === 0) && (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow">
            Наразі немає доступних квартир. Спробуйте змінити дати або місто.
          </div>
        )}

        {!loading && items?.length > 0 && (
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((apt) => (
              <li key={apt._id || apt.id}>
                <ApartmentCard apartment={apt} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
