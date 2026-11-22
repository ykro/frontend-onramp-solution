# Glosario de frontend

Este glosario reúne los conceptos clave que aparecen en los seis pasos y las guías de lectura de Frontend On-Ramp. Cada definición explica cómo se usa en el día a día y enlaza a su documentación oficial.

## AbortController

Interfaz nativa del navegador ([MDN: `AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)) que permite cancelar operaciones asíncronas como peticiones `fetch`. Le pasas `controller.signal` ([`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)) a la búsqueda y llamas a `controller.abort()` cuando el usuario cambia el término o el componente se desmonta, evitando que una respuesta vieja sobrescriba la pantalla.

## ADR (Architecture Decision Record)

Documento breve que registra una decisión técnica importante con su contexto, decisión y consecuencias ([adr.github.io](https://adr.github.io/)). En el curso los encontrarás agrupados en `ARCHITECTURE_DECISIONS.md`. Revisa el [ejemplo de ADR](adr-ejemplo.md) para aprender a leerlos en un minuto.

## `aria-invalid` y `aria-describedby`

Atributos ARIA para conectar validaciones con lectores de pantalla y pruebas. [`aria-invalid="true"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid) indica que un campo tiene un valor incorrecto. [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) apunta al `id` del elemento que explica el error (por ejemplo, un `<p id="error-cantidad" role="alert">`).

## Arrange -> Act -> Assert

Patrón estándar para estructurar pruebas automatizadas en [Vitest](https://vitest.dev/): primero preparas los datos (**Arrange**), luego ejecutas la función o acción del usuario (**Act**) y al final compruebas el resultado esperado (**Assert**).

## Componente

Función de JavaScript con nombre en mayúscula que devuelve JSX y se usa como una etiqueta, por ejemplo `<Saludo />` ([React: Tu primer componente](https://es.react.dev/learn/your-first-component)). Una interfaz de React es un árbol de componentes que se pasan datos entre sí.

## CSS Flexbox y CSS Grid

Sistemas nativos de maquetación en CSS. [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout) alinea elementos en una sola dimensión (una fila o una columna), como una barra de acciones con botón y mensaje de estado. [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) distribuye contenido en filas y columnas al mismo tiempo, como un formulario de dos columnas.

## Estado y `useState`

Lo que un componente recuerda entre un render y otro, como un contador o el texto de un campo ([React: El estado](https://es.react.dev/learn/state-a-components-memory)). `useState` devuelve el valor actual y una función para cambiarlo; llamar a esa función hace que React vuelva a dibujar el componente. Cambiar una variable normal no avisa nada a React.

## Firebase Auth y Cloud Firestore

Servicios gestionados de Google para aplicaciones web. [Firebase Auth](https://firebase.google.com/docs/auth) maneja el inicio de sesión y entrega un token Bearer firmado con el `uid` del usuario. [Cloud Firestore](https://firebase.google.com/docs/firestore) guarda datos en colecciones y documentos, ofrece listeners en vivo (`onSnapshot`) y aplica autorización del lado del servidor mediante `firestore.rules`. Revisa la [guía rápida de Firebase](firebase.md).

## `:focus-visible`

Pseudoclase de CSS ([MDN: `:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)) que aplica estilos de foco solo cuando el navegador determina que conviene mostrarlo, por ejemplo al navegar con la tecla `Tab`. Permite dibujar un borde claro en botones y campos para quienes usan teclado sin recargar los clics con mouse.

## HTML semántico

Uso de etiquetas que describen el propósito real del contenido en lugar de envolver todo en `<div>` y `<span>`, como documenta [MDN: Semantics in HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html). Usar `<section>`, `<label htmlFor>`, `<input>`, `<select>` y `<button>` da soporte automático de teclado, lectores de pantalla y consultas por rol.

## JSX

Sintaxis parecida a HTML que se escribe dentro de archivos `.jsx` o `.tsx` ([React: Escribir marcado con JSX](https://es.react.dev/learn/writing-markup-with-jsx)). Lo que va entre llaves es JavaScript. Usa `className` en lugar de `class` y `htmlFor` en lugar de `for`.

## `key` en React

Identificador único que pasas a cada elemento de una lista en React ([React: Keeping list items in order with `key`](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)). React usa `key` para asociar cada fila con su estado interno cuando la lista se filtra, se ordena o crece. Usar el índice del arreglo como `key` mezcla el estado entre filas cuando cambian de posición.

## Narrowing (estrechamiento de tipos) en TypeScript

Proceso mediante el cual TypeScript deduce un tipo más específico después de una comprobación en tiempo de ejecución ([TypeScript: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)). En lugar de forzar un tipo con `as number` ([Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)), validas el dato con `trim()`, `Number()` y `Number.isFinite()` para garantizar que el valor sea un número válido.

## `Object.is`

Método estándar de JavaScript ([MDN: `Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)) que React usa para comparar el estado anterior con el nuevo. Cuando mutas un arreglo con `.push()`, la referencia en memoria sigue siendo la misma, `Object.is` devuelve `true` y React no vuelve a dibujar el componente.

## Props

Datos que un componente recibe de quien lo usa, escritos como atributos, por ejemplo `<Saludo nombre="Ana" />` ([React: Pasar props a un componente](https://es.react.dev/learn/passing-props-to-a-component)). Llegan como un objeto en el primer parámetro de la función y el componente no debe modificarlas.

## `Response.ok`

Propiedad booleana de la respuesta de Fetch API ([MDN: `Response.ok`](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)) que vale `true` solo para códigos HTTP entre `200` y `299`. Como `fetch` no rechaza la promesa ante un `404` o `500`, revisar `if (!response.ok)` es obligatorio antes de leer el cuerpo JSON.

## Testing Library `ByRole`

Familia de consultas de Testing Library ([Testing Library: `ByRole`](https://testing-library.com/docs/queries/byrole/)) que busca elementos tal como los percibe un usuario y la tecnología asistiva (por ejemplo `region`, `spinbutton`, `combobox`, `button`, `alert` y `status`). Si una prueba con `ByRole` falla, suele revelar un fallo de HTML semántico o accesibilidad.

## `"use client"`

Directiva de React y Next.js ([Next.js: Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)) que se coloca en la primera línea de un archivo para marcar que ese componente corre en el navegador (porque usa `useState`, `useEffect` o eventos del usuario). Marca la frontera entre cliente y servidor, así que ningún archivo con `"use client"` debe importar módulos que guarden llaves o secretos del servidor. Vite, que usa este on-ramp, ignora la directiva; el Paso 4 la pide para practicar la convención de Next.js.

## CI (Integración Continua)

Práctica de ejecutar automáticamente las pruebas y verificaciones de estilo en una máquina limpia cada vez que subes cambios con `git push` o abres un Pull Request, usando herramientas como [GitHub Actions](https://docs.github.com/es/actions/about-github-actions/understanding-github-actions). Revisa la guía visual en [docs/ci.md](ci.md).

## Versión con un bug

En el Paso 5, una copia de `calcularTotalConDescuento` con un error a propósito. `npm run check:paso5` corre tus tests contra cada versión con un bug; si todos siguen en verde, tus tests no distinguen la función correcta de una rota.
