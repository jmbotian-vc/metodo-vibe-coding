---
description: Pasa el plan o el código al área de auditoría (Codex, solo lectura) y devuelve GO / GO CONDICIONADO / NO-GO
argument-hint: "plan | codigo | seguridad"
---

# Auditar: $ARGUMENTS

Vas a pedir una auditoría al **área de auditoría** (Codex en modo solo lectura). Tipo pedido: `$ARGUMENTS` (si está vacío: `plan` si aún no hay código de esta tarea; `codigo` si ya lo hay).

## 1. Preparar el material

Crea la carpeta `tmp/auditoria/` si no existe y comprueba que `tmp/` está en `.gitignore` (añádelo si falta).

Escribe `tmp/auditoria/entrada.md` con este contenido, en este orden:

1. El **prompt de rol** (abajo, literal).
2. `## Encargo`: tipo de auditoría y alcance exacto (tarea, TASK-ID, REQ-ID, criterios de aceptación).
3. Según el tipo:
   - `plan`: el plan completo actual (`tmp/auditoria/plan-vN.md`) y, si existen, los hallazgos anteriores y cómo se han resuelto.
   - `codigo`: el plan aprobado, la lista de archivos cambiados y el diff de la rama contra main (`git diff main...HEAD`; si es muy largo, la lista de archivos y que el auditor los lea él mismo en la carpeta).
   - `seguridad`: el alcance (por ejemplo «login y roles» o «toda la app») y la lista de comprobación del skill `auditoria-seguridad`.
4. `## Formato de respuesta`: pide que la **primera línea** sea exactamente `VEREDICTO: GO`, `VEREDICTO: GO CONDICIONADO` o `VEREDICTO: NO-GO`, y después: Bloqueantes, Mayores, Sugerencias no bloqueantes, Hallazgos anteriores resueltos, Aspectos no verificables, Alcance de la siguiente revisión.

Nunca menciones a Claude ni a ninguna otra IA en el material: habla del «área de desarrollo».

### Prompt de rol (literal)

> Tu rol es ser auditor y analista técnico del área de auditoría. Jamás harás código, ni modificarás archivos, ni subirás nada a GitHub, ni desplegarás. Revisas planes y código del área de desarrollo para emitir un veredicto ejecutable: GO, GO CONDICIONADO o NO-GO, en base a bloqueantes y mayores; el resto serán sugerencias en diversos niveles. Objetivo: determinar si el cambio puede implementarse con seguridad razonable dentro del alcance de la tarea, sin exigir perfección ni convertir una corrección puntual en un rediseño. Bloqueante: evidencia clara, secuencia de fallo concreta e impacto crítico (la aplicación falla, se pierden o exponen datos, agujero de seguridad). Mayor: regresión probable o incumplimiento de un criterio de aceptación. GO solo si no quedan bloqueantes ni mayores; GO CONDICIONADO equivale a GO con sugerencias menores para aplicar. El código lo revisas a nivel code-review profesional: corrección, seguridad (OWASP, secretos, autorización, inyección), concurrencia, manejo de errores, contratos e invariantes, regresiones, rendimiento en puntos críticos y mantenibilidad. Sé concreto: archivo:línea, por qué es un problema y su impacto. Consolida todo en una sola ronda en lugar de ir sacando problemas poco a poco. Si algo no lo puedes verificar, dilo explícitamente en vez de asumir. Verifica contra el código real de esta carpeta y, si hace falta, contra la documentación actual de las plataformas.

## 2. Llamar al área de auditoría

Ejecuta desde la raíz del proyecto, con un tiempo máximo amplio (hasta 10 minutos; si tu herramienta lo permite, en segundo plano y esperando el resultado):

```
codex exec --sandbox read-only --skip-git-repo-check --output-last-message tmp/auditoria/veredicto.md - < tmp/auditoria/entrada.md
```

- Si algún parámetro no existe en la versión instalada, consulta `codex exec --help` y adapta el comando manteniendo **siempre** el modo de solo lectura.
- Si `codex` no está instalado o no ha iniciado sesión, no improvises: explica al usuario cómo resolverlo (ver `/comprobar-entorno`) y ofrece la alternativa: el subagente `auditor-respaldo` (avisando de que es menos independiente) o que pegue `tmp/auditoria/entrada.md` en el panel de Codex de VS Code y te devuelva la respuesta.

Guarda una copia numerada: `tmp/auditoria/veredicto-<tipo>-vN.md`.

## 3. Interpretar y actuar

- Lee la primera línea del veredicto.
- **NO-GO**: comprueba cada bloqueante y mayor contra el código. Si tiene razón, corrige (plan o código). Si no la tiene, prepara una réplica razonada. Vuelve a auditar con la versión nueva, incluyendo los hallazgos anteriores y su resolución. Respeta los límites del skill `metodo-loop` (dos NO-GO seguidos con alcance creciente → proponer dividir; máximo 6 vueltas).
- **GO / GO CONDICIONADO**: incorpora las sugerencias razonables y sigue con el Loop.
- Resume al usuario en pocas líneas: veredicto, qué se ha corregido en cada vuelta y qué queda como sugerencia. No le pegues el informe entero salvo que lo pida (está en `tmp/auditoria/`).
