/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2F35D3",
        deepblue: "#1A237E",
        "deepblue-light": "#2436C8",
        gold: "#F4BE18",
        solargold: "#FFD54A",
        paper: "#FAFAF8",
        surface: "#FFFFFF",
        "surface-alt": "#F3F6FB",
        borderc: "#D9E2EF",
        textprimary: "#1A1F2E",
        textsecondary: "#5D6678",
        textmuted: "#8B95A7",
        success: "#1FA971",
        warningc: "#E59A00",
        danger: "#D64545",
        infoc: "#2F7AE5",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      borderRadius: {
        card: "1rem",
        btn: "0.75rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,35,126,0.04), 0 8px 24px -8px rgba(26,35,126,0.10)",
        cardhover: "0 4px 10px rgba(26,35,126,0.06), 0 16px 32px -12px rgba(26,35,126,0.16)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #1A237E 0%, #2436C8 55%, #2F35D3 100%)",
        "accent-gradient": "linear-gradient(90deg, #F4BE18, #FFD54A)",
      },
      keyframes: {
        flowmove: {
          to: { strokeDashoffset: "-28" },
        },
      },
      animation: {
        flow: "flowmove 1.8s linear infinite",
      },
    },
  },
  plugins: [],
};
