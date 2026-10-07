import React from "react";
import ActionButton from "../utils/buttons/actionButton";
import dvirImg from "../../assets/AvalonYard/dvir.jpg";
import SmartImage from "../utils/SmartImage";
import Reveal from "../utils/Reveal";

function PlaceToLiveIn() {
  return (
    <section className="relative font-golos flex items-center justify-center h-screen overflow-hidden bg-brand-black text-white">
      <SmartImage
        src={dvirImg}
        alt="Закрите подвір'я житлового комплексу на вул. Замарстинівській у Львові"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <Reveal from="zoom" className="relative z-10 text-center max-w-3xl px-4 font-roboto">
        <h2 className="text-5xl md:text-6xl  font-bold leading-tight mb-6">
          Відкрийте для себе простір, де хочеться жити
        </h2>
        <p className="text-lg md:text-xl  mb-8">
          Prime Rest — це сучасні квартири у Львові.
          Власний простір для життя, роботи та натхнення.
        </p>
        <ActionButton text={"Спробуйте вже сьогодні"} route={"/book"}/>
      </Reveal>
    </section>
  );
}

export default PlaceToLiveIn;
