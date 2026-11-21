# Lab 01: HTML semántico y accesibilidad (~20 minutos)

## Qué problema resuelves

La tarjeta en [`TarjetaReserva.tsx`](TarjetaReserva.tsx) está armada solo con etiquetas `<div>` y `<span>`. Si haces clic con el mouse parece funcionar, pero tiene cuatro problemas graves:

1. Quien navega con el teclado (`Tab` y `Enter`) no puede elegir horario ni confirmar la reserva.
2. Un lector de pantalla no sabe qué etiqueta describe cada campo.
3. Si alguien escribe `0`, `15` o deja el campo vacío, el formulario acepta el valor sin avisar el error.
4. Las pruebas automáticas buscan los controles por su rol con [`ByRole` de Testing Library](https://testing-library.com/docs/queries/byrole/), y con `<div>` no encuentran ninguno.

## Paso a paso (por si dices "no entiendo por dónde empezar")

Abre [`TarjetaReserva.tsx`](TarjetaReserva.tsx) y [`tarjeta-reserva.css`](tarjeta-reserva.css). Haz estos cambios en orden y guarda los archivos después de cada paso.

### Paso 1: Reemplaza los `<div>` principales por HTML semántico

Lee la guía de [HTML semántico en MDN](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html) si quieres ver por qué importa elegir la etiqueta correcta.

1. Cambia el contenedor exterior `<div className="reserva-card">` por un [`<section>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section) con [`aria-labelledby="titulo-reserva"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby).
2. Cambia `<div className="reserva-titulo">Reservar sala de estudio</div>` por `<h2 id="titulo-reserva">Reservar sala de estudio</h2>`.
3. Envuelve los campos y el botón dentro de un `<form onSubmit={manejarEnvio} noValidate>`.

### Paso 2: Conecta cada etiqueta con su control

1. En el campo de cantidad, cambia `<div className="reserva-etiqueta">` por [`<label htmlFor="cantidad-personas">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) (en React el atributo `for` se escribe [`htmlFor`](https://react.dev/reference/react-dom/components/common#common-props)).
2. En el campo numérico, usa [`<input id="cantidad-personas" type="number" min={1} max={12} ... />`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number). Al tener `type="number"`, el navegador y las pruebas lo reconocen con el rol `spinbutton`.
3. En el campo de horario, usa `<label htmlFor="horario-sala">Horario</label>` conectado a un [`<select id="horario-sala">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) con las opciones `09:00`, `11:00` y `15:00` dentro de `<option>`.
4. Reemplaza `<div className="reserva-boton-falso">` por un botón real: [`<button type="submit" className="reserva-boton">Confirmar reserva</button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button).

### Paso 3: Valida el formulario y conecta el mensaje de error

1. Separa el estado en dos variables: `error` (`string | null`) y `confirmacion` (`string | null`).
2. En `manejarEnvio(evento: FormEvent<HTMLFormElement>)`, llama primero a `evento.preventDefault()`.
3. Convierte `cantidadTexto.trim()` con `Number(...)`. Si está vacío, no es entero (`!Number.isInteger(valor)`), es menor que `1` o mayor que `12`:
   - Guarda `"Ingresa un número entre 1 y 12."` en `error`.
   - Limpia `confirmacion` con `null` y sal de la función.
4. En el `<input>` de cantidad agrega:
   - [`aria-invalid={error !== null}`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid)
   - [`aria-describedby={error ? "error-cantidad" : undefined}`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby)
5. Cuando exista `error`, muéstralo dentro de `<p id="error-cantidad" role="alert" className="reserva-error">{error}</p>` (consulta [`role="alert"` en MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role)).
6. Cuando los datos sean válidos, limpia `error` con `null` y muestra la confirmación dentro de `<p role="status" className="reserva-estado">` (consulta [`role="status"` en MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role)), incluyendo la cantidad y el horario (por ejemplo: `Reserva confirmada para 4 personas a las 15:00.`).

### Paso 4: Ordena el diseño y agrega foco visible en CSS

Abre [`tarjeta-reserva.css`](tarjeta-reserva.css) y agrega tres reglas:

1. En `.reserva-grid`, usa [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) de 2 columnas (`display: grid;` y `grid-template-columns: repeat(2, minmax(0, 1fr));`).
2. En `.reserva-acciones`, usa [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout) (`display: flex; align-items: center; justify-content: space-between;`).
3. Define un borde claro cuando el usuario navega con teclado usando [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) sobre `input`, `select` y `.reserva-boton` (por ejemplo, `outline: 3px solid #1d4ed8; outline-offset: 2px;`).

### Paso 5: Verifica tu trabajo

1. Prueba la tarjeta en el navegador con `npm run dev` usando solo la tecla `Tab`, las flechas y `Enter`.
2. Corre `npm run check` en la terminal y confirma que pasan las 3 pruebas de `Lab 01`.

## Documentación oficial de este laboratorio

- [MDN: Semantics in HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html)
- [MDN: `<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) y [React: `htmlFor`](https://react.dev/reference/react-dom/components/common#common-props)
- [MDN: `aria-invalid`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid) y [MDN: `aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby)
- [Testing Library: `ByRole`](https://testing-library.com/docs/queries/byrole/)
- [MDN: CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) y [MDN: CSS Flexible Box Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout)
- [MDN: `:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)

## Enlaces del kit

- Volver al README principal: [`../../README.md`](../../README.md)
- Índice de kits On-Ramp: [https://github.com/ykro/courses-onramp](https://github.com/ykro/courses-onramp)
- Curso principal: [https://github.com/ykro/frontend-course](https://github.com/ykro/frontend-course)
- Solución explicada paso a paso: [https://github.com/ykro/frontend-onramp-solution](https://github.com/ykro/frontend-onramp-solution)
