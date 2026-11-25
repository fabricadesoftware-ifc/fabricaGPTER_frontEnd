<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Eye, EyeOff } from 'lucide-vue-next'
  import { useSessionStore } from '@/stores/auth'
  import { homeFor } from '@/router/authGuard'
  import ForceCurvePreview from '@/components/auth/ForceCurvePreview.vue'

  const session = useSessionStore()
  const router = useRouter()
  const username = ref('')
  const password = ref('')
  const showPassword = ref(false)
  const redirecting = ref(false)

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
    <aside class="auth__brand">
      <div class="auth__brand-inner">
        <div class="auth__logo"><img alt="GPTER" src="@/assets/logo-gpter-wo-bg.png"></div>
        <div>
          <h1 class="auth__headline">Avaliação de força de preensão manual</h1>
          <p class="auth__lead">Coleta com dinamômetro USB, curva de força e pico de contração de cada paciente</p>
        </div>
        <ForceCurvePreview />
      </div>
    </aside>

    <main class="auth__panel">
      <form class="auth__form" @submit.prevent="submit">
        <img alt="GPTER" class="auth__mobile-logo" src="@/assets/logo-gpter-wo-bg.png">
        <h2 class="auth__title">Entrar</h2>
        <p class="auth__subtitle">Use o usuário e a senha fornecidos pela equipe</p>

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
            required
          />
          <v-text-field
            v-model="password"
            autocomplete="current-password"
            class="mb-4"
            :disabled="session.loading || session.initializing"
            label="Senha"
            required
            :type="showPassword ? 'text' : 'password'"
          >
            <template #append-inner>
              <button
                :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
                class="auth__reveal"
                type="button"
                @click="showPassword = !showPassword"
              ><component :is="showPassword ? EyeOff : Eye" :size="18" /></button>
            </template>
          </v-text-field>
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
.auth__brand { display: flex; align-items: center; justify-content: center; padding: 48px; background: #0F2D52; color: #FFFFFF; }
.auth__brand-inner { display: grid; gap: 40px; width: 100%; max-width: 480px; }
.auth__logo { justify-self: start; display: inline-flex; padding: 8px 12px; border-radius: 12px; background: #FFFFFF; }
.auth__logo img { height: 96px; margin: -12px; }
.auth__headline { font-size: clamp(1.75rem, 2.6vw, 2.25rem); font-weight: 500; letter-spacing: -0.01em; line-height: 1.15; margin: 0 0 12px; }
.auth__lead { max-width: 36rem; margin: 0; font-size: 1rem; line-height: 1.6; color: rgba(255, 255, 255, 0.72); }
.auth__panel { display: flex; align-items: center; justify-content: center; padding: 48px 24px; }
.auth__form { width: 100%; max-width: 380px; }
.auth__mobile-logo { display: none; height: 96px; margin: -16px 0 12px -16px; }
.auth__title { font-size: 1.75rem; font-weight: 500; letter-spacing: -0.01em; line-height: 1.2; margin: 0 0 8px; }
.auth__subtitle { color: var(--app-ink-muted); margin: 0 0 28px; }
.auth__reveal { display: grid; place-items: center; width: 32px; height: 32px; margin-right: -4px; border-radius: 8px; color: var(--app-ink-subtle); transition: color 160ms var(--app-ease); }
.auth__reveal:hover { color: var(--app-ink); }
.auth__reveal:focus-visible { outline: 2px solid var(--app-primary); outline-offset: 0; }

@media (max-width: 959px) {
  .auth { grid-template-columns: minmax(0, 1fr); }
  .auth__brand { display: none; }
  .auth__panel { align-items: flex-start; padding-top: 56px; }
  .auth__mobile-logo { display: block; }
}
</style>
