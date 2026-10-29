---
description: Ejecuta una tarea completa del BACKLOG con el método Loop (plan, auditoría, código, auditoría, rama y PR)
argument-hint: "nombre o TASK-ID de la tarea"
---

Ejecuta la tarea **$ARGUMENTS** siguiendo el ciclo completo del skill `metodo-loop` (cárgalo si no lo tienes ya).

- Si `$ARGUMENTS` está vacío, lee la pestaña BACKLOG y propón al usuario la siguiente tarea lógica (por prioridad, fase y dependencias), con una línea de por qué.
- Antes de planificar, comprueba que el contexto de la conversación no esté por encima de la mitad; si lo está, propón primero `/texto-regreso` y `/compact`.
- Para en los dos puntos de aprobación del usuario: el plan auditado (antes de programar) y la subida/publicación (antes de push, merge o deploy).
