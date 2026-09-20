<script setup>
  import { useDisplay } from 'vuetify';
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import AppLogo from '@/components/ui/AppLogo.vue';
  import { useSessionStore } from '@/stores/auth.js'
  const showPassword = ref(false)
  const { mdAndUp, smAndDown } = useDisplay();

  const router = useRouter()
  const useSession = useSessionStore()
  const dados = reactive({
    user: '',
    senha: '',
  })

  const accByProfile = {
    professional: '/professional/patients',
    patient: '/patient/test-history',
  }

  async function submit () {
    for (const campo in dados) {
      if (dados[campo] === ''){
        alert('Todos os campos devem estar preenchidos')
        return
      }
    }

    try {
      const authenticatedUser = await useSession.login(dados.user, dados.senha)
      const destination = accByProfile[authenticatedUser.role]
      await router.replace(destination)
    } catch {
      alert('Email ou senha invalida')
    }
  }

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

          <v-text-field
            v-model="dados.user"
            class="mb-3"
            label="Usuário"
            rounded="lg"
            variant="outlined"
          />
          <v-text-field
            v-model="dados.senha"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            class="mb-5"
            label="Senha"
            rounded="lg"
            :type="showPassword ? 'text' : 'password'"
            variant="outlined"
            @click:append-inner="showPassword = !showPassword"
          />
          <v-btn
            block
            class="darken-blue-gradient text-white"
            height="50px"
            rounded="lg"
            type="submit"
          >
            Login
          </v-btn>
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
