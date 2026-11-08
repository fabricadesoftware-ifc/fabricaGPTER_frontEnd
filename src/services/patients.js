import { endpoints } from './endpoints.js'

// Fields accepted by the patient create/update contract. Everything else
// (store internals, privileged profile, chosen owner, etc.) must never be sent.
export const PATIENT_WRITABLE_FIELDS = [
  'username',
  'name',
  'email',
  'cpf',
  'password',
  'confirmation',
  'cep',
  'street',
  'city',
  'state',
  'neighborhood',
  'number',
]

function first (...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== '') return value
  }
  return ''
}

function nestedSources (raw) {
  const source = raw && typeof raw === 'object' ? raw : {}
  return [
    source,
    source.data,
    source.user,
    source.account,
    source.profile,
    source.patient,
    source.personal_data,
    source.personalData,
  ].filter(value => value && typeof value === 'object')
}

function firstFrom (sources, ...keys) {
  return first(...sources.flatMap(source => keys.map(key => source[key])))
}

function normalizeStatus (raw) {
  if (typeof raw.status === 'string' && raw.status.trim()) return raw.status
  if (typeof raw.situacao === 'string' && raw.situacao.trim()) return raw.situacao
  if (typeof raw.is_active === 'boolean') return raw.is_active ? 'Ativo' : 'Inativo'
  return ''
}

export function normalizePatient (raw) {
  const source = raw && typeof raw === 'object' ? raw : {}
  const sources = nestedSources(source)
  const address = sources.find(value => value.address && typeof value.address === 'object')?.address || {}
  const addressSources = [...sources, address]
  const editable = firstFrom(sources, 'can_edit_username', 'username_editable')

  return {
    id: firstFrom(sources, 'id', 'pk', 'uuid'),
    username: firstFrom(sources, 'username', 'user_name', 'login'),
    name: firstFrom(sources, 'name', 'full_name', 'fullName', 'nome'),
    email: firstFrom(sources, 'email', 'email_address', 'emailAddress', 'mail'),
    cpf: firstFrom(sources, 'cpf', 'CPF', 'document', 'document_number', 'documentNumber', 'cpf_number', 'tax_id'),
    phone: firstFrom(sources, 'phone', 'telefone', 'telephone', 'phone_number', 'phoneNumber'),
    birthDate: firstFrom(sources, 'birthDate', 'birth_date', 'data_nascimento', 'date_of_birth', 'dateOfBirth'),
    cep: firstFrom(addressSources, 'cep', 'zip_code', 'postal_code', 'zipCode', 'postalCode'),
    street: firstFrom(addressSources, 'street', 'logradouro'),
    city: firstFrom(addressSources, 'city', 'localidade'),
    state: firstFrom(addressSources, 'state', 'uf'),
    neighborhood: firstFrom(addressSources, 'neighborhood', 'bairro'),
    number: firstFrom(addressSources, 'number', 'numero'),
    status: normalizeStatus(source),
    photo: first(source.photo, source.avatar),
    usernameEditable: typeof editable === 'boolean' ? editable : null,
  }
}

export function formatPatientAddress (patient) {
  if (!patient || typeof patient !== 'object') return ''
  if (!patient.street && !patient.city && !patient.state && !patient.neighborhood && !patient.number && !patient.cep) {
    return ''
  }
  const line = [patient.street, patient.number].filter(Boolean).join(', ')
  return [line, patient.neighborhood, patient.city, patient.state, patient.cep].filter(Boolean).join(' - ')
}

function listFrom (data) {
  if (Array.isArray(data)) return data
  if (!data || typeof data !== 'object') return []
  for (const key of ['results', 'items', 'data', 'patients', 'records']) {
    if (Array.isArray(data[key])) return data[key]
  }
  return []
}

function totalFrom (data, fallback) {
  if (!data || typeof data !== 'object') return fallback
  for (const key of ['count', 'total', 'total_count', 'totalItems', 'total_items']) {
    const value = Number(data[key])
    if (Number.isFinite(value)) return value
  }
  const pagination = data.pagination
  if (pagination && typeof pagination === 'object') {
    for (const key of ['count', 'total', 'total_count']) {
      const value = Number(pagination[key])
      if (Number.isFinite(value)) return value
    }
  }
  return fallback
}

function pageSizeFrom (data, fallback) {
  if (!data || typeof data !== 'object') return fallback
  for (const key of ['page_size', 'pageSize', 'per_page', 'perPage']) {
    const value = Number(data[key])
    if (Number.isFinite(value) && value > 0) return value
  }
  const pagination = data.pagination
  if (pagination && typeof pagination === 'object') {
    for (const key of ['page_size', 'pageSize', 'per_page']) {
      const value = Number(pagination[key])
      if (Number.isFinite(value) && value > 0) return value
    }
  }
  return fallback
}

export function normalizePatientPage (data, { page = 1, pageSize = 9 } = {}) {
  const records = listFrom(data)
  return {
    patients: records.map(normalizePatient),
    total: totalFrom(data, records.length),
    pageSize: pageSizeFrom(data, pageSize),
    page,
  }
}

export async function fetchPatients (request, { page = 1, pageSize = 9, search = '' } = {}) {
  // Let the API apply its configured page size. Some backend deployments
  // reject the optional page_size query parameter even though they support
  // server-side pagination through page.
  const params = new URLSearchParams({ page: String(page) })
  if (search) params.set('search', search)
  const data = await request(`${endpoints.patients}?${params.toString()}`)
  return normalizePatientPage(data, { page, pageSize })
}

export async function fetchPatient (request, id) {
  const data = await request(endpoints.patient(id))
  return normalizePatient(data?.patient ?? data)
}

export async function createPatient (request, payload) {
  const data = await request(endpoints.patients, { method: 'POST', body: payload })
  return normalizePatient(data?.patient ?? data)
}

export async function updatePatient (request, id, payload) {
  const data = await request(endpoints.patient(id), { method: 'PATCH', body: payload })
  return normalizePatient(data?.patient ?? data)
}

export async function deletePatient (request, id) {
  return request(endpoints.patient(id), { method: 'DELETE' })
}

export function buildPatientPayload (values, { editing = false, usernameEditable = true } = {}) {
  const payload = {}
  for (const key of PATIENT_WRITABLE_FIELDS) {
    if (key === 'username' && editing && !usernameEditable) continue
    if (key === 'password' || key === 'confirmation') {
      if (!values[key]) continue
      payload[key] = values[key]
      continue
    }
    const value = typeof values[key] === 'string' ? values[key].trim() : values[key]
    if (value === undefined || value === null) continue
    payload[key] = value
  }
  return payload
}
