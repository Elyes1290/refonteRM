import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    cors: true, // Active CORS pour permettre l'accès aux fichiers vidéos
    mimeTypes: {
      ".mp4": "video/mp4",
    },
    proxy: {
      "/pdfs/": {
        target: "http://localhost:5173/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pdfs\//, "/public/pdfs/"),
      },
    },
  },
});
