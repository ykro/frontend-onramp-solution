// Paso 5: esta función ya está bien escrita. Tu trabajo es probarla en
// tests/paso05.test.tsx. No la edites para hacer pasar tus tests.
export function calcularTotalConDescuento(
  precio: number,
  porcentaje: number
): number {
  if (precio < 0) {
    throw new RangeError("El precio no puede ser negativo.");
  }
  if (porcentaje < 0 || porcentaje > 100) {
    throw new RangeError("El porcentaje de descuento debe estar entre 0 y 100.");
  }

  const descuento = (precio * porcentaje) / 100;
  return Number((precio - descuento).toFixed(2));
}
