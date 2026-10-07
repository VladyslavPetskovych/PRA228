import React from "react";
import TopBlock from "../components/longTermRent/topBlock";
import ApartmentsGrid from "../components/longTermRent/ApartmentsGrid";
import DontFindApartment from "../components/shortTermRent/dontFindApartment";
import Seo from "../components/utils/Seo";

function longTermRent() {
  return (
    <div>
      <Seo path="/long-term-rent" />
      <TopBlock />
      <ApartmentsGrid />
      <DontFindApartment variant={2} />
    </div>
  );
}

export default longTermRent;
