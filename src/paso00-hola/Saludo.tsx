// Paso 0 (~25 min): tu primer componente de React.
// Ábrelo en el navegador con `npm run dev` (pestaña Paso 0) y verifica con `npm run check:paso0`.
import { useState } from "react";

export interface SaludoProps {
  nombre: string;
  temas: string[];
}

export function Saludo({ nombre, temas }: SaludoProps) {
  // El estado vive en React; al llamar a setClics, React vuelve a dibujar el componente.
  const [clics, setClics] = useState(0);

  function sumarUno() {
    setClics((anterior) => anterior + 1);
  }

  return (
    <section aria-labelledby="titulo-saludo">
      <h2 id="titulo-saludo">Hola, {nombre}</h2>
      <p className="props-recibidas">Props recibidas: {JSON.stringify({ nombre, temas })}</p>

      <p>Clics: {clics}</p>
      <button type="button" onClick={sumarUno}>
        Sumar uno
      </button>

      <h3>Temas del curso</h3>
      <ul aria-label="Temas del curso">
        {temas.map((tema) => (
          <li key={tema}>{tema}</li>
        ))}
      </ul>
    </section>
  );
}
