import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-outfit)", "var(--font-inter)", "sans-serif"],
        headline: ["var(--font-syne)", "var(--font-space-grotesk)", "sans-serif"], // Switch to a techy font
      },
      colors: {
        background: "#030712", // Very dark gray, almost absolute black
        foreground: "#f8fafc", // Crisp white/blueish tint
        card: {
          DEFAULT: "rgba(15, 23, 42, 0.4)", // Slate 900 translucent
        },
        primary: {
          DEFAULT: "#06b6d4", // Cyan
        },
        secondary: {
          DEFAULT: "#8b5cf6", // Violet
        },
        accent: {
          DEFAULT: "#10b981", // Emerald Green for ML connotations
        },
        muted: {
          DEFAULT: "#1e293b", // Slate 800
          foreground: "#94a3b8", // Slate 400
        },
        border: "rgba(51, 65, 85, 0.5)", // Subtle gray
      },
      backgroundImage: {
        "gradient-text": "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #10b981 100%)",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        trail: {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(0)", opacity: "0" },
        },
      },
      animation: {
        blob: "blob 7s infinite",
        trail: "trail 1s forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
