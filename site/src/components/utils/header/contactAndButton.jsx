import { useState } from "react";
import { Link } from "react-router-dom";

function ContactAndButton({ hideButtons = false, className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("+380777711400").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (hideButtons) return null;

  return (
    <div
      className={`flex flex-col items-center gap-4 px-2 relative ${className}`}
    >
      <button
        onClick={handleCopy}
        title="Натисніть, щоб скопіювати"
        className="cursor-pointer font-bold whitespace-nowrap text-center hover:underline"
      >
        +380777711400
      </button>

      <Link
        to="/book"
        className="border border-white rounded-full px-6 py-2 text-sm font-bold hover:bg-white hover:text-black transition"
        onClick={() => {
          if (onClick) onClick(); // додатковий обробник
          // інші дії кнопки, якщо потрібні
        }}
      >
        Забронювати
      </Link>

      {copied && (
        <div className="absolute left-1/2 -top-6 -translate-x-1/2 bg-neutral-800 text-white text-xs font-medium px-3 py-1 rounded shadow-lg">
          Скопійовано!
        </div>
      )}
    </div>
  );
}

export default ContactAndButton;
