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

// Esta versión tiene un bug intencional: suma el descuento en lugar de restarlo.
// Úsala en tu tercera prueba de tests/paso05.test.tsx para comprobar que tus pruebas
// realmente atrapan errores y no pasan por accidente.
export function calcularTotalConDescuentoConBug(
  precio: number,
  porcentaje: number
): number {
  const descuento = (precio * porcentaje) / 100;
  return Number((precio + descuento).toFixed(2));
}
