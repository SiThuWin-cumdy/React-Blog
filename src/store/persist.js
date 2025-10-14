// src/store/persist.js
export function loadAuth() {
  try {
    const serialized = localStorage.getItem('authState')
    return serialized ? JSON.parse(serialized) : undefined
  } catch {
    return undefined
  }
}

export function saveAuth(state) {
  try {
    const serialized = JSON.stringify(state.auth)
    localStorage.setItem('authState', serialized)
  } catch {
    // ignore write errors
  }
}
