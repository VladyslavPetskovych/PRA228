import React from "react";
import {
  CalendarDaysIcon,
  KeyIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

function WhyUs() {
  return (
    <section className="py-16  font-roboto bg-white text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-brand-orange mt-3">
        Чому обирають саме нас?
      </h2>
      <p className="text-gray-600 mb-12 max-w-xl mx-auto px-4 ">
       
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-8 px-4">
        {/* Item 1 */}
        <div className="flex flex-col items-center w-full sm:w-80 mx-auto hover:scale-105 transition-transform text-center">
          <CalendarDaysIcon className="w-12 h-12 mb-4 text-yellow-600" />
          <h3 className="text-xl font-bold mb-2">Короткострокова оренда житла</h3>
          <p className="text-gray-600">
            Пропонуємо затишне житло, щоб провести свій час з комфортом.
          </p>
        </div>

        {/* Item 2 */}
        <div className="flex flex-col items-center w-full sm:w-80 mx-auto hover:scale-105 transition-transform text-center">
          <KeyIcon className="w-12 h-12 mb-4 text-yellow-600" />
          <h3 className="text-xl font-bold mb-2">Довгострокова оренда житла</h3>
          <p className="text-gray-600">
            Здаємо житло за найкращими цінами на ринку, і без ріелторських
            комісій.
          </p>
        </div>

        {/* Item 3 */}
        <div className="flex flex-col items-center w-full sm:w-80 mx-auto hover:scale-105 transition-transform text-center">
          <TruckIcon className="w-12 h-12 mb-4 text-yellow-600" />
          <h3 className="text-xl font-bold mb-2">Парковка</h3>
          <p className="text-gray-600">
            Вам не потрібно шукати парковку, зручно і безпечно залишайте машину.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
