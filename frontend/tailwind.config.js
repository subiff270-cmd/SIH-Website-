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
        background: "#080C14",
        surface: "#0F172A",
        surfaceLight: "#1E293B",
        glass: "rgba(15, 23, 42, 0.65)",
        glassBorder: "rgba(255, 255, 255, 0.12)",
        electricBlue: "#3B82F6",
        cyanGlow: "#06B6D4",
        emeraldGlow: "#10B981",
        purpleGlow: "#8B5CF6",
        roseGlow: "#F43F5E",
        amberGlow: "#F59E0B",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glowBlue: "0 0 25px rgba(59, 130, 246, 0.4)",
        glowCyan: "0 0 25px rgba(6, 182, 212, 0.4)",
        glowEmerald: "0 0 25px rgba(16, 185, 129, 0.4)",
        glowPurple: "0 0 25px rgba(139, 92, 246, 0.4)",
        glowRose: "0 0 25px rgba(244, 63, 94, 0.4)",
        glassCard: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'laser-scan': 'laserScan 2.5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        laserScan: {
          '0%': { top: '0%' },
          '50%': { top: '95%' },
          '100%': { top: '0%' },
        }
      }
    },
  },
  plugins: [],
}
