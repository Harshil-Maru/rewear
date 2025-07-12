/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#d47c08',
          50: '#fef7ed',
          100: '#fdedd3',
          200: '#fad7a5',
          300: '#f6ba6d',
          400: '#f09332',
          500: '#eb750e',
          600: '#d47c08',
          700: '#ae4a09',
          800: '#8d3b0e',
          900: '#74320f',
        },
        dark: {
          DEFAULT: '#292929',
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#292929',
        }
      }
    },
  },
  plugins: [],
};