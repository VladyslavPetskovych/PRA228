import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Ставки туристичного збору (грн за добу проживання)
export const TOURIST_TAX = {
  citizen: "43,24",
  foreigner: "86,47",
};

// Категорії гостей, звільнених від сплати збору (за наявності документів)
export const TOURIST_TAX_EXEMPTIONS = [
  "реєстрацію місця проживання у м. Львів або у Львівській області;",
  "службове відрядження;",
  "статус учасника бойових дій (УБД);",
  "статус внутрішньо переміщеної особи (ВПО).",
];

/**
 * Інлайновий напис "+ тур. збір (?)" біля ціни.
 * При кліку відкриває модалку з детальною інформацією.
 * Модалка рендериться через портал у <body>, щоб не обрізатись
 * батьківськими контейнерами з overflow-hidden (напр. картками квартир).
 */
export default function TouristTaxInfo({ className = "" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // блокуємо скрол фону, поки відкрита модалка
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        aria-label="Детальніше про туристичний збір"
        className={`inline-flex items-center gap-1 align-middle text-sm font-normal text-brand-black/70 transition-colors hover:text-brand-orange ${className}`}
      >
        <span>+ тур. збір</span>
        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] font-bold leading-none">
          ?
        </span>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4 font-golos"
            onClick={() => setOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Туристичний збір"
              className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 text-left shadow-2xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закриття */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрити"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-brand-black/50 transition-colors hover:bg-brand-beige/40 hover:text-brand-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                >
                  <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                </svg>
              </button>

              <h3 className="mb-4 pr-8 text-xl font-bold text-brand-orange">
                Туристичний збір
              </h3>

              <p className="mb-3 text-sm leading-relaxed text-brand-black">
                Додатково до вартості проживання сплачується туристичний збір:
              </p>
              <ul className="mb-4 space-y-1.5 pl-5 text-sm text-brand-black marker:text-brand-orange list-disc">
                <li>
                  <span className="font-semibold">{TOURIST_TAX.citizen} грн</span>{" "}
                  за добу проживання — для громадян України;
                </li>
                <li>
                  <span className="font-semibold">
                    {TOURIST_TAX.foreigner} грн
                  </span>{" "}
                  за добу проживання — для іноземців.
                </li>
              </ul>

              <p className="mb-3 text-sm leading-relaxed text-brand-black">
                Від сплати туристичного збору звільняються гості, які можуть
                надати підтверджувальні документи про:
              </p>
              <ul className="mb-4 space-y-1.5 pl-5 text-sm text-brand-black marker:text-brand-orange list-disc">
                {TOURIST_TAX_EXEMPTIONS.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <p className="mb-6 text-sm leading-relaxed text-brand-black/80">
                Якщо ви не належите до жодної з вищезазначених категорій і не
                маєте відповідних документів, туристичний збір необхідно
                сплатити додатково.
              </p>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full rounded-xl bg-brand-orange px-4 py-2.5 font-semibold text-white shadow transition hover:opacity-95"
              >
                Зрозуміло
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
