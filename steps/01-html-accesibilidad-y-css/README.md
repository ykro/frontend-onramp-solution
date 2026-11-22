# Paso 1. HTML semántico, accesibilidad y CSS

![Paso 1. HTML semántico, accesibilidad y CSS](diagrams/accesibilidad.svg)

Este paso toma unos 45 minutos.

## Antes de empezar

1. Si navegas una página solo con la tecla `Tab`, ¿por qué un `<button>` recibe el foco y un `<div>` con `onClick` no?
2. Un lector de pantalla llega a un campo de texto. ¿De dónde saca el nombre que le lee a la persona?
3. Cuando un formulario rechaza un dato, ¿cómo se entera alguien que no ve el texto rojo en pantalla?

## Por qué importa

Un formulario armado con `<div>` y `<span>` se ve bien con mouse, pero no funciona con teclado, deja sin contexto a los lectores de pantalla y obliga a escribir tests frágiles. En el curso, los tests buscan cada control por su rol y su nombre con [`ByRole` de Testing Library](https://testing-library.com/docs/queries/byrole/), igual que una persona con tecnología asistiva. Si el HTML no tiene significado, el test no encuentra nada. Además, cada pantalla del curso usa [CSS Grid](https://developer.mozilla.org/es/docs/Web/CSS/CSS_grid_layout) y [Flexbox](https://developer.mozilla.org/es/docs/Web/CSS/CSS_flexible_box_layout) para acomodar el contenido.

## Lo mínimo que necesitas saber

- **HTML semántico.** Cada etiqueta dice qué es su contenido. `<section>` agrupa un tema, `<h2>` es un título, `<form>` agrupa campos que se envían juntos, `<label>` nombra un campo y `<button>` es algo que se presiona. El navegador les da teclado, foco y un rol accesible sin que escribas nada extra. Un `<div>` no significa nada. Ver [HTML semántico en MDN](https://developer.mozilla.org/es/docs/Glossary/Semantics#semántica_en_html).
- **Rol y nombre accesible.** Cada control tiene un rol (`button`, `combobox`, `spinbutton`, `region`) y un nombre, que casi siempre sale del texto del botón o del `<label>` conectado al campo.
- **ARIA.** Son atributos que agregan información cuando el HTML no alcanza. Aquí usas tres. `aria-invalid` marca un campo con error, `aria-describedby` apunta al `id` del texto que explica el error y `role="alert"` o `role="status"` hacen que el lector de pantalla anuncie un mensaje que aparece de repente. La primera regla de ARIA es usar HTML nativo siempre que exista.
- **CSS básico.** Un selector elige elementos (`.reserva-grid` elige los que tienen esa clase) y las declaraciones dentro de llaves cambian cómo se ven. Una pseudoclase como `:hover` o `:focus-visible` aplica estilos solo en cierto estado.
- **Grid y Flexbox.** Grid acomoda en filas y columnas a la vez, útil para un formulario de dos columnas. Flexbox acomoda en una sola dirección, útil para una fila con un botón y un mensaje.
- **Media query.** `@media (max-width: 600px) { ... }` aplica las reglas de adentro solo cuando la ventana mide 600 px o menos. Así el mismo formulario pasa de dos columnas a una en un celular. El test no revisa este punto; compruébalo achicando la ventana.

## Qué vas a hacer

- **Leer.** Abre la pestaña **Paso 1** con `npm run dev` e intenta reservar usando solo `Tab`, flechas y `Enter`. Anota en qué punto ya no puedes avanzar. Luego abre [TarjetaReserva.tsx](../../src/paso01-html-accesibilidad-y-css/TarjetaReserva.tsx) y [tarjeta-reserva.css](../../src/paso01-html-accesibilidad-y-css/tarjeta-reserva.css).
- **Debuguear.** Corre `npm run check:paso1` y lee el primer error. Testing Library imprime los roles que sí encontró; compáralos con los que busca el test. Después lee los `TODO` de los dos archivos.
- **Escribir.** Cambia los `<div>` y `<span>` por las etiquetas que correspondan, agrega la validación accesible de la cantidad y completa el CSS. Comprueba otra vez con teclado y achica la ventana para ver el cambio de dos columnas a una.

## Criterios de aceptación

- `CA-1.1` La tarjeta expone una región llamada **Reservar sala de estudio**, un campo numérico **Cantidad de personas**, un selector **Horario** y un botón **Confirmar reserva**. Al confirmar, un mensaje con rol `status` menciona la cantidad y el horario.
- `CA-1.2` Con una cantidad fuera de 1 a 12, el campo queda marcado como inválido y conectado a un mensaje con rol `alert` que dice `entre 1 y 12`.
- `CA-1.3` `tarjeta-reserva.css` usa Grid con columnas definidas, Flexbox y un estilo en `:focus-visible`.

## Al terminar

1. Abre las herramientas del navegador, pestaña **Accessibility** (en Chrome está dentro de **Elements**), y selecciona el botón. ¿Qué rol y qué nombre reporta? ¿Qué reportaba antes con el `<div>`?
2. Si borras el `htmlFor` del `<label>` de cantidad, ¿qué pasa con `CA-1.1` y por qué?
3. ¿Por qué el error usa `role="alert"` y la confirmación `role="status"`? Piensa en qué pasa si alguien está escribiendo cuando aparece cada mensaje.
4. Explica en tres líneas, con tus palabras, qué cambiaste y por qué. Si no puedes, vuelve a la pista 1 antes de seguir.

## Cómo verificar

```bash
npm run check:paso1
```

Si te trabas, abre la [pista 1](hints/1.md). Cada pista da un poco más que la anterior; la pista 3 trae un esqueleto, nunca la respuesta completa.

## Respuestas de autoevaluación

1. Con `<button>` reporta rol `button` y nombre **Confirmar reserva**. Con el `<div>` reportaba un elemento genérico sin rol útil, por eso el teclado y el lector de pantalla lo ignoraban.
2. `CA-1.1` falla porque el campo se queda sin nombre accesible y `getByRole("spinbutton", { name: /cantidad de personas/i })` ya no lo encuentra. El texto sigue en pantalla, pero no está conectado al campo.
3. `alert` interrumpe y se anuncia de inmediato, porque un error requiere atención. `status` espera a que el lector termine lo que estaba leyendo, porque una confirmación es informativa. Usar `alert` para todo vuelve la página ruidosa.
4. Respuesta personal. Debe mencionar que las etiquetas semánticas dan rol, nombre y teclado gratis, que ARIA conecta el error con el campo y que Grid y Flexbox acomodan la tarjeta.
