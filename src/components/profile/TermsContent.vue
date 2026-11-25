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
  <v-card v-if="data.termsLoading"><v-progress-linear aria-label="Carregando termos de uso" indeterminate /><div class="pa-8" /></v-card>

  <v-alert
    v-else-if="data.termsError"
    role="alert"
    type="error"
  >
    {{ data.termsError }}
    <template #append><v-btn size="small" variant="outlined" @click="load">Tentar novamente</v-btn></template>
  </v-alert>

  <v-card v-else>
    <div class="card-section terms">
      <p v-if="data.termsUpdatedAt" class="text-body-2 text-subtle mb-6">Última atualização: {{ formatDateBR(data.termsUpdatedAt) }}</p>
      <section v-for="(section, index) in data.terms" :key="section.id ?? index" class="terms__section">
        <h3>{{ section.title }}</h3>
        <p>{{ section.content }}</p>
      </section>
      <p v-if="!data.terms.length" class="text-muted">Nenhum conteúdo de termos de uso disponível no momento.</p>
    </div>
  </v-card>
</template>

<style scoped>
.terms { max-width: 72ch; }
.terms__section + .terms__section { margin-top: 24px; }
.terms__section h3 { font-size: 1rem; font-weight: 500; margin: 0 0 8px; }
.terms__section p { margin: 0; color: var(--app-ink-muted); line-height: 1.65; white-space: pre-wrap; }
</style>
