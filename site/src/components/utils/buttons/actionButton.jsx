import React from "react";
import { Link } from "react-router-dom";

function ActionButton({ text, route }) {
  return (
    <Link
      to={route}
      className="bg-brand-beige text-black font-bold py-3 px-6 rounded-xl transition hover:opacity-90 inline-block"
    >
      {text}
    </Link>
  );
}

export default ActionButton;
