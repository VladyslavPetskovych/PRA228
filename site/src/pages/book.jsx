import { useEffect } from "react";

function Book() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://wubook.net/js/wblib.jgz";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const WuBook = new window._WuBook(1749140045);
      const wbparams = {
        width: 100,
        height: "auto",
        lang: "",
        layout: "",
        mobile: 0,
        width_unit: "%",
        mheight: 1300,
      };
      WuBook.design_iframe("_baror_", wbparams);

      // Через 1 секунду після вставки iframe задаємо висоту напряму

      const iframe = document.querySelector("#_baror_ iframe");
      if (iframe) {
        iframe.style.width = "100%";

        iframe.style.height = "100vh";
        iframe.style.display = "block";
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="py-24  z-50 overflow-hidden bg-white mt-2"
      style={{
        minHeight: "90vh",
      }}
    >
      <div
        id="_baror_"
        style={{
          overflow: "hidden",

          width: "100%",
        }}
      >
        <a
          href="https://wubook.net/"
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
