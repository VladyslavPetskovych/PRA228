import { Link } from "react-router-dom";

function Navigation({ className = "" }) {
  return (
    <nav
      className={`hidden lg:grid lg:grid-cols-2 xl:flex xl:flex-wrap xl:justify-center gap-x-12 gap-y-3 font-bold text-base ${className}`}
      aria-label="Main navigation"
    >
      {/* Головна */}
      <Link
        to="/"
        className="hover:text-brand-orange transition text-center order-1"
      >
        Головна
      </Link>

      {/* Короткострокова */}
      <Link
        to="/short-term-rent"
        className="hover:text-brand-orange transition text-center order-2"
      >
        Короткострокова оренда
      </Link>

      {/* Контакти */}
      <Link
        to="/contacts"
        className="hover:text-brand-orange transition text-center order-3 xl:order-4"
      >
        Контакти
      </Link>

      {/* Довгострокова */}
      <Link
        to="/long-term-rent"
        className="hover:text-brand-orange transition text-center order-4 xl:order-3"
      >
        Довгострокова оренда
      </Link>
    </nav>
  );
}

export default Navigation;
