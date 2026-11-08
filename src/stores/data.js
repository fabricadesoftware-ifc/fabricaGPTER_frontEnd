import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useSessionStore } from './auth.js'
import { onSessionReset, sessionGeneration } from '../services/sessionScope.js'
import {
  buildPatientPayload,
  createPatient,
  deletePatient as deletePatientRequest,
  fetchPatient,
  fetchPatients,
  updatePatient,
} from '../services/patients.js'
import { complementProfileWithPatient, fetchProfile } from '../services/profile.js'
import { fetchSupport, fetchTerms } from '../services/content.js'

function unavailable () {
  throw new Error('Esta operação estará disponível em uma próxima etapa da integração com o backend.')
}

export const useDataStore = defineStore('data', () => {
  const session = useSessionStore()

  const patients = ref([])
  const patientsTotal = ref(0)
  const patientsPage = ref(1)
  const patientsPageSize = ref(9)
  const patientsSearch = ref('')
  const patientsLoading = ref(false)
  const patientsError = ref('')

  const currentPatient = ref(null)
  const patientLoading = ref(false)
  const patientError = ref('')
  const patientSubmitting = ref(false)
  const deletingPatientId = ref(null)

  const profile = ref(null)
  const profileLoading = ref(false)
  const profileError = ref('')

  const support = ref(null)
  const supportLoading = ref(false)
  const supportError = ref('')

  const terms = ref([])
  const termsUpdatedAt = ref('')
  const termsLoading = ref(false)
  const termsError = ref('')

  const tests = ref([])

  let listRequestId = 0
  let patientRequestId = 0
  let profileRequestId = 0
  let supportRequestId = 0
  let termsRequestId = 0

  const patientsTotalPages = computed(() => Math.max(1, Math.ceil(patientsTotal.value / patientsPageSize.value)))

  function clearPrivateData () {
    listRequestId += 1
    patientRequestId += 1
    profileRequestId += 1
    supportRequestId += 1
    termsRequestId += 1

    patients.value = []
    patientsTotal.value = 0
    patientsPage.value = 1
    patientsSearch.value = ''
    patientsLoading.value = false
    patientsError.value = ''

    currentPatient.value = null
    patientLoading.value = false
    patientError.value = ''
    patientSubmitting.value = false
    deletingPatientId.value = null

    profile.value = null
    profileLoading.value = false
    profileError.value = ''

    support.value = null
    supportLoading.value = false
    supportError.value = ''

    terms.value = []
    termsUpdatedAt.value = ''
    termsLoading.value = false
    termsError.value = ''

    tests.value = []
  }

  onSessionReset(clearPrivateData)

  function isCurrentPatient (id, patient) {
    return patient && String(patient.id ?? '') === String(id ?? '')
  }

  async function loadPatients ({ page = patientsPage.value, search = patientsSearch.value } = {}) {
    const generation = sessionGeneration()
    const requestId = ++listRequestId
    patientsLoading.value = true
    patientsError.value = ''
    try {
      const result = await fetchPatients(session.request, {
        page,
        pageSize: patientsPageSize.value,
        search,
      })
      if (generation !== sessionGeneration() || requestId !== listRequestId) return null
      patients.value = result.patients
      patientsTotal.value = result.total
      patientsPage.value = result.page
      patientsPageSize.value = result.pageSize || patientsPageSize.value
      patientsSearch.value = search
      return result
    } catch (failure) {
      if (generation === sessionGeneration() && requestId === listRequestId) {
        patients.value = []
        patientsTotal.value = 0
        patientsError.value = failure.message || 'Não foi possível carregar os pacientes.'
      }
      return null
    } finally {
      if (requestId === listRequestId) patientsLoading.value = false
    }
  }

  async function loadPatient (id, { force = false } = {}) {
    if (id === undefined || id === null || id === '') {
      currentPatient.value = null
      patientError.value = 'Paciente não informado.'
      return null
    }
    if (!force && isCurrentPatient(id, currentPatient.value)) return currentPatient.value

    const generation = sessionGeneration()
    const requestId = ++patientRequestId
    patientLoading.value = true
    patientError.value = ''
    try {
      const result = await fetchPatient(session.request, id)
      if (generation !== sessionGeneration() || requestId !== patientRequestId) return null
      currentPatient.value = result
      return result
    } catch (failure) {
      if (generation === sessionGeneration() && requestId === patientRequestId) {
        currentPatient.value = null
        patientError.value = failure.code === 'not_found'
          ? 'Paciente não encontrado.'
          : failure.message || 'Não foi possível carregar o paciente.'
      }
      return null
    } finally {
      if (requestId === patientRequestId) patientLoading.value = false
    }
  }

  function clearCurrentPatient () {
    patientRequestId += 1
    currentPatient.value = null
    patientLoading.value = false
    patientError.value = ''
  }

  async function savePatient (values, { id, editing = false } = {}) {
    if (patientSubmitting.value) return null
    patientSubmitting.value = true
    const generation = sessionGeneration()
    try {
      const payload = buildPatientPayload(values, {
        editing,
        usernameEditable: currentPatient.value ? currentPatient.value.usernameEditable !== false : true,
      })
      const result = editing
        ? await updatePatient(session.request, id, payload)
        : await createPatient(session.request, payload)

      if (generation === sessionGeneration()) {
        if (editing) {
          const index = patients.value.findIndex(patient => String(patient.id ?? '') === String(id ?? ''))
          if (index !== -1) patients.value.splice(index, 1, result)
        }
        if (isCurrentPatient(id, currentPatient.value)) {
          currentPatient.value = result
        }
      }
      return result
    } finally {
      patientSubmitting.value = false
    }
  }

  async function deletePatient (id) {
    if (deletingPatientId.value !== null) return false
    deletingPatientId.value = String(id)
    const generation = sessionGeneration()
    try {
      await deletePatientRequest(session.request, id)
      if (generation !== sessionGeneration()) return true

      patients.value = patients.value.filter(patient => String(patient.id ?? '') !== String(id))
      patientsTotal.value = Math.max(0, patientsTotal.value - 1)
      if (isCurrentPatient(id, currentPatient.value)) {
        currentPatient.value = null
        patientError.value = ''
      }
      if (!patients.value.length && patientsPage.value > 1) {
        patientsPage.value -= 1
      }
      await loadPatients({ page: patientsPage.value })
      return true
    } finally {
      deletingPatientId.value = null
    }
  }

  async function loadProfile ({ force = false } = {}) {
    if (profile.value && !force) return profile.value
    const generation = sessionGeneration()
    const requestId = ++profileRequestId
    profileLoading.value = true
    profileError.value = ''
    try {
      let result = await fetchProfile(session.request)
      if (generation !== sessionGeneration() || requestId !== profileRequestId) return null

      // /profile/ is the authoritative source for both patients and
      // professionals. Session fields only fill blanks if /profile/ omits one.
      result = complementProfileWithPatient(result, session.user)

      profile.value = result
      return result
    } catch (failure) {
      if (generation === sessionGeneration() && requestId === profileRequestId) {
        profileError.value = failure.message || 'Não foi possível carregar o perfil.'
      }
      return null
    } finally {
      if (requestId === profileRequestId) profileLoading.value = false
    }
  }

  async function loadSupport ({ force = false } = {}) {
    if (support.value && !force) return support.value
    const generation = sessionGeneration()
    const requestId = ++supportRequestId
    supportLoading.value = true
    supportError.value = ''
    try {
      const result = await fetchSupport(session.request)
      if (generation !== sessionGeneration() || requestId !== supportRequestId) return null
      support.value = result
      return result
    } catch (failure) {
      if (generation === sessionGeneration() && requestId === supportRequestId) {
        supportError.value = failure.message || 'Não foi possível carregar os contatos de suporte.'
      }
      return null
    } finally {
      if (requestId === supportRequestId) supportLoading.value = false
    }
  }

  async function loadTerms ({ force = false } = {}) {
    if (terms.value.length && !force) return terms.value
    const generation = sessionGeneration()
    const requestId = ++termsRequestId
    termsLoading.value = true
    termsError.value = ''
    try {
      const result = await fetchTerms(session.request)
      if (generation !== sessionGeneration() || requestId !== termsRequestId) return null
      terms.value = result.sections
      termsUpdatedAt.value = result.updatedAt
      return result
    } catch (failure) {
      if (generation === sessionGeneration() && requestId === termsRequestId) {
        termsError.value = failure.message || 'Não foi possível carregar os termos de uso.'
      }
      return null
    } finally {
      if (requestId === termsRequestId) termsLoading.value = false
    }
  }

  return {
    patients,
    patientsTotal,
    patientsPage,
    patientsPageSize,
    patientsSearch,
    patientsLoading,
    patientsError,
    patientsTotalPages,
    currentPatient,
    patientLoading,
    patientError,
    patientSubmitting,
    deletingPatientId,
    profile,
    profileLoading,
    profileError,
    support,
    supportLoading,
    supportError,
    terms,
    termsUpdatedAt,
    termsLoading,
    termsError,
    tests,
    loadPatients,
    loadPatient,
    clearCurrentPatient,
    savePatient,
    deletePatient,
    loadProfile,
    loadSupport,
    loadTerms,
    clearPrivateData,
    startTest: unavailable,
    updateTest: unavailable,
  }
})
