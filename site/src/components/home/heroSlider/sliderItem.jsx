import React from "react";
import ActionButton from "../../utils/buttons/actionButton";

// Іконки взяті з карток оренди (ApartmentCard / RoomStats)
const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 18,
  height: 18,
  fill: "currentColor",
  viewBox: "0 0 256 256",
  "aria-hidden": true,
};

const GuestsIcon = () => (
  <svg {...iconProps}>
    <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
  </svg>
);

const BedIcon = () => (
  <svg {...iconProps}>
    <path d="M216,72H32V48a8,8,0,0,0-16,0V208a8,8,0,0,0,16,0V176H240v32a8,8,0,0,0,16,0V112A40,40,0,0,0,216,72ZM32,88h72v72H32Zm88,72V88h96a24,24,0,0,1,24,24v48Z"></path>
  </svg>
);

const AreaIcon = () => (
  <svg {...iconProps}>
    <path d="M152,40a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,40Zm-8,168H112a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM208,32H184a8,8,0,0,0,0,16h24V72a8,8,0,0,0,16,0V48A16,16,0,0,0,208,32Zm8,72a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V112A8,8,0,0,0,216,104Zm0,72a8,8,0,0,0-8,8v24H184a8,8,0,0,0,0,16h24a16,16,0,0,0,16-16V184A8,8,0,0,0,216,176ZM40,152a8,8,0,0,0,8-8V112a8,8,0,0,0-16,0v32A8,8,0,0,0,40,152Zm32,56H48V184a8,8,0,0,0-16,0v24a16,16,0,0,0,16,16H72a8,8,0,0,0,0-16ZM72,32H48A16,16,0,0,0,32,48V72a8,8,0,0,0,16,0V48H72a8,8,0,0,0,0-16Z"></path>
  </svg>
);

const Stat = ({ icon, children }) => (
  <span className="inline-flex items-center gap-1.5">
    <span className="text-white/90">{icon}</span>
    <span>{children}</span>
  </span>
);

function SliderItem({ image, title, guests, beds, square, route, priority }) {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-brand-black">
      <img
        src={image}
        alt={title || "Квартира у Львові"}
        loading="eager"
        fetchpriority={priority ? "high" : "auto"}
        decoding="async"
        width={1600}
        height={900}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 text-white text-center px-4">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm tracking-wide">
          <Stat icon={<GuestsIcon />}>{guests} гостей</Stat>
          <Stat icon={<BedIcon />}>{beds} ліжка</Stat>
          <Stat icon={<AreaIcon />}>{square}</Stat>
        </div>
        <h1 className="text-5xl font-bold mb-4 whitespace-pre-line">{title}</h1>

        {/* ✅ тут уже готовий route */}
        <ActionButton text="Дізнатись більше" route={route} />
      </div>
    </section>
  );
}

export default SliderItem;
