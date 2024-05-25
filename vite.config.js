import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  base: "/odisha-weather/",
  build: {
    chunkSizeWarningLimit: 16000,
  },
});
