import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { createApiClient } from '../services/http.js'
import { endpoints } from '../services/endpoints.js'
import { normalizeSessionUser } from '../services/profile.js'
import { resetSessionScope } from '../services/sessionScope.js'

export const useSessionStore = defineStore('session', () => {
  const user = ref(null)
  const csrfToken = ref('')
  const initialized = ref(false)
  const initializing = ref(false)
  const loading = ref(false)
  const error = ref('')
  const notice = ref('')
  const isAuthenticated = computed(() => user.value !== null)
  let initialization
  let sessionCheck
  let authVersion = 0

  function expire () {
    user.value = null
    csrfToken.value = ''
    notice.value = 'Sua sessão expirou ou não é válida. Entre novamente.'
    resetSessionScope()
  }

  function applyUser (value) {
    const next = normalizeSessionUser(value)
    const previous = user.value
    if (previous && next && String(previous.id ?? '') !== String(next.id ?? '')) {
      resetSessionScope()
      authVersion += 1
    }
    user.value = next
    return next
  }

  const api = createApiClient({
    getCsrfToken: () => csrfToken.value,
    setCsrfToken: value => { csrfToken.value = value },
    onUnauthorized: expire,
  })

  async function checkSession (initial = false) {
    if (sessionCheck) return sessionCheck
    const version = authVersion
    sessionCheck = (async () => {
      try {
        const result = await api.request(endpoints.me, { handleAuth: false })
        if (version === authVersion) applyUser(result.user)
        return true
      } catch (failure) {
        if (failure.status !== 401) throw failure
        if (version === authVersion) {
          if (initial) user.value = null
          else expire()
        }
        return false
      } finally { sessionCheck = null }
    })()
    return sessionCheck
  }

  async function initialize () {
    if (initialization) return initialization
    if (initialized.value) return
    initializing.value = true
    error.value = ''
    initialization = (async () => {
      try {
        await api.refreshCsrf()
        await checkSession(true)
        initialized.value = true
      } catch (failure) {
        error.value = failure.message
      } finally {
        initializing.value = false
        initialization = null
      }
    })()
    return initialization
  }

  async function login (username, password) {
    if (loading.value) return false
    loading.value = true
    error.value = ''
    notice.value = ''
    resetSessionScope()
    try {
      await initialize()
      await api.refreshCsrf()
      authVersion++
      const result = await api.request(endpoints.login, { method: 'POST', body: { username, password }, handleAuth: false })
      applyUser(result.user)
      csrfToken.value = result.csrf_token
      initialized.value = true
      error.value = ''
      return true
    } catch (failure) {
      error.value = failure.message
      return false
    } finally { loading.value = false }
  }

  async function logout () {
    if (loading.value) return false
    loading.value = true
    authVersion++
    error.value = ''
    resetSessionScope()
    try {
      if (!csrfToken.value) await api.refreshCsrf()
      await api.request(endpoints.logout, { method: 'POST', body: {}, handleAuth: false })
    } catch (failure) {
      if (failure.status !== 401) {
        error.value = failure.code === 'network_error'
          ? 'Não foi possível confirmar o encerramento da sessão no servidor. Verifique sua conexão e tente sair novamente.'
          : failure.message
        return false
      }
    } finally { loading.value = false }
    user.value = null
    csrfToken.value = ''
    notice.value = ''
    resetSessionScope()
    return true
  }

  async function changePassword (currentPassword, newPassword, confirmation) {
    const result = await api.request(endpoints.changePassword, {
      method: 'POST',
      body: {
        current_password: currentPassword,
        new_password: newPassword,
        confirmation,
      },
    })
    if (result?.csrf_token) csrfToken.value = result.csrf_token
    if (result?.user) applyUser(result.user)
    try {
      await api.refreshCsrf()
    } catch (failure) {
      // The password was already changed; only an explicit session loss should
      // force the user back to the login screen.
      if (failure.status === 401) expire()
    }
    return result
  }

  return { user, csrfToken, initialized, initializing, loading, error, notice, isAuthenticated, initialize, checkSession, login, logout, changePassword, request: api.request }
})
