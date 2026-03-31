/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark-neo palette
        'dark-bg': '#0f0f0f',
        'dark-card': '#1a1a1a',
        'dark-hover': '#2a2a2a',
        'dark-border': '#3a3a3a',
        'neon-cyan': '#00D9FF',
        'neon-magenta': '#FF006E',
        'neon-lime': '#39FF14',
        'neon-purple': '#B026FF',
        'text-primary': '#e0e0e0',
        'text-muted': '#666666',
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0, 217, 255, 0.5), 0 0 20px rgba(0, 217, 255, 0.3)',
        'neon-magenta': '0 0 10px rgba(255, 0, 110, 0.5), 0 0 20px rgba(255, 0, 110, 0.3)',
        'neon-cyan-sm': '0 0 5px rgba(0, 217, 255, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'pulse-neon': 'pulseNeon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseNeon: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
