import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataStore } from '@/stores/data'
import { useSessionStore } from '@/stores/auth'
import { formatDateBR } from '@/utils/date'
export function useTest (statuses) {
  const route = useRoute()
  const router = useRouter()
  const data = useDataStore()
  const session = useSessionStore()
  const test = computed(() => {
    const record = data.tests.find(item => String(item.id) === String(route.query.id))
    if (!record || !statuses.includes(record.status)) return null
    if (session.user?.profile === 'paciente' && String(record.patientId) !== String(session.user.profileId)) return null
    return record
  })
  const details = computed(() => test.value ? { ...test.value, name: data.patients.find(patient => String(patient.id) === String(test.value.patientId))?.name || '', type: `${test.value.seconds}s`, date: formatDateBR(test.value.date) } : null)
  return { test, details, data, router }
}
