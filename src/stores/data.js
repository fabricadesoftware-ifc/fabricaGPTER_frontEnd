import { defineStore } from 'pinia'

function unavailable () {
  throw new Error('Esta operação estará disponível após a integração com o backend.')
}

export const useDataStore = defineStore('data', {
  state: () => ({
    patients: [],
    tests: [],
    professionalProfile: null,
    support: null,
    terms: [],
    termsUpdatedAt: null,
  }),
  actions: {
    savePatient: unavailable,
    deletePatient: unavailable,
    startTest: unavailable,
    updateTest: unavailable,
  },
})
