import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#FFFFFF',
          900: '#F8FAFC',
          800: '#F1F5F9',
          700: '#D1D5DB',
          600: '#9CA3AF',
        },
        accent: {
          DEFAULT: '#2F3192',
          light: '#4345B0',
          dark: '#1E2070',
        },
        cta: {
          DEFAULT: '#ED1C25',
          light: '#FF333C',
        },
        text: {
          primary: '#111827',
          secondary: '#4B5563',
          tertiary: '#9CA3AF',
        },
        // Dark palette for footer and special dark sections
        navy: {
          950: '#0B1120',
          900: '#111827',
          800: '#1E293B',
          700: '#334155',
        }
      },
      fontFamily: {
        display: ['var(--font-bebas-neue)', 'sans-serif'],
        body: ['var(--font-outfit)', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};

export default config;
