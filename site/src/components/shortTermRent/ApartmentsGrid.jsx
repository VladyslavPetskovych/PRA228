import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApartments } from "../../redux/apartmentsSlice";
import ApartmentCard from "./ApartmentCard";
import Reveal from "../utils/Reveal";

const SkeletonCard = () => (
  <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-lg">
    <div className="skeleton mb-4 h-44 w-full rounded-2xl" />
    <div className="skeleton mb-2 h-5 w-3/4 rounded" />
    <div className="skeleton mb-4 h-4 w-1/2 rounded" />
    <div className="skeleton mb-6 h-4 w-full rounded" />
    <div className="skeleton mt-4 h-8 w-28 rounded" />
  </div>
);

export default function ApartmentsGrid() {
  const dispatch = useDispatch();
  const { items = [], loading, error } = useSelector((s) => s.apartments);

  useEffect(() => {
    // повторні виклики відсікаються в самому thunk (condition)
    dispatch(fetchApartments());
  }, [dispatch]);

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
          Помилка завантаження: {String(error)}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto my-10 max-w-6xl px-4 ">
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
          {items.map((apt, i) => (
            <Reveal as="li" key={apt._id || apt.id} delay={(i % 3) * 120}>
              <ApartmentCard apartment={apt} />
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
