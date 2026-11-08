<script setup>
  import { useDisplay } from 'vuetify'
  import { ref } from 'vue'
  import AppLogo from '@/components/ui/AppLogo.vue'
  import { useRouter } from 'vue-router'
  import { useSessionStore } from '@/stores/auth'
  import { homeFor } from '@/router/authGuard'

  const session = useSessionStore()
  const router = useRouter()
  const username = ref('')
  const password = ref('')
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

  const showPassword = ref(false)
  const { mdAndUp, smAndDown } = useDisplay()
</script>

<template>
  <v-container
    class="fill-height pa-0 ma-0 d-flex flex-column flex-md-row flex-nowrap align-center"
    fluid
  >
    <v-container
      class="ma-0 pa-0 d-flex align-start align-md-center justify-center blue-gradient"
      :style="{
        minHeight: mdAndUp ? '100vh' : '50vh',
        maxWidth: mdAndUp ? '50vw' : '100%',
      }"
    >
      <!-- Logo mobile -->
      <AppLogo class="mt-12 mb-10 d-flex d-md-none flex-0-0" />
      <form @submit.prevent="submit">
        <v-card
          class="rounded-xl pa-4"
          :class="mdAndUp ? 'position-relative' : 'position-absolute'"
          :elevation="smAndDown ? 5 : 0"
          :style="[
            mdAndUp
              ? { width: 'clamp(320px, 70%, 350px)' }
              : {
                width: '320px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              },
          ]"
        >
          <v-card-title
            class="text-h5 text-primary text-center font-weight-bold mt-2 mb-6"
          >
            Bem-vindo
          </v-card-title>

          <v-alert
            v-if="session.error"
            class="mb-4"
            role="alert"
            type="error"
            variant="tonal"
          >{{ session.error }}</v-alert>
          <v-alert
            v-if="session.notice"
            class="mb-4"
            role="status"
            type="warning"
            variant="tonal"
          >{{ session.notice }}</v-alert>
          <template v-if="session.isAuthenticated && redirecting">
            <div class="d-flex flex-column align-center justify-center ga-4 py-6" role="status">
              <v-progress-circular aria-label="Acessando sua área" color="primary" indeterminate />
              <span class="text-body-2 text-grey-darken-1">Acessando sua área...</span>
            </div>
          </template>
          <template v-else-if="session.isAuthenticated">
            <v-alert v-if="!['paciente', 'profissional'].includes(session.user.profile)" class="mb-4" type="warning" variant="tonal">
              Perfil não configurado. Entre em contato com o administrador.
            </v-alert>
            <v-btn
              v-else
              block
              class="mb-3"
              :disabled="session.loading"
              @click="resume"
            >Tentar acessar minha área</v-btn>
            <v-btn block :loading="session.loading" @click="session.logout()">Sair</v-btn>
          </template>
          <template v-else>
            <v-text-field
              v-model="username"
              autocomplete="username"
              class="mb-3"
              :disabled="session.loading || session.initializing"
              label="Usuário"
              required
              rounded="lg"
              variant="outlined"
            />
            <v-text-field
              v-model="password"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              autocomplete="current-password"
              class="mb-5"
              :disabled="session.loading || session.initializing"
              label="Senha"
              required
              rounded="lg"
              :type="showPassword ? 'text' : 'password'"
              variant="outlined"
              @click:append-inner="showPassword = !showPassword"
            />
            <v-btn
              block
              class="darken-blue-gradient text-white"
              :disabled="session.initializing || !username.trim() || !password"
              height="50px"
              :loading="session.loading"
              rounded="lg"
              type="submit"
            >
              Login
            </v-btn>
          </template>
        </v-card>
      </form>
    </v-container>

    <v-container
      class="ma-0 pa-0 d-flex align-start align-md-center justify-center bg-white"
      :style="{
        minHeight: mdAndUp ? '100vh' : 'calc(50vh - 70px)',
        maxWidth: mdAndUp ? '50vw' : '100%',
      }"
    >
      <!-- Logo desktop -->
      <AppLogo class="mt-10 d-none d-md-flex" />
    </v-container>
  </v-container>
</template>
<style scoped>
.blue-gradient {
  background-image: linear-gradient(180deg, #4a8dde 0%, #0c4f9d 100%);
}
.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
