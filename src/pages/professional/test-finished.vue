<script setup>
  import { computed } from 'vue'
  import { ArrowRight, CircleCheck } from 'lucide-vue-next'
  import { useTest } from '@/composables/useTest'
  import { measurementSummary } from '@/services/assessments'
  import { formatMeasure } from '@/utils/number'

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
      <CircleCheck class="done__icon" :size="32" />
      <h1 class="done__title">Teste finalizado</h1>
      <p class="text-muted mb-8">As medições de {{ details?.name || 'paciente' }} foram salvas</p>
      <dl v-if="summary" class="done__stats">
        <div class="done__peak">
          <dt class="eyebrow">Pico de contração</dt>
          <dd class="figure">{{ formatMeasure(summary.peak) }}<span class="done__unit">N</span></dd>
        </div>
        <div>
          <dt class="eyebrow">Tempo até o pico</dt>
          <dd class="figure">{{ formatMeasure(summary.peakTime, 2) }}<span class="done__unit">s</span></dd>
        </div>
        <div>
          <dt class="eyebrow">Amostras</dt>
          <dd class="figure">{{ test.measurements.length.toLocaleString('pt-BR') }}</dd>
        </div>
      </dl>
      <div class="done__actions">
        <v-btn :to="patientLink" variant="outlined">Voltar ao paciente</v-btn>
        <v-btn color="primary" :to="{ path: '/professional/test-result', query: { id: test.id } }">
          Ver resultado<ArrowRight class="ml-2" :size="16" />
        </v-btn>
      </div>
    </v-card>

    <v-alert v-else type="info">Nenhum registro disponível</v-alert>
  </div>
</template>

<style scoped>
.done { margin-top: 48px; padding: 40px 32px; text-align: center; }
.done__icon { color: var(--app-success); margin-bottom: 16px; }
.done__title { font-size: 1.75rem; font-weight: 500; letter-spacing: -0.01em; line-height: 1.2; margin: 0 0 8px; }
.done__stats {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  margin: 0 0 32px;
  border: 1px solid var(--app-border);
  border-radius: 12px;
  text-align: left;
}
.done__stats > div { padding: 16px 20px; }
.done__stats > div + div { border-left: 1px solid var(--app-border); }
.done__stats dt { margin-bottom: 4px; }
.done__stats dd { margin: 0; font-size: 1.25rem; font-weight: 500; }
.done__peak { grid-column: 1 / -1; border-bottom: 1px solid var(--app-border); }
.done__peak + div { border-left: 0 !important; }
.done__peak dd { font-size: 2.25rem; line-height: 1.1; color: var(--app-primary); }
.done__unit { margin-left: 4px; font-family: 'Inter', system-ui, sans-serif; font-size: 0.875rem; font-weight: 400; color: var(--app-ink-muted); }
.done__peak .done__unit { font-size: 1rem; }
.done__actions { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
@media (max-width: 599px) {
  .done { margin-top: 16px; padding: 32px 20px; }
  .done__actions .v-btn { flex: 1 1 100%; }
}
</style>
