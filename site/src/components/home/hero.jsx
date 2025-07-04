import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import SliderItem from "./heroSlider/sliderItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // або інші іконки

function Hero() {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    fetch("/apartments.json")
      .then((res) => res.json())
      .then((data) => setApartments(data))
      .catch((err) => console.error("Помилка при завантаженні:", err));
  }, []);

  // Кастомні стрілки
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
    autoplay: false, // ❌ авто-відтворення вимкнено
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {apartments.map((apt) => (
          <SliderItem
            key={apt.id}
            image={`/hero/${apt.image}`}
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
