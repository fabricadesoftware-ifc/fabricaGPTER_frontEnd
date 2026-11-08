// Maps backend validation keys to the names used by local forms.
export function applyServerFieldErrors (fields, aliases = {}) {
  const errors = {}
  if (!fields || typeof fields !== 'object') return errors
  for (const [key, value] of Object.entries(fields)) {
    const target = aliases[key] || key
    const message = Array.isArray(value) ? value.filter(Boolean).join(' ') : String(value || '')
    if (message) errors[target] = message
  }
  return errors
}
