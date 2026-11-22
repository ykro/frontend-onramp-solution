import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { leerPrecioSeguro } from "../src/paso03-tipos-y-formularios/precioSeguro";
import { validarFiltro } from "../src/paso03-tipos-y-formularios/filtroPrecio";

describe("Paso 3: Tipos y formularios en TypeScript", () => {
  it("CA-3.1 convierte texto a número de forma segura en leerPrecioSeguro", () => {
    expect(leerPrecioSeguro("25.5")).toBe(25.5);
    expect(leerPrecioSeguro(" 120 ")).toBe(120);
    expect(leerPrecioSeguro("")).toBeNull();
    expect(leerPrecioSeguro("   ")).toBeNull();
    expect(leerPrecioSeguro("abc")).toBeNull();
    expect(leerPrecioSeguro("0")).toBeNull();
    expect(leerPrecioSeguro("-15")).toBeNull();
    const codigo = fs.readFileSync(
      path.resolve(process.cwd(), "src/paso03-tipos-y-formularios/precioSeguro.ts"),
      "utf-8"
    );
    expect(codigo).not.toMatch(/\bas number\b/);
  });

  it("CA-3.2 el esquema Zod convierte los textos y rechaza montos que no son positivos", () => {
    expect(validarFiltro({ minimo: "50", maximo: "120.5" })).toEqual({
      ok: true,
      filtro: { minimo: 50, maximo: 120.5 },
    });
    const vacio = validarFiltro({ minimo: "", maximo: "100" });
    expect(vacio.ok).toBe(false);
    if (!vacio.ok) expect(Object.keys(vacio.errores)).toEqual(["minimo"]);
    const negativo = validarFiltro({ minimo: "10", maximo: "-5" });
    expect(negativo.ok).toBe(false);
    if (!negativo.ok) expect(negativo.errores).toHaveProperty("maximo");
  });

  it("CA-3.3 una regla entre dos campos marca el error en maximo", () => {
    expect(validarFiltro({ minimo: "80", maximo: "80" }).ok).toBe(true);
    expect(validarFiltro({ minimo: "100", maximo: "40" })).toEqual({
      ok: false,
      errores: { maximo: "El máximo debe ser mayor o igual que el mínimo" },
    });
  });
});
