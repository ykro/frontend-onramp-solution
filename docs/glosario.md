# Glosario de frontend

Este glosario reúne los conceptos clave que aparecen en los cinco pasos del Onramp Frontend. Cada definición explica cómo se usa en el día a día y enlaza a su documentación oficial.

## AbortController

Interfaz nativa del navegador ([MDN: `AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)) que permite cancelar operaciones asíncronas como peticiones `fetch`. Le pasas `controller.signal` ([`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)) a la búsqueda y llamas a `controller.abort()` cuando el usuario cambia el término o el componente se desmonta, evitando que una respuesta vieja sobrescriba la pantalla.

## `aria-invalid` y `aria-describedby`

Atributos ARIA para conectar validaciones con lectores de pantalla y pruebas. [`aria-invalid="true"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid) indica que un campo tiene un valor incorrecto. [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) apunta al `id` del elemento que explica el error (por ejemplo, un `<p id="error-cantidad" role="alert">`).

## CSS Flexbox y CSS Grid

Sistemas nativos de maquetación en CSS. [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout) alinea elementos en una sola dimensión (una fila o una columna), como una barra de acciones con botón y mensaje de estado. [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) distribuye contenido en filas y columnas al mismo tiempo, como un formulario de dos columnas.

## `:focus-visible`

Pseudoclase de CSS ([MDN: `:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)) que aplica estilos de foco solo cuando el navegador determina que conviene mostrarlo, por ejemplo al navegar con la tecla `Tab`. Permite dibujar un borde claro en botones y campos para quienes usan teclado sin recargar los clics con mouse.

## HTML semántico

Uso de etiquetas que describen el propósito real del contenido en lugar de envolver todo en `<div>` y `<span>`, como documenta [MDN: Semantics in HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html). Usar `<section>`, `<label htmlFor>`, `<input>`, `<select>` y `<button>` da soporte automático de teclado, lectores de pantalla y consultas por rol.

## `key` en React

Identificador único que pasas a cada elemento de una lista en React ([React: Keeping list items in order with `key`](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)). React usa `key` para asociar cada fila con su estado interno cuando la lista se filtra, se ordena o crece. Usar el índice del arreglo como `key` mezcla el estado entre filas cuando cambian de posición.

## Narrowing (estrechamiento de tipos) en TypeScript

Proceso mediante el cual TypeScript deduce un tipo más específico después de una comprobación en tiempo de ejecución ([TypeScript: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)). En lugar de forzar un tipo con `as number` ([Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)), validas el dato con `trim()`, `Number()` y `Number.isFinite()` para garantizar que el valor sea un número válido.

## `Object.is`

Método estándar de JavaScript ([MDN: `Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)) que React usa para comparar el estado anterior con el nuevo. Cuando mutas un arreglo con `.push()`, la referencia en memoria sigue siendo la misma, `Object.is` devuelve `true` y React no vuelve a dibujar el componente.

## `Response.ok`

Propiedad booleana de la respuesta de Fetch API ([MDN: `Response.ok`](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)) que vale `true` solo para códigos HTTP entre `200` y `299`. Como `fetch` no rechaza la promesa ante un `404` o `500`, revisar `if (!response.ok)` es obligatorio antes de leer el cuerpo JSON.

## Testing Library `ByRole`

Familia de consultas de Testing Library ([Testing Library: `ByRole`](https://testing-library.com/docs/queries/byrole/)) que busca elementos tal como los percibe un usuario y la tecnología asistiva (por ejemplo `region`, `spinbutton`, `combobox`, `button`, `alert` y `status`). Si una prueba con `ByRole` falla, suele revelar un fallo de HTML semántico o accesibilidad.

## `"use client"`

Directiva de React y Next.js ([Next.js: Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)) que se coloca en la primera línea de un archivo para marcar que ese componente corre en el navegador (porque usa `useState`, `useEffect` o eventos del usuario). Marca la frontera cliente/servidor: ningún archivo con `"use client"` debe importar módulos que guarden llaves o secretos del servidor.
