import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: { 
    globals: true,
    environment: "jsdom",
    setupFiles: './tests/setup.js',
  },
  // server: {
  //   open: "/src/index.html",
  //   host: true,
  //   port: 3000,
  //   },
});
