import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/universe/",
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: "homepage/universe",
    target: "es2022",
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts"],
  },
});
