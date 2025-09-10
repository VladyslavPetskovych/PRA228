import React from "react";
import { Helmet } from "react-helmet";
import apartmentImg from "../assets/homePage/placeholder.jpg";
import { Link } from "react-router-dom";

const brand = {
  terracotta: "#C77022",
  charcoal: "#1E1E1E",
  beige: "#F5E9DB",
};

const Card = ({ title, children }) => (
  <div
    className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300 sm:p-6 flex flex-col items-center text-center sm:items-start sm:text-left"
    style={{ borderColor: "rgba(255,255,255,0.2)" }}
  >
    <h2
      className="mb-2 text-xs font-semibold uppercase tracking-wide sm:text-sm"
      style={{ color: brand.terracotta }}
    >
      {title}
    </h2>
    <div className="text-[15px] leading-7 text-neutral-800">{children}</div>
  </div>
);

export default function ContactsPage() {
  return (
    <>
      <Helmet>
        <title>Контакти — Prime Rest Львів | Квартири преміум-класу</title>
        <meta
          name="description"
          content="Контакти Prime Rest у Львові: адреса, телефон, Telegram та графік роботи 24/7. Квартири преміум-класу для коротко- та довгострокової оренди."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://primerestapartments.com/contacts" />

        {/* Open Graph */}
        <meta property="og:title" content="Контакти — Prime Rest Львів" />
        <meta
          property="og:description"
          content="Контакти Prime Rest у Львові: адреса, телефон, Telegram та графік роботи 24/7."
        />
        <meta
          property="og:image"
          content="https://primerestapartments.com/assets/homePage/placeholder.jpg"
        />
        <meta
          property="og:url"
          content="https://primerestapartments.com/contacts"
        />
        <meta property="og:type" content="website" />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Prime Rest",
            "image": "https://primerestapartments.com/assets/homePage/placeholder.jpg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "вул. Замарстинівська, 76Б",
              "addressLocality": "Львів",
              "addressCountry": "UA"
            },
            "telephone": ["+380777711400", "+380685637315"],
            "url": "https://primerestapartments.com/contacts",
            "sameAs": ["https://t.me/prime_rest_apartments"]
          }
          `}
        </script>
      </Helmet>

      <main
        className="min-h-screen pt-32"
        style={{
          background:
            "linear-gradient(to bottom, rgba(245, 233, 219, 0.9), rgba(255,255,255,0.3))",
        }}
      >
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:py-14">
          {/* Header */}
          <div className="mb-6 text-center sm:mb-10">
            <p
              className="text-xl font-bold md:text-2xl uppercase tracking-widest text-neutral-700"
              style={{ color: brand.terracotta }}
            >
              Контакти
            </p>
            <h1 className="mt-2 text-2xl font-bold text-black sm:text-3xl lg:text-4xl">
              Ми на звʼязку 24/7
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-700 sm:text-base">
              Квартири преміум-класу у Львові з дизайном, сервісом та
              паркуванням.
            </p>
          </div>

          {/* Top cards */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card title="Адреса">
              <p className="mb-2 font-medium">
                вул. Замарстинівська, 76Б, Львів
              </p>
              <a
                href="https://www.google.com/maps?q=%D0%92%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%97%D0%B0%D0%BC%D0%B0%D1%80%D1%81%D1%82%D0%B8%D0%BD%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B0,+76%D0%91,+%D0%9B%D1%8C%D0%B2%D1%96%D0%B2"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm underline-offset-4 hover:underline transition-colors duration-200"
                style={{
                  color: brand.terracotta,
                  borderColor: brand.terracotta,
                }}
                title="Відкрити адресу Prime Rest на Google Maps"
              >
                Відкрити на Google Maps
              </a>
            </Card>

            {/* Телефон */}
            <Card title="Телефон">
              <div className="flex flex-col gap-2 items-center sm:items-start">
                <a
                  href="tel:+380777711400"
                  className="text-base font-semibold sm:text-lg"
                  style={{ color: brand.terracotta }}
                  title="Зателефонувати у Prime Rest"
                >
                  +380 777 711 400
                </a>
                <a
                  href="tel:+380685637315"
                  className="text-base font-semibold sm:text-lg"
                  style={{ color: brand.terracotta }}
                  title="Зателефонувати у Prime Rest"
                >
                  +380 685 637 315
                </a>
              </div>
            </Card>

            {/* Telegram */}
            <Card title="Telegram">
              <a
                href="https://t.me/prime_rest_apartments"
                target="_blank"
                rel="noreferrer"
                className="underline"
                style={{ color: brand.terracotta }}
                title="Наш Telegram канал Prime Rest"
              >
                @prime_rest_apartments
              </a>
            </Card>

            {/* Графік */}
            <Card title="Графік">
              <ul className="space-y-1 flex flex-col items-center sm:items-start">
                <li className="flex flex-col items-center sm:items-start">
                  <span>Пн–Нд</span>
                  <span className="tabular-nums">24/7</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Map + About + Image */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-4 sm:p-6 lg:col-span-2 shadow-lg">
              <h2
                className="mb-2 text-xs font-semibold sm:text-sm text-center sm:text-left"
                style={{ color: brand.terracotta }}
              >
                Карта
              </h2>
              <iframe
                title="Карта розташування Prime Rest Львів"
                className="h-[260px] w-full rounded-xl sm:h-[340px] lg:h-[400px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=%D0%92%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%97%D0%B0%D0%BC%D0%B0%D1%80%D1%81%D1%82%D0%B8%D0%BD%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B0,+76%D0%91,+%D0%9B%D1%8C%D0%B2%D1%96%D0%B2&output=embed"
              />
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-4 sm:p-6 flex flex-col gap-4 items-center text-center shadow-lg">
              <div>
                <h2
                  className="mb-2 text-xs font-semibold sm:text-sm"
                  style={{ color: brand.terracotta }}
                >
                  Про Prime Rest
                </h2>
                <p className="text-neutral-700 text-sm sm:text-base">
                  Prime Rest — це добірка сучасних дизайнерських квартир у
                  Львові. Ми поєднуємо комфорт з приватністю власного житла:
                  зручна локація, ретельно продумані інтерʼєри та вигідні умови
                  як для коротко-, так і для довгострокової оренди.
                </p>
              </div>
              <img
                src={apartmentImg}
                alt="Фото квартири Prime Rest у Львові"
                className="h-40 w-full rounded-xl object-cover sm:h-48 lg:h-56"
              />
              <div className="mt-2 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-start sm:gap-4">
                <a
                  href="tel:+380777711400"
                  className="inline-flex w-3/4 max-w-xs items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white sm:w-auto transition-all duration-200 hover:brightness-90"
                  style={{ background: brand.terracotta }}
                  title="Зателефонувати у Prime Rest Львів"
                >
                  Зателефонувати
                </a>
                <Link
                  to="/book"
                  style={{ background: brand.terracotta }}
                  className="inline-flex w-3/4 max-w-xs items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white sm:w-auto transition-all duration-200 hover:brightness-90"
                  title="Забронювати квартиру у Prime Rest Львів"
                >
                  Забронювати
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
