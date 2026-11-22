# Paso 3. Tipos y formularios en TypeScript

![Validación de texto de input con narrowing en TypeScript](diagrams/narrowing-tipos.svg)

## Por qué importa

En el navegador, [`event.target.value`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#value) entrega siempre un texto (`string`), incluso si el campo usa `type="number"`. Forzar el resultado con una [aserción de tipo (`as number`)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) silencia la revisión sin validar el dato real y deja pasar cadenas vacías, `NaN`, `0` o números negativos. Validar en tiempo de ejecución con [narrowing en TypeScript](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) y [`Number.isFinite()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) detiene esos errores en la entrada.

## Qué se construye

Trabajarás en `src/paso03-tipos-y-formularios/precioSeguro.ts`:

1. Ubica la función `leerPrecioSeguro(texto: string): number | null` y elimina el atajo `Number(texto) as number`.
2. Recorta espacios con `const limpio = texto.trim();` y devuelve `null` si `limpio === ""`.
3. Convierte el texto con `const numero = Number(limpio);`.
4. Verifica `!Number.isFinite(numero) || numero <= 0`: si se cumple, devuelve `null`.
5. Si pasa todas las comprobaciones, devuelve `numero`.

## Criterios de aceptación

- `CA-3.1` [auto] `leerPrecioSeguro` devuelve el número para entradas válidas (`"25.5"`, `" 120 "`) y `null` para cadena vacía, espacios, texto no numérico (`"abc"`), `"0"` y negativos (`"-15"`), sin usar `as number`.

## Cómo verificar

Ejecuta `npm run check:paso3` para validar los tipos y `CA-3.1` de forma independiente. También puedes probar el formulario en la pestaña **Paso 3** de `npm run dev` intentando guardar un monto vacío o negativo. Consulta el [glosario](../../docs/glosario.md) o vuelve al [README principal](../../README.md).
