import { Link } from "react-router-dom";
import logo from "../../../assets/logo/logo.png";

function Logo() {
  return (
    <Link
      to="/"
      className="flex h-24 items-center font-golos cursor-pointer"
      aria-label="Prime Rest Apartments — на головну"
    >
      <img
        src={logo}
        alt="Prime Rest Apartments"
        width="542"
        height="160"
        fetchpriority="high"
        className="h-9 w-auto"
      />
    </Link>
  );
}

export default Logo;
