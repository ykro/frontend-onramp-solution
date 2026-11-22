import { describe, expect, it } from "vitest";
import { leerPrecioSeguro } from "../src/paso03-tipos-y-formularios/precioSeguro";

describe("Paso 3: Tipos y formularios en TypeScript", () => {
  it("CA-3.1 convierte texto a número de forma segura en leerPrecioSeguro", () => {
    expect(leerPrecioSeguro("25.5")).toBe(25.5);
    expect(leerPrecioSeguro(" 120 ")).toBe(120);
    expect(leerPrecioSeguro("")).toBeNull();
    expect(leerPrecioSeguro("   ")).toBeNull();
    expect(leerPrecioSeguro("abc")).toBeNull();
    expect(leerPrecioSeguro("0")).toBeNull();
    expect(leerPrecioSeguro("-15")).toBeNull();
  });
});
