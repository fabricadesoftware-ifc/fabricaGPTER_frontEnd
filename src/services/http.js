import { endpoints } from './endpoints.js'

export class ApiError extends Error {
  constructor (message, { status = 0, code = 'network_error', retryAfter = null, fields = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.retryAfter = retryAfter
    this.fields = fields
  }
}

function normalizeFields (fields) {
  if (!fields || typeof fields !== 'object') return null
  const result = {}
  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value)) {
      const messages = value.filter(item => typeof item === 'string' && item.trim()).map(item => item.trim())
      if (messages.length) result[key] = messages
    } else if (typeof value === 'string' && value.trim()) {
      result[key] = [value.trim()]
    }
  }
  return Object.keys(result).length ? result : null
}

const STATUS_CODES = {
  401: 'not_authenticated',
  403: 'permission_denied',
  404: 'not_found',
  409: 'conflict',
  429: 'throttled',
  400: 'validation_error',
  422: 'validation_error',
}

function statusCode (status) {
  if (STATUS_CODES[status]) return STATUS_CODES[status]
  if (status >= 500) return 'server_error'
  return 'http_error'
}

function messageFor (code, serverMessage) {
  if (code === 'invalid_credentials') return 'Usuário ou senha inválidos.'
  if (code === 'not_authenticated') return 'Sua sessão expirou ou não é válida. Entre novamente.'
  if (code === 'permission_denied') return 'Você não tem permissão para acessar este recurso.'
  if (code === 'not_found') return 'Registro não encontrado.'
  if (code === 'conflict') return serverMessage || 'Não foi possível concluir a operação porque o registro está em uso.'
  if (code === 'throttled') return 'Excesso de tentativas. Aguarde antes de tentar novamente.'
  if (code === 'validation_error') return serverMessage || 'Revise os campos informados.'
  if (code === 'server_error') return serverMessage || 'O servidor não conseguiu concluir a solicitação. Tente novamente mais tarde.'
  if (code === 'invalid_response') return 'O servidor retornou uma resposta inesperada. Tente novamente.'
  return serverMessage || 'Não foi possível concluir a solicitação.'
}

function looksLikeHtml (text) {
  return /^\s*</.test(text)
}

function parsePayload (text) {
  if (!text) return { data: null, html: false, parsed: false, empty: true }
  if (looksLikeHtml(text)) return { data: null, html: true, parsed: false, empty: false }
  try {
    return { data: JSON.parse(text), html: false, parsed: true, empty: false }
  } catch {
    return { data: null, html: false, parsed: false, empty: false }
  }
}

function resolveError (response, data, retryAfterHeader) {
  const serverError = data?.error && typeof data.error === 'object' ? data.error : null
  const code = serverError?.code || statusCode(response.status)
  const retryAfter = retryAfterHeader || serverError?.retryAfter || null
  let message = messageFor(code, serverError?.message)
  if (code === 'throttled' && retryAfter && /^\d+$/.test(String(retryAfter))) {
    message = `Excesso de tentativas. Tente novamente em ${retryAfter} segundos.`
  }
  return {
    code,
    message,
    retryAfter,
    fields: normalizeFields(serverError?.fields || data?.fields),
  }
}

async function send (url, { method, headers, body }) {
  try {
    return await fetch(url, {
      method,
      headers,
      credentials: 'include',
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    })
  } catch (failure) {
    if (failure?.name === 'TimeoutError' || failure?.name === 'AbortError') {
      throw new ApiError('O servidor demorou para responder. Verifique sua conexão e tente novamente.', { code: 'timeout' })
    }
    throw new ApiError('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.', { code: 'network_error' })
  }
}

export function createApiClient ({ getCsrfToken, setCsrfToken, onUnauthorized }) {
  // VITE_API_BASE_URL is the official configuration. Local development can
  // still override this with VITE_API_BASE_URL=http://localhost:8000/api.
  const base = (import.meta.env?.VITE_API_BASE_URL || '/api').replace(/\/$/, '')
  let csrfRequest

  async function refreshCsrf () {
    if (!csrfRequest) {
      csrfRequest = request(endpoints.csrf, { handleAuth: false, renewCsrf: false })
        .then(data => {
          if (!data?.csrf_token) throw new ApiError('Resposta inválida ao obter a proteção de segurança.', { code: 'invalid_response' })
          setCsrfToken(data.csrf_token)
        })
        .finally(() => { csrfRequest = null })
    }
    return csrfRequest
  }

  function buildHeaders (method, body) {
    const headers = { Accept: 'application/json' }
    if (body !== undefined) headers['Content-Type'] = 'application/json'
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method) && getCsrfToken()) headers['X-CSRFToken'] = getCsrfToken()
    return headers
  }

  async function request (path, { method = 'GET', body, handleAuth = true, renewCsrf = true } = {}) {
    const response = await send(`${base}${path}`, { method, headers: buildHeaders(method, body), body })
    if (response.status === 204 || response.status === 205) return null

    const { data, html, parsed, empty } = parsePayload(await response.text())

    if (response.ok) {
      if (html) throw new ApiError('O servidor retornou uma resposta inesperada. Tente novamente.', { status: response.status, code: 'invalid_response' })
      if (empty) return null
      if (!parsed) throw new ApiError('O servidor retornou uma resposta inesperada. Tente novamente.', { status: response.status, code: 'invalid_response' })
      return data
    }

    const details = resolveError(response, data, response.headers.get('Retry-After'))
    if (response.status === 401 && handleAuth) onUnauthorized()
    if (details.code === 'csrf_failed' && renewCsrf) {
      await refreshCsrf()
      details.message = 'A proteção de segurança foi atualizada. Repita a ação. Se o erro continuar, verifique a origem autorizada no servidor.'
    }
    throw new ApiError(details.message, { status: response.status, ...details })
  }

  return { request, refreshCsrf }
}
