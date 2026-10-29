#!/usr/bin/env bash
# Pide confirmación antes de cualquier comando que suba, fusione o publique.
# Recibe por la entrada estándar el JSON de la herramienta Bash.
entrada=$(cat)
if printf '%s' "$entrada" | grep -Eq 'git[^"]* push|gh pr merge|gh pr create|clasp (push|deploy|update-deployment|create-version)|railway (up|deploy)|npx convex deploy|publicar\.txt'; then
  printf '%s\n' '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"ask","permissionDecisionReason":"Vas a subir, fusionar o publicar. ¿Ha pasado la auditoría del código y lo has autorizado?"}}'
fi
exit 0
