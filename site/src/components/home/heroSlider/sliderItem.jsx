import React from "react";
import ActionButton from "../../utils/buttons/actionButton";

function SliderItem({ image, title, price, details }) {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center bg-neutral-200">
      {/* Зображення як тег <img> для SEO + швидкості */}
      <img
        src={image}
        alt={title || "Квартира у Львові"}
        loading="eager" // перший слайд можна eager, інші lazy
        fetchpriority="high" // сигналізує браузеру що це важливий LCP
        decoding="async"
        width={1600}
        height={900}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* затемнення */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* контент */}
      <div className="relative z-10 text-white text-center px-4">
        <div className="text-sm tracking-wide mb-4">{details}</div>
        <h1 className="text-5xl font-bold mb-4 whitespace-pre-line">{title}</h1>
        {/* <div className="text-lg font-bold mb-8">
          {price} <span className="text-sm font-normal">в місяць</span>
        </div> */}
        <ActionButton text={"Дізнатись більше"} />
      </div>
    </section>
  );
}

export default SliderItem;
