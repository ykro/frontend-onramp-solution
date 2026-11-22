import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Saludo } from "../src/paso00-hola/Saludo";

const TEMAS = ["HTML y CSS", "React", "TypeScript"];

describe("Paso 0: tu primer componente", () => {
  it("CA-0.1 el título usa el nombre que llega por props", () => {
    render(<Saludo nombre="Ana" temas={TEMAS} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Hola, Ana");
  });

  it("CA-0.2 cada clic en Sumar uno se ve en pantalla", async () => {
    const user = userEvent.setup();
    render(<Saludo nombre="Ana" temas={TEMAS} />);
    const boton = screen.getByRole("button", { name: /sumar uno/i });
    await user.click(boton);
    await user.click(boton);
    await user.click(boton);
    expect(screen.getByText("Clics: 3")).toBeInTheDocument();
  });

  it("CA-0.3 muestra un elemento de lista por cada tema", () => {
    render(<Saludo nombre="Ana" temas={TEMAS} />);
    const lista = screen.getByRole("list", { name: /temas del curso/i });
    const items = lista.querySelectorAll("li");
    expect(Array.from(items, (li) => li.textContent)).toEqual(TEMAS);
  });
});
