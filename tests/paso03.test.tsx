import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ListaGastos } from "../src/paso03-estado-inmutable/ListaGastos";

describe("Paso 3: Estado inmutable y claves estables", () => {
  it("CA-3.1 actualiza la lista al agregar un gasto sin mutar el arreglo", async () => {
    const user = userEvent.setup();
    render(<ListaGastos />);

    await user.click(
      screen.getByRole("button", { name: /agregar café rápido/i })
    );

    expect(screen.getByText("Café rápido")).toBeInTheDocument();
    expect(screen.getByText(/Q305\.00/)).toBeInTheDocument();
  });

  it("CA-3.2 conserva la nota de cada fila al activar el filtro", async () => {
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
