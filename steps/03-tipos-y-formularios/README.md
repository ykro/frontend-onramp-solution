# Paso 3. Tipos y formularios en TypeScript

![Paso 3. Tipos y formularios en TypeScript](diagrams/narrowing-tipos.svg)

Este paso toma unos 15 minutos.

## Antes de empezar

1. Un `<input type="number">` muestra un teclado numérico en el celular. ¿Qué tipo de dato crees que llega a tu código cuando lees su valor?
2. En JavaScript, ¿cuánto valen `Number("")`, `Number("abc")` y `Number(" 12 ")`? Pruébalo en la consola del navegador.
3. Si escribes `const x = algo as number`, ¿TypeScript revisa algo cuando el programa corre?

## Por qué importa

Todo lo que escribe una persona en un `<input>` llega como texto, aunque el campo sea numérico ([`HTMLInputElement.value`](https://developer.mozilla.org/es/docs/Web/API/HTMLInputElement)). Una [aserción con `as number`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) solo calla al compilador; cuando el programa corre, el dato sigue siendo lo que era. TypeScript desaparece al compilar, así que la validación real tiene que ser código que se ejecuta. Si revisas el dato con un `if`, TypeScript entiende qué tipo queda después de esa revisión; eso se llama [narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html). En el curso, cada formulario que manda datos al API pasa por una función así.

## Qué vas a hacer

- **Leer.** Abre [precioSeguro.ts](../../src/paso03-tipos-y-formularios/precioSeguro.ts). En la pestaña **Paso 3** de `npm run dev`, intenta agregar un gasto con monto vacío, con `abc` y con `-15`. Anota qué se guarda en cada caso.
- **Debuguear.** Corre `npm run check:paso3`. Cada línea del test es un caso; fíjate cuál falla primero y qué devolvió la función.
- **Escribir.** Reemplaza el atajo por una validación que cumpla todos los casos del `TODO`, sin usar `as`.

## Criterios de aceptación

- `CA-3.1` `leerPrecioSeguro` devuelve el número para `"25.5"` y `" 120 "`, y `null` para texto vacío, solo espacios, `"abc"`, `"0"` y `"-15"`, sin usar `as number`.

## Al terminar

1. ¿Qué devuelve tu función con `"Infinity"` y con `"1e3"`? ¿Te parece correcto para un monto en quetzales?
2. Si el formulario aceptara montos con coma decimal (`"45,50"`), ¿qué devolvería tu función hoy y dónde harías el cambio?
3. ¿Por qué la función devuelve `number | null` en lugar de lanzar un error? Piensa en quién la llama y qué hace con el resultado.
4. Explica en tres líneas, con tus palabras, qué cambiaste y por qué. Si no puedes, vuelve a la pista 1 antes de seguir.

## Cómo verificar

```bash
npm run check:paso3
```

Si te trabas, abre la [pista 1](hints/1.md). Cada pista da un poco más que la anterior; la pista 3 trae un esqueleto, nunca la respuesta completa.

## Respuestas de autoevaluación

1. `"Infinity"` devuelve `null` porque `Number.isFinite` lo rechaza. `"1e3"` devuelve `1000`, que es un número válido en JavaScript; si no quieres aceptarlo, necesitas una expresión regular que permita solo dígitos y un punto.
2. Hoy devuelve `null`, porque `Number("45,50")` es `NaN`. El cambio va dentro de `leerPrecioSeguro`, reemplazando la coma por punto antes de convertir, para que todos los formularios lo hereden.
3. Un monto inválido es algo esperado en un formulario, no una falla del programa. Con `null`, quien llama decide qué mensaje mostrar con un `if`, sin `try` y `catch`, y TypeScript le obliga a revisar el caso.
4. Respuesta personal. Debe mencionar que el input siempre entrega texto, que `as` no valida nada y que los `if` con `return null` hacen la validación y el narrowing.
