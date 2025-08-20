/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#1C1C1C",
          orange: "#B86F21",
          beige: "#D7C7A5",
          blue: "#9FB7BD",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        golos: ["Golos Text", "sans-serif"],
        moderustic: ["Moderustic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
