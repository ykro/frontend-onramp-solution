// Paso 5: este componente ya está bien escrito. Usa calcularTotalConDescuento para mostrar
// el total mientras la persona escribe el porcentaje. Pruébalo en tests/paso05.test.tsx
// como lo haría alguien en pantalla, buscando los elementos por su rol.
import { useState } from "react";
import { calcularTotalConDescuento } from "./calcularDescuento";

type Props = {
  precio: number;
};

export function ResumenDescuento({ precio }: Props) {
  const [porcentaje, setPorcentaje] = useState("0");

  let mensaje: string;
  let esError = false;
  try {
    mensaje = `Total: Q${calcularTotalConDescuento(precio, Number(porcentaje)).toFixed(2)}`;
  } catch (error) {
    mensaje = error instanceof Error ? error.message : "Dato inválido.";
    esError = true;
  }

  return (
    <section aria-label="Resumen del descuento">
      <label htmlFor="porcentaje-descuento">Porcentaje de descuento</label>
      <input
        id="porcentaje-descuento"
        type="number"
        value={porcentaje}
        onChange={(evento) => setPorcentaje(evento.target.value)}
      />
      <p role={esError ? "alert" : "status"}>{mensaje}</p>
    </section>
  );
}
