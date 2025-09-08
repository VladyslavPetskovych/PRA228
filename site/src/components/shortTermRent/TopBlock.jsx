import React from "react";

export default function TopBlock({ onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      city: form.get("city"),
      checkin: form.get("checkin"),
      checkout: form.get("checkout"),
    };
    if (typeof onSearch === "function") onSearch(payload);
  }

  return (
    <section className="relative pt-32 overflow-hidden bg-gradient-to-b from-brand-beige to-brand-white">
      {/* декоративні елементи фону */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-orange/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl" />

      <div className="mx-auto w-full max-w-6xl px-4 pt-16 pb-10 sm:pt-20 sm:pb-14">
        {/* Заголовок */}
        <h1 className="text-center font-moderustic text-4xl font-extrabold leading-tight text-brand-black sm:text-5xl lg:text-6xl">
          Ваш ідеальний дім у<span className="text-brand-orange"></span>
          <br />
          <span className="text-brand-orange">Львові</span>
        </h1>

        {/* Підзаголовок */}
        <p className="mx-auto mt-4 max-w-2xl text-center font-golos text-brand-black/80 sm:text-lg">
          Оберіть з нашої колекції комфортних квартир для короткострокової
          оренди. Кожна квартира обладнана всім необхідним для вашого комфорту.
        </p>



        {/* Цифри */}
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-6 text-center sm:mt-12">
          <div>
            <div className="font-moderustic text-3xl font-extrabold text-brand-orange">500+</div>
            <div className="font-golos text-sm text-brand-black/70">Задоволених гостей</div>
          </div>
          <div>
            <div className="font-moderustic text-3xl font-extrabold text-brand-orange">24/7</div>
            <div className="font-golos text-sm text-brand-black/70">Підтримка клієнтів</div>
          </div>
          <div>
            <div className="font-moderustic text-3xl font-extrabold text-brand-orange">9.6</div>
            <div className="font-golos text-sm text-brand-black/70">Середній рейтинг</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Icons (inline, без сторонніх залежностей) ---------- */

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1.5A2.5 2.5 0 0 1 22 6.5v12A2.5 2.5 0 0 1 19.5 21h-15A2.5 2.5 0 0 1 2 18.5v-12A2.5 2.5 0 0 1 4.5 4H6V3a1 1 0 0 1 1-1Zm12.5 7.5h-15v9A.5.5 0 0 0 5 19h14a.5.5 0 0 0 .5-.5v-9ZM6 8h12V6.5a.5.5 0 0 0-.5-.5h-11A.5.5 0 0 0 6 6.5V8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10.5 3a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm7.78 12.22 2.5 2.5a1 1 0 0 1-1.42 1.42l-2.5-2.5a1 1 0 0 1 1.42-1.42Z"
        fill="currentColor"
      />
    </svg>
  );
}
