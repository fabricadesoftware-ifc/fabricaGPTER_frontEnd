import { computed, onMounted } from 'vue'
import { useDataStore } from '@/stores/data'
import { useSessionStore } from '@/stores/auth'

export function useProfile () {
  const data = useDataStore()
  const session = useSessionStore()

  const profile = computed(() => data.profile || {
    name: session.user?.displayName || session.user?.name || session.user?.username || '',
    photo: session.user?.photo || '',
  })
  const firstName = computed(() => (profile.value.name || '').split(' ')[0] || 'Usuário')
  const loading = computed(() => data.profileLoading)
  const error = computed(() => data.profileError)

  function load (force = false) {
    return data.loadProfile({ force })
  }

  onMounted(() => load())

  return { data, profile, firstName, loading, error, load }
}
