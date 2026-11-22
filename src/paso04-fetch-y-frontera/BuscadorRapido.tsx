"use client";

import { useEffect, useState } from "react";
import { LIMITE_RESULTADOS } from "./contrato";

export interface BuscadorRapidoProps {
  buscar: (termino: string, signal: AbortSignal) => Promise<string[]>;
}

export function BuscadorRapido({ buscar }: BuscadorRapidoProps) {
  const [termino, setTermino] = useState("");
  const [resultados, setResultados] = useState<string[]>([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const limpio = termino.trim();
    if (limpio === "") {
      setResultados([]);
      setCargando(false);
      return;
    }

    const controller = new AbortController();
    setCargando(true);

    buscar(limpio, controller.signal)
      .then((lista) => {
        if (!controller.signal.aborted) {
          setResultados(lista.slice(0, LIMITE_RESULTADOS));
          setCargando(false);
        }
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setResultados([]);
        setCargando(false);
      });

    return () => {
      controller.abort();
    };
  }, [termino, buscar]);

  return (
    <section aria-labelledby="titulo-buscador">
      <h2 id="titulo-buscador" style={{ marginTop: 0 }}>
        Buscador de catálogo
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
        <label htmlFor="campo-busqueda">Buscar tema</label>
        <input
          id="campo-busqueda"
          type="search"
          value={termino}
          onChange={(e) => setTermino(e.target.value)}
          placeholder="Ej. React"
          style={{
            padding: "10px 12px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        />
      </div>

      {cargando ? <p role="status">Buscando...</p> : null}

      <ul aria-label="Resultados de búsqueda" style={{ paddingLeft: "20px", margin: 0 }}>
        {resultados.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
