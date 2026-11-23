import { useState } from "react";
import { Saludo } from "../paso00-hola/Saludo";
import { TarjetaReserva } from "../paso01-html-accesibilidad-y-css/TarjetaReserva";
import { ListaGastos } from "../paso02-estado-inmutable/ListaGastos";
import { leerPrecioSeguro } from "../paso03-tipos-y-formularios/precioSeguro";
import { validarFiltro } from "../paso03-tipos-y-formularios/filtroPrecio";
import { BuscadorRapido } from "../paso04-fetch-y-frontera/BuscadorRapido";
import { calcularTotalConDescuento } from "../paso05-pruebas/calcularDescuento";
import { versionA } from "../paso05-pruebas/versiones";

type PasoId = "paso00" | "paso01" | "paso02" | "paso03" | "paso04" | "paso05";

const TABS: { id: PasoId; titulo: string; resumen: string }[] = [
  {
    id: "paso00",
    titulo: "Paso 0: Primer componente",
    resumen: "Un componente con props, estado con useState y una lista con map.",
  },
  {
    id: "paso01",
    titulo: "Paso 1: HTML, accesibilidad y CSS",
    resumen:
      "HTML semántico, teclado, roles y nombres accesibles, mensajes de error conectados al campo, Grid, Flexbox y foco visible.",
  },
  {
    id: "paso02",
    titulo: "Paso 2: Estado inmutable",
    resumen:
      "Por qué React no ve un arreglo mutado y por qué las notas saltan de fila al filtrar.",
  },
  {
    id: "paso03",
    titulo: "Paso 3: Tipos y formularios",
    resumen:
      "El texto de un input se convierte en número solo después de validarlo, sin aserciones de tipo.",
  },
  {
    id: "paso04",
    titulo: "Paso 4: Fetch y frontera",
    resumen:
      "Errores HTTP que fetch no lanza, búsquedas viejas que pisan a las nuevas y secretos que no deben llegar al navegador.",
  },
  {
    id: "paso05",
    titulo: "Paso 5: Pruebas desde cero",
    resumen:
      "Tests con Vitest que pasan con la función correcta y se ponen en rojo con una versión con un bug.",
  },
];

function VistaPrecioSeguro() {
  const [texto, setTexto] = useState("");
  const [minimo, setMinimo] = useState("50");
  const [maximo, setMaximo] = useState("120");
  const resultado = leerPrecioSeguro(texto);
  const resultadoFiltro = validarFiltro({ minimo, maximo });

  return (
    <section aria-labelledby="titulo-paso3">
      <h2 id="titulo-paso3">Prueba leerPrecioSeguro</h2>
      <label htmlFor="monto-paso3">Monto escrito por la persona</label>
      <input id="monto-paso3" value={texto} onChange={(e) => setTexto(e.target.value)} />
      <p>
        Devuelve: <code>{resultado === null ? "null" : String(resultado)}</code> (tipo{" "}
        <code>{resultado === null ? "null" : typeof resultado}</code>)
      </p>

      <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #d6d3cb" }} />

      <h3>Prueba validarFiltro (Zod)</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span>Mínimo</span>
          <input
            type="text"
            value={minimo}
            onChange={(e) => setMinimo(e.target.value)}
            style={{
              padding: "8px 10px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
            }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span>Máximo</span>
          <input
            type="text"
            value={maximo}
            onChange={(e) => setMaximo(e.target.value)}
            style={{
              padding: "8px 10px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
            }}
          />
        </label>
      </div>
      {resultadoFiltro.ok ? (
        <p style={{ color: "#15803d", margin: 0 }}>
          Filtro válido:{" "}
          <code>{JSON.stringify(resultadoFiltro.filtro)}</code>
        </p>
      ) : (
        <p role="alert" style={{ color: "#b91c1c", margin: 0 }}>
          Errores: <code>{JSON.stringify(resultadoFiltro.errores)}</code>
        </p>
      )}
    </section>
  );
}

function buscarSimulado(termino: string, signal: AbortSignal): Promise<string[]> {
  const limpio = termino.trim().toLowerCase();
  const demoraMs = limpio.length <= 1 ? 120 : 15;

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
  const totalA = versionA(precio, porcentaje);

  return (
    <section aria-labelledby="titulo-pruebas">
      <h2 id="titulo-pruebas" style={{ marginTop: 0 }}>
        Función correcta frente a una versión con un bug
      </h2>
      <p style={{ marginTop: 0, color: "#57534e" }}>
        Cambia el precio y el descuento para ver la diferencia. Luego escribe tus
        tests en <code>tests/paso05.test.tsx</code> y corre{" "}
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
          <strong>calcularTotalConDescuento (correcta)</strong>
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
          <strong>Versión A</strong>
          <p style={{ margin: "6px 0 0", fontSize: "1.15rem", color: "#b91c1c" }}>
            Q{totalA.toFixed(2)}
          </p>
        </div>
      </div>
    </section>
  );
}

export function App() {
  const [activo, setActivo] = useState<PasoId>("paso00");
  const actual = TABS.find((tab) => tab.id === activo) ?? TABS[0];

  return (
    <div className="shell">
      <header className="shell-header">
        <h1>Frontend On-Ramp</h1>
        <p>
          Seis pasos cortos de HTML, CSS, React, TypeScript, fetch y tests antes
          del curso. Si es tu primera vez, síguelos en orden.
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
        {activo === "paso00" ? (
          <Saludo nombre="Ana" temas={["HTML y CSS", "React", "TypeScript"]} />
        ) : null}
        {activo === "paso01" ? <TarjetaReserva /> : null}
        {activo === "paso02" ? <ListaGastos /> : null}
        {activo === "paso03" ? <VistaPrecioSeguro /> : null}
        {activo === "paso04" ? <BuscadorRapido buscar={buscarSimulado} /> : null}
        {activo === "paso05" ? <VistaPruebasDescuento /> : null}
      </main>
    </div>
  );
}
