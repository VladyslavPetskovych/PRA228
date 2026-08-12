import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logoShortVertical.png";

function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Prime Yard" className="h-16 md:h-24" />
          </div>
          <p className="text-sm opacity-70">
            Стильні квартири для вашого комфортного відпочинку у Львові.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h4 className="text-lg font-semibold mb-2">Навігація</h4>
          <Link to="/" className="hover:text-white transition">
            Головна
          </Link>
          <Link to="/apartments" className="hover:text-white transition">
            Квартири
          </Link>
          <Link to="/book" className="hover:text-white transition">
            Забронювати
          </Link>
          <Link to="/contacts" className="hover:text-white transition">
            Контакти
          </Link>

          {/* НОВИЙ ПУНКТ */}
          <Link
            to="/terms-and-conditions"
            className="hover:text-white transition"
          >
            Умови та положення
          </Link>
        </div>

        <div className="flex flex-col space-y-2">
          <h4 className="text-lg font-semibold mb-2">Зв'язок</h4>
          <a href="tel:+380685637315" className="hover:text-white transition">
            +380685637315
          </a>
          <a href="tel:+380777711400" className="hover:text-white transition">
            +380777711400
          </a>
          <a
            href="https://www.instagram.com/prime.rest.apartments/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-white transition"
            title="Ми в Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
            </svg>
            Instagram
          </a>
        </div>
      </div>

      <div className="mt-8 border-t border-neutral-700 pt-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} Prime Rest. Всі права захищені.
      </div>
    </footer>
  );
}

export default Footer;
