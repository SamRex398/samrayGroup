/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2F35D3",
        navy: "#1A237E",
        gold: {
          DEFAULT: "#F4BE18",
          solar: "#FFD54A",
        },
        paper: "#FAFAF8",
        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#F3F6FB",
        },
        line: "#D9E2EF",
        ink: {
          DEFAULT: "#1A1F2E",
          2: "#5D6678",
          muted: "#8B95A7",
        },
        success: "#1FA971",
        warning: "#E59A00",
        danger: "#D64545",
        info: "#2F7AE5",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ['"Space Mono"', "monospace"],
      },
      borderRadius: {
        btn: "12px",
        card: "20px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,31,46,0.04), 0 8px 24px -8px rgba(26,31,46,0.10)",
        cardhover: "0 4px 10px rgba(26,31,46,0.06), 0 16px 32px -12px rgba(26,31,46,0.16)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #1A237E 0%, #2A2BA8 100%)",
        "accent-gradient": "linear-gradient(90deg, #F4BE18, #FFD54A)",
      },
    },
  },
  plugins: [],
};
