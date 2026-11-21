# Paso 1. HTML semántico y accesibilidad

![De HTML semántico a roles accesibles](diagrams/accesibilidad.svg)

## Por qué importa

Armar formularios solo con etiquetas `<div>` y `<span>` rompe la navegación con teclado, deja sin contexto a los lectores de pantalla y dificulta escribir pruebas confiables. Elegir etiquetas con significado según [HTML semántico en MDN](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html), vincular cada error con [`aria-invalid`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid) y [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby), y consultar controles con [`ByRole` de Testing Library](https://testing-library.com/docs/queries/byrole/) garantiza una interfaz usable para todas las personas desde el primer día.

## Qué se construye

Trabajarás en `src/paso01-html-y-accesibilidad/TarjetaReserva.tsx`:

1. Reemplaza `<div className="reserva-card">` por [`<section aria-labelledby="titulo-reserva">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section) y el título por `<h2 id="titulo-reserva">Reservar sala de estudio</h2>`.
2. Envuelve los campos y el botón dentro de `<form onSubmit={manejarEnvio} noValidate>`.
3. Conecta [`<label htmlFor="cantidad-personas">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) con [`<input id="cantidad-personas" type="number" min={1} max={12} ... />`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number) (en React se escribe [`htmlFor`](https://react.dev/reference/react-dom/components/common#common-props)).
4. Conecta `<label htmlFor="horario-sala">Horario</label>` con [`<select id="horario-sala">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) y las opciones `09:00`, `11:00` y `15:00`.
5. Cambia el botón falso por [`<button type="submit" className="reserva-boton">Confirmar reserva</button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button).
6. Separa el estado en `error` y `confirmacion`. En `manejarEnvio`, llama a `evento.preventDefault()` y valida que el número sea un entero entre `1` y `12`. Si falla, muestra `"Ingresa un número entre 1 y 12."` en `<p id="error-cantidad" role="alert">` y marca `aria-invalid={error !== null}` y `aria-describedby={error ? "error-cantidad" : undefined}` en el `<input>`. Si es válido, limpia el error y muestra la confirmación con cantidad y horario dentro de `<p role="status">`.

## Criterios de aceptación

- `CA-1.1` [auto] `TarjetaReserva` expone los roles accesibles `region`, `spinbutton`, `combobox`, `button` y `status` navegables con teclado, y confirma la reserva con cantidad y horario.
- `CA-1.2` [auto] Al enviar un valor fuera del rango `1..12` (por ejemplo `0`), el campo marca `aria-invalid="true"`, enlaza `aria-describedby` con un mensaje en `role="alert"` y explica el rango válido (`entre 1 y 12`).

## Cómo verificar

Abre la pestaña **Paso 1** con `npm run dev` y completa la reserva usando solo `Tab`, flechas y `Enter`. Luego ejecuta `npm run check:paso1` para validar `CA-1.1` y `CA-1.2` de forma independiente. Si algún término es nuevo, revisa el [glosario](../../docs/glosario.md) o vuelve al [README principal](../../README.md).
