import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logoShortVertical.png";

function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Prime Yard" className="h-10 md:h-16" />
            <span className="text-xl font-semibold">Prime Rest</span>
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
        </div>

        {/* Контакти */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-lg font-semibold mb-2">Контакти</h4>
          <a href="tel:+380685637315" className="hover:text-white transition">
            +380685637315
          </a>
          <a href="tel:+380685637315" className="hover:text-white transition">
            +380777711400
          </a>
          <a
            href="mailto:info@primeyard.com"
            className="hover:text-white transition"
          >
            primeyardapartments@gmail.com
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
