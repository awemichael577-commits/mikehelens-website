import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#17355C",
          hover: "#1C3A66",
        },
        accent: {
          DEFAULT: "#C9A24A",
          soft: "#F8F3EA",
        },
        background: "#FFFCF7",
        surface: "#ffffff",
        bg: "#FFFCF7",
        "bg-alt": "#F8F3EA",
        ink: "#1A1A1A",
        muted: "#5F7087",
        line: "#E7EAF0",
        success: "#2E7D57",
        navy: {
          DEFAULT: "#17355C",
          deep: "#17355C",
          dark: "#122B4A",
          soft: "#1C3A66",
        },
        gold: {
          DEFAULT: "#C9A24A",
          dark: "#8A6A1F",
          pale: "#F8F3EA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(20, 33, 61, 0.12)",
      },
    },
  },
  plugins: [forms],
};

export default config;
