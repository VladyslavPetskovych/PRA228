import React, { useEffect } from "react";

function Book() {
  useEffect(() => {
    // Додаємо скрипт WuBook
    const script = document.createElement("script");
    script.src = "https://wubook.net/js/wblib.jgz";
    script.async = true;
    script.onload = () => {
      // Коли скрипт завантажиться, ініціалізуємо WuBook
      const WuBook = new window._WuBook(1749140045);
      const wbparams = {
        width: 840,
        height: "auto",
        lang: "",
        layout: "",
        mobile: 0,
        width_unit: "px",
        mheight: 640,
      };
      WuBook.design_iframe("_baror_", wbparams);
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div className="py-24 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Забронювати житло</h1>
      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        Використовуйте форму нижче для онлайн-бронювання ваших апартаментів.
      </p>

      <div id="_baror_">
        <a
          href="https://wubook.net/page/WooDoo-Booking-Engine-35.html"
          style={{
            display: "block",
            marginTop: "5px",
            textDecoration: "none",
            border: "none",
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://wubook.net/imgs/default/booking_by_wu.gif"
            alt="WuBook online reception"
            title="Hotel and tourism solutions"
            style={{ border: "none", textDecoration: "none" }}
          />
        </a>
      </div>
    </div>
  );
}

export default Book;
