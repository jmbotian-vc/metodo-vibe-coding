---
name: ruta-apps-script
description: Ruta A para construir apps con Google Apps Script como servidor y Google Sheets como base de datos, con el código en GitHub y publicación automática con clasp desde GitHub Actions (/dev para probar, /exec para todos), como el proyecto GF-CRM. Úsalo al crear, programar, probar o publicar un proyecto con apps-script/ o appsscript.json.
---

# Ruta A: Apps Script + Google Sheets + GitHub

Arquitectura probada en el proyecto GF-CRM del usuario. El usuario no usa la terminal: tú haces lo técnico y le dices qué pulsar cuando haga falta su cuenta de Google o de GitHub.

## Estructura del repositorio

```
apps-script/          código que se sube a Apps Script
  Código.js           servidor (funciones públicas + auxiliares terminadas en _)
  Index.html          interfaz de la aplicación web
  appsscript.json     manifiesto: zona horaria, servicios avanzados, webapp, scopes
tests/                pruebas con datos inventados (node tests/run.js)
  run.js, helpers.js, *.test.js
.github/workflows/    apps-script.yml (subir a /dev), publicar.yml (publicar en /exec), diagnostico.yml
.github/ordenes/      publicar.txt (orden de publicación), diagnostico.txt
<NOMBRE>_PRD.xlsx     PRD y seguimiento (skill excel-prd)
design/ docs/ tmp/    diseño, documentación, temporal (tmp ignorado por git)
AGENTS.md CLAUDE.md   normas compartidas
```

Plantillas en `assets/` de este skill: `workflows/*.yml` (con `__SCRIPT_ID__` y `__DEPLOYMENT_ID__` para sustituir), `tests/run.js`, `tests/helpers.js`, `tests/ejemplo.test.js` y `gitignore`.

## Cómo se publica

1. Cada push a `main` o a una rama `claude/**` que toque `apps-script/` o `tests/` ejecuta `apps-script.yml`: **primero las pruebas** (si fallan, no se sube nada) y luego `clasp push`, que deja el código en la **URL /dev** (solo la ve el propietario).
2. Para publicar en la **URL /exec** (la que usan todos, que nunca cambia), escribe la descripción de la versión en la primera línea de `.github/ordenes/publicar.txt` y súbelo; `publicar.yml` pasa las pruebas, sube el código, crea una versión y actualiza la misma implementación. Alternativa: el usuario pulsa «Run workflow» en la pestaña Actions de GitHub.
3. `diagnostico.yml` (cambiando `.github/ordenes/diagnostico.txt`) lista implementaciones y versiones, en solo lectura.
4. **Siempre**: primero /dev y que el usuario lo pruebe; luego /exec con su permiso.

Si las ramas de trabajo no se llaman `claude/**`, ajusta el filtro `branches` de los workflows (por ejemplo, añade `tarea/**`).

## Montaje de un proyecto nuevo (una sola vez)

1. Crea el proyecto de Apps Script (el usuario, en script.google.com, o con clasp) y anota su **Script ID** (Configuración del proyecto).
2. Copia las plantillas, sustituye `__SCRIPT_ID__` y crea `apps-script/appsscript.json` con zona horaria `Europe/Madrid`, `runtimeVersion` V8, `webapp` y **solo los scopes necesarios**.
3. Primera implementación como aplicación web (el usuario, desde el editor: Implementar → Nueva implementación) y anota el **Deployment ID** para `publicar.yml`.
4. El usuario crea en GitHub el secreto `CLASPRC_JSON` (Settings → Secrets and variables → Actions) con el contenido de su `~/.clasprc.json` tras hacer `clasp login` una vez. Explícale los pasos uno a uno; nunca le pidas que te pegue ese contenido en el chat.
5. Verifica con un push de prueba que la URL /dev se actualiza.

## Normas de código

- **Cada función pública** (las que llama `google.script.run` desde Index.html) valida primero la identidad (`Session.getActiveUser().getEmail()` o el mecanismo del proyecto) y el rol contra la hoja de usuarios. Las auxiliares terminan en `_` para que no se puedan llamar desde la web.
- Lecturas eficientes: `getValues()` de rangos completos, nunca celda a celda en bucles; cachea con `CacheService` lo que se lee mucho. Apps Script tiene cuotas y tiempo máximo por ejecución.
- Escrituras concurrentes con `LockService`.
- Secretos (tokens de Telegram, claves de API) en `PropertiesService.getScriptProperties()`, nunca en el código ni en celdas.
- Fechas con la zona horaria del proyecto; cuidado con las fechas que Sheets convierte solas.
- Registro de eventos (quién, qué, cuándo) en una pestaña de la hoja para auditoría.
- Cada cambio de lógica lleva su prueba en `tests/` con **datos inventados**; los servicios de Apps Script se simulan en `helpers.js`.

## Seguridad específica

- `webapp.executeAs` y `webapp.access` en el manifiesto: lo más restringido que funcione (por ejemplo, `DOMAIN` si es interno). Anótalo en DECISIONES.
- Las hojas de datos, privadas: si alguien puede editar la hoja, puede saltarse la app.
- Scopes mínimos: no pidas todo Drive si solo lees una hoja.
- Revisa con el skill `auditoria-seguridad` (sección ruta A) antes de publicar cambios de accesos o datos.

## Cuándo esta ruta se queda corta

Decenas de miles de filas, muchos usuarios simultáneos, clientes externos con login propio, tiempo real, pagos o app móvil → proponer al usuario pasar a la ruta B (skill `ruta-servidor`), anotándolo en DECISIONES.
