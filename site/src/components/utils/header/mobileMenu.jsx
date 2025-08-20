import React from "react";
import { Link } from "react-router-dom";
import ContactAndButton from "./contactAndButton";

function MobileMenu({ isOpen, toggleMenu, hideButtons = false }) {
  return (
    <div
      className={`fixed inset-0 z-40 bg-brand-black/95 text-brand-beige flex flex-col items-center justify-center transform transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <nav className="flex flex-col items-center gap-6 text-xl font-semibold mt-20">
        <Link to="/" onClick={toggleMenu}>
          Головна
        </Link>
        {/* <Link to="/" onClick={toggleMenu}>
          Квартири
        </Link> */}
        <Link to="/short-term-rent" onClick={toggleMenu}>
          Короткострокова оренда
        </Link>
        <Link to="/" onClick={toggleMenu}>
          Довгострокова оренда
        </Link>
        <Link to="/contacts" onClick={toggleMenu}>
          Контакти
        </Link>
      </nav>

      {/* Відступ між навігацією і контактною кнопкою */}
      <div className="mt-28">
        <ContactAndButton hideButtons={hideButtons} isMobile />
      </div>
    </div>
  );
}

export default MobileMenu;
