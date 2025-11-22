/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Base
        'z-bg': '#030304', // Deepest black
        'z-obsidian': '#0a0a0c', // Slightly lighter background
        'z-card': '#131316', // Card background
        
        // Accents
        'z-violet-base': '#6d28d9', // Deep violet
        'z-violet-peak': '#a78bfa', // Bright violet
        'z-cyan': '#22d3ee', // Cyan accent
        'z-pink': '#f472b6', // Pink accent
        
        // Text
        'z-text-primary': '#f8fafc', // White
        'z-text-secondary': '#94a3b8', // Gray
        'z-text-muted': '#475569', // Dark gray
        
        // Legacy/Compat (mapped to new values)
        'z-onyx': '#94a3b8',
        'z-steel-gray': '#64748b',
      },
      fontFamily: {
        display: ['"Rajdhani"', 'sans-serif'], // Keeping Rajdhani as it fits the theme
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px -2px var(--tw-shadow-color)' },
          'to': { boxShadow: '0 0 20px 2px var(--tw-shadow-color)' },
        }
      }
    },
  },
  plugins: [],
}

