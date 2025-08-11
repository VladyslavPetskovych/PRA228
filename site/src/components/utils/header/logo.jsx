import { Link } from "react-router-dom";
import logo2 from "../../../assets/logo/logoShortVertical.png";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-1 font-golos cursor-pointer">
      {/* <img
        src={logo}
        className="w-12 h-12 rounded-full bg-brand-orange p-1"
        alt="Prime Yard logo"
      />
      <div className="flex flex-col leading-tight">
        <span className="text-xl font-bold text-brand-beige">Prime Yard</span>
        <span className="text-sm text-brand-beige tracking-wide">
          Apartments
        </span>
      </div> */}
      <img src={logo2} className="h-24" alt="" />
    </Link>
  );
}

export default Logo;
