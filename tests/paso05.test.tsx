import fs from "node:fs";
import path from "node:path";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { BuscadorRapido } from "../src/paso05-fetch-y-frontera/BuscadorRapido";
import { obtenerLibro } from "../src/paso05-fetch-y-frontera/buscarCatalogo";

describe("Paso 5: Fetch, cancelación y frontera cliente/servidor", () => {
  it("CA-5.1 lanza un error claro cuando fetch responde HTTP 404", async () => {
    const fakeFetch: typeof fetch = async () =>
      new Response(JSON.stringify({ mensaje: "No existe" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });

    await expect(obtenerLibro("999", fakeFetch)).rejects.toThrow(/404/);
  });

  it("CA-5.2 cancela la búsqueda lenta (120 ms) para que no pise la rápida (15 ms)", async () => {
    const user = userEvent.setup();
    const signalsPorTermino = new Map<string, AbortSignal>();

    const buscar = (termino: string, signal: AbortSignal) => {
      signalsPorTermino.set(termino, signal);
      const demora = termino === "a" ? 120 : 15;

      return new Promise<string[]>((resolve, reject) => {
        const timer = setTimeout(() => {
          if (signal.aborted) {
            reject(new DOMException("Cancelada", "AbortError"));
            return;
          }
          resolve(
            termino === "a" ? ["Resultado viejo"] : ["Resultado nuevo"]
          );
        }, demora);

        signal.addEventListener("abort", () => {
          clearTimeout(timer);
          reject(new DOMException("Cancelada", "AbortError"));
        });
      });
    };

    render(<BuscadorRapido buscar={buscar} />);
    const campo = screen.getByLabelText(/buscar tema/i);

    await user.type(campo, "a");
    await user.type(campo, "b");

    await waitFor(() => {
      expect(screen.getByText("Resultado nuevo")).toBeInTheDocument();
    });

    // Espera más de 120 ms para confirmar que la respuesta lenta no pisó la rápida
    await new Promise((resolve) => setTimeout(resolve, 160));

    expect(signalsPorTermino.get("a")?.aborted).toBe(true);
    expect(screen.getByText("Resultado nuevo")).toBeInTheDocument();
    expect(screen.queryByText("Resultado viejo")).not.toBeInTheDocument();
  });

  it("CA-5.3 marca BuscadorRapido con 'use client' y no importa el módulo con secreto", () => {
    const archivo = path.resolve(
      process.cwd(),
      "src/paso05-fetch-y-frontera/BuscadorRapido.tsx"
    );
    const codigo = fs.readFileSync(archivo, "utf-8");

    expect(
      codigo.trimStart().startsWith('"use client";') ||
        codigo.trimStart().startsWith("'use client';")
    ).toBe(true);
    expect(codigo).not.toMatch(/secreto\.server/);
    expect(codigo).not.toMatch(/API_SECRET_KEY/);
  });
});
