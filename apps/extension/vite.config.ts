import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { defineConfig, type Plugin } from "vite";

// Get browser from command line args
const args = process.argv;
const browserArg = args.find((arg) => arg.startsWith("--browser="));
const browser = browserArg?.split("=")[1] || "chrome";

// Plugin to copy manifest and static assets
function copyManifestPlugin(): Plugin {
  return {
    name: "copy-manifest",
    writeBundle() {
      const outDir = resolve(__dirname, `dist/${browser}`);

      // Ensure output directory exists
      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true });
      }

      // Copy and process manifest.json
      const manifestPath = resolve(__dirname, "src/manifest.json");
      const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
      writeFileSync(
        resolve(outDir, "manifest.json"),
        JSON.stringify(manifest, null, 2),
      );

      // Copy icons if they exist
      const iconsDir = resolve(__dirname, "src/icons");
      const outIconsDir = resolve(outDir, "icons");
      if (existsSync(iconsDir)) {
        if (!existsSync(outIconsDir)) {
          mkdirSync(outIconsDir, { recursive: true });
        }
        cpSync(iconsDir, outIconsDir, { recursive: true });
      }

      // Copy root icon.png if exists (fallback)
      const rootIcon = resolve(__dirname, "icon.png");
      if (existsSync(rootIcon)) {
        if (!existsSync(outIconsDir)) {
          mkdirSync(outIconsDir, { recursive: true });
        }
        cpSync(rootIcon, resolve(outIconsDir, "icon-128.png"));
      }

      console.log(`✓ Manifest and assets copied to dist/${browser}`);
    },
  };
}

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [react(), tailwindcss(), copyManifestPlugin()],
    base: "",
    resolve: {
      alias: {
        src: resolve(__dirname, "src"),
      },
    },
    build: {
      outDir: `dist/${browser}`,
      emptyOutDir: true,
      sourcemap: isDev,
      minify: !isDev,
      rollupOptions: {
        input: {
          popup: resolve(__dirname, "src/popup/index.html"),
          background: resolve(__dirname, "src/background/index.ts"),
          content: resolve(__dirname, "src/content/index.ts"),
        },
        output: {
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === "background") return "background.js";
            if (chunkInfo.name === "content") return "content.js";
            return "assets/[name]-[hash].js";
          },
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
    },
  };
});
