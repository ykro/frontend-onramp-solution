import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Paso 2: CSS, layout y foco visible", () => {
  it("CA-2.1 define Grid de 2 columnas, Flexbox y foco visible en tarjeta-reserva.css", () => {
    const cssPath = path.resolve(
      process.cwd(),
      "src/paso02-css-layout-y-foco/tarjeta-reserva.css"
    );
    const css = fs
      .readFileSync(cssPath, "utf-8")
      .replace(/\/\*[\s\S]*?\*\//g, "");

    expect(css).toMatch(/display:\s*grid/);
    expect(css).toMatch(/grid-template-columns:/);
    expect(css).toMatch(/display:\s*flex/);
    expect(css).toMatch(/:focus-visible/);
  });
});
