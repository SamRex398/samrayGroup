import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.CONTACT_API_PROXY_TARGET || "http://localhost:10000",
        changeOrigin: true,
      },
    },
  },
});
