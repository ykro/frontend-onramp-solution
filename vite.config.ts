/// <reference types="vitest/config" />
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `npm run check:paso5` define PASO5_VERSION para correr los tests del estudiante contra
// una versión con un bug de calcularTotalConDescuento (ver src/paso05-pruebas/versionesConBug.ts).
// El alias también cubre el import de ResumenDescuento, así que el componente recibe la misma versión.
const versionConBug = process.env.PASO5_VERSION;

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
    css: true,
    alias: versionConBug
      ? [
          {
            find: /^(.*\/paso05-pruebas|\.)\/calcularDescuento(\.(ts|js))?$/,
            replacement: fileURLToPath(
              new URL("./src/paso05-pruebas/versionesConBug.ts", import.meta.url)
            ),
          },
        ]
      : [],
  },
});
