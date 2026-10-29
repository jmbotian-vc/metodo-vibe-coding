---
name: ruta-servidor
description: Ruta B para construir apps con servidor - Next.js (frontend), Convex (base de datos y backend), GitHub y Railway (publicación), con Cloudflare, Resend y CodeRabbit cuando el proyecto lo requiere. Úsalo al crear, programar, probar o publicar un proyecto con package.json de Next.js o carpeta convex/.
---

# Ruta B: Next.js + Convex + GitHub + Railway

La arquitectura del curso Vibe Coder Next. El usuario no usa la terminal: tú haces lo técnico y le dices qué pulsar cuando haga falta su cuenta.

## Piezas

- **Next.js**: pantallas e interfaz. Sigue el `design.md` y el prototipo de la carpeta `design/` (son referencia visual, no código: se reconstruye).
- **Convex**: datos y lógica de servidor, en tiempo real. Las tablas se definen en `convex/schema.ts`.
- **GitHub**: código, ramas y pull requests.
- **Railway**: publica automáticamente cada merge a `main`. Entornos por pull request activados en los ajustes del **proyecto** (no del servicio).
- Cuando toque (módulo 5 del curso): Convex Auth (login propio + Google), Cloudflare (dominio, modo de cifrado **Full**, nunca Full Strict con Railway), Resend (correos), CodeRabbit (revisión de PR), Bitwarden (secretos).

## Montaje de un proyecto nuevo

1. Esqueleto Next.js preparado para Railway (versión de Node y scripts que Railway necesita) con el design system base. **Sin pantallas**: cada pantalla es una tarea con su Loop.
2. Convex: el usuario crea la cuenta gratuita en convex.dev; tú instalas y enlazas el proyecto (región de la UE), con una conexión propia para esta carpeta. Si hace falta `npx convex login` u otro paso interactivo, ábrele el terminal integrado y dile exactamente qué pegar. Prueba de fuego: tabla demo con un registro ficticio visible en el dashboard, y luego se borra.
3. Repositorio en GitHub conectado a Railway; variables de entorno en Railway (las pone Claude si tiene acceso; si no, explica al usuario dónde).
4. Primer despliegue: si falla, lee los logs de Railway y corrige (lo habitual: versión de Node o variable de Convex que falta).

## Normas de código

- **Cada función de Convex** (query, mutation, action) comprueba usuario y rol antes de leer o escribir, y valida sus argumentos con validadores. Es la capa de seguridad que nunca puede faltar.
- Registro cerrado: no hay alta pública de cuentas; los usuarios los da de alta quien administra, con rol obligatorio.
- Listas cerradas (estados, canales) en el esquema; datos calculados en lugar de duplicados; índices para lo que más se busca.
- Secretos: `.env.local` en local (ignorado por git), variables de Railway y de Convex en producción. Nada secreto en variables `NEXT_PUBLIC_*` (las ve el navegador).
- Importes en céntimos; moneda explícita.
- Verifica cada pantalla con Playwright (subagente `tester`) antes de la auditoría del código.

## Publicar

1. Rama y pull request (nunca a `main` directamente).
2. CodeRabbit, si está activo, debe quedar en verde.
3. El usuario revisa el **entorno del PR** en Railway (ojo: comparte la base de datos real; no crear datos de prueba ahí sin avisar).
4. Merge con su permiso; Railway despliega solo. Comprobar en producción.

## Red de rescate

- Código: volver al último merge bueno en GitHub.
- Datos: copias de Convex (antes de cambios delicados del esquema, pide una copia local en el plan).
