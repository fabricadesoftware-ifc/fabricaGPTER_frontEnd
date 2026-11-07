import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { createApiClient } from '../services/http.js'

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
        const result = await api.request('/auth/me/', { handleAuth: false })
        if (version === authVersion) user.value = result.user
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
    try {
      await initialize()
      await api.refreshCsrf()
      authVersion++
      const result = await api.request('/auth/login/', { method: 'POST', body: { username, password }, handleAuth: false })
      user.value = result.user
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
    try {
      if (!csrfToken.value) await api.refreshCsrf()
      await api.request('/auth/logout/', { method: 'POST', body: {}, handleAuth: false })
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
    return true
  }

  function changePassword () {
    throw new Error('A alteração de senha estará disponível após a integração com o backend.')
  }

  return { user, csrfToken, initialized, initializing, loading, error, notice, isAuthenticated, initialize, checkSession, login, logout, changePassword, request: api.request }
})
