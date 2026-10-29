---
name: excel-prd
description: Excel de PRD y seguimiento del proyecto (sustituye a Notion y Linear), con la estructura de GF-CRM - INICIO, PRD, BACKLOG, ROADMAP, CHECKLIST, CHANGELOG, DECISIONES, RIESGOS, ROLES, DATOS, API, INCIDENTES. Úsalo para crear el Excel de un proyecto, escribir el PRD, convertirlo en tareas o consultar el estado.
---

# Excel de PRD y seguimiento

El usuario no usa Notion ni Linear: todo vive en **un Excel en la raíz del repositorio** (`<NOMBRE>_PRD.xlsx`). Es a la vez el PRD, el tablero de tareas y el registro de cambios. Claude Code lo lee y lo edita directamente (Python + openpyxl) y viaja con el código a GitHub. Referencia real: `GF-CRM_PRD_Notion.xlsx` del proyecto GF-CRM.

## Crear el Excel

```
python3 <carpeta de este skill>/scripts/crear_excel.py <NOMBRE>_PRD.xlsx "<Nombre del proyecto>" --ruta A|B
```

Si no hay Python u openpyxl, copia `assets/plantilla_PRD.xlsx` y cambia el título de INICIO.

## Cómo se enlaza todo

Requisito (REQ en PRD) → tareas (TASK en BACKLOG, con su REQ-ID y fase de ROADMAP) → comprobaciones (CHECK en CHECKLIST, con su TASK-ID) → cambio aplicado (CHANGE en CHANGELOG, con commit o PR). Las decisiones de producto van a DECISIONES con su razón.

## Flujos

- **Escribir el PRD**: sección a sección con el usuario (qué es y qué problema resuelve, para quién, qué hace, pantallas, datos, MVP). Cada requisito, una fila verificable con criterio de aceptación.
- **Del PRD a tareas**: crea las fases en ROADMAP y las tareas en BACKLOG (una fila por tarea pequeña y autónoma, con criterio de terminado, referencia a `design/` si hay diseño, y sus CHECK). Orden lógico: primero los cimientos; marca dependencias.
- **Ideas nuevas**: requisito con estado «Propuesta» y fecha; pasa las 4 preguntas (¿encaja con la visión?, ¿es nuevo o modifica algo?, ¿a qué datos y pantallas afecta?, ¿ahora o después?); si se aprueba, DECISIONES y BACKLOG.
- **Durante el MVP** el PRD se puede cambiar; al cerrarlo, los cambios entran como requisitos nuevos.

## Reglas de edición

Las del subagente `excel`: nunca borrar filas, pestañas ni cabeceras; IDs consecutivos con su formato; fechas AAAA-MM-DD; copia de seguridad en `tmp/` antes de guardar; avisar si el archivo está abierto y no se puede guardar.
