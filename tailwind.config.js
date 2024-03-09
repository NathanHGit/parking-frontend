/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-(red|sky|emerald|zinc|blue)-(500|700)/,
      variants: ['hover'],
    }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

