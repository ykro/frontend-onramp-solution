# Frontend On-Ramp (solución de referencia)

Este repositorio contiene la solución verificada de [Frontend On-Ramp](https://github.com/ykro/frontend-onramp), la nivelación previa al [curso de Frontend con React y Next.js](https://github.com/ykro/frontend-course). Aquí pasan los seis checks, de `npm run check:paso0` a `npm run check:paso5`, y `npm run build` compila sin errores. Cada guía en `steps/` termina con las respuestas de autoevaluación.

![Mapa de Frontend On-Ramp](docs/diagrams/overview.svg)

## Dónde ver la solución de cada paso

| Paso | Criterios | Qué se cambió y por qué | Archivo |
| --- | --- | --- | --- |
| Paso 0 | `CA-0.1` a `CA-0.3` | El título usa la prop `nombre`. El contador pasó de una variable `let` a `useState`, porque solo `setClics` le avisa a React que vuelva a dibujar. La lista usa `temas.map` con el texto como `key`. | [Saludo.tsx](src/paso00-hola/Saludo.tsx) |
| Paso 1 | `CA-1.1` a `CA-1.3` | Los `<div>` pasaron a `<section>`, `<h2>`, `<form>`, `<label htmlFor>`, `<input type="number">`, `<select>` y `<button type="submit">`, que dan rol, nombre y teclado. El error de cantidad se guarda en estado y se conecta al campo con `aria-invalid` y `aria-describedby`; el mensaje usa `role="alert"` y la confirmación `role="status"`. El CSS usa Grid de dos columnas, Flexbox en la fila de acciones y `:focus-visible`. | [TarjetaReserva.tsx](src/paso01-html-accesibilidad-y-css/TarjetaReserva.tsx), [tarjeta-reserva.css](src/paso01-html-accesibilidad-y-css/tarjeta-reserva.css) |
| Paso 2 | `CA-2.1`, `CA-2.2` | `setGastos((prev) => [...prev, nuevo])` crea un arreglo nuevo, así `Object.is` detecta el cambio. El total se calcula en cada render desde `visibles`, sin `useState` ni `useEffect`, así sigue al filtro. Cada fila usa `gasto.id` como `key`, así conserva su nota aunque cambie de posición. | [ListaGastos.tsx](src/paso02-estado-inmutable/ListaGastos.tsx) |
| Paso 3 | `CA-3.1` | `trim`, `Number` y `Number.isFinite` con `return null` tempranos validan el dato cuando el programa corre y hacen el narrowing que antes fingía el `as number`. | [precioSeguro.ts](src/paso03-tipos-y-formularios/precioSeguro.ts) |
| Paso 3 | `CA-3.2`, `CA-3.3` | `.positive()` rechaza montos vacíos o negativos después de `z.coerce.number()`, y `superRefine` compara `maximo` con `minimo` y pone el error en `path: ["maximo"]`. | [filtroPrecio.ts](src/paso03-tipos-y-formularios/filtroPrecio.ts) |
| Paso 4 | `CA-4.1` a `CA-4.3` | `obtenerLibro` revisa `response.ok` y lanza un `Error` con el código HTTP. El efecto devuelve una limpieza que llama a `controller.abort()` e ignora las respuestas de búsquedas canceladas. El componente importa el límite desde `contrato.ts` y empieza con `"use client"`. | [buscarCatalogo.ts](src/paso04-fetch-y-frontera/buscarCatalogo.ts), [BuscadorRapido.tsx](src/paso04-fetch-y-frontera/BuscadorRapido.tsx) |
| Paso 5 | `CA-5.1` a `CA-5.4` | Cuatro tests con Arrange, Act, Assert, un caso normal, los edge cases de 0 % y 100 %, los datos fuera de rango y `ResumenDescuento` con `getByRole`. El caso normal y el del componente atrapan la versión A, que suma el descuento, y los casos de error atrapan la B, que no valida rangos. | [tests/paso05.test.tsx](tests/paso05.test.tsx) |

## Los 6 pasos

| Paso | Tiempo | Qué practicas | Archivo | Guía |
| --- | --- | --- | --- | --- |
| Paso 0 | 30 min | Instalar Node, levantar Vite y escribir tu primer componente con props, `useState` y `map` | [Saludo.tsx](src/paso00-hola/Saludo.tsx) | [steps/00-entorno-y-primer-componente](steps/00-entorno-y-primer-componente/README.md) |
| Paso 1 | 45 min | HTML semántico, roles y nombres accesibles, errores conectados al campo, Grid, Flexbox y `:focus-visible` | [TarjetaReserva.tsx](src/paso01-html-accesibilidad-y-css/TarjetaReserva.tsx) | [steps/01-html-accesibilidad-y-css](steps/01-html-accesibilidad-y-css/README.md) |
| Paso 2 | 30 min | Estado inmutable (`Object.is`) y `key` estable al filtrar listas | [ListaGastos.tsx](src/paso02-estado-inmutable/ListaGastos.tsx) | [steps/02-estado-inmutable](steps/02-estado-inmutable/README.md) |
| Paso 3 | 35 min | Validar el texto de un `<input>` con narrowing y luego con un esquema Zod | [precioSeguro.ts](src/paso03-tipos-y-formularios/precioSeguro.ts), [filtroPrecio.ts](src/paso03-tipos-y-formularios/filtroPrecio.ts) | [steps/03-tipos-y-formularios](steps/03-tipos-y-formularios/README.md) |
| Paso 4 | 45 min | `response.ok`, cancelar búsquedas con `AbortController` y la frontera entre cliente y servidor | [BuscadorRapido.tsx](src/paso04-fetch-y-frontera/BuscadorRapido.tsx) | [steps/04-fetch-y-frontera](steps/04-fetch-y-frontera/README.md) |
| Paso 5 | 40 min | Tests desde cero con Vitest que se ponen en rojo ante dos versiones con un bug, y un test de componente con `getByRole` | [tests/paso05.test.tsx](tests/paso05.test.tsx) | [steps/05-pruebas-desde-cero](steps/05-pruebas-desde-cero/README.md) |

## Verificación

1. `npm install` con Node 24.
2. `npm run check:paso0` hasta `npm run check:paso5`, o `npm run check` para todos.
3. `npm run build` para confirmar que el proyecto compila.
4. `npm run dev` para ver los seis pasos resueltos en el navegador.

## Repositorios relacionados

- Índice de on-ramps: [ykro/courses-onramp](https://github.com/ykro/courses-onramp)
- Repositorio con los ejercicios: [ykro/frontend-onramp](https://github.com/ykro/frontend-onramp)
- Curso principal: [ykro/frontend-course](https://github.com/ykro/frontend-course)
