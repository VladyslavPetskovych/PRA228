// src/components/Rules.js
import React from "react";
import { RULES, RULES_LONG_TERM } from "./RulesData";

function Rules({ type = "short" }) {
  const rulesToShow = type === "long" ? RULES_LONG_TERM : RULES;

  return (
    <section className="font-golos text-brand-black mt-12 px-4 sm:px-6 lg:px-8 bg-brand-beige/20 p-8 rounded-2xl shadow border border-brand-beige/40">
      <h2 className="text-2xl font-semibold mb-6 text-brand-orange">
        {type === "long"
          ? "Правила довгострокової оренди"
          : "Правила короткострокового проживання"}
      </h2>
      <ol className="list-decimal list-inside space-y-2">
        {rulesToShow.map((rule, idx) => (
          <li key={idx}>{rule}</li>
        ))}
      </ol>
    </section>
  );
}

export default Rules;
