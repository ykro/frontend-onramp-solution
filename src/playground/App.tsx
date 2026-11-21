import { useState } from "react";
import { TarjetaReserva } from "../paso01-html-y-accesibilidad/TarjetaReserva";
import { ListaGastos } from "../paso03-estado-inmutable/ListaGastos";
import { BuscadorRapido } from "../paso05-fetch-y-frontera/BuscadorRapido";

type PasoId = "paso01" | "paso02" | "paso03" | "paso04" | "paso05";

const TABS: { id: PasoId; titulo: string; resumen: string }[] = [
  {
    id: "paso01",
    titulo: "Paso 1: HTML y accesibilidad",
    resumen: "HTML semántico, navegación con teclado, roles ByRole y validación con aria-invalid y aria-describedby.",
  },
  {
    id: "paso02",
    titulo: "Paso 2: CSS, layout y foco",
    resumen: "CSS Grid de 2 columnas, Flexbox para la barra de acciones y foco visible con :focus-visible.",
  },
  {
    id: "paso03",
    titulo: "Paso 3: Estado inmutable",
    resumen: "Actualización inmutable de arreglos con [...prev, nuevo] (Object.is) y key estable por id al filtrar.",
  },
  {
    id: "paso04",
    titulo: "Paso 4: Tipos y formularios",
    resumen: "Validación y estrechamiento de tipos (narrowing) en TypeScript para convertir texto de inputs sin usar as number.",
  },
  {
    id: "paso05",
    titulo: "Paso 5: Fetch y frontera",
    resumen: "Verificación de response.ok, cancelación con AbortController y separación entre \"use client\" y secreto.server.ts.",
  },
];

function buscarSimulado(termino: string, signal: AbortSignal): Promise<string[]> {
  const limpio = termino.trim().toLowerCase();
  const demoraMs = limpio.length <= 2 ? 120 : 15;

  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      if (signal.aborted) {
        reject(new DOMException("Búsqueda cancelada", "AbortError"));
        return;
      }
      const catalogo = [
        "Guía de HTML semántico",
        "Patrones de React 19",
        "Tipos seguros en TypeScript",
        "Control de fetch y AbortController",
        "Frontera cliente y servidor",
      ];
      const coincidencias = catalogo.filter((item) =>
        item.toLowerCase().includes(limpio)
      );
      resolve(coincidencias);
    }, demoraMs);

    signal.addEventListener("abort", () => {
      window.clearTimeout(timer);
      reject(new DOMException("Búsqueda cancelada", "AbortError"));
    });
  });
}

export function App() {
  const [activo, setActivo] = useState<PasoId>("paso01");
  const actual = TABS.find((tab) => tab.id === activo) ?? TABS[0];

  return (
    <div className="shell">
      <header className="shell-header">
        <h1>Onramp Frontend</h1>
        <p>Cinco pasos independientes para dominar la base de HTML, CSS, React, TypeScript y Next.js.</p>
      </header>

      <nav className="tabs" role="tablist" aria-label="Pasos de práctica">
        {TABS.map((tab) => {
          const seleccionado = tab.id === activo;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={seleccionado}
              className={seleccionado ? "tab tab-activa" : "tab"}
              onClick={() => setActivo(tab.id)}
            >
              {tab.titulo}
            </button>
          );
        })}
      </nav>

      <main className="panel" role="tabpanel">
        {actual ? <p className="panel-resumen">{actual.resumen}</p> : null}
        {activo === "paso01" || activo === "paso02" ? <TarjetaReserva /> : null}
        {activo === "paso03" || activo === "paso04" ? <ListaGastos /> : null}
        {activo === "paso05" ? <BuscadorRapido buscar={buscarSimulado} /> : null}
      </main>
    </div>
  );
}
