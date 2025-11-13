// Tailwind configuration with dark/light themes and accent gradients

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: {
          gold: 'var(--accent-gold)',
          mint: 'var(--accent-mint)',
          purple: 'var(--accent-purple)',
          pink: 'var(--accent-pink)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-cinematic':
          'linear-gradient(135deg, var(--accent-gold), var(--accent-mint), var(--accent-purple))',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        float: 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px var(--accent-mint))' },
          '50%': { filter: 'drop-shadow(0 0 20px var(--accent-purple))' },
        },
      },
    },
  },
  plugins: [],
}

export default config
