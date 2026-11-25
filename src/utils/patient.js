import { PASSWORD_MIN_LENGTH } from './password.js'

export const dominantHands = ['Direita', 'Esquerda']

export function normalizeHand (value) {
  return dominantHands.includes(value) ? value : ''
}

const PATIENT_STATUS_LABELS = { ativo: 'Ativo', inativo: 'Inativo' }

export function patientStatusLabel (status) {
  return PATIENT_STATUS_LABELS[String(status || '').toLowerCase()] || status || ''
}

export function isInactivePatient (patient) {
  return String(patient?.status || '').toLowerCase() === 'inativo'
}

export function emptyPatientForm () {
  return {
    username: '',
    name: '',
    email: '',
    cpf: '',
    phone: '',
    birthDate: '',
    dominant_hand: '',
    password: '',
    confirmation: '',
    cep: '',
    street: '',
    city: '',
    state: '',
    neighborhood: '',
    number: '',
  }
}

export function patientFormFromRecord (patient) {
  return {
    ...emptyPatientForm(),
    ...Object.fromEntries(
      Object.entries(patient || {}).filter(([key]) => key in emptyPatientForm() && key !== 'password' && key !== 'confirmation'),
    ),
    password: '',
    confirmation: '',
  }
}

export function validatePatient (values, { editing = false, usernameRequired = true, passwordRequired = !editing, contactRequired = false } = {}) {
  const errors = {}
  if ((!editing || values.dominant_hand) && !dominantHands.includes(values.dominant_hand)) {
    errors.dominant_hand = 'Selecione a mão dominante.'
  }
  const required = ['name', 'email', 'cpf', 'street', 'city', 'state', 'neighborhood', 'number']
  if (usernameRequired && !String(values.username || '').trim()) {
    errors.username = 'Informe o usuário.'
  } else if (values.username && !/^[\w.@+-]+$/.test(values.username)) {
    errors.username = 'Use apenas letras, números e os caracteres @ . + - _.'
  }
  if (!String(values.name || '').trim()) errors.name = 'Informe o nome completo.'
  if (!String(values.email || '').trim()) errors.email = 'Informe o email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Informe um email válido.'
  if (!String(values.cpf || '').trim()) errors.cpf = 'Informe o CPF.'
  else if (!/^\d{11}$/.test(String(values.cpf).replace(/\D/g, ''))) errors.cpf = 'O CPF deve conter 11 dígitos.'

  for (const key of required.slice(3)) {
    if (!String(values[key] || '').trim()) errors[key] = 'Campo obrigatório.'
  }
  if (!values.cep) {
    errors.cep = 'Informe o CEP.'
  } else if (!/^\d{8}$/.test(String(values.cep).replace(/\D/g, ''))) {
    errors.cep = 'O CEP deve conter 8 dígitos.'
  }

  return { ...errors, ...validatePatientContact(values, contactRequired), ...validatePatientPassword(values, passwordRequired) }
}

function validatePatientContact (values, contactRequired) {
  const errors = {}
  const phoneDigits = String(values.phone || '').replace(/\D/g, '')
  if (contactRequired && !phoneDigits) errors.phone = 'Informe o telefone.'
  else if (phoneDigits && !/^\d{10,11}$/.test(phoneDigits)) errors.phone = 'Informe o telefone com DDD.'
  if (contactRequired && !values.birthDate) errors.birthDate = 'Informe a data de nascimento.'
  else if (values.birthDate && values.birthDate > todayISO()) errors.birthDate = 'A data de nascimento não pode ser futura.'
  return errors
}

function validatePatientPassword (values, passwordRequired) {
  const errors = {}
  if (passwordRequired && !values.password) {
    errors.password = 'Informe a senha inicial.'
  } else if (values.password && values.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `A senha deve ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres.`
  }
  if (values.password || values.confirmation) {
    if (!values.confirmation) errors.confirmation = 'Confirme a senha.'
    else if (values.confirmation !== values.password) errors.confirmation = 'As senhas não coincidem.'
  }

  return errors
}

export function todayISO () {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

export function hasValidationErrors (errors) {
  return Object.keys(errors || {}).length > 0
}
