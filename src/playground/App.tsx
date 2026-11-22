import { useState } from "react";
import { TarjetaReserva } from "../paso01-html-accesibilidad-y-css/TarjetaReserva";
import { ListaGastos } from "../paso02-estado-inmutable/ListaGastos";
import { BuscadorRapido } from "../paso04-fetch-y-frontera/BuscadorRapido";
import {
  calcularTotalConDescuento,
  calcularTotalConDescuentoConBug,
} from "../paso05-pruebas/calcularDescuento";

type PasoId = "paso01" | "paso02" | "paso03" | "paso04" | "paso05";

const TABS: { id: PasoId; titulo: string; resumen: string }[] = [
  {
    id: "paso01",
    titulo: "Paso 1: HTML, accesibilidad y CSS",
    resumen:
      "HTML semántico, teclado, roles ByRole, aria-invalid, aria-describedby, CSS Grid de 2 columnas, Flexbox y :focus-visible.",
  },
  {
    id: "paso02",
    titulo: "Paso 2: Estado inmutable",
    resumen:
      "Actualización inmutable de arreglos con [...prev, nuevo] (Object.is) y key estable por id al filtrar.",
  },
  {
    id: "paso03",
    titulo: "Paso 3: Tipos y formularios",
    resumen:
      "Validación y estrechamiento de tipos (narrowing) en TypeScript para convertir texto de inputs sin usar as number.",
  },
  {
    id: "paso04",
    titulo: "Paso 4: Fetch y frontera",
    resumen:
      "Verificación de response.ok, cancelación con AbortController y separación entre \"use client\" y secreto.server.ts.",
  },
  {
    id: "paso05",
    titulo: "Paso 5: Pruebas desde cero",
    resumen:
      "Pruebas automatizadas con Vitest y Testing Library: ciclo Arrange -> Act -> Assert, casos borde y detección de bugs.",
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

function VistaPruebasDescuento() {
  const [precio, setPrecio] = useState(200);
  const [porcentaje, setPorcentaje] = useState(15);

  const sano = calcularTotalConDescuento(precio, porcentaje);
  const conBug = calcularTotalConDescuentoConBug(precio, porcentaje);

  return (
    <section aria-labelledby="titulo-pruebas">
      <h2 id="titulo-pruebas" style={{ marginTop: 0 }}>
        Comparación: función sana frente a función con bug
      </h2>
      <p style={{ marginTop: 0, color: "#57534e" }}>
        Cambia el precio y el descuento para ver la diferencia. Luego escribe tus
        tres pruebas en <code>tests/paso05.test.tsx</code> y corre{" "}
        <code>npm run check:paso5</code>.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span>Precio base (Q)</span>
          <input
            type="number"
            min={0}
            value={precio}
            onChange={(e) => setPrecio(Math.max(0, Number(e.target.value) || 0))}
            style={{
              padding: "8px 10px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
            }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span>Descuento (%)</span>
          <input
            type="number"
            min={0}
            max={100}
            value={porcentaje}
            onChange={(e) =>
              setPorcentaje(Math.min(100, Math.max(0, Number(e.target.value) || 0)))
            }
            style={{
              padding: "8px 10px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
            }}
          />
        </label>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "12px",
        }}
      >
        <div
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #86efac",
            background: "#f0fdf4",
          }}
        >
          <strong>calcularTotalConDescuento (sana)</strong>
          <p style={{ margin: "6px 0 0", fontSize: "1.15rem", color: "#15803d" }}>
            Q{sano.toFixed(2)}
          </p>
        </div>
        <div
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #fca5a5",
            background: "#fef2f2",
          }}
        >
          <strong>calcularTotalConDescuentoConBug</strong>
          <p style={{ margin: "6px 0 0", fontSize: "1.15rem", color: "#b91c1c" }}>
            Q{conBug.toFixed(2)}
          </p>
        </div>
      </div>
    </section>
  );
}

export function App() {
  const [activo, setActivo] = useState<PasoId>("paso01");
  const actual = TABS.find((tab) => tab.id === activo) ?? TABS[0];

  return (
    <div className="shell">
      <header className="shell-header">
        <h1>Onramp Frontend</h1>
        <p>
          Cinco pasos independientes para dominar HTML, CSS, React, TypeScript,
          Next.js y pruebas automatizadas.
        </p>
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
        {activo === "paso01" ? <TarjetaReserva /> : null}
        {activo === "paso02" || activo === "paso03" ? <ListaGastos /> : null}
        {activo === "paso04" ? <BuscadorRapido buscar={buscarSimulado} /> : null}
        {activo === "paso05" ? <VistaPruebasDescuento /> : null}
      </main>
    </div>
  );
}
