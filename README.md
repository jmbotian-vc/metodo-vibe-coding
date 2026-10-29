# Método Vibe Coding · plugin personal de Claude Code

Orquestador del **método Loop** para construir apps con IA sin usar la terminal:

- **Claude** orquesta, planifica y programa.
- **Codex** audita en solo lectura (plan y código) y da GO / NO-GO.
- **Tú** apruebas el plan y autorizas cada subida.

Sirve para las dos formas de hacer apps:

- **Ruta A**: Apps Script + Google Sheets + GitHub (como GF-CRM).
- **Ruta B**: Next.js + Convex + GitHub + Railway (la del curso Vibe Coder Next).

Funciona igual en **Claude Desktop** y en **VS Code** (los dos usan Claude Code).

## Qué incluye

| Pieza | Para qué |
|---|---|
| `/nuevo-proyecto` | Arranca un proyecto: elige ruta, crea carpetas, Excel de PRD, normas y estructura |
| `/tarea` | Ejecuta una tarea del BACKLOG con el Loop completo |
| `/auditar plan \| codigo \| seguridad` | Pasa el material a Codex en solo lectura y actúa según el veredicto |
| `/cerrar-tarea` | Merge con permiso y Excel al día |
| `/texto-regreso` | Resumen para retomar después de `/compact` |
| `/comprobar-entorno` | Revisa que Codex, Git, GitHub, hooks y Excel estén listos |
| Skills | `metodo-loop`, `ruta-apps-script`, `ruta-servidor`, `excel-prd`, `auditoria-seguridad` |
| Subagentes | `tester` y `excel` (Sonnet, baratos), `auditor-respaldo` (si Codex no está) |
| Hooks | Confirmación antes de push / merge / publicar; bloqueo de edición de ficheros de secretos |

## Instalación (una vez)

En el chat de Claude Code (Desktop o VS Code), escribe:

```
/plugin marketplace add jmbotian-vc/metodo-vibe-coding
/plugin install metodo-vibe-coding@jmbotian
```

Reinicia la sesión (cierra y abre la conversación) y comprueba:

```
/comprobar-entorno
```

Si el repositorio es privado y la instalación falla por permisos, descarga (clona) el repositorio en tu ordenador y usa la ruta de la carpeta en lugar de `jmbotian-vc/metodo-vibe-coding`:

```
/plugin marketplace add /ruta/a/metodo-vibe-coding
```

### Codex

El plugin llama a Codex desde la línea de comandos (`codex exec`). La extensión de VS Code no siempre basta: `/comprobar-entorno` lo detecta y Claude te ayuda a instalarlo e iniciar sesión con tu cuenta de ChatGPT (una sola vez). Si algún día falla, siempre puedes auditar a mano pegando `tmp/auditoria/entrada.md` en el panel de Codex.

## Actualizar

Cuando haya cambios en este repositorio:

```
/plugin marketplace update jmbotian
```

## Uso diario

1. Abre la carpeta del proyecto en VS Code o Desktop.
2. `/tarea` (te propone la siguiente) o `/tarea TASK-012`.
3. Contesta las preguntas de negocio, aprueba el plan auditado y autoriza la subida.
4. Prueba donde te diga (/dev en la ruta A, entorno del PR en la ruta B).
5. `/cerrar-tarea`.
