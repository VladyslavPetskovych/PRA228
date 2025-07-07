import React from "react";
import { Link } from "react-router-dom";

function MobileMenu({ isOpen, toggleMenu }) {
  return (
    <div
      className={`fixed inset-0 z-40 bg-brand-black/95 text-brand-beige flex flex-col items-center justify-center transform transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <nav className="flex flex-col gap-8 text-2xl font-semibold">
        <button onClick={toggleMenu}>Про нас</button>
        <Link to="/book" onClick={toggleMenu}>
          Забронювати
        </Link>
        <button onClick={toggleMenu}>Контакти</button>
      </nav>
    </div>
  );
}

export default MobileMenu;
