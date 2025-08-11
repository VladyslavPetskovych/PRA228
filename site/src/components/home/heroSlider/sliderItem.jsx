import React from "react";
import ActionButton from "../../utils/buttons/actionButton";

function SliderItem({ image, title, price, details }) {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat min-h-[100vh] flex items-center justify-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />
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
