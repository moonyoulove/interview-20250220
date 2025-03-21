/// <reference types="vitest" />
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import * as pathlib from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), vanillaExtractPlugin()],
    resolve: {
        alias: {
            "@": pathlib.resolve(__dirname, "./src"),
        },
    },
    test: {
        environment: "happy-dom",
    },
    build: {
        assetsInlineLimit: (filePath, content) => !filePath.endsWith(".svg") && content.length < 4096,
    },
});
