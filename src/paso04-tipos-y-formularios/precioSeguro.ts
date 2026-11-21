export function leerPrecioSeguro(texto: string): number | null {
  const limpio = texto.trim();
  if (limpio === "") {
    return null;
  }
  const numero = Number(limpio);
  if (!Number.isFinite(numero) || numero <= 0) {
    return null;
  }
  return numero;
}
