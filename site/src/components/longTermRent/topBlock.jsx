import React from "react";
import {
  BadgePercent,
  Sparkles, // заміна замість Broom
  Headphones,
  Shield,
  KeyRound,
  Percent ,
} from "lucide-react";
import { Lightbulb } from "lucide-react";

export default function TopBlock() {
  const features = [
    {
      icon: <BadgePercent className="h-6 w-6 text-brand-orange" />,
      title: "Без рієлторських комісій",
      desc: "Працюємо напряму з клієнтами. Ніяких додаткових платежів і прихованих комісій.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-brand-orange" />,
      title: "Щотижневе прибирання",
      desc: "Професійне прибирання кожного тижня включено у вартість оренди.",
    },

    {
      icon: <Headphones className="h-6 w-6 text-brand-orange" />,
      title: "Підтримка 24/7",
      desc: "Завжди на звʼязку для вирішення будь-яких питань та термінових проблем.",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-brand-orange" />,
      title: "Стильний інтер’єр",
      desc: "Авторський ремонт із увагою до деталей.",
    },

    {
      icon: <KeyRound className="h-6 w-6 text-brand-orange" />,
      title: "Швидке заселення",
      desc: "Заселення в день підписання договору.",
    },
    {
      icon: <Percent  className="h-6 w-6 text-brand-orange" />,
      title: "Особливі пропозиції",
      desc: "Знижки від ресторанів, салонів та інших партнерів.",
    },
  ];

  return (
    <section className="relative pt-16 overflow-hidden bg-gradient-to-b from-[#F6F7F9] to-white">
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 pb-10 sm:pt-20 sm:pb-12">
        {/* Hero */}
        <h1
          className="text-center font-golos font-extrabold tracking-tight text-brand-black leading-[1.1]
                     text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Довгострокова оренда у<span className="text-brand-black"></span>{" "}
          <span className="text-brand-orange">Львові</span>
        </h1>

        <p className="mx-auto mt-6 max-w-4xl text-center text-lg sm:text-xl text-neutral-700">
          Комфортне проживання від 1 місяця з повним сервісом та підтримкою. Ми
          створили ідеальні умови для тих, хто шукає надійне житло на тривалий
          період.
        </p>

        {/* Title of features */}
        <h2
          className="mt-12 sm:mt-16 text-center font-golos font-extrabold tracking-tight leading-tight
                     text-2xl sm:text-3xl md:text-4xl text-brand-black"
        >
          Чому обирають <span className="text-brand-orange">Prime Rest</span>{" "}
          для довгострокової оренди?
        </h2>

        {/* Features grid */}
        <div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8
                     bg-gradient-to-b from-white to-brand-beige/20 rounded-3xl p-2 sm:p-3"
        >
          {features.map((f, i) => (
            <article
              key={i}
              className="rounded-2xl bg-brand-white shadow-[0_10px_24px_rgba(0,0,0,0.07)]
                         border border-black/5 p-6 sm:p-7 transition
                         hover:shadow-[0_14px_32px_rgba(0,0,0,0.10)]"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl bg-brand-beige/40 p-3 ring-1 ring-black/5">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-golos font-bold text-brand-black">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-neutral-700 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* мʼяка тінь знизу для відсічення секції */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}
