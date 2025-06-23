import { useState } from "react";

function ContactAndButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("+380685888666").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Показати "Скопійовано" на 2 секунди
    });
  };

  return (
    <div className="hidden md:flex flex-col items-center gap-2 px-2">
      {copied && <span className="text-sm absolute top-10 -mt-5 text-green-400">Скопійовано!</span>}
      <span
        className="font-bold whitespace-nowrap text-center cursor-pointer hover:underline"
        onClick={handleCopy}
        title="Натисніть, щоб скопіювати"
      >
        +380685637315
      </span>

      <button className="border border-white rounded-full px-6 py-2 text-sm font-bold hover:bg-white hover:text-black transition">
        Забронювати
      </button>
    </div>
  );
}

export default ContactAndButton;
