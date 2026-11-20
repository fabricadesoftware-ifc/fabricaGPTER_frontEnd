import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataStore } from '@/stores/data'
import { useSessionStore } from '@/stores/auth'
import { formatDateBR } from '@/utils/date'
export function useTest (statuses) {
  const route = useRoute()
  const router = useRouter()
  const data = useDataStore()
  const session = useSessionStore()
  const loading = ref(false)
  const error = ref('')
  watch(() => route.query.id, async (id, _, onCleanup) => {
    let active = true
    onCleanup(() => { active = false })
    loading.value = Boolean(id)
    error.value = ''
    if (!id) return
    try {
      await data.loadTest(id)
    } catch (failure) {
      if (active) error.value = failure.message
    } finally {
      if (active) loading.value = false
    }
  }, { immediate: true })
  const test = computed(() => {
    const record = data.tests.find(item => String(item.id) === String(route.query.id))
    if (!record || !statuses.includes(record.status)) return null
    if (session.user?.profile === 'paciente' && String(record.patientId) !== String(session.user.profileId)) return null
    return record
  })
  const details = computed(() => test.value ? { ...test.value, name: data.patients.find(patient => String(patient.id) === String(test.value.patientId))?.name || test.value.patient_name || '', type: `${test.value.seconds}s`, date: formatDateBR(test.value.date) } : null)
  return { loading, error, test, details, data, router }
}
