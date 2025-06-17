/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        times: ['Times New Roman', 'serif'],
        arial: ['Arial', 'sans-serif'],
      },
      colors: {
        'vietnam-red': '#DA251C',
        'vietnam-gold': '#FFCD00',
        'state-border': 'rgba(0, 0, 0, 0.1)',
        'state-background': '#F8F9FA',
        'state-dark': '#2C3E50',
        'state-white': '#FFFFFF',
      },
      keyframes: {
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      },
      animation: {
        'pulse-scale': 'pulse-scale 2s ease-in-out infinite',
      },
      textStyles: {
        'state-heading': {
          fontFamily: 'Times New Roman, serif',
          fontWeight: '600',
        },
        'state-subheading': {
          fontFamily: 'Arial, sans-serif',
          fontWeight: '500',
        },
        'state-body': {
          fontFamily: 'Arial, sans-serif',
          lineHeight: '1.6',
        },
      },
    },
  },
  plugins: [],
} 