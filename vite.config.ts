import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // слушать на всех интерфейсах (0.0.0.0), чтобы работали и localhost, и 127.0.0.1
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          icons: ["@hugeicons/react", "@hugeicons/core-free-icons"],
        },
      },
    },
  },
});
