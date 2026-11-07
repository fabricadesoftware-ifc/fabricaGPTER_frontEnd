import { defineStore } from 'pinia'

// Session will be populated by the future backend integration.
export const useSessionStore = defineStore('session', {
  state: () => ({ user: null }),
  getters: { isAuthenticated: state => state.user !== null },
  actions: {
    logout () {
      this.user = null
    },
    changePassword () {
      throw new Error('A alteração de senha estará disponível após a integração com o backend.')
    },
  },
})
