// Versiones con un bug de calcularTotalConDescuento. No las importes desde tus tests:
// `npm run check:paso5` corre tus tests una vez contra cada versión y espera que al menos
// uno falle. Si todos pasan, tus tests no distinguen la función correcta de una rota.

/** Suma el descuento en lugar de restarlo. */
export function sumaElDescuento(precio: number, porcentaje: number): number {
  if (precio < 0) {
    throw new RangeError("El precio no puede ser negativo.");
  }
  if (porcentaje < 0 || porcentaje > 100) {
    throw new RangeError("El porcentaje de descuento debe estar entre 0 y 100.");
  }
  const descuento = (precio * porcentaje) / 100;
  return Number((precio + descuento).toFixed(2));
}

/** Calcula bien, pero acepta precios negativos y porcentajes fuera de 0 a 100. */
export function noValidaRangos(precio: number, porcentaje: number): number {
  const descuento = (precio * porcentaje) / 100;
  return Number((precio - descuento).toFixed(2));
}

const VERSIONES = { sumaElDescuento, noValidaRangos } as const;
type NombreVersion = keyof typeof VERSIONES;

// En el navegador no existe `process`; la pestaña Paso 5 del playground importa este archivo.
const desdeEntorno = typeof process === "undefined" ? undefined : process.env.PASO5_VERSION;
const elegida = (desdeEntorno ?? "sumaElDescuento") as NombreVersion;

// Con PASO5_VERSION definido, vite.config.ts redirige el import de calcularDescuento a
// este archivo, así que tus tests reciben esta función con el mismo nombre de siempre.
export const calcularTotalConDescuento = VERSIONES[elegida] ?? sumaElDescuento;
