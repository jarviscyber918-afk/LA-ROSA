/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        alexandria: ['Alexandria', 'Tajawal', 'Cairo', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
        sans: ['Alexandria', 'Tajawal', 'Cairo', 'sans-serif'],
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Alexandria', 'Cairo', 'serif'],
      },
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF8F5',
          200: '#F4F0EA',
          300: '#EAE5DE',
        },
        nude: {
          light: '#D9C8B4',
          DEFAULT: '#C6A88F',
          dark: '#9E7F66',
        },
        espresso: {
          DEFAULT: '#2C221E',
          light: '#3D3532',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          deep: '#111111',
          muted: '#666666',
        },
      },
      letterSpacing: {
        'luxury': '0.25em',
        'wide-luxury': '0.35em',
      },
    },
  },
  plugins: [],
}
