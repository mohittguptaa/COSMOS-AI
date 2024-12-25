/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        digital: ['"Digital-7"', 'sans-serif'], // Add your custom font here
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["night"],
  },
}

