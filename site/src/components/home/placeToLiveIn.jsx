import React from "react";
import ActionButton from "../utils/buttons/actionButton";
import dvirImg from "../../assets/AvalonYard/dvir.jpg";

function PlaceToLiveIn() {
  return (
    <section
      className="relative font-golos flex items-center justify-center h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${dvirImg})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 text-center max-w-3xl px-4 font-roboto">
        <h1 className="text-5xl md:text-6xl  font-bold leading-tight mb-6">
          Відкрийте для себе простір, де хочеться жити
        </h1>
        <p className="text-lg md:text-xl  mb-8">
          Prime Yard — це сучасні квартири у Львові.
          Власний простір для життя, роботи та натхнення.
        </p>
        <ActionButton text={"Спробуйте вже сьогодні"} />
      </div>
    </section>
  );
}

export default PlaceToLiveIn;
