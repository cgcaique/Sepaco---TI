/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9e8ff',
          200: '#b3d1ff',
          300: '#84b3ff',
          400: '#5590ff',
          500: '#2f6eff',
          600: '#1d52db',
          700: '#163ea8',
          800: '#142f7b',
          900: '#12275f'
        }
      }
    }
  },
  plugins: []
};
