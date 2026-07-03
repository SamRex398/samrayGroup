import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1420",
        surface: "#111D2E",
        surface2: "#16243A",
        paper: "#F6F4EF",
        textink: "#0E141B",
        copper: {
          DEFAULT: "#B8703A",
          light: "#D89361",
        },
        teal: "#2E9C93",
        line: "rgba(246,244,239,0.10)",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        flowmove: {
          to: { strokeDashoffset: "-32" },
        },
      },
      animation: {
        flow: "flowmove 1.6s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
