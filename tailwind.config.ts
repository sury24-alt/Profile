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
        body: ["Inter", "sans-serif"],
        headline: ["Poppins", "sans-serif"],
      },
      colors: {
        background: "#272B36",
        foreground: "#FFFFFF",
        card: {
          DEFAULT: "#2F3340",
        },
        primary: {
          DEFAULT: "#FF7A7A", // Coral
        },
        secondary: {
          DEFAULT: "#695EE6", // Purple
        },
        accent: {
          DEFAULT: "#C685D6", // Pink/Purple for borders
        },
        muted: {
          DEFAULT: "#3E4352", // Darker gray for buttons
          foreground: "rgba(255, 255, 255, 0.588)",
        },
        border: "#C685D6",
      },
      backgroundImage: {
        "gradient-text": "linear-gradient(45deg, #695EE6 0%, #FF7A7A 85%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
