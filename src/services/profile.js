import { endpoints } from './endpoints.js'

function first (...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== '') return value
  }
  return ''
}

function sourcesOf (raw) {
  const result = []
  const visited = new Set()
  const nestedKeys = [
    'data',
    'profile',
    'patient',
    'professional',
    'user',
    'account',
    'contact',
    'personal_data',
    'personalData',
    'person',
  ]

  function visit (value, depth) {
    if (!value || typeof value !== 'object' || visited.has(value)) return
    visited.add(value)
    result.push(value)
    if (depth >= 3) return
    for (const key of nestedKeys) visit(value[key], depth + 1)
  }

  visit(raw, 0)
  return result
}

function firstFrom (sources, ...keys) {
  return first(...sources.flatMap(source => keys.map(key => source[key])))
}

const PROFILE_ALIASES = {
  patient: 'paciente',
  paciente: 'paciente',
  professional: 'profissional',
  profissional: 'profissional',
}

export function normalizeProfileKind (value) {
  if (!value) return ''
  return PROFILE_ALIASES[String(value).toLowerCase()] || String(value)
}

export function normalizeProfile (raw) {
  const source = raw && typeof raw === 'object' ? raw : {}
  const sources = sourcesOf(source)
  return {
    id: firstFrom(sources, 'id', 'pk', 'uuid'),
    profileId: firstFrom(sources, 'profileId', 'profile_id'),
    username: firstFrom(sources, 'username', 'user_name', 'login'),
    name: firstFrom(sources, 'name', 'full_name', 'fullName', 'display_name', 'displayName'),
    email: firstFrom(sources, 'email', 'email_address', 'emailAddress', 'mail', 'email_profissional', 'professional_email', 'emailUsuario'),
    phone: firstFrom(sources, 'phone', 'telefone', 'telephone', 'phone_number', 'phoneNumber'),
    birthDate: firstFrom(sources, 'birthDate', 'birth_date', 'data_nascimento', 'date_of_birth', 'dateOfBirth'),
    cpf: firstFrom(sources, 'cpf', 'CPF', 'document', 'document_number', 'documentNumber', 'cpf_number', 'tax_id', 'cpf_profissional', 'professional_cpf'),
    photo: firstFrom(sources, 'photo', 'avatar', 'photo_url', 'photoUrl', 'avatar_url', 'avatarUrl'),
    profile: normalizeProfileKind(firstFrom(sources, 'profile', 'role', 'user_type', 'type', 'kind')),
  }
}

// /auth/me/ and /profile/ are allowed to expose different shapes. This
// normalizer keeps the session user in a single, predictable format.
export function normalizeSessionUser (raw) {
  const source = raw && typeof raw === 'object' ? raw : {}
  const profile = normalizeProfile(source)
  const sources = sourcesOf(source)
  const nested = sources.find(value => value !== source) || {}
  return {
    ...profile,
    profileId: first(
      source.profileId,
      source.profile_id,
      source.patient_id,
      source.professional_id,
      nested.profileId,
      nested.profile_id,
      nested.patient_id,
      nested.professional_id,
      nested.id,
    ),
    displayName: first(profile.name, profile.username),
  }
}

export async function fetchProfile (request) {
  const data = await request(endpoints.profile)
  const body = data?.data ?? data
  const nested = [body?.profile, body?.patient, body?.professional, body?.user]
    .find(value => value && typeof value === 'object')
  return normalizeProfile(nested || body)
}

const COMPLEMENT_FIELDS = ['name', 'email', 'phone', 'birthDate', 'cpf', 'photo', 'username']

export function profileNeedsPatientComplement (profile) {
  if (!profile || typeof profile !== 'object') return true
  return COMPLEMENT_FIELDS.some(key => !profile[key])
}

// /profile/ remains the primary source. Patient fields are used only to fill
// blanks, so a more complete response from /profile/ is never overwritten.
export function complementProfileWithPatient (profile, patient) {
  const result = { ...(profile || {}) }
  for (const key of COMPLEMENT_FIELDS) {
    if (!result[key] && patient?.[key]) result[key] = patient[key]
  }
  if (!result.id && patient?.id) result.id = patient.id
  return result
}
