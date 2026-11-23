<script setup>
  import { computed } from 'vue'
  import { ArrowRight, CircleCheck } from 'lucide-vue-next'
  import { useTest } from '@/composables/useTest'
  import { measurementSummary } from '@/services/assessments'

  const { loading, error, test, details } = useTest(['finished', 'validated'])
  const summary = computed(() => measurementSummary(test.value?.measurements))
  const patientLink = computed(() => test.value?.patientId
    ? { path: '/professional/patient-details', query: { id: test.value.patientId } }
    : '/professional/patients')
</script>

<template>
  <div class="page page--narrow">
    <div v-if="loading" class="py-16"><v-progress-linear aria-label="Carregando avaliação" indeterminate /></div>
    <v-alert v-else-if="error" role="alert" type="error">{{ error }}</v-alert>

    <v-card v-else-if="test" class="done">
      <div class="done__icon"><CircleCheck :size="36" /></div>
      <h1 class="done__title">Teste finalizado</h1>
      <p class="text-muted mb-6">
        As medições de {{ details?.name || 'paciente' }} foram salvas com sucesso.
      </p>
      <div v-if="summary" class="done__stats">
        <div><span class="eyebrow">Pico</span><strong>{{ summary.peak.toFixed(1) }} N</strong></div>
        <div><span class="eyebrow">Tempo até o pico</span><strong>{{ summary.peakTime.toFixed(2) }} s</strong></div>
        <div><span class="eyebrow">Amostras</span><strong>{{ test.measurements.length }}</strong></div>
      </div>
      <div class="done__actions">
        <v-btn :to="patientLink" variant="outlined">Voltar ao paciente</v-btn>
        <v-btn color="primary" :to="{ path: '/professional/test-result', query: { id: test.id } }">
          Ver resultado<ArrowRight class="ml-2" :size="16" />
        </v-btn>
      </div>
    </v-card>

    <v-alert v-else type="info">Nenhum registro disponível.</v-alert>
  </div>
</template>

<style scoped>
.done { margin-top: 8vh; padding: 40px 32px; text-align: center; }
.done__icon { display: inline-grid; place-items: center; width: 72px; height: 72px; border-radius: 24px; background: #E7F5EF; color: #13795B; margin-bottom: 20px; }
.done__title { font-size: 1.75rem; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 6px; }
.done__stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-bottom: 28px; }
.done__stats > div { display: flex; flex-direction: column; gap: 4px; padding: 14px; border-radius: 12px; background: rgb(var(--v-theme-background)); }
.done__stats strong { font-size: 1.125rem; font-variant-numeric: tabular-nums; }
.done__actions { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
@media (max-width: 599px) {
  .done { padding: 32px 20px; }
  .done__stats { grid-template-columns: minmax(0, 1fr); }
  .done__actions .v-btn { flex: 1 1 100%; }
}
</style>
