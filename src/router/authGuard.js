export function homeFor (user) {
  if (user?.profile === 'paciente') return '/patient/test-history'
  if (user?.profile === 'profissional') return '/professional/patients'
  return '/auth/sign-in'
}

export function createAuthGuard (session) {
  return async to => {
    const wasInitialized = session.initialized
    await session.initialize()
    const requiredProfile = /^\/patient(?:\/|$)/.test(to.path) ? 'paciente'
      : /^\/professional(?:\/|$)/.test(to.path) ? 'profissional' : null
    if (requiredProfile) {
      if (!session.initialized || !session.isAuthenticated) return { name: '/auth/sign-in' }
      if (wasInitialized) {
        try { await session.checkSession() } catch (failure) {
          session.error = failure.message
          return { name: '/auth/sign-in' }
        }
      }
      if (!session.isAuthenticated) return { name: '/auth/sign-in' }
      if (session.user.profile !== requiredProfile) {
        if (session.user.profile) session.notice = 'Você não tem permissão para acessar essa área.'
        return { name: homeFor(session.user) }
      }
    }
    if (to.path === '/auth/sign-in' && session.isAuthenticated && !session.error) {
      const home = homeFor(session.user)
      if (home !== to.path) return { name: home }
    }
    return true
  }
}
