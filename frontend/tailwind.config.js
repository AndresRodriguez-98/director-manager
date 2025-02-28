const flowbite = require("flowbite/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      backgroundImage: {
        "landing-bg": "url('/background.webp')",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Sobrescribe la fuente sans predeterminada
      },
    },
  },
  plugins: [],
};