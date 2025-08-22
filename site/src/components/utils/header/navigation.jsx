import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="hidden md:flex flex-wrap items-center gap-x-6 font-bold text-base">
      <Link to="/" className="hover:text-brand-orange transition">
        Головна
      </Link>
      {/* <Link to="/" className="hover:text-brand-orange transition">
        Квартири
      </Link> */}

      <div className="hidden lg:flex gap-x-6">
        <Link
          to="/short-term-rent"
          className="hover:text-brand-orange transition"
        >
          Короткострокова оренда
        </Link>
        <Link to="/long-term-rent" className="hover:text-brand-orange transition">
          Довгострокова оренда
        </Link>
      </div>

      <Link to="/contacts" className="hover:text-brand-orange transition">
        Контакти
      </Link>
    </nav>
  );
}

export default Navigation;
