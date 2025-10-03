import React from "react";
import DontFindApartment from "../components/shortTermRent/dontFindApartment";
import TopBlock from "../components/shortTermRent/TopBlock";
import ApartmentsGrid from "../components/shortTermRent/ApartmentsGrid";

function ShortTermRent() {
  return (
    <div className="bg-white">
      <TopBlock />
      <ApartmentsGrid />
      <DontFindApartment variant={2} />
      
    </div>
  );
}

export default ShortTermRent;
