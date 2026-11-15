/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        espresso: '#211713',
        chocolate: '#302019',
        coffee: '#503629',
        caramel: '#B77B45',
        gold: '#C5A16A',
        ivory: '#F7F1E8',
        cream: '#EFE5D8',
        taupe: '#A99A89',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        kenburns: { '0%': { transform: 'scale(1.02)' }, '100%': { transform: 'scale(1.12)' } },
        scrollline: { '0%': { transform: 'scaleY(0)', transformOrigin: 'top' }, '50%': { transform: 'scaleY(1)', transformOrigin: 'top' }, '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' }, '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' } },
      },
      animation: { kenburns: 'kenburns 24s ease-in-out infinite alternate', scrollline: 'scrollline 2.2s ease-in-out infinite' },
    },
  },
  plugins: [],
};
