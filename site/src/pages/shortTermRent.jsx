import React from "react";
import DontFindApartment from "../components/shortTermRent/dontFindApartment";
import TopBlock from "../components/shortTermRent/TopBlock";
import ApartmentsGrid from "../components/shortTermRent/ApartmentsGrid";
import Seo from "../components/utils/Seo";

function ShortTermRent() {
  return (
    <div className="bg-white">
      <Seo path="/short-term-rent" />
      <TopBlock />
      <ApartmentsGrid />
      <DontFindApartment variant={2} />
      
    </div>
  );
}

export default ShortTermRent;
