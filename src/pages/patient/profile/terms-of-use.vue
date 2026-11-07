<script setup>
  import { useDisplay } from 'vuetify'
  const { mdAndUp } = useDisplay()
  import { useDataStore } from '@/stores/data'
  import { formatDateBR } from '@/utils/date'
  const data = useDataStore()
</script>

<template>
  <v-container
    class="ma-0 pa-0 d-flex align-center align-center justify-center blue-gradient rounded-b-xl"
    :style="{
      minHeight: mdAndUp ? '20vh' : '20vh',
      maxWidth: mdAndUp ? '30vw' : '100%',
    }"
  >
    <span class="font-weight-bold text-h4 text-white">Termos de Uso</span>
  </v-container>
  <v-container>
    <span v-if="data.termsUpdatedAt" class="opacity-50">Última atualização: {{ formatDateBR(data.termsUpdatedAt) }}</span>
    <v-list lines="four">
      <v-list-item v-for="section in data.terms" :key="section.id" class="my-2">
        <div class="text-h6 font-weight-bolder my-2">{{ section.title }}</div>
        <div class="opacity-90 text-p">{{ section.content }}</div>
      </v-list-item>
      <v-list-item v-if="!data.terms.length">Termos de uso não disponíveis.</v-list-item>
    </v-list>
  </v-container>
</template>

<style>
.blue-gradient {
  background-image: linear-gradient(180deg, #2877d7 0%, #0d519e 100%);
}

.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
