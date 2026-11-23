<script setup>
  import { SearchX } from 'lucide-vue-next'
</script>

<template>
  <div class="not-found">
    <div class="not-found__icon"><SearchX :size="32" /></div>
    <p class="eyebrow">Erro 404</p>
    <h1 class="not-found__title">Página não encontrada</h1>
    <p class="text-muted mb-8">Parece que essa página saiu da escala. Confira o endereço ou volte ao início.</p>
    <v-btn color="primary" size="large" to="/auth/sign-in">Voltar para a página inicial</v-btn>
  </div>
</template>

<style scoped>
.not-found { min-height: 100dvh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; background: rgb(var(--v-theme-background)); }
.not-found__icon { display: grid; place-items: center; width: 64px; height: 64px; border-radius: 20px; background: var(--app-primary-soft); color: var(--app-primary); margin-bottom: 20px; }
.not-found__title { font-size: 1.75rem; font-weight: 700; letter-spacing: -0.02em; margin: 6px 0 8px; }
</style>
