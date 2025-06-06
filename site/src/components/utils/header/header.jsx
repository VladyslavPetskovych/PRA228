import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import ContactAndButton from "./ContactAndButton";
import MobileMenu from "./MobileMenu";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent text-white">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between px-6 md:px-16 py-6 md:py-10 gap-y-4">
        <Logo />
        <Navigation />
        <ContactAndButton />
        <button className="md:hidden ml-auto" onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {menuOpen && <MobileMenu toggleMenu={toggleMenu} />}
    </header>
  );
}

export default Header;
