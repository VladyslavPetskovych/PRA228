import React from "react";
import bgImage from "./../../assets/temp/hero.png";
import ActionButton from "../utils/buttons/actionButton";

function Hero() {
  return (
    <div>
      <section
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="pt-64 pb-40 px-16 text-center text-white">
          <div className="text-sm tracking-wide mb-4">
            2 Ліжка · 1 Ванна · 50 м²
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Апарт-готель
            <br />
            Prime Yard
          </h1>
          <div className="text-lg font-bold mb-8">
            $650<span className="text-sm font-normal">в місяць</span>
          </div>

          <ActionButton text={"Дізнатись більше"}/>
        </div>
      </section>
    </div>
  );
}

export default Hero;
