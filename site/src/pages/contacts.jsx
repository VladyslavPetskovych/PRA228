import React from "react";
import apartmentImg from "../assets/homePage/placeholder.jpg"; // ✅ правильний імпорт
import { Link } from "react-router-dom";
// Brand tokens
const brand = {
  terracotta: "#C77022",
  charcoal: "#1E1E1E",
  beige: "#F5E9DB",
};

const data = {
  company: "Prime Rest",
  tagline:
    "Квартири преміум-класу у Львові з дизайном, сервісом та паркуванням.",
  blurb:
    "Prime Rest — це добірка сучасних дизайнерських квартир у Львові. Ми поєднуємо комфорт з приватністю власного житла: зручна локація, ретельно продумані інтерʼєри та вигідні умови як для коротко -, так і для довгострокової оренди.",
  phone: "+380777711400",
  phoneLabel: "+380 777 711 400",
  phoneLabel2: "+380 685 637 315",
  email: "primeyardapartments@gmail.com",
  address: "вул. Замарстинівська, 76Б, Львів",
  mapsHref:
    "https://www.google.com/maps?q=%D0%92%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%97%D0%B0%D0%BC%D0%B0%D1%80%D1%81%D1%82%D0%B8%D0%BD%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B0,+76%D0%91,+%D0%9B%D1%8C%D0%B2%D1%96%D0%B2",
  working: [{ d: "Пн–Нд" }],
};

const Card = ({ title, children }) => (
  <div className="rounded-2xl border bg-white/95 p-5 shadow-sm sm:p-6">
    <div
      className="mb-2 text-xs font-semibold uppercase tracking-wide sm:text-sm"
      style={{ color: brand.terracotta }}
    >
      {title}
    </div>
    <div className="text-[15px] leading-7 text-neutral-800">{children}</div>
  </div>
);

export default function ContactsPage() {
  return (
    <main className="min-h-screen pt-32 bg-neutral-50">
      {/* Card Grid */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:py-14">
        <div className="mb-6 text-center sm:mb-10">
          <div
            className="text-[10px] uppercase tracking-widest text-neutral-700 sm:text-xs"
            style={{ color: brand.terracotta }}
          >
            Контакти
          </div>
          <h1 className="mt-2 text-2xl font-bold text-black sm:text-3xl lg:text-4xl">
            Ми на звʼязку 24/7
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-600 sm:text-base">
            {data.tagline}
          </p>
        </div>

        {/* Top grid with 4 cards */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card title="Адреса">
            <p className="mb-2 font-medium">{data.address}</p>
            <a
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm underline-offset-4 hover:underline"
              href={data.mapsHref}
              target="_blank"
              rel="noreferrer"
              style={{ color: brand.terracotta, borderColor: brand.terracotta }}
            >
              Відкрити на Google Maps
            </a>
          </Card>
          <Card title="Телефон">
            <div className="flex flex-col  gap-2">
              <a
                href={`tel:${data.phone}`}
                className="text-base font-semibold sm:text-lg font-moderustic"
                style={{ color: "#B86F21" }}
              >
                {data.phoneLabel}
              </a>
              <a
                href={`tel:${data.phone2}`}
                className="text-base font-semibold sm:text-lg font-moderustic"
                style={{ color: "#B86F21" }}
              >
                {data.phoneLabel2}
              </a>
            </div>
          </Card>

         
          <Card title="Telegram">
            <a
              href="https://t.me/prime_rest_apartments" // встав свій юзернейм або канал
              target="_blank"
              rel="noreferrer"
              className="underline"
              style={{ color: brand.terracotta }}
            >
              @prime_rest_apartments
            </a>
          </Card>

          <Card title="Графік">
            <ul className="space-y-1">
              {data.working.map((w) => (
                <li key={w.d} className="flex flex-col items-start justify-start">
                  <span>{w.d}</span>
                  <span className="tabular-nums">24/7</span>
                </li>
                
              ))}
            </ul>
          </Card>
        </div>

        {/* Map + About + Image */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border p-4 sm:p-6 lg:col-span-2">
            <div
              className="mb-2 text-xs font-semibold sm:text-sm"
              style={{ color: brand.terracotta }}
            >
              Карта
            </div>
            <iframe
              title="Prime Rest map"
              className="h-[260px] w-full rounded-xl sm:h-[340px] lg:h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=%D0%92%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%97%D0%B0%D0%BC%D0%B0%D1%80%D1%81%D1%82%D0%B8%D0%BD%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B0,+76%D0%91,+%D0%9B%D1%8C%D0%B2%D1%96%D0%B2&output=embed"
            />
          </div>
          <div className="rounded-2xl border p-5 sm:p-6 flex flex-col gap-4">
            <div>
              <div
                className="mb-2 text-xs font-semibold sm:text-sm"
                style={{ color: brand.terracotta }}
              >
                Про {data.company}
              </div>
              <p className="text-neutral-700 text-sm sm:text-base">
                {data.blurb}
              </p>
            </div>
            <img
              src={apartmentImg}
              alt="Фото квартири Prime Rest"
              className="h-40 w-full rounded-xl object-cover sm:h-48 lg:h-56"
            />
            <div className="mt-2 grid grid-cols-1 gap-3 sm:inline-flex sm:gap-4">
              <a
                href={`tel:${data.phone}`}
                className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white sm:w-auto"
                style={{ background: brand.terracotta }}
              >
                Зателефонувати
              </a>
              <Link
                to="/book"
                className="inline-block rounded-xl bg-brand-orange px-5 py-2.5 font-golos text-white shadow hover:opacity-95 active:scale-[0.99]"
              >
                Забронювати
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
