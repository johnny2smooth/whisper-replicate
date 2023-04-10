/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        sinWave: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleX(3)" },
        },
      },
      animation: {
        sinWave: "sinWave 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
