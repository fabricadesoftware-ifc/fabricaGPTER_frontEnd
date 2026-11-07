import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/auth.js'

export function useLogout () {
  const session = useSessionStore()
  const router = useRouter()
  async function selectSetting (setting) {
    if (setting.name === 'Sair' && await session.logout()) await router.replace({ name: '/auth/sign-in' })
  }
  return { session, selectSetting }
}
