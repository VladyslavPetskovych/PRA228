
import Hero from "../components/home/hero";
import PlaceToLiveIn from "../components/home/placeToLiveIn";
import WhyUs from "../components/home/whyUs";
import GridBlock from "../components/home/gridBlock";
import Seo from "../components/utils/Seo";

function home() {
  return (
    <div>
      <Seo path="/" />
      <Hero />
      <WhyUs/>
      <PlaceToLiveIn />
      <GridBlock/>
    </div>
  );
}

export default home;
