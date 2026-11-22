import { describe, expect, it } from "vitest";
import {
  calcularTotalConDescuento,
  calcularTotalConDescuentoConBug,
} from "../src/paso05-pruebas/calcularDescuento";

describe("Paso 5: Pruebas automatizadas desde cero con Vitest", () => {
  it("CA-5.1 calcula correctamente un caso normal (por ejemplo, Q200 con 15 % de descuento)", () => {
    // Arrange
    const precio = 200;
    const porcentaje = 15;

    // Act
    const total = calcularTotalConDescuento(precio, porcentaje);

    // Assert
    expect(total).toBe(170);
  });

  it("CA-5.2 maneja los casos borde de 0 % y 100 % de descuento", () => {
    // Arrange y Act
    const sinDescuento = calcularTotalConDescuento(120, 0);
    const descuentoTotal = calcularTotalConDescuento(120, 100);

    // Assert
    expect(sinDescuento).toBe(120);
    expect(descuentoTotal).toBe(0);
  });

  it("CA-5.3 atrapa el bug de calcularTotalConDescuentoConBug", () => {
    // Arrange
    const precio = 200;
    const porcentaje = 15;
    const esperado = calcularTotalConDescuento(precio, porcentaje);

    // Act
    const resultadoConBug = calcularTotalConDescuentoConBug(precio, porcentaje);

    // Assert: la versión con bug suma el descuento en vez de restarlo
    expect(resultadoConBug).not.toBe(esperado);
    expect(resultadoConBug).toBe(230);
  });
});
