#!/usr/bin/env bash
# Impide que la IA escriba en ficheros de secretos y credenciales.
entrada=$(cat)
if printf '%s' "$entrada" | grep -Eq '"file_path"[[:space:]]*:[[:space:]]*"[^"]*(\.env(\.[^"/]*)?|\.clasprc\.json|\.secret|\.key|credentials[^"/]*\.json)"'; then
  printf '%s\n' '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Fichero de secretos: no se edita desde la IA. Pide al usuario que lo haga él o usa las variables del servidor / Propiedades del script."}}'
fi
exit 0
