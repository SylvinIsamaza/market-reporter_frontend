/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {

    extend: {
      screens: {
        "500": "500px",
        "800": "800px",
        "1540":"1440px"
      },
      colors: {
        primary: "#2a66b4",
        secondary: "#9EA2AA"
      },
    },
  },
  plugins: [],
};

