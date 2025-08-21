/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ispmgreen: '#9fd6a5',
        bg: '#fbfdf9',
        text: '#0b3a28'
      },
      borderRadius: { 'xl': '12px' }
    }
  },
  plugins: [],
}
