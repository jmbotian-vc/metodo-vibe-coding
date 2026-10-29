---
description: Arranca un proyecto nuevo con el método (ruta A Apps Script + Sheets o ruta B servidor), su Excel de PRD y su estructura
argument-hint: "nombre y una frase de qué es"
---

Vas a montar un proyecto nuevo: **$ARGUMENTS**. Usa los skills `metodo-loop`, `excel-prd` y el de la ruta elegida.

1. **Preguntas** (una sola tanda, con opciones): qué problema resuelve y para quién; usuarios internos o clientes externos; cuántos usuarios y cuántos datos aproximados; dónde viven hoy los datos; si hará falta cobrar, app móvil o tiempo real. Con eso **recomienda una ruta** (A: Apps Script + Sheets + GitHub; B: Next.js + Convex + GitHub + Railway) con pros y contras para este caso, y deja decidir al usuario.
2. **Carpeta**: confirma que la carpeta abierta es la del proyecto nuevo (vacía o casi). Crea `design/`, `tmp/` y `docs/`, y un `.gitignore` con `tmp/`, ficheros de secretos (`.env`, `.env.*`, `*.local`, `*.secret`, `*.key`, `.clasprc.json`) y lo propio de la ruta.
3. **Excel de PRD y seguimiento**: crea `<NOMBRE>_PRD.xlsx` en la raíz con el skill `excel-prd`. Rellena INICIO y la primera versión del PRD a partir de las respuestas, y anota la ruta elegida en DECISIONES.
4. **Normas compartidas**: crea `AGENTS.md` con las normas del proyecto (ruta, estructura, reglas del Loop, seguridad, idioma) y un `CLAUDE.md` corto que diga «Lee y sigue AGENTS.md» más lo específico de Claude. Así Claude y el área de auditoría trabajan con las mismas reglas.
5. **Estructura de la ruta**: sigue el skill de la ruta (A: `apps-script/`, `tests/`, workflows de GitHub; B: esqueleto Next.js sin pantallas y conexión con Convex). No construyas pantallas ni funciones todavía.
6. **Git**: inicializa el repositorio en `main` con un primer commit. Para crear el repositorio en GitHub, pide al usuario que lo cree vacío y privado en github.com (o hazlo tú si tienes permiso) y conecta el remoto. Pide confirmación antes del primer push.
7. **Siguiente paso**: propón completar el PRD sección a sección y luego convertirlo en ROADMAP + BACKLOG (una fila por tarea, con criterio de terminado y CHECKLIST).
