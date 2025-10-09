import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApartments } from "../../redux/apartmentsSlice";
import { Link } from "react-router-dom";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop";

function GridBlock() {
  const dispatch = useDispatch();
  const {
    items: apartments,
    loading,
    error,
  } = useSelector((state) => state.apartments);

  useEffect(() => {
    dispatch(fetchApartments());
  }, [dispatch]);

  if (loading)
    return <div className="text-center text-white">Завантаження...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!apartments?.length) return null;

  const luxApartments = apartments.filter(
    (apt) => apt.category && apt.category.toLowerCase() === "люкс"
  );

  if (!luxApartments.length)
    return (
      <div className="text-center text-white py-10">
        Наразі немає квартир класу «Люкс»
      </div>
    );

  const featured = luxApartments[0];
  const others = luxApartments.slice(1, 3);

  return (
    <section className="bg-brand-black text-brand-white py-16 px-6 md:px-12 font-golos">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-bold font-moderustic mb-3">
          Квартири класу «Люкс»
        </h2>
        <p className="text-center text-brand-white/70 mb-10 max-w-2xl mx-auto">
          Вишукане житло з панорамними вікнами, сучасним дизайном і найвищим
          рівнем комфорту.
        </p>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {/* --- ЛІВА КОЛОНКА --- */}
          {/* --- ЛІВА КОЛОНКА --- */}
          <div className="hidden md:flex flex-col gap-6 order-2 md:order-1 h-full">
            {others.map((apt) => (
              <div
                key={apt.id}
                className="relative rounded-3xl overflow-hidden group shadow-lg shadow-brand-black/40"
              >
                <img
                  src={apt.imageUrl || apt.imgUrls?.[0] || FALLBACK_IMG}
                  alt={apt.name}
                  className="w-full h-[160px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4 text-center">
                  <h4 className="text-lg font-semibold mb-2">{apt.name}</h4>
                  <p className="text-sm mb-3 text-brand-white/80">
                    {apt.square || "50 м²"}
                  </p>
                </div>
              </div>
            ))}

            <div className="rounded-3xl bg-brand-beige text-brand-black p-6 flex flex-col justify-between flex-grow shadow-md transition-all">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 font-moderustic leading-tight">
                  Розкіш і комфорт
                </h3>
                <p className="text-xs sm:text-sm md:text-base mb-4 leading-snug">
                  Простір, тиша, панорамні вікна та зручності для
                  найвибагливіших гостей.
                </p>
              </div>
              <Link
                to="/book"
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-brand-black text-brand-white rounded-full hover:bg-brand-orange transition"
              >
                →
              </Link>
            </div>
          </div>

          {/* --- ПРАВА КОЛОНКА --- */}
          {/* --- ПРАВА КОЛОНКА --- */}
          <div className="relative rounded-3xl overflow-hidden order-1 md:order-2 shadow-xl shadow-brand-black/50 h-[400px] md:h-full md:col-span-2">
            <video
              src="/luxury.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end z-10">
              <h3 className="text-3xl font-moderustic font-bold text-white mb-2 drop-shadow-lg">
                {featured.name || "Квартира люкс з балконом"}
              </h3>
              <p className="text-sm text-white/80 mb-4 drop-shadow-md">
                {featured.square || "50 м²"} •{" "}
                {featured.numRooms ? `${featured.numRooms} кімн.` : "1 кімн."} •{" "}
                {featured.beds ? `${featured.beds} ліжка` : "2 ліжка"} •{" "}
                {featured.guests ? `${featured.guests} гостей` : "2 гості"}
              </p>

              <div className="flex items-center justify-between">
                <div className="font-bold text-xl text-brand-beige drop-shadow">
                  {featured.pricePerDay
                    ? `Від ${featured.pricePerDay.toLocaleString(
                        "uk-UA"
                      )} ₴ / доба`
                    : "1900 ₴ / доба"}
                </div>
                <Link
                  to="/book"
                  className="bg-brand-orange hover:bg-brand-beige hover:text-brand-black text-white px-8 py-3 rounded-full font-medium transition shadow-md"
                >
                  Забронювати
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GridBlock;
