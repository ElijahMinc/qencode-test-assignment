import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: "/src/assets",
      common: "/src/common",
      components: "/src/components",
      config: "/src/config",
      context: "/src/context",
      pages: "/src/pages",
      hooks: "/src/hooks",
      router: "/src/router",
      types: "/src/types",
      utils: "/src/utils",
      services: "/src/services",
      constants: "/src/constants.ts",
    },
  },
});
