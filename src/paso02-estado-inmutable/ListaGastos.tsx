import { type FormEvent, useState } from "react";

function leerMontoPositivo(texto: string): number | null {
  const limpio = texto.trim();
  const n = Number(limpio);
  if (!limpio || !Number.isFinite(n) || n <= 0) return null;
  return n;
}

export interface Gasto {
  id: string;
  concepto: string;
  monto: number;
}

const GASTOS_INICIALES: Gasto[] = [
  { id: "g-1", concepto: "Café", monto: 25 },
  { id: "g-2", concepto: "Almuerzo", monto: 75 },
  { id: "g-3", concepto: "Libro de React", monto: 180 },
];

function FilaGasto({ gasto }: { gasto: Gasto }) {
  const [nota, setNota] = useState("");

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        padding: "10px 12px",
        border: "1px solid #d6d3cb",
        borderRadius: "8px",
        background: "#fafaf9",
      }}
    >
      <span>
        <strong>{gasto.concepto}</strong> — Q{gasto.monto.toFixed(2)}
      </span>
      <input
        type="text"
        aria-label={`Nota para ${gasto.concepto}`}
        placeholder="Agregar nota..."
        value={nota}
        onChange={(e) => setNota(e.target.value)}
        style={{
          padding: "6px 10px",
          border: "1px solid #cbd5e1",
          borderRadius: "6px",
          fontSize: "0.9rem",
        }}
      />
    </li>
  );
}

export function ListaGastos() {
  const [gastos, setGastos] = useState<Gasto[]>(GASTOS_INICIALES);
  const [soloMayores, setSoloMayores] = useState(false);
  const [concepto, setConcepto] = useState("");
  const [montoTexto, setMontoTexto] = useState("");
  const [error, setError] = useState<string | null>(null);

  const visibles = soloMayores
    ? gastos.filter((item) => item.monto > 50)
    : gastos;

  const total = visibles.reduce((suma, item) => suma + item.monto, 0);

  function agregarCafeRapido() {
    const nuevo: Gasto = {
      id: `g-rapido-${gastos.length + 1}`,
      concepto: "Café rápido",
      monto: 25,
    };
    setGastos((prev) => [...prev, nuevo]);
  }

  function manejarAgregar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const conceptoLimpio = concepto.trim();
    const monto = leerMontoPositivo(montoTexto);

    if (conceptoLimpio === "" || monto === null) {
      setError("Escribe un concepto y un monto mayor a 0.");
      return;
    }

    const nuevo: Gasto = {
      id: `g-${Date.now()}-${gastos.length + 1}`,
      concepto: conceptoLimpio,
      monto,
    };

    setGastos((prev) => [...prev, nuevo]);
    setConcepto("");
    setMontoTexto("");
    setError(null);
  }

  return (
    <section aria-labelledby="titulo-gastos">
      <h2 id="titulo-gastos" style={{ marginTop: 0 }}>
        Control de gastos
      </h2>

      <form
        onSubmit={manejarAgregar}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "flex-end",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label htmlFor="gasto-concepto">Concepto</label>
          <input
            id="gasto-concepto"
            type="text"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            placeholder="Ej. Transporte"
            style={{
              padding: "8px 10px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label htmlFor="gasto-monto">Monto (Q)</label>
          <input
            id="gasto-monto"
            type="text"
            inputMode="decimal"
            value={montoTexto}
            onChange={(e) => setMontoTexto(e.target.value)}
            placeholder="Ej. 45.50"
            style={{
              padding: "8px 10px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "9px 14px",
            border: "none",
            borderRadius: "6px",
            background: "#1d4ed8",
            color: "#ffffff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Agregar gasto
        </button>

        <button
          type="button"
          onClick={agregarCafeRapido}
          style={{
            padding: "9px 14px",
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
            background: "#ffffff",
            color: "#1c1917",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Agregar café rápido (Q25)
        </button>
      </form>

      {error ? (
        <p role="alert" style={{ color: "#b91c1c", marginTop: 0 }}>
          {error}
        </p>
      ) : null}

      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "14px",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={soloMayores}
          onChange={(e) => setSoloMayores(e.target.checked)}
        />
        Solo mayores a Q50
      </label>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 14px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {visibles.map((gasto) => (
          <FilaGasto key={gasto.id} gasto={gasto} />
        ))}
      </ul>

      <p style={{ margin: 0, fontWeight: 600 }}>
        Total visible: Q{total.toFixed(2)}
      </p>
    </section>
  );
}
