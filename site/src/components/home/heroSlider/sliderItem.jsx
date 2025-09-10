import React from "react";
import ActionButton from "../../utils/buttons/actionButton";

function SliderItem({ image, title, price, details, route }) {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center bg-neutral-200">
      <img
        src={image}
        alt={title || "Квартира у Львові"}
        loading="eager"
        fetchpriority="high"
        decoding="async"
        width={1600}
        height={900}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 text-white text-center px-4">
        <div className="text-sm tracking-wide mb-4">{details}</div>
        <h1 className="text-5xl font-bold mb-4 whitespace-pre-line">{title}</h1>

        {/* ✅ тут уже готовий route */}
        <ActionButton text="Дізнатись більше" route={route} />
      </div>
    </section>
  );
}

export default SliderItem;
