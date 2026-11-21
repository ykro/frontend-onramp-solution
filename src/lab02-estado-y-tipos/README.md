# Lab 02: Estado inmutable, claves y tipos (~20 minutos)

## Qué problema resuelves

El componente [`ListaGastos.tsx`](ListaGastos.tsx) contiene tres errores muy frecuentes al empezar con React y TypeScript:

1. **Confiar en que un `<input>` entrega un número:** En el navegador, [`event.target.value`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#value) siempre es texto (`string`), aunque el campo tenga `type="number"`. Usar una [aserción de tipo (`as number`) en TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) le promete algo falso al verificador y deja pasar texto vacío, `NaN`, `0` o montos negativos.
2. **Mutar un arreglo en el estado con `.push()`:** React compara el valor anterior del estado con el nuevo usando [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is). Si llamas a `gastos.push(nuevo)` y luego a `setGastos(gastos)`, pasas la misma referencia de memoria y React decide que nada cambió, así que la pantalla no se actualiza.
3. **Usar `key={index}` al filtrar una lista:** Cada fila (`FilaGasto`) guarda su propia nota local. Cuando activas el filtro, los elementos visibles cambian de posición. Si usas el índice como [`key` en React](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key), React reutiliza la caja de nota de la posición `0` para un gasto distinto y las notas terminan en la fila equivocada.

## Paso a paso (por si dices "no entiendo por dónde empezar")

Abre [`ListaGastos.tsx`](ListaGastos.tsx) y sigue estos cuatro pasos en orden.

### Paso 1: Valida el monto sin usar `as number`

Ubica la función `leerPrecioSeguro(texto: string): number | null`. En lugar de forzar el tipo con `as number`, valida el valor real y deja que TypeScript haga [estrechamiento de tipos (*narrowing*)](https://www.typescriptlang.org/docs/handbook/2/narrowing.html):

1. Recorta los espacios con `const limpio = texto.trim();`.
2. Si `limpio === ""`, devuelve `null`.
3. Convierte el texto con `const numero = Number(limpio);`.
4. Verifica con [`Number.isFinite(numero)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite): si `!Number.isFinite(numero) || numero <= 0`, devuelve `null`.
5. Si pasó todas las validaciones, devuelve `numero`.

### Paso 2: Crea un arreglo nuevo al agregar gastos

Lee la guía oficial de [actualizar arreglos en estado en React](https://react.dev/learn/updating-arrays-in-state).

1. Busca los dos lugares donde aparece `gastos.push(nuevo); setGastos(gastos);` (dentro de `agregarCafeRapido` y dentro de `manejarAgregar`).
2. Reemplaza esas dos líneas por una actualización inmutable que cree un arreglo nuevo:

```ts
setGastos((prev) => [...prev, nuevo]);
```

Al pasar un arreglo nuevo, [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) detecta que la referencia cambió y React vuelve a dibujar la lista y el total.

### Paso 3: Usa una `key` estable basada en el `id`

1. Baja hasta el `<ul>` donde se dibujan los elementos filtrados (`visibles.map`).
2. Cambia `visibles.map((gasto, index) => (<FilaGasto key={index} gasto={gasto} />))` por:

```tsx
{visibles.map((gasto) => (
  <FilaGasto key={gasto.id} gasto={gasto} />
))}
```

Así React vincula el estado interno de cada fila (su nota) con el identificador único `gasto.id` y no con su posición temporal en la lista. Consulta [React: Keeping list items in order with `key`](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key).

### Paso 4: Verifica tu trabajo

1. Abre la pestaña de Lab 02 en el navegador (`npm run dev`), haz clic en "Agregar café rápido", escribe una nota en "Almuerzo" y activa el filtro "Solo mayores a Q50". Comprueba que la lista se actualiza y que la nota sigue en "Almuerzo".
2. Corre `npm run check` en la terminal y confirma que pasan las 3 pruebas de `Lab 02`.

## Documentación oficial de este laboratorio

- [React: Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [MDN: `Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
- [React: Keeping list items in order with `key`](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)
- [TypeScript: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript: Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)
- [MDN: `Number.isFinite()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite)

## Enlaces del kit

- Volver al README principal: [`../../README.md`](../../README.md)
- Índice de kits On-Ramp: [https://github.com/ykro/courses-onramp](https://github.com/ykro/courses-onramp)
- Curso principal: [https://github.com/ykro/frontend-course](https://github.com/ykro/frontend-course)
- Solución explicada paso a paso: [https://github.com/ykro/frontend-onramp-solution](https://github.com/ykro/frontend-onramp-solution)
