<template>
  <v-app>
    <router-view />
    <v-overlay class="align-center justify-center" :model-value="session.initializing" persistent>
      <v-progress-circular aria-label="Restaurando sessão" indeterminate />
    </v-overlay>
    <v-snackbar :model-value="!!message && route.path !== '/auth/sign-in'" :timeout="-1">
      {{ message }}
      <template #actions>
        <v-btn @click="session.error = ''; session.notice = ''">Fechar</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup>
  import { computed, onMounted, onUnmounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useSessionStore } from '@/stores/auth'
  const session = useSessionStore()
  const route = useRoute()
  const router = useRouter()
  const message = computed(() => session.error || session.notice)
  let timer
  async function checkSession () {
    if (!session.isAuthenticated || session.loading || document.visibilityState !== 'visible') return
    try { await session.checkSession() } catch (failure) { session.error = failure.message }
  }
  watch(() => session.isAuthenticated, authenticated => {
    if (!authenticated && /^\/(patient|professional)(\/|$)/.test(route.path)) router.replace({ name: '/auth/sign-in' })
  })
  onMounted(() => {
    timer = setInterval(checkSession, 60000)
    window.addEventListener('focus', checkSession)
    document.addEventListener('visibilitychange', checkSession)
  })
  onUnmounted(() => {
    clearInterval(timer)
    window.removeEventListener('focus', checkSession)
    document.removeEventListener('visibilitychange', checkSession)
  })
</script>
