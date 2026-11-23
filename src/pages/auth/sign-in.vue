<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Activity, ChartLine, ShieldCheck } from 'lucide-vue-next'
  import { useSessionStore } from '@/stores/auth'
  import { homeFor } from '@/router/authGuard'

  const session = useSessionStore()
  const router = useRouter()
  const username = ref('')
  const password = ref('')
  const showPassword = ref(false)
  const redirecting = ref(false)

  const highlights = [
    { icon: Activity, text: 'Coleta contínua com dinamômetro USB' },
    { icon: ChartLine, text: 'Gráfico de força x tempo e pico de contração' },
    { icon: ShieldCheck, text: 'Histórico seguro de cada paciente' },
  ]

  async function submit () {
    if (!username.value.trim() || !password.value || session.loading) return
    if (await session.login(username.value.trim(), password.value)) {
      password.value = ''
      showPassword.value = false
      redirecting.value = true
      await router.replace({ name: homeFor(session.user) })
    }
  }

  async function resume () {
    session.error = ''
    redirecting.value = true
    try {
      if (await session.checkSession()) await router.replace({ name: homeFor(session.user) })
      else redirecting.value = false
    } catch (failure) {
      redirecting.value = false
      session.error = failure.message
    }
  }
</script>

<template>
  <div class="auth">
    <aside class="auth__brand blue-gradient">
      <div class="auth__brand-inner">
        <div class="auth__logo"><img alt="GPTER" src="@/assets/logo-gpter-wo-bg.png"></div>
        <h1 class="auth__headline">Avaliação de força de preensão manual</h1>
        <p class="auth__lead">Grupo de Pesquisa em Tecnologia, Esporte e Reabilitação.</p>
        <ul class="auth__highlights">
          <li v-for="item in highlights" :key="item.text">
            <span class="auth__highlight-icon"><component :is="item.icon" :size="18" /></span>
            {{ item.text }}
          </li>
        </ul>
      </div>
    </aside>

    <main class="auth__panel">
      <form class="auth__form" @submit.prevent="submit">
        <img alt="GPTER" class="auth__mobile-logo" src="@/assets/logo-gpter-wo-bg.png">
        <h2 class="auth__title">Entrar</h2>
        <p class="auth__subtitle">Use o usuário e a senha fornecidos pela equipe.</p>

        <v-alert
          v-if="session.error"
          class="mb-4"
          density="compact"
          role="alert"
          type="error"
        >{{ session.error }}</v-alert>
        <v-alert
          v-if="session.notice"
          class="mb-4"
          density="compact"
          role="status"
          type="warning"
        >{{ session.notice }}</v-alert>

        <div v-if="session.isAuthenticated && redirecting" class="d-flex flex-column align-center ga-3 py-6" role="status">
          <v-progress-circular aria-label="Acessando sua área" color="primary" indeterminate />
          <span class="text-body-2 text-muted">Acessando sua área…</span>
        </div>

        <template v-else-if="session.isAuthenticated">
          <v-alert
            v-if="!['paciente', 'profissional'].includes(session.user.profile)"
            class="mb-4"
            type="warning"
          >Perfil não configurado. Entre em contato com o administrador.</v-alert>
          <v-btn
            v-else
            block
            class="mb-3"
            color="primary"
            :disabled="session.loading"
            size="large"
            @click="resume"
          >Acessar minha área</v-btn>
          <v-btn
            block
            :loading="session.loading"
            size="large"
            variant="outlined"
            @click="session.logout()"
          >Sair</v-btn>
        </template>

        <template v-else>
          <v-text-field
            v-model="username"
            autocomplete="username"
            autofocus
            class="mb-2"
            :disabled="session.loading || session.initializing"
            label="Usuário"
            prepend-inner-icon="mdi-account-outline"
            required
          />
          <v-text-field
            v-model="password"
            :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            autocomplete="current-password"
            class="mb-4"
            :disabled="session.loading || session.initializing"
            label="Senha"
            prepend-inner-icon="mdi-lock-outline"
            required
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
          />
          <v-btn
            block
            color="primary"
            :disabled="session.initializing || !username.trim() || !password"
            :loading="session.loading"
            size="x-large"
            type="submit"
          >Entrar</v-btn>
        </template>
      </form>
    </main>
  </div>
</template>

<style scoped>
.auth { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); min-height: 100dvh; background: rgb(var(--v-theme-surface)); }
.auth__brand { display: flex; align-items: center; justify-content: center; padding: 48px; color: #fff; }
.auth__brand-inner { max-width: 440px; }
.auth__logo { display: inline-flex; padding: 12px 16px; border-radius: 16px; background: #fff; margin-bottom: 40px; }
.auth__logo img { height: 88px; margin: -12px; }
.auth__headline { font-size: clamp(1.75rem, 2.6vw, 2.25rem); font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; margin: 0 0 12px; }
.auth__lead { opacity: 0.85; margin: 0 0 32px; }
.auth__highlights { list-style: none; padding: 0; margin: 0; display: grid; gap: 14px; }
.auth__highlights li { display: flex; align-items: center; gap: 12px; font-weight: 500; }
.auth__highlight-icon { display: inline-grid; place-items: center; width: 34px; height: 34px; border-radius: 10px; background: rgba(255, 255, 255, 0.16); }
.auth__panel { display: flex; align-items: center; justify-content: center; padding: 48px 24px; }
.auth__form { width: 100%; max-width: 380px; }
.auth__mobile-logo { display: none; height: 96px; margin: -16px 0 12px -16px; }
.auth__title { font-size: 1.75rem; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 6px; }
.auth__subtitle { color: var(--app-ink-muted); margin: 0 0 28px; }

@media (max-width: 959px) {
  .auth { grid-template-columns: minmax(0, 1fr); }
  .auth__brand { display: none; }
  .auth__panel { align-items: flex-start; padding-top: 56px; }
  .auth__mobile-logo { display: block; }
}
</style>
