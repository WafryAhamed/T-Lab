
export default {
  darkMode: 'class',
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        bg: 'var(--tl-bg)',
        card: 'var(--tl-card)',
        maintext: 'var(--tl-text)',
        secondary: 'var(--tl-secondary)',
        line: 'var(--tl-border)',
        accent: '#FFAB00',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}
