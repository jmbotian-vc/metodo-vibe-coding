---
description: Comprueba que todo lo necesario para el método está listo (Codex, Git, GitHub, hooks, Excel, carpetas) y explica cómo arreglar lo que falte
---

Comprueba el entorno y presenta el resultado como una lista con ✅ / ⚠️ / ❌ y, para cada problema, **qué tiene que hacer el usuario** (en lenguaje sencillo; el usuario trabaja en Claude Desktop o VS Code y no usa la terminal). No cambies nada sin preguntar.

1. **Codex (área de auditoría)**
   - `codex --version`. Si no existe: puede que solo esté la extensión de VS Code. Ofrece instalar la versión de línea de comandos (`npm install -g @openai/codex`, requiere Node) y explica que se usa la misma cuenta de ChatGPT.
   - `codex login status` (o el equivalente que muestre `codex --help`). Si no hay sesión: el usuario debe iniciar sesión una vez (`codex login`); ofrece abrirle el terminal integrado de VS Code y decirle exactamente qué pegar.
   - Prueba mínima en solo lectura: `codex exec --sandbox read-only --skip-git-repo-check "Responde solo: OK"`.
2. **Git y GitHub**: `git --version`; si la carpeta es un repositorio, rama actual, remoto `origin` y si hay cambios sin guardar. Comprueba si puedes leer el remoto (`git ls-remote origin`).
3. **Hooks del plugin**: confirma que el hook que pide confirmación antes de subir está activo (explica que lo verás en acción la primera vez que haya un push).
4. **Estructura del proyecto** (si estás en uno): carpetas `design/`, `tmp/` y `docs/`; `tmp/` y los ficheros de secretos en `.gitignore`; `CLAUDE.md` y `AGENTS.md`; Excel de PRD y seguimiento (busca `*PRD*.xlsx`).
5. **Ruta del proyecto**: A (Apps Script) o B (servidor), según el skill `metodo-loop`. Para la ruta A, comprueba los workflows de `.github/workflows/` y recuerda que el secreto `CLASPRC_JSON` debe existir en GitHub (no puedes verlo; pregunta). Para la ruta B, `package.json`, carpeta `convex/` y conexión con Railway si está disponible.
6. **Python con openpyxl** (para editar el Excel): `python3 -c "import openpyxl"`. Si falta, ofrece instalarlo.

Termina con un resumen de una línea: «Listo para trabajar» o «Faltan N cosas», y las acciones en orden.
