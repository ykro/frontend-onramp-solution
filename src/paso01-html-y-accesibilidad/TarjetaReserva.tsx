import { type FormEvent, useState } from "react";
import "../paso02-css-layout-y-foco/tarjeta-reserva.css";

const HORARIOS = ["09:00", "11:00", "15:00"] as const;

export function TarjetaReserva() {
  const [cantidadTexto, setCantidadTexto] = useState("2");
  const [horario, setHorario] = useState<string>(HORARIOS[0]);
  const [error, setError] = useState<string | null>(null);
  const [confirmacion, setConfirmacion] = useState<string | null>(null);

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const valor = Number(cantidadTexto.trim());

    if (
      cantidadTexto.trim() === "" ||
      !Number.isInteger(valor) ||
      valor < 1 ||
      valor > 12
    ) {
      setError("Ingresa un número entre 1 y 12.");
      setConfirmacion(null);
      return;
    }

    setError(null);
    setConfirmacion(
      `Reserva confirmada para ${valor} personas a las ${horario}.`
    );
  }

  return (
    <section className="reserva-card" aria-labelledby="titulo-reserva">
      <h2 id="titulo-reserva">Reservar sala de estudio</h2>

      <form onSubmit={manejarEnvio} noValidate>
        <div className="reserva-grid">
          <div className="reserva-campo">
            <label htmlFor="cantidad-personas">Cantidad de personas</label>
            <input
              id="cantidad-personas"
              name="cantidad"
              type="number"
              min={1}
              max={12}
              value={cantidadTexto}
              onChange={(e) => setCantidadTexto(e.target.value)}
              aria-invalid={error !== null}
              aria-describedby={error ? "error-cantidad" : undefined}
            />
            {error ? (
              <p id="error-cantidad" role="alert" className="reserva-error">
                {error}
              </p>
            ) : null}
          </div>

          <div className="reserva-campo">
            <label htmlFor="horario-sala">Horario</label>
            <select
              id="horario-sala"
              name="horario"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
            >
              {HORARIOS.map((hora) => (
                <option key={hora} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="reserva-acciones">
          <button type="submit" className="reserva-boton">
            Confirmar reserva
          </button>

          {confirmacion ? (
            <p role="status" className="reserva-estado">
              {confirmacion}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
