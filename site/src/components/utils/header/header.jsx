import React, { useState } from "react";
import Logo from "./logo";
import Navigation from "./navigation";
import ContactAndButton from "./contactAndButton";
import MobileMenu from "./mobileMenu";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black/90 text-brand-beige backdrop-blur-sm">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between px-6 md:px-16  md:py-2 gap-y-4">
          <Logo />
          <Navigation />
          <ContactAndButton className="hidden md:flex" />

          <button
            className="md:hidden ml-auto flex flex-col justify-center items-center w-10 h-10 relative group"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span
              className={`block w-8 h-0.5 bg-brand-beige transition-transform duration-300 ease-in-out ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-8 h-0.5 bg-brand-beige my-1 transition-all duration-300 ease-in-out ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-8 h-0.5 bg-brand-beige transition-transform duration-300 ease-in-out ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </header>
      <MobileMenu isOpen={menuOpen} toggleMenu={toggleMenu} />
    </>
  );
}

export default Header;
