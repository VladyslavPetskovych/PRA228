/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1A1A1A",
        accent: "#E7C873",
        grayText: "#969696",
        lightBorder: "#FFFFFF1A",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        playfair: ['"Playfair Display"', "serif"],
        robotoCondensed: ['"Roboto Condensed"', "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
