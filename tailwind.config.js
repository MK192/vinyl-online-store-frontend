/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xl: "1440px",
      lg: "1024px",
      md: "800px",
      sm: "480px",
    },
    extend: {
      colors: {
        blackHowl: "#1a1e2e",
        jollyChristmas: "#b0042c",
        absenceOfColor: "#16151c",
      },
    },
  },
  plugins: [],
};
