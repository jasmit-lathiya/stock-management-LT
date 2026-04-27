/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 35px 120px rgba(15, 23, 42, 0.15)',
      },
    },
  },
  plugins: [],
}
