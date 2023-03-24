/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "slate-1100": "rgb(6 11 26/1)",
      },
      screens: {
        xs: "500px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
