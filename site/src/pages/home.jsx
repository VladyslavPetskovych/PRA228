
import Hero from "../components/home/hero";
import PlaceToLiveIn from "../components/home/placeToLiveIn";
import WhyUs from "../components/home/whyUs";
import GridBlock from "../components/home/gridBlock";

function home() {
  return (
    <div>
      <Hero />
      <WhyUs/>
      <PlaceToLiveIn />
      <GridBlock/>
    </div>
  );
}

export default home;
