# Cómo leer un ADR (`ARCHITECTURE_DECISIONS.md`)

En el curso encontrarás un archivo `ARCHITECTURE_DECISIONS.md` que documenta decisiones técnicas importantes usando el formato **ADR** ([Architecture Decision Records](https://adr.github.io/)). Cada entrada responde en pocas líneas qué se decidió, por qué y qué costo se acepta.

## Ejemplo concreto

```markdown
## ADR-003: Guardar los montos en centavos, como enteros
- **Estado:** Aceptada
- **Contexto:** En JavaScript, `0.1 + 0.2` da `0.30000000000000004`. Al sumar muchos gastos, el total en pantalla terminaba con decimales que nadie escribió.
- **Decisión:** Guardar cada monto como un entero en centavos (`Q12.50` se guarda como `1250`) y dividir entre 100 solo al mostrarlo.
- **Consecuencias:** Las sumas son exactas. A cambio, cada pantalla que muestra un monto tiene que formatearlo, y un descuido muestra `1250` en lugar de `Q12.50`.
```

Cuando abras `ARCHITECTURE_DECISIONS.md`, lee primero el **Contexto** para entender el problema, luego la **Decisión** para seguir la convención del repositorio y al final las **Consecuencias** para saber qué compensación asumió el equipo.

Vuelve al [README principal](../README.md) o consulta el [glosario](glosario.md).
