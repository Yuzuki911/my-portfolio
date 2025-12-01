/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f3',
          100: '#fde6e7',
          200: '#faccce',
          300: '#f7a0a4',
          400: '#f5777d',
          500: '#f2545b',
          600: '#e0323a',
          700: '#bc232a',
          800: '#9d1f25',
          900: '#841e23',
        },
        accent: {
          50: '#f8e8ed',
          100: '#f0d0da',
          200: '#e1a1b5',
          300: '#d27290',
          400: '#c3436b',
          500: '#a93f55',
          600: '#8b3346',
          700: '#6d2737',
          800: '#4f1b28',
          900: '#310f19',
        },
        ivory: {
          DEFAULT: '#f3f7f0',
          100: '#2d3d29',
          200: '#5a7952',
          300: '#8ab67b',
          400: '#bed6b5',
          500: '#f3f7f0',
          600: '#f5f9f3',
          700: '#f7faf5',
          800: '#fafcf8',
          900: '#fcfdfc',
        },
        cornsilk: {
          DEFAULT: '#f3f7f0',
          light: '#f7faf5',
          dark: '#bed6b5',
        },
        papaya: {
          DEFAULT: '#f5f9f3',
          light: '#fafcf8',
          dark: '#bed6b5',
        },
        beige: {
          DEFAULT: '#f3f7f0',
          light: '#f7faf5',
          dark: '#bed6b5',
        },
        smoky: {
          DEFAULT: '#8c5e58',
          50: '#f3eeee',
          100: '#e7dddc',
          200: '#cfbbb9',
          300: '#b79996',
          400: '#9f7773',
          500: '#8c5e58',
          600: '#704b46',
          700: '#543835',
          800: '#382523',
          900: '#1c1312',
        },
        dark: {
          bg: '#19323c',
          card: '#234654',
          border: '#2d5a6c',
          text: '#f3f7f0',
          muted: '#8c5e58',
        },
        light: {
          bg: '#f3f7f0',
          card: '#f7faf5',
          border: '#bed6b5',
          text: '#19323c',
          muted: '#8c5e58',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'slide-left': 'slideLeft 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
