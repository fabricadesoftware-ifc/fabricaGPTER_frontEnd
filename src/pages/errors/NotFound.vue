<script setup>
  import logo from '@/assets/logo-gpter.png';
</script>

<template>
  <v-empty-state
    class="text-h6"
    :image="logo"
    text="Parece que essa página saiu da escala."
    title="Ops! Página não encontrada."
  >
    <template #headline>
      <span class="text-primary font-weight-bold">404</span>
    </template>
    <v-btn
      block
      class="darken-blue-gradient text-white"
      height="50px"
      rounded="lg"
      to="/auth/sign-in"
    >Voltar para pagina inicial</v-btn>
  </v-empty-state>
</template>
<style scoped>
.blue-gradient {
  background-image: linear-gradient(180deg, #4a8dde 0%, #0c4f9d 100%);
}
.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
