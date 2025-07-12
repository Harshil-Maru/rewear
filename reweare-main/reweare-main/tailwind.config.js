/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          accent: '#6e4c15',
          DEFAULT: '#6e4c15',
        },
        secondary: {
          accent: '#d47c08',
          DEFAULT: '#d47c08',
        },
        dark: {
          base: '#292929',
          DEFAULT: '#292929',
        },
        light: {
          text: '#ffffff',
          background: '#ffffff',
          DEFAULT: '#ffffff',
        }
      },
    },
  },
  plugins: [],
};
