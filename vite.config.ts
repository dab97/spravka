import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

// Инлайнит единственный CSS-бандл в index.html: убирает render-blocking запрос.
// CSS у проекта небольшой (~7 КБ), отдельный запрос стоит дороже, чем пара КБ в HTML.
function inlineCss(): Plugin {
  return {
    name: "inline-css",
    apply: "build",
    enforce: "post",
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html;
      for (const [fileName, file] of Object.entries(ctx.bundle)) {
        if (file.type !== "asset" || !fileName.endsWith(".css")) continue;
        const linkRe = new RegExp(`<link[^>]*href="/${fileName}"[^>]*>`);
        if (linkRe.test(html)) {
          html = html.replace(linkRe, `<style>${file.source}</style>`);
          delete ctx.bundle[fileName];
        }
      }
      return html;
    },
  };
}

export default defineConfig({
  plugins: [react(), inlineCss()],
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
    // Один CSS-бандл на весь проект: инлайнится в index.html плагином inlineCss,
    // поэтому ленивые чанки никогда не ссылаются на отдельные CSS-файлы
    cssCodeSplit: false,
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
