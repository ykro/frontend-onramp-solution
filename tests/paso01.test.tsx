import fs from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TarjetaReserva } from "../src/paso01-html-accesibilidad-y-css/TarjetaReserva";

describe("Paso 1: HTML semántico, accesibilidad y CSS", () => {
  it("CA-1.1 expone la tarjeta con roles semánticos navegables por teclado", async () => {
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

  it("CA-1.2 marca aria-invalid y aria-describedby cuando la cantidad no es válida", async () => {
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

  it("CA-1.3 define Grid de 2 columnas, Flexbox y foco visible en tarjeta-reserva.css", () => {
    const cssPath = path.resolve(
      process.cwd(),
      "src/paso01-html-accesibilidad-y-css/tarjeta-reserva.css"
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
