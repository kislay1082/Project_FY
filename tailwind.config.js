/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,pug}", "./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        brand: "#59E881",
        darkest: "#0F172A",
        dark: "#27375E",
        mid: "#ABB8C9",
        light: "#E1E6EB",
        lightest: "#FFFFFF"
      },
      fontFamily: {
        'rubik': "'Rubik', sans-serif"
      },
    },
  },
  plugins: [],
}

