import React from "react";
import TopBlock from "../components/longTermRent/topBlock";
import ApartmentsGrid from "../components/longTermRent/ApartmentsGrid";
import DontFindApartment from "../components/shortTermRent/dontFindApartment";

function longTermRent() {
  return (
    <div>
      <TopBlock />
      <ApartmentsGrid />
      <DontFindApartment variant={2} />
    </div>
  );
}

export default longTermRent;
