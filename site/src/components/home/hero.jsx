import React from "react";
import bgImage from "./../../assets/temp/hero.png";

function Hero() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="pt-64 pb-40 px-16 text-center text-white">
        <div className="text-sm tracking-wide mb-4">
          5 Beds · 2 Baths · 180 sqft
        </div>
        <h1 className="text-5xl font-bold mb-4">
          Office Space at
          <br />
          Northwest
        </h1>
        <div className="text-lg font-bold mb-8">
          $250<span className="text-sm font-normal">/month</span>
        </div>
        <button className="bg-[#E7C873] text-black font-bold py-3 px-6 rounded-xl transition hover:opacity-90">
          View Details →
        </button>
      </div>
    </section>
  );
}

export default Hero;
