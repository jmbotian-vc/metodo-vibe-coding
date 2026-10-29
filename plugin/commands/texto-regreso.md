---
description: Prepara el texto de regreso (hand-off) antes de hacer /compact
argument-hint: "lo siguiente que vamos a hacer (opcional)"
---

Prepara el **texto de regreso** para retomar el trabajo después de un `/compact`. Lo siguiente que vamos a hacer: **$ARGUMENTS** (si está vacío, dedúcelo de la tarea en curso).

Incluye, en menos de 40 líneas:
- Proyecto, ruta (A Apps Script / B servidor) y carpeta.
- Tarea en curso (TASK-ID, rama, estado del Loop: plan vN, auditoría, código, PR…).
- Decisiones tomadas y normas acordadas en esta sesión que no estén en CLAUDE.md.
- Archivos clave tocados y qué queda pendiente.
- Lo siguiente que hay que hacer, en un paso concreto.

Guárdalo también en `tmp/texto-regreso.md` y dile al usuario: «Ahora escribe /compact y, cuando termine, pega este texto o di "lee tmp/texto-regreso.md"».
