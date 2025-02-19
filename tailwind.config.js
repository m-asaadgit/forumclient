/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        b:"#101028"
      },
      fontFamily: {
        adam: ['adam', 'sans-serif'], 
        robo: ['robo', 'sans-serif'], 
        ub: ['ub', 'sans-serif'], 

      },
      screens: {
        tb: '760px', // Custom label breakpoint for 760px
        md: '1200px', // Redefine md for 1200px
      },
    },
  },
  plugins: [],
};
