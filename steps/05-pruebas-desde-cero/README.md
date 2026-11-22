# Paso 5. Pruebas automatizadas desde cero

![Ciclo Arrange, Act y Assert en Vitest: rojo ante bug y verde ante código sano](diagrams/ciclo-testing.svg)

## Por qué importa

Probar una aplicación solo haciendo clic a mano se vuelve lento y frágil cuando el proyecto crece. Con [Vitest](https://vitest.dev/) verificas funciones puras en milisegundos y con [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) compruebas tus componentes desde la perspectiva del usuario.

Toda prueba clara sigue el patrón **Arrange -> Act -> Assert** (preparar entradas, ejecutar la acción y comprobar el resultado). Además, una prueba solo sirve si realmente falla cuando el código tiene un bug y pasa cuando el código está sano.

## Qué se construye

En este paso el código de negocio ya está escrito en `src/paso05-pruebas/calcularDescuento.ts`, que expone dos funciones:

- `calcularTotalConDescuento(precio, porcentaje)`: versión sana que resta el porcentaje al precio.
- `calcularTotalConDescuentoConBug(precio, porcentaje)`: versión con un error intencional que suma el descuento en lugar de restarlo.

Tu trabajo consiste en completar las tres pruebas en `tests/paso05.test.tsx`:

1. **Caso normal (`CA-5.1`)**: prepara un precio y porcentaje comunes (por ejemplo `200` y `15`), llama a `calcularTotalConDescuento(200, 15)` y afirma con `expect(total).toBe(170)`.
2. **Casos borde (`CA-5.2`)**: verifica que con `0 %` el total conserva el precio original (por ejemplo `calcularTotalConDescuento(120, 0)` devuelve `120`) y que con `100 %` el total es `0`.
3. **Prueba que atrapa el bug (`CA-5.3`)**: llama a `calcularTotalConDescuentoConBug(200, 15)` y demuestra que su resultado no coincide con el total sano (`expect(resultadoConBug).not.toBe(170)` y `expect(resultadoConBug).toBe(230)`).

## Criterios de aceptación

- `CA-5.1` [auto] La prueba de caso normal verifica que `calcularTotalConDescuento` aplica el porcentaje y devuelve el total esperado.
- `CA-5.2` [auto] La prueba de casos borde verifica tanto `0 %` (mismo precio) como `100 %` (total `0`).
- `CA-5.3` [auto] La prueba de detección de fallo comprueba que `calcularTotalConDescuentoConBug` produce un valor distinto del cálculo sano.

## Cómo verificar

Abre la pestaña **Paso 5** en `npm run dev` para comparar ambas funciones en vivo con distintos precios y porcentajes. Luego edita `tests/paso05.test.tsx` y ejecuta `npm run check:paso5` hasta ver las 3 pruebas en verde. Al terminar los cinco pasos, corre `npm run check && npm run build`. Consulta el [glosario](../../docs/glosario.md) o vuelve al [README principal](../../README.md).
