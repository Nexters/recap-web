import { crx } from "@crxjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

import { createManifest } from "./src/manifest.config";

const args = process.argv;
const browserArg = args.find((arg) => arg.startsWith("--browser="));
const browser = browserArg?.split("=")[1] || "chrome";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tailwindcss(),
      svgr(),
      crx({ manifest: createManifest(env) }),
    ],
    base: "",
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    build: {
      outDir: `dist/${browser}`,
      emptyOutDir: true,
      sourcemap: isDev,
      minify: !isDev,
    },
  };
});
