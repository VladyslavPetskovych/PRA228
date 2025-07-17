import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="hidden md:flex flex-wrap items-center gap-x-6 font-bold text-base">
      <Link to="/" className="hover:text-brand-orange transition">
        Головна
      </Link>
      <Link to="/" className="hover:text-brand-orange transition">
        Квартири
      </Link>
            <Link to="/" className="hover:text-brand-orange transition">
        Короткострокова оренда
      </Link>
            <Link to="/" className="hover:text-brand-orange transition">
        Довгострокова оренда
      </Link>
      <Link to="/book" className="hover:text-brand-orange transition">
        Забронювати
      </Link>
      <Link to="/" className="hover:text-brand-orange transition">
        Контакти
      </Link>
    </nav>
  );
}

export default Navigation;
