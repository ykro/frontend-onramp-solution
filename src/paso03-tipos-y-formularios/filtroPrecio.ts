import { z } from "zod";

export const FiltroPrecio = z
  .object({
    minimo: z.coerce.number().positive(),
    maximo: z.coerce.number().positive(),
  })
  .superRefine((filtro, ctx) => {
    if (filtro.maximo < filtro.minimo) {
      ctx.addIssue({
        code: "custom",
        path: ["maximo"],
        message: "El máximo debe ser mayor o igual que el mínimo",
      });
    }
  });

export type Filtro = z.infer<typeof FiltroPrecio>;

export type ResultadoFiltro =
  | { ok: true; filtro: Filtro }
  | { ok: false; errores: Record<string, string> };

// Esta función ya está bien. Léela: `safeParse` nunca lanza; devuelve éxito o la lista de errores.
export function validarFiltro(datos: unknown): ResultadoFiltro {
  const resultado = FiltroPrecio.safeParse(datos);
  if (resultado.success) {
    return { ok: true, filtro: resultado.data };
  }
  const errores: Record<string, string> = {};
  for (const issue of resultado.error.issues) {
    errores[issue.path.join(".")] ??= issue.message;
  }
  return { ok: false, errores };
}
