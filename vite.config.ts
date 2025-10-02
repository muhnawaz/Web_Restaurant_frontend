// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5175,
    hmr: { overlay: true },       // <— show compile/runtime errors
    open: false,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)), // <— '@/...' works
    },
  },
});
