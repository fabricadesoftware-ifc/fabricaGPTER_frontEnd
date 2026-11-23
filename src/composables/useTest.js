import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataStore } from '@/stores/data'
import { useSessionStore } from '@/stores/auth'
import { formatDateBR } from '@/utils/date'

// Page that shows an assessment in a given status, per user area.
function pageFor (status, professional) {
  if (['finished', 'validated'].includes(status)) return professional ? '/professional/test-result' : '/patient/test-result'
  if (status === 'running' && professional) return '/professional/test-progress'
  return professional ? '/professional/assessment-details' : '/patient/assessment-details'
}

export function useTest (statuses) {
  const route = useRoute()
  const router = useRouter()
  const data = useDataStore()
  const session = useSessionStore()
  const loading = ref(false)
  const error = ref('')
  const professional = computed(() => session.user?.profile === 'profissional')

  watch(() => route.query.id, async (id, _, onCleanup) => {
    let active = true
    onCleanup(() => { active = false })
    loading.value = Boolean(id)
    error.value = ''
    if (!id) return
    try {
      const record = await data.loadTest(id)
      if (!active || !record) return
      if (!statuses.includes(record.status)) {
        // Wrong page for this status (e.g. a finished test opened in progress).
        const target = pageFor(record.status, professional.value)
        if (target !== route.path) await router.replace({ path: target, query: { id } })
        return
      }
      if (professional.value && record.patientId && !record.patientName) await data.loadPatient(record.patientId)
    } catch (failure) {
      if (active) error.value = failure.message
    } finally {
      if (active) loading.value = false
    }
  }, { immediate: true })

  const test = computed(() => {
    const record = data.tests.find(item => String(item.id) === String(route.query.id))
    if (!record || !statuses.includes(record.status)) return null
    if (!professional.value && String(record.patientId) !== String(session.user?.profileId)) return null
    return record
  })

  const patientName = computed(() => {
    const record = test.value
    if (!record) return ''
    const samePatient = patient => patient && String(patient.id) === String(record.patientId)
    return record.patientName
      || data.patients.find(samePatient)?.name
      || (samePatient(data.currentPatient) ? data.currentPatient.name : '')
      || (professional.value ? '' : session.user?.displayName || '')
  })

  const details = computed(() => test.value
    ? { ...test.value, name: patientName.value, type: `${test.value.seconds}s`, date: formatDateBR(test.value.date) }
    : null)

  return { loading, error, test, details, data, router }
}
