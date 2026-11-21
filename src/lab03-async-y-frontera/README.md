# Lab 03: Asincronía y frontera cliente/servidor (~20 minutos)

## Qué problema resuelves

Cuando una aplicación de React o Next.js pide datos a un servidor, aparecen tres errores clásicos que debes dominar desde el primer día:

1. **`fetch` no lanza error en HTTP 404 o 500:** La promesa de `fetch` solo falla cuando se corta la red o el servidor no responde. Si el servidor contesta con código `404` o `500`, `fetch` se resuelve con normalidad y la propiedad [`response.ok` de Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok) vale `false`. Si no la revisas, intentas leer un error como si fuera un libro válido.
2. **Respuestas fuera de orden:** Imagina que escribes `"a"` (una petición lenta que tarda 120 ms) y en seguida escribes `"ab"` (una petición rápida que tarda 15 ms). El resultado nuevo llega primero, pero 105 ms después llega la respuesta vieja y pisa la pantalla. Para evitarlo, debes cancelar la búsqueda anterior con [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) cuando cambia el término.
3. **Secretos en componentes de cliente:** En el modelo de [Server and Client Components de Next.js](https://nextjs.org/docs/app/getting-started/server-and-client-components), todo componente interactivo que usa `useState` o `useEffect` lleva la directiva `"use client";` en su primera línea y su código viaja al navegador. Nunca debe importar módulos del servidor como [`secreto.server.ts`](secreto.server.ts); solo debe importar tipos y constantes públicas desde [`contrato.ts`](contrato.ts).

## Paso a paso (por si dices "no entiendo por dónde empezar")

Trabajarás en dos archivos: [`buscarCatalogo.ts`](buscarCatalogo.ts) y [`BuscadorRapido.tsx`](BuscadorRapido.tsx).

### Paso 1: Revisa `response.ok` en `buscarCatalogo.ts`

Abre [`buscarCatalogo.ts`](buscarCatalogo.ts) y busca la función `obtenerLibro`.

1. Justo después de `const response = await fetcher(...)`, revisa [`response.ok`](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok).
2. Si `!response.ok`, lanza un `Error` que incluya `response.status`:

```ts
if (!response.ok) {
  throw new Error(`No se pudo cargar el libro (HTTP ${response.status}).`);
}
```

3. Solo después de esa verificación lee `(await response.json()) as LibroCatalogo`.

### Paso 2: Separa la frontera cliente/servidor en `BuscadorRapido.tsx`

Abre [`BuscadorRapido.tsx`](BuscadorRapido.tsx).

1. Escribe `"use client";` en la **primera línea** del archivo (consulta [Next.js: Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)).
2. Cambia la importación de `LIMITE_RESULTADOS` para que venga desde `./contrato` y elimina por completo cualquier referencia a `./secreto.server`.

### Paso 3: Cancela búsquedas viejas con `AbortController`

Sigue en [`BuscadorRapido.tsx`](BuscadorRapido.tsx), dentro de `useEffect` (consulta [React: Fetching data en `useEffect`](https://react.dev/learn/synchronizing-with-effects#fetching-data)):

1. Ya existe `const controller = new AbortController();` y se pasa `controller.signal` ([`AbortSignal` en MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)) a `buscar(limpio, controller.signal)`.
2. En el `.then((lista) => ...)`, actualiza el estado solo si `!controller.signal.aborted`.
3. En el `.catch((error: unknown) => ...)`, sal sin tocar el estado si `controller.signal.aborted` es `true` o si `error instanceof DOMException && error.name === "AbortError"`.
4. Al final del `useEffect`, devuelve la función de limpieza para cancelar la petición anterior cada vez que el usuario cambia el texto o el componente se desmonta:

```ts
return () => {
  controller.abort();
};
```

### Paso 4: Verifica tu trabajo

1. Prueba la pestaña de Lab 03 en el navegador (`npm run dev`): escribe rápido en el buscador y revisa que siempre quede el resultado más reciente.
2. Corre `npm run check` en la terminal y confirma que pasan las 3 pruebas de `Lab 03` (9 de 9 en total).

## Documentación oficial de este laboratorio

- [MDN: `Response.ok` (Fetch API)](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)
- [MDN: `AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) y [MDN: `AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
- [React: Fetching data y limpieza en `useEffect`](https://react.dev/learn/synchronizing-with-effects#fetching-data)
- [Next.js: Server and Client Components (`"use client"`)](https://nextjs.org/docs/app/getting-started/server-and-client-components)

## Enlaces del kit

- Volver al README principal: [`../../README.md`](../../README.md)
- Índice de kits On-Ramp: [https://github.com/ykro/courses-onramp](https://github.com/ykro/courses-onramp)
- Curso principal: [https://github.com/ykro/frontend-course](https://github.com/ykro/frontend-course)
- Solución explicada paso a paso: [https://github.com/ykro/frontend-onramp-solution](https://github.com/ykro/frontend-onramp-solution)
