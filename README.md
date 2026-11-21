# Solución de On-Ramp Frontend

Este repositorio contiene la solución completa y verificada (9 de 9 pruebas en verde y build de producción sin errores) del kit práctico [frontend-onramp](https://github.com/ykro/frontend-onramp), que te prepara antes del curso [frontend-course](https://github.com/ykro/frontend-course). Forma parte del índice [courses-onramp](https://github.com/ykro/courses-onramp).

Si todavía estás intentando resolver los ejercicios por tu cuenta, empieza en [frontend-onramp](https://github.com/ykro/frontend-onramp) y usa este repositorio para comparar tu código y entender el porqué de cada cambio.

## Cómo ejecutar y verificar esta solución

1. Instala las dependencias (requiere Node.js 24, definido en `.nvmrc`):

```bash
npm install
```

2. Corre la verificación completa de tipos y pruebas (deben pasar 9 de 9):

```bash
npm run check
```

3. Genera el paquete de producción para confirmar que se construye sin errores:

```bash
npm run build
```

4. Si quieres ver los tres laboratorios resueltos en el navegador:

```bash
npm run dev
```

---

## Explicación paso a paso de lo que se hizo en cada laboratorio

### Lab 01: HTML semántico y accesibilidad

**Qué estaba roto en el repositorio inicial:**

- La tarjeta en `TarjetaReserva.tsx` usaba solo `<div>` y `<span>`, con un `div` que fingía ser botón (`reserva-boton-falso`). Quien navegaba con teclado no podía enfocar ni enviar el formulario, y un lector de pantalla no sabía qué etiqueta correspondía a cada campo.
- El campo de cantidad usaba `type="text"` y no validaba rangos: aceptaba `0`, valores vacíos o mayores a `12`.
- En `tarjeta-reserva.css`, los campos quedaban apilados sin diseño de 2 columnas, la barra de acciones no usaba Flexbox y no existía ningún borde visible al navegar con `Tab`.
- Por todo esto, las 3 pruebas de `Lab 01` fallaban al buscar los controles con [`ByRole` de Testing Library](https://testing-library.com/docs/queries/byrole/).

**Cambios exactos aplicados:**

1. En [`src/lab01-html-y-accesibilidad/TarjetaReserva.tsx`](src/lab01-html-y-accesibilidad/TarjetaReserva.tsx):
   - Se reemplazó el `<div className="reserva-card">` por [`<section className="reserva-card" aria-labelledby="titulo-reserva">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section) y el título por `<h2 id="titulo-reserva">Reservar sala de estudio</h2>`.
   - Se envolvió el contenido en `<form onSubmit={manejarEnvio} noValidate>`.
   - Se conectó [`<label htmlFor="cantidad-personas">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) con [`<input id="cantidad-personas" type="number" min={1} max={12} ... />`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number), y `<label htmlFor="horario-sala">` con [`<select id="horario-sala">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) para las opciones `09:00`, `11:00` y `15:00`.
   - Se reemplazó el `<div>` clickeable por [`<button type="submit" className="reserva-boton">Confirmar reserva</button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button).
   - En `manejarEnvio`, se validó con `Number(cantidadTexto.trim())` y `Number.isInteger(valor)` que el número esté entre `1` y `12`. Cuando falla, se guarda el mensaje `"Ingresa un número entre 1 y 12."`, se marca [`aria-invalid={error !== null}`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid) y [`aria-describedby="error-cantidad"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) en el `<input>`, y se muestra `<p id="error-cantidad" role="alert">`. Cuando es válido, se limpia el error y se muestra la confirmación en `<p role="status">`.
2. En [`src/lab01-html-y-accesibilidad/tarjeta-reserva.css`](src/lab01-html-y-accesibilidad/tarjeta-reserva.css):
   - Se agregó [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) de 2 columnas en `.reserva-grid` (`display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));`) con ajuste a 1 columna en pantallas menores a `600px`.
   - Se agregó [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout) en `.reserva-acciones` (`display: flex; align-items: center; justify-content: space-between;`).
   - Se agregó un anillo de foco visible con [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) sobre `input`, `select` y `.reserva-boton`.

**Por qué resuelve el fallo:**

El navegador expone automáticamente los roles accesibles (`region`, `spinbutton`, `combobox`, `button`, `alert` y `status`), permite completar toda la reserva con teclado (`Tab`, flechas y `Enter`) y vincula cada mensaje de error con el campo que falló.

---

### Lab 02: Estado inmutable, claves y tipos

**Qué estaba roto en el repositorio inicial:**

- `leerPrecioSeguro` convertía el texto con `Number(texto) as number`. Esa [aserción de tipo (`as`)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) dejaba pasar `""`, `"   "`, `"abc"`, `"0"` y números negativos sin devolver `null`.
- Tanto `agregarCafeRapido` como `manejarAgregar` hacían `gastos.push(nuevo); setGastos(gastos);`. Al mutar el mismo arreglo en memoria, la referencia no cambiaba y React —que compara con [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)— no volvía a dibujar la lista.
- La lista usaba `key={index}` al recorrer `visibles`. Al activar el filtro "Solo mayores a Q50", "Almuerzo" pasaba de la posición `1` a la posición `0` y React conservaba en esa posición el campo de nota vacío que antes pertenecía a "Transporte".

**Cambios exactos aplicados:**

1. En [`src/lab02-estado-y-tipos/ListaGastos.tsx`](src/lab02-estado-y-tipos/ListaGastos.tsx):
   - En `leerPrecioSeguro(texto: string): number | null`, se eliminó `as number`. Ahora la función recorta espacios con `texto.trim()`, devuelve `null` si queda vacío, convierte con `Number(limpio)` y devuelve `null` si `!Number.isFinite(numero) || numero <= 0`; solo si pasa todas las pruebas devuelve `numero` (aprovechando el [estrechamiento de tipos de TypeScript](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)).
   - En `agregarCafeRapido` y `manejarAgregar`, se reemplazó `gastos.push(nuevo); setGastos(gastos);` por `setGastos((prev) => [...prev, nuevo]);`, siguiendo la guía de [actualizar arreglos en estado en React](https://react.dev/learn/updating-arrays-in-state).
   - En el `<ul>`, se cambió `<FilaGasto key={index} gasto={gasto} />` por `<FilaGasto key={gasto.id} gasto={gasto} />` para usar una [`key` estable](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key).

**Por qué resuelve el fallo:**

Validar en tiempo de ejecución evita que entren `NaN` o montos inválidos. Crear un arreglo nuevo hace que `Object.is` detecte el cambio y actualice la pantalla de inmediato. Usar `gasto.id` como `key` garantiza que cada fila mantenga su nota aunque cambie su posición al filtrar.

---

### Lab 03: Asincronía y frontera cliente/servidor

**Qué estaba roto en el repositorio inicial:**

- `obtenerLibro` llamaba a `response.json()` sin revisar [`response.ok`](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok). Cuando el servidor respondía HTTP `404`, `fetch` no rechazaba la promesa y la función devolvía el cuerpo de error como si fuera un libro válido.
- `BuscadorRapido` creaba un `AbortController` pero nunca lo abortaba en la limpieza del `useEffect` ni comprobaba `controller.signal.aborted`. Una búsqueda vieja de 120 ms llegaba después de una búsqueda nueva de 15 ms y pisaba la pantalla con resultados viejos.
- `BuscadorRapido.tsx` no tenía `"use client";` en su primera línea e importaba `LIMITE_RESULTADOS` desde `./secreto.server`, arrastrando un módulo de servidor con credenciales hacia el código del navegador.

**Cambios exactos aplicados:**

1. En [`src/lab03-async-y-frontera/buscarCatalogo.ts`](src/lab03-async-y-frontera/buscarCatalogo.ts):
   - Se agregó la verificación `if (!response.ok)` antes de `response.json()` para lanzar `new Error(\`No se pudo cargar el libro (HTTP ${response.status}).\`)`.
2. En [`src/lab03-async-y-frontera/BuscadorRapido.tsx`](src/lab03-async-y-frontera/BuscadorRapido.tsx):
   - Se colocó `"use client";` en la primera línea del archivo según el modelo de [Server and Client Components de Next.js](https://nextjs.org/docs/app/getting-started/server-and-client-components).
   - Se cambió la importación de `LIMITE_RESULTADOS` de `./secreto.server` a `./contrato`, eliminando cualquier dependencia con el módulo de servidor.
   - En `useEffect`, se protegió `.then` con `if (!controller.signal.aborted)`, se ignoró el rechazo por cancelación en `.catch` (`controller.signal.aborted` o `DOMException` con nombre `"AbortError"`) y se agregó la limpieza `return () => { controller.abort(); };` con [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).

**Por qué resuelve el fallo:**

Revisar `response.ok` convierte los errores HTTP 4xx/5xx en excepciones manejables. Abortar el intento anterior al cambiar el término impide que respuestas lentas sobrescriban resultados nuevos. Marcar el componente con `"use client";` e importar solo desde `contrato.ts` mantiene los secretos fuera del navegador.

---

## Enlaces relacionados

- Repositorio inicial para resolver los laboratorios: [https://github.com/ykro/frontend-onramp](https://github.com/ykro/frontend-onramp)
- Índice de kits de nivelación: [https://github.com/ykro/courses-onramp](https://github.com/ykro/courses-onramp)
- Curso principal de Frontend: [https://github.com/ykro/frontend-course](https://github.com/ykro/frontend-course)
