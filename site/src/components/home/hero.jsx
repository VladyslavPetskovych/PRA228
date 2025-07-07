import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchApartments } from "../../redux/apartmentsSlice";
import Slider from "react-slick";
import SliderItem from "./heroSlider/sliderItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Hero() {
  const dispatch = useDispatch();
  const {
    items: apartments,
    loading,
    error,
  } = useSelector((state) => state.apartments);

  useEffect(() => {
    dispatch(fetchApartments());
  }, [dispatch]);

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 z-20 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black"
    >
      <FaChevronLeft />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 z-20 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black"
    >
      <FaChevronRight />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Завантаження...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Slider {...settings}>
        {apartments.map((apt) => (
          <SliderItem
            key={apt.id}
            image={
              apt.imgUrls && apt.imgUrls.length > 0
                ? apt.imgUrls[0]
                : "/placeholder.jpg" // якщо немає фото
            }
            title={apt.name}
            price={`₴${apt.pricePerMonth}`}
            details={`${apt.guests} гостей · ${apt.beds} ліжка · ${apt.square}`}
          />
        ))}
      </Slider>
    </div>
  );
}

export default Hero;
