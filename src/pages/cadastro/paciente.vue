<route lang="json">
{ "meta": { "publicRegistration": true } }
</route>

<script setup>
  import { ref } from 'vue'
  import { CircleCheck } from 'lucide-vue-next'
  import PatientForm from '@/components/patients/PatientForm.vue'

  const registered = ref(false)
</script>

<template>
  <div class="register">
    <div class="register__inner">
      <img alt="GPTER" class="register__logo" src="@/assets/logo-gpter-wo-bg.png">

      <v-card v-if="registered" class="register__done">
        <CircleCheck class="register__done-icon" :size="32" />
        <h1 class="register__title">Cadastro concluído</h1>
        <p class="text-muted mb-6">Para entrar, use o usuário e a senha que você acabou de cadastrar.</p>
        <v-btn block color="primary" size="large" to="/auth/sign-in">Entrar</v-btn>
      </v-card>

      <template v-else>
        <h1 class="register__title">Cadastro de paciente</h1>
        <p class="text-muted mb-6">Leva cerca de 2 minutos. Todos os campos são obrigatórios.</p>
        <PatientForm public-registration @registered="registered = true" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.register { min-height: 100dvh; background: rgb(var(--v-theme-background)); padding: 32px 16px 48px; }
.register__inner { max-width: 880px; margin: 0 auto; }
.register__logo { height: 88px; margin: -12px 0 12px -16px; }
.register__title { font-size: clamp(1.5rem, 2.4vw, 1.875rem); font-weight: 500; letter-spacing: -0.01em; line-height: 1.2; margin: 0 0 8px; }
.register__done { max-width: 440px; margin: 48px auto 0; padding: 32px; text-align: center; }
.register__done-icon { color: var(--app-success); margin-bottom: 16px; }
</style>
