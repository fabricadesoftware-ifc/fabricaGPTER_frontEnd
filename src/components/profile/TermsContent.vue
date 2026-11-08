<script setup>
  import { onMounted } from 'vue'
  import { useDataStore } from '@/stores/data'
  import { formatDateBR } from '@/utils/date'

  const data = useDataStore()

  function load () {
    return data.loadTerms({ force: true })
  }

  onMounted(load)
</script>

<template>
  <v-container>
    <v-progress-linear
      v-if="data.termsLoading"
      aria-label="Carregando termos de uso"
      class="mb-4"
      indeterminate
      rounded
    />

    <v-alert
      v-else-if="data.termsError"
      role="alert"
      type="error"
      variant="tonal"
    >
      <div class="d-flex flex-column ga-3">
        <span>{{ data.termsError }}</span>
        <v-btn size="small" variant="outlined" @click="load">Tentar novamente</v-btn>
      </div>
    </v-alert>

    <template v-else>
      <span v-if="data.termsUpdatedAt" class="opacity-50">Última atualização: {{ formatDateBR(data.termsUpdatedAt) }}</span>
      <v-list lines="four">
        <v-list-item v-for="(section, index) in data.terms" :key="section.id ?? index" class="my-2">
          <div class="text-h6 font-weight-bolder my-2">{{ section.title }}</div>
          <div class="opacity-90 text-p">{{ section.content }}</div>
        </v-list-item>
        <v-list-item v-if="!data.terms.length">
          Nenhum conteúdo de termos de uso disponível no momento.
        </v-list-item>
      </v-list>
    </template>
  </v-container>
</template>

<style>
.blue-gradient {
  background-image: linear-gradient(180deg, #2877d7 0%, #0d519e 100%);
}
</style>
