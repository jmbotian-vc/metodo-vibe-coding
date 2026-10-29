---
name: auditoria-seguridad
description: Lista de comprobación de seguridad para auditar apps en modo solo lectura (accesos, secretos, datos, OWASP, ruta Apps Script y ruta servidor, funciones con IA, RGPD). Úsalo para /auditar seguridad, antes de publicar cambios de login, roles, datos personales o pagos, y en la revisión trimestral.
---

# Auditoría de seguridad (solo lectura)

La auditoría nunca arregla nada: produce un informe con hallazgos clasificados (bloqueante, mayor, sugerencia) y después se hace un plan. Usa el mejor modelo disponible.

## Comunes a las dos rutas

- **Control de acceso**: cada operación del servidor comprueba identidad y rol; probar a ver o cambiar datos de otro usuario cambiando IDs; nada protegido solo en la interfaz.
- **Registro cerrado** y altas con rol obligatorio; usuarios desactivados sin sesiones vivas; nadie puede quitarse a sí mismo el último rol de administración.
- **Autenticación**: límite de intentos; sesiones que caducan; la recuperación de contraseña no revela si un correo existe.
- **Inyección**: validación de todo lo que entra; nada de construir consultas o HTML pegando texto del usuario.
- **Secretos**: ninguno en el código ni en el historial de git (revisar historial); permisos mínimos por clave; `.gitignore` correcto.
- **Dependencias**: librerías con vulnerabilidades conocidas; alertas de GitHub (Dependabot) y escaneo de secretos activados.
- **Datos**: validación en el servidor; copias de seguridad que se han probado a restaurar.
- **Registro y vigilancia**: eventos de quién hizo qué; avisos de errores.
- **Funciones con IA**: el texto procesado (correos, documentos) se trata como datos, nunca como instrucciones; la IA no decide permisos; topes de gasto en claves de IA; mínimos datos personales enviados fuera.
- **RGPD**: solo datos necesarios; proveedores con contrato de encargo y región UE cuando se pueda; posibilidad de exportar y borrar los datos de una persona.

## Ruta A (Apps Script + Sheets)

- `webapp.executeAs` / `webapp.access` lo más restringidos posible.
- Funciones públicas con validación de identidad y rol; auxiliares terminadas en `_`.
- Scopes mínimos en `appsscript.json`.
- Hojas de datos privadas (no «cualquiera con el enlace»); revisar quién puede editarlas.
- Secretos en Propiedades del script; `CLASPRC_JSON` solo como secreto de GitHub.
- `LockService` en escrituras concurrentes.

## Ruta B (Next.js + Convex + Railway)

- Cada query/mutation/action de Convex con comprobación de usuario, rol y validadores de argumentos.
- Nada secreto en `NEXT_PUBLIC_*`.
- Cabeceras de seguridad; HTTPS; Cloudflare en modo Full.
- Variables de Railway y Convex revisadas; entornos de PR conscientes de que comparten base de datos.
- Webhooks (pagos, servicios externos) con verificación de firma e idempotencia.

## Formato del informe

Para cada hallazgo: área, archivo:línea, descripción, cómo se explotaría, gravedad (bloqueante / mayor / sugerencia) y propuesta de arreglo. Al final: resumen por gravedad y lo que no se ha podido verificar.
