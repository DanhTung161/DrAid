/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'Lexend': ['"Lexend"'],
      },
      screens: {
        "sm": "576px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1504px",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
}