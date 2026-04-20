/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7f3",
          100: "#d6ebe0",
          500: "#1f7a5f",
          600: "#17644d",
          700: "#124f3d"
        }
      },
      boxShadow: {
        soft: "0 20px 45px rgba(15, 23, 42, 0.12)"
      }
    }
  },
  plugins: []
};
