// Paso 5: tests de calcularTotalConDescuento con Arrange, Act y Assert.
// `npm run check:paso5` los corre contra la función correcta y contra dos versiones con un bug.
import { describe, expect, it } from "vitest";
import { calcularTotalConDescuento } from "../src/paso05-pruebas/calcularDescuento";

describe("calcularTotalConDescuento", () => {
  it("aplica el descuento en un caso normal", () => {
    // Arrange
    const precio = 200;
    const porcentaje = 15;

    // Act
    const total = calcularTotalConDescuento(precio, porcentaje);

    // Assert: 15 % de 200 son 30, así que el total baja a 170.
    expect(total).toBe(170);
  });

  it("respeta los casos borde de 0 % y 100 %", () => {
    expect(calcularTotalConDescuento(120, 0)).toBe(120);
    expect(calcularTotalConDescuento(120, 100)).toBe(0);
  });

  it("rechaza datos fuera de rango", () => {
    expect(() => calcularTotalConDescuento(-1, 10)).toThrow(RangeError);
    expect(() => calcularTotalConDescuento(100, 101)).toThrow(RangeError);
    expect(() => calcularTotalConDescuento(100, -5)).toThrow(RangeError);
  });
});
