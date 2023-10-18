/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: {'max': '375px'},
      sm: '375px',
      md: '768px',
      lg: '1440px',
    },

    extend: {
      colors: {
        'dark-blue': '#10141E',
        'semi-blue': '#161D2F',
        'light-grey': '#5A698F',
        'dark-grey': '#161D2F',
        'dark-red': '#FC4747',
        'grey': '#979797',
        'light-blue': '#161D2F',
      },
      fontFamily: {
        outFit: ['Outfit'],
      },

      fontSize: {
        '2.5xl': '2rem',
        '3xl': '.688rem',
      },

      width: {
        '11/15': '95%',
      },

      spacing: {
        '976': '62rem',
        '32': '-32rem',
        '34': '34rem',
      },
    },
  },
  plugins: [],
}
