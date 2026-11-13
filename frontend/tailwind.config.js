/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        plusJakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        navy: '#17213D',
        accent: '#4F46E5',
        accentLight: '#6366F1',
        cyan: '#06B6D4',
        lavender: '#EEF2FF',
        lavenderDark: '#C7D2FE',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      borderRadius: {
        card: '1rem',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(79,70,229,0.08)',
        hover: '0 4px 24px rgba(79,70,229,0.15)',
      },
    },
  },
  plugins: [],
}
