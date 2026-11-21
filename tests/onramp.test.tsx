import fs from "node:fs";
import path from "node:path";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TarjetaReserva } from "../src/lab01-html-y-accesibilidad/TarjetaReserva";
import {
  ListaGastos,
  leerPrecioSeguro,
} from "../src/lab02-estado-y-tipos/ListaGastos";
import { BuscadorRapido } from "../src/lab03-async-y-frontera/BuscadorRapido";
import { obtenerLibro } from "../src/lab03-async-y-frontera/buscarCatalogo";

describe("Lab 01: HTML semántico y accesibilidad", () => {
  it("expone la tarjeta con roles semánticos navegables por teclado", async () => {
    const user = userEvent.setup();
    render(<TarjetaReserva />);

    expect(
      screen.getByRole("region", { name: /reservar sala de estudio/i })
    ).toBeInTheDocument();

    const campoCantidad = screen.getByRole("spinbutton", {
      name: /cantidad de personas/i,
    });
    const selectorHorario = screen.getByRole("combobox", { name: /horario/i });
    const botonConfirmar = screen.getByRole("button", {
      name: /confirmar reserva/i,
    });

    await user.clear(campoCantidad);
    await user.type(campoCantidad, "4");
    await user.selectOptions(selectorHorario, "15:00");
    await user.click(botonConfirmar);

    expect(screen.getByRole("status")).toHaveTextContent(
      /4 personas.*15:00/i
    );
  });

  it("marca aria-invalid y aria-describedby cuando la cantidad no es válida", async () => {
    const user = userEvent.setup();
    render(<TarjetaReserva />);

    const campoCantidad = screen.getByRole("spinbutton", {
      name: /cantidad de personas/i,
    });
    const botonConfirmar = screen.getByRole("button", {
      name: /confirmar reserva/i,
    });

    await user.clear(campoCantidad);
    await user.type(campoCantidad, "0");
    await user.click(botonConfirmar);

    expect(campoCantidad).toHaveAttribute("aria-invalid", "true");
    const errorId = campoCantidad.getAttribute("aria-describedby");
    expect(errorId).toBeTruthy();

    const alerta = screen.getByRole("alert");
    expect(alerta).toHaveAttribute("id", errorId ?? "");
    expect(alerta).toHaveTextContent(/entre 1 y 12/i);
  });

  it("define Grid de 2 columnas, Flexbox y foco visible en tarjeta-reserva.css", () => {
    const cssPath = path.resolve(
      process.cwd(),
      "src/lab01-html-y-accesibilidad/tarjeta-reserva.css"
    );
    const css = fs
      .readFileSync(cssPath, "utf-8")
      .replace(/\/\*[\s\S]*?\*\//g, "");

    expect(css).toMatch(/display:\s*grid/);
    expect(css).toMatch(/grid-template-columns:/);
    expect(css).toMatch(/display:\s*flex/);
    expect(css).toMatch(/:focus-visible/);
  });
});

describe("Lab 02: Estado inmutable, claves y tipos", () => {
  it("convierte texto a número de forma segura en leerPrecioSeguro", () => {
    expect(leerPrecioSeguro("25.5")).toBe(25.5);
    expect(leerPrecioSeguro(" 120 ")).toBe(120);
    expect(leerPrecioSeguro("")).toBeNull();
    expect(leerPrecioSeguro("   ")).toBeNull();
    expect(leerPrecioSeguro("abc")).toBeNull();
    expect(leerPrecioSeguro("0")).toBeNull();
    expect(leerPrecioSeguro("-15")).toBeNull();
  });

  it("actualiza la lista al agregar un gasto sin mutar el arreglo", async () => {
    const user = userEvent.setup();
    render(<ListaGastos />);

    await user.click(
      screen.getByRole("button", { name: /agregar café rápido/i })
    );

    expect(screen.getByText("Café rápido")).toBeInTheDocument();
    expect(screen.getByText(/Q305\.00/)).toBeInTheDocument();
  });

  it("conserva la nota de cada fila al activar el filtro", async () => {
    const user = userEvent.setup();
    render(<ListaGastos />);

    const notaAlmuerzo = screen.getByLabelText("Nota para Almuerzo");
    await user.type(notaAlmuerzo, "Con equipo");

    await user.click(screen.getByLabelText(/solo mayores a q50/i));

    expect(screen.getByLabelText("Nota para Almuerzo")).toHaveValue(
      "Con equipo"
    );
  });
});

describe("Lab 03: Asincronía y frontera cliente/servidor", () => {
  it("lanza un error claro cuando fetch responde HTTP 404", async () => {
    const fakeFetch: typeof fetch = async () =>
      new Response(JSON.stringify({ mensaje: "No existe" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });

    await expect(obtenerLibro("999", fakeFetch)).rejects.toThrow(/404/);
  });

  it("cancela la búsqueda lenta (120 ms) para que no pise la rápida (15 ms)", async () => {
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

  it("marca BuscadorRapido con 'use client' y no importa el módulo con secreto", () => {
    const archivo = path.resolve(
      process.cwd(),
      "src/lab03-async-y-frontera/BuscadorRapido.tsx"
    );
    const codigo = fs.readFileSync(archivo, "utf-8");

    expect(codigo.trimStart().startsWith('"use client";') || codigo.trimStart().startsWith("'use client';")).toBe(true);
    expect(codigo).not.toMatch(/secreto\.server/);
    expect(codigo).not.toMatch(/API_SECRET_KEY/);
  });
});
