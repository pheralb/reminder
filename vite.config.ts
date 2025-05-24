import path from "path";
import { defineConfig } from "vite";

// Plugins:
import tailwindcss from "@tailwindcss/vite";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
    },
  },
  plugins: [tailwindcss(), reactRouter()],
});
