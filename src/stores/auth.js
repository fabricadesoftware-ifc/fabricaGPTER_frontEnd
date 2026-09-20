import { defineStore } from 'pinia'
import { authenticate } from '@/services/auth'

export const useSessionStore = defineStore('session', {
  state: () => ({
    user: null,
  }),

  getters: {
    isAuthenticated: state => state.user !== null,
  },

  actions: {
    async login (user, password) {

      const authenticatedUser = await authenticate(user, password)

      this.user = authenticatedUser

      return authenticatedUser
    },

    logout () {
      this.user = null
    },
  },
})
