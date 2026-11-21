import type { LibroCatalogo } from "./contrato";

export async function obtenerLibro(
  id: string,
  fetcher: typeof fetch = fetch
): Promise<LibroCatalogo> {
  const response = await fetcher(`/api/libros/${encodeURIComponent(id)}`);

  if (!response.ok) {
    throw new Error(`No se pudo cargar el libro (HTTP ${response.status}).`);
  }

  return (await response.json()) as LibroCatalogo;
}
