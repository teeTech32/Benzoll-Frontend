/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container :{
        center: true,
        padding:{
          DEFAULT:'1rem',
          sm:'3rem'
        }
      }
    },
  },
  plugins:[require('daisyui')],
}

