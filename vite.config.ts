import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves the site at https://<user>.github.io/<repo>/, so the
// built assets must be referenced from that subpath. Set BASE_URL in CI to
// "/<repo>/" (e.g. "/juse-pathway-engine/") or leave unset for root hosting
// (Netlify, custom domain, or user.github.io root).
const base = process.env.BASE_URL || "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
