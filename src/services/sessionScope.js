// Keeps in-flight responses from a previous session from repopulating stores
// after a logout, session expiration or account switch.
let generation = 0
const listeners = new Set()

export function sessionGeneration () {
  return generation
}

export function onSessionReset (listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function resetSessionScope () {
  generation += 1
  for (const listener of listeners) {
    try {
      listener()
    } catch {
      // A cleanup listener must never block the session transition.
    }
  }
}
