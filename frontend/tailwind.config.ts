import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-space-grotesk)", "monospace"],
      },
      colors: {
        background: "#fafaf8",
        surface: "#fafaf8",
        "surface-dim": "#f0ede8",
        "surface-container-lowest": "#ede9e4",
        "surface-container-low": "#f5f2ed",
        "surface-container": "#fafaf8",
        "surface-container-high": "#ffffff",
        "surface-container-highest": "#ffffff",
        "on-surface": "#1a1714",
        "on-surface-variant": "#4a4641",
        primary: "#ff6b5b",
        "primary-container": "#ff8b7f",
        "on-primary": "#ffffff",
        secondary: "#00897b",
        "secondary-container": "#4db8a8",
        "on-secondary": "#ffffff",
        tertiary: "#d4a574",
        "tertiary-container": "#f0d9c8",
        "on-tertiary": "#4d2e1a",
        error: "#d32f2f",
        "error-container": "#ffebee",
        "on-error": "#ffffff",
        outline: "#ccc4ba",
        "outline-variant": "#d9d1c8",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        sm: "0.375rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out both",
        "fade-in": "fadeIn 0.3s ease-out both",
        "slide-down": "slideDown 0.4s ease-out both",
        "slide-in-right": "slideInRight 0.4s ease-out both",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      boxShadow: {
        "warm": "0 8px 24px rgba(255, 107, 91, 0.12)",
        "warm-lg": "0 16px 40px rgba(255, 107, 91, 0.15)",
        "sm": "0 1px 2px rgba(26, 23, 20, 0.05)",
        "md": "0 4px 12px rgba(26, 23, 20, 0.08)",
        "lg": "0 8px 24px rgba(26, 23, 20, 0.12)",
        "none": "none",
      },
      backgroundImage: {
        "gradient-warm": "linear-gradient(135deg, #ff6b5b 0%, #ff8b7f 50%, #d4a574 100%)",
        "gradient-teal": "linear-gradient(135deg, #00897b 0%, #4db8a8 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
