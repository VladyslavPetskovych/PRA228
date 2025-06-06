import React from "react";

function actionButton({ text }) {
  return (
    <button className="bg-[#E7C873] text-black font-bold py-3 px-6 rounded-xl transition hover:opacity-90">
      {text}
    </button>
  );
}

export default actionButton;
