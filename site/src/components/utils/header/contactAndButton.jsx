import { useState } from "react";
import { Link } from "react-router-dom";

function ContactAndButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("+380685637315").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="hidden md:flex flex-col items-center gap-2 px-2 relative">
      <button
        onClick={handleCopy}
        title="Натисніть, щоб скопіювати"
        className="font-bold whitespace-nowrap text-center cursor-pointer hover:underline"
      >
        +380685637315
      </button>

      <Link
        to="/book"
        className="border border-white rounded-full px-6 py-2 text-sm font-bold hover:bg-white hover:text-black transition"
      >
        Забронювати
      </Link>

      {copied && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full bg-neutral-800 text-white text-xs font-medium px-3 py-1 rounded shadow-lg">
          Скопійовано!
        </div>
      )}
    </div>
  );
}

export default ContactAndButton;
