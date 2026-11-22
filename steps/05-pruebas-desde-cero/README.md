# Paso 5. Tests desde cero con Vitest

![Paso 5. Tests desde cero con Vitest](diagrams/ciclo-testing.svg)

Este paso toma unos 25 minutos.

## Antes de empezar

1. Si un test pasa, ¿qué te garantiza sobre el código? ¿Y si nunca ha fallado?
2. Para una función de descuento, ¿qué valores de porcentaje probarías primero y por qué esos?
3. ¿Cómo comprobarías que tus tests detectan un error sin romper a propósito el código real?

## Por qué importa

Probar a mano haciendo clic se vuelve lento cuando el proyecto crece, y en el curso cada entrega corre tests automáticos en CI. [Vitest](https://vitest.dev/guide/) ejecuta funciones y verifica resultados en milisegundos, y [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) hace lo mismo con componentes. Un test útil sigue el patrón Arrange, Act, Assert (preparar, ejecutar, comprobar) y, sobre todo, se pone en rojo cuando el código tiene un bug. Un test que pasa siempre no protege nada. Por eso aquí tus tests se corren también contra dos versiones con un bug de la misma función.

## Qué vas a hacer

- **Leer.** Abre [calcularDescuento.ts](../../src/paso05-pruebas/calcularDescuento.ts) y escribe en papel qué debería devolver con tres o cuatro entradas distintas, incluyendo entradas inválidas. En la pestaña **Paso 5** puedes comparar la función correcta con una de las versiones con un bug.
- **Debuguear.** Corre `npm run check:paso5` con el archivo como viene. Lee por qué falla aunque Vitest no muestre ningún test en rojo.
- **Escribir.** Cambia cada `it.todo` de [tests/paso05.test.tsx](../../tests/paso05.test.tsx) por un test real que llame a `calcularTotalConDescuento`. No importes [versionesConBug.ts](../../src/paso05-pruebas/versionesConBug.ts) en tus tests; el verificador se encarga de cambiar la función por cada versión con un bug.

## Criterios de aceptación

- `CA-5.1` `tests/paso05.test.tsx` tiene al menos tres tests y todos pasan contra la función correcta.
- `CA-5.2` Al menos un test falla cuando la función suma el descuento en lugar de restarlo.
- `CA-5.3` Al menos un test falla cuando la función acepta precios negativos o porcentajes fuera de 0 a 100.

## Al terminar

1. Escribe un test que pase con la función correcta y también con las dos versiones con un bug. ¿Qué tiene de débil?
2. Imagina una tercera versión con un bug que redondea hacia abajo en lugar de redondear al centavo más cercano. ¿Qué entrada usarías para atraparla?
3. ¿Por qué el verificador exige que tus tests pasen primero contra la función correcta antes de mirar las versiones con un bug?
4. Explica en tres líneas, con tus palabras, qué cambiaste y por qué. Si no puedes, vuelve a la pista 1 antes de seguir.

## Cómo verificar

```bash
npm run check:paso5
```

Si te trabas, abre la [pista 1](hints/1.md). Cada pista da un poco más que la anterior; la pista 3 trae un esqueleto, nunca la respuesta completa.

## Respuestas de autoevaluación

1. Por ejemplo, `expect(calcularTotalConDescuento(120, 0)).toBe(120)`. Con 0 % sumar o restar cero da lo mismo, y el dato es válido, así que ninguna versión con un bug se distingue. Pasa siempre y no detecta nada.
2. Una entrada cuyo total tenga un tercer decimal de 5 o más. Por ejemplo, precio `1.25` con `10` % da `1.125`; la función correcta devuelve `1.13` y redondeando hacia abajo saldría `1.12`. Ojo con valores como `0.495`, que en binario quedan un poco por debajo y JavaScript los redondea a `0.49`.
3. Si un test falla incluso con la función correcta, está mal escrito, y también fallaría con las versiones con un bug. Ese rojo no diría nada. Solo un test que pasa con el código correcto y falla con el roto demuestra que detecta el bug.
4. Respuesta personal. Debe mencionar Arrange, Act, Assert, los casos normal, borde y de error, y que un test útil se pone en rojo cuando la función tiene un bug.
