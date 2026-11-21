import { useState } from "react";
import { TarjetaReserva } from "../lab01-html-y-accesibilidad/TarjetaReserva";
import { ListaGastos } from "../lab02-estado-y-tipos/ListaGastos";
import { BuscadorRapido } from "../lab03-async-y-frontera/BuscadorRapido";

type LabId = "lab01" | "lab02" | "lab03";

const TABS: { id: LabId; titulo: string; resumen: string }[] = [
  {
    id: "lab01",
    titulo: "Lab 01: HTML y accesibilidad",
    resumen: "HTML semántico, navegación por teclado, validación ARIA, Grid y Flexbox.",
  },
  {
    id: "lab02",
    titulo: "Lab 02: Estado y tipos",
    resumen: "Estado inmutable en React, claves estables al filtrar y lectura segura de números.",
  },
  {
    id: "lab03",
    titulo: "Lab 03: Async y frontera",
    resumen: "Errores HTTP en fetch, cancelación con AbortController y frontera cliente/servidor.",
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
  const [activo, setActivo] = useState<LabId>("lab01");
  const actual = TABS.find((tab) => tab.id === activo) ?? TABS[0];

  return (
    <div className="shell">
      <header className="shell-header">
        <h1>Onramp Frontend</h1>
        <p>Tres ejercicios prácticos de 20 minutos para dominar la base de React y TypeScript.</p>
      </header>

      <nav className="tabs" role="tablist" aria-label="Laboratorios de práctica">
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
        {activo === "lab01" ? <TarjetaReserva /> : null}
        {activo === "lab02" ? <ListaGastos /> : null}
        {activo === "lab03" ? <BuscadorRapido buscar={buscarSimulado} /> : null}
      </main>
    </div>
  );
}
