import { ref } from 'vue';
import { defineStore } from 'pinia';

import AuthService from '@/services/auth';
const authService = new AuthService();

export const useAuthStore = defineStore('auth', () => {
  const user = ref({});

  async function setToken(token) {
    user.value = await authService.postUserToken(token);
  }

  function unsetToken() {
    user.value = {};
  }

  return { user, setToken, unsetToken };
});
