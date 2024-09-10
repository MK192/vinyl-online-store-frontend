/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xl: { max: "1440px" },
      lg: { max: "1024px" },
      md: { max: "800px" },
      sm: { max: "480px" },
    },
    extend: {
      colors: {
        blackHowl: "#1a1e2e",
        JollyChristmas: "#b0042c",
      },
    },
  },
  plugins: [],
};
