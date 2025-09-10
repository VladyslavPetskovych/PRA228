import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchApartments } from "../../redux/apartmentsSlice";
import Slider from "react-slick";
import SliderItem from "./heroSlider/sliderItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Placeholder from "../../assets/homePage/placeholder.jpg"; // переконайся, що шлях вірний

function Hero() {
  const dispatch = useDispatch();
  const {
    items: apartments = [],
    loading,
    error,
  } = useSelector((state) => state.apartments);

  useEffect(() => {
    dispatch(fetchApartments());
  }, [dispatch]);

  useEffect(() => {
    console.log("Отримані квартири з Redux:", apartments);
    console.log("Статус завантаження:", loading);
    console.log("Помилка:", error);
  }, [apartments, loading, error]);

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black"
      aria-label="Попередній слайд"
    >
      <FaChevronLeft />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black"
      aria-label="Наступний слайд"
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
    lazyLoad: "ondemand",
    adaptiveHeight: false,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  // Плейсхолдерні картки, якщо немає даних з API
  const placeholderSlides = useMemo(
    () => [
      {
        id: "ph-1",
        image: Placeholder,
        title: "Преміальні квартири",
        price: "₴—",
        details: "— гостей · — ліжок · — м²",
      },
      {
        id: "ph-2",
        image: Placeholder,
        title: "Стильний інтерʼєр",
        price: "₴—",
        details: "— гостей · — ліжок · — м²",
      },
      {
        id: "ph-3",
        image: Placeholder,
        title: "Скоро будуть доступні",
        price: "₴—",
        details: "— гостей · — ліжок · — м²",
      },
    ],
    []
  );

  const hasData = apartments && apartments.length > 0;

  // Селектор зображення з фолбеком на плейсхолдер
  const getImage = (apt) =>
    (apt?.imgUrls && apt.imgUrls.length > 0 && apt.imgUrls[0]) || Placeholder;

  // Лоадер (короткий)
  if (loading) {
    return (
      <div className="relative">
        <div className="aspect-[16/9] w-full animate-pulse bg-gray-200 rounded-xl" />
      </div>
    );
  }

  return (
    <section className="relative">
      {/* H1 заголовок для SEO */}
      <h1 className="sr-only">
        Оренда квартир у Львові – Prime Rest Apartments
      </h1>

      {error && (
        <div className="mx-auto mb-2 max-w-5xl rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          Не вдалося завантажити квартири. Показуємо приклади.
        </div>
      )}

      <div className="h-5" aria-hidden />

      <Slider {...settings}>
        {(hasData ? apartments : placeholderSlides).map((apt, idx) => {
          const route = hasData ? `/short-term-rent/${apt.idWoodoo || apt.idWoodoo}` : "/";

          return (
            <SliderItem
              key={apt.id || apt._id || `ph-${apt.title}`}
              image={hasData ? getImage(apt) : apt.image}
              title={hasData ? apt.name : apt.title}
              price={
                hasData
                  ? apt.pricePerMonth
                    ? `₴${apt.pricePerMonth}`
                    : "₴—"
                  : apt.price
              }
              details={
                hasData
                  ? `${apt.guests ?? "—"} гостей · ${apt.beds ?? "—"} ліжка · ${
                      apt.square ?? "—"
                    }`
                  : apt.details
              }
              priority={idx === 0}
              route={route} // ✅ передаємо готовий route
            />
          );
        })}
      </Slider>
    </section>
  );
}

export default Hero;
