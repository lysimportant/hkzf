import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [
      ".mjs",
      ".js",
      ".ts",
      ".jsx",
      ".tsx",
      ".json",
      ".less",
      ".css"
    ],
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      components: fileURLToPath(new URL("./src/components", import.meta.url)),
      views: fileURLToPath(new URL("./src/views", import.meta.url)),
      assets: fileURLToPath(new URL("./src/assets", import.meta.url)),
      router: fileURLToPath(new URL("./src/router", import.meta.url)),
      hooks: fileURLToPath(new URL("./src/hooks", import.meta.url)),
      service: fileURLToPath(new URL("./src/service", import.meta.url)),
      utils: fileURLToPath(new URL("./src/utils", import.meta.url))
    }
  },
  server: {
    host: "0.0.0.0"
  }
});
