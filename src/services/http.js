export class ApiError extends Error {
  constructor (message, { status = 0, code = 'network_error', retryAfter = null } = {}) {
    super(message)
    this.status = status
    this.code = code
    this.retryAfter = retryAfter
  }
}

export function createApiClient ({ getCsrfToken, setCsrfToken, onUnauthorized }) {
  // In production the API is exposed under the same domain. Local development
  // can still override this with VITE_API_BASE_URL=http://localhost:8000/api.
  const base = (import.meta.env?.VITE_API_BASE_URL || '/api').replace(/\/$/, '')
  let csrfRequest

  async function refreshCsrf () {
    if (!csrfRequest) {
      csrfRequest = request('/auth/csrf/', { handleAuth: false, renewCsrf: false })
        .then(data => {
          if (!data?.csrf_token) throw new ApiError('Resposta inválida ao obter a proteção de segurança.', { code: 'invalid_response' })
          setCsrfToken(data.csrf_token)
        })
        .finally(() => { csrfRequest = null })
    }
    return csrfRequest
  }

  async function request (path, { method = 'GET', body, handleAuth = true, renewCsrf = true } = {}) {
    const headers = { Accept: 'application/json' }
    if (body !== undefined) headers['Content-Type'] = 'application/json'
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method) && getCsrfToken()) headers['X-CSRFToken'] = getCsrfToken()
    let response
    let data
    try {
      response = await fetch(`${base}${path}`, {
        method, headers, credentials: 'include',
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(15000),
      })
      if (response.status === 204) return null
      const text = await response.text()
      try { data = text ? JSON.parse(text) : null } catch { data = null }
    } catch {
      throw new ApiError('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.')
    }
    if (response.ok) {
      if (!data) throw new ApiError('O servidor retornou uma resposta inválida.', { code: 'invalid_response' })
      return data
    }
    const code = data?.error?.code || (response.status === 401 ? 'not_authenticated' : 'http_error')
    let message = data?.error?.message || 'Não foi possível concluir a solicitação.'
    const retryAfter = response.headers.get('Retry-After')
    if (code === 'invalid_credentials') message = 'Usuário ou senha inválidos.'
    if (code === 'not_authenticated') message = 'Sua sessão expirou ou não é válida. Entre novamente.'
    if (code === 'permission_denied') message = 'Você não tem permissão para acessar este recurso.'
    if (code === 'throttled') message = `Excesso de tentativas. ${retryAfter && /^\d+$/.test(retryAfter) ? `Tente novamente em ${retryAfter} segundos.` : 'Aguarde antes de tentar novamente.'}`
    if (response.status === 401 && handleAuth) onUnauthorized()
    if (code === 'csrf_failed' && renewCsrf) {
      await refreshCsrf()
      message = 'A proteção de segurança foi atualizada. Repita a ação. Se o erro continuar, verifique a origem autorizada no servidor.'
    }
    throw new ApiError(message, { status: response.status, code, retryAfter })
  }

  return { request, refreshCsrf }
}
