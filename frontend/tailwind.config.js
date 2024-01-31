/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lgreen: "#bafca2",
        dgreen: "#2fff2f",
        lorange: "#f8d6b3",
        dorange: "#ffa07a"
      }
    },
  },
  plugins: [],
}