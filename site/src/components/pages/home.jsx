import React from "react";
import Header from "../utils/header/header";
import Hero from "../home/hero";
import PlaceToLiveIn from "../home/placeToLiveIn";
import WhyUs from "../home/whyUs";

function home() {
  return (
    <div>
      <Hero />
      {/* <WhyUs/> */}
      <PlaceToLiveIn />
    </div>
  );
}

export default home;
