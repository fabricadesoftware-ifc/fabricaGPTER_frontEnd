<script setup>
  import { useDisplay } from 'vuetify'
  import TermsContent from '@/components/profile/TermsContent.vue'

  const { mdAndUp } = useDisplay()
</script>

<template>
  <v-container
    class="ma-0 pa-0 d-flex align-center justify-center blue-gradient rounded-b-xl"
    :style="{
      minHeight: mdAndUp ? '20vh' : '20vh',
      maxWidth: mdAndUp ? '30vw' : '100%',
    }"
  >
    <span class="font-weight-bold text-h4 text-white">Termos de Uso</span>
  </v-container>

  <TermsContent />
</template>

<style>
.blue-gradient {
  background-image: linear-gradient(180deg, #2877d7 0%, #0d519e 100%);
}
</style>
