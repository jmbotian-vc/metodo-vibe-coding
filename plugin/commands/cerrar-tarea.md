---
description: Cierra la tarea en curso: merge con permiso, Excel al día (BACKLOG, CHECKLIST, CHANGELOG) y resumen
argument-hint: "TASK-ID (opcional)"
---

Cierra la tarea **$ARGUMENTS** (si está vacío, la que esté «En curso» en BACKLOG).

1. Comprueba el estado: auditoría de código en GO, tests pasando, PR abierto y, si hay CodeRabbit o comprobaciones automáticas en GitHub, en verde. Si algo falta, dilo y no cierres.
2. Pregunta al usuario si lo ha probado donde corresponde (Apps Script: URL /dev; servidor: entorno del PR) y pide permiso para el merge.
3. Con su permiso: merge del PR, sincroniza main local y borra la rama. En la ruta A, pregunta si quiere publicar ya en /exec (ver skill `ruta-apps-script`).
4. Delega en el subagente `excel`:
   - BACKLOG: Estado «Hecha», Check, enlace al PR en «Evidencia / commit», fecha de cierre.
   - CHECKLIST: cada comprobación de la tarea con su evidencia.
   - CHANGELOG: fila nueva (fecha, tipo, área, descripción, motivo, versión/commit, evidencia, impacto).
   - DECISIONES: las decisiones tomadas durante la tarea que no estuvieran anotadas.
5. Resume al usuario en 3-5 líneas qué se ha cerrado y cuál sería la siguiente tarea lógica.
