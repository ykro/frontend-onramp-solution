# Cómo leer un ADR (`ARCHITECTURE_DECISIONS.md`)

En el curso encontrarás un archivo `ARCHITECTURE_DECISIONS.md` que documenta decisiones técnicas importantes usando el formato **ADR** ([Architecture Decision Records](https://adr.github.io/)). Cada entrada responde en pocas líneas qué se decidió, por qué y qué costo se acepta.

## Ejemplo concreto

```markdown
## ADR-003: Validar precios en la entrada con narrowing en lugar de `as number`
- **Estado:** Aceptada
- **Contexto:** Los `<input>` del navegador entregan siempre texto (`string`). Usar `as number` oculta `NaN`, vacíos y valores negativos.
- **Decisión:** Convertir cada campo con `trim()`, `Number()` y `Number.isFinite()`, devolviendo `number | null`.
- **Consecuencias:** Escribimos 6 líneas más de validación, pero evitamos totales rotos en la interfaz y en las pruebas.
```

Cuando abras `ARCHITECTURE_DECISIONS.md`, lee primero el **Contexto** para entender el problema, luego la **Decisión** para seguir la convención del repositorio y al final las **Consecuencias** para saber qué compensación asumió el equipo.

Vuelve al [README principal](../README.md) o consulta el [glosario](glosario.md).
