<script setup>
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Activity, Check, Clock, Hand, RotateCcw, Timer } from 'lucide-vue-next'
  import { useTest } from '@/composables/useTest'
  import { measurementSummary } from '@/services/assessments'
  import PageHeader from '@/components/ui/PageHeader.vue'
  import StatTile from '@/components/ui/StatTile.vue'
  import StatusChip from '@/components/ui/StatusChip.vue'
  import TestInfoCard from '@/components/tests/TestInfoCard.vue'
  import ForceTimeChart from '@/components/tests/ForceTimeChart.vue'

  // Shared by the professional (with actions) and patient result pages.
  const props = defineProps({ actions: Boolean })

  const router = useRouter()
  const { loading, error, test, details, data } = useTest(['finished', 'validated'])
  const samples = computed(() => test.value?.measurements || [])
  const summary = computed(() => measurementSummary(samples.value))
  const back = computed(() => props.actions
    ? (test.value?.patientId ? { path: '/professional/patient-details', query: { id: test.value.patientId } } : '/professional/patients')
    : '/patient/test-history')
  const subtitle = computed(() => details.value
    ? [details.value.name, details.value.date].filter(Boolean).join(' · ')
    : '')

  const validating = ref(false)
  const actionMessage = ref({ type: '', text: '' })

  async function validate () {
    if (validating.value || !test.value) return
    validating.value = true
    actionMessage.value = { type: '', text: '' }
    try {
      await data.updateTest(test.value.id, 'validated')
      actionMessage.value = { type: 'success', text: 'Teste validado.' }
    } catch (failure) {
      actionMessage.value = { type: 'error', text: Object.values(failure.fields || {}).flat().join(' ') || failure.message }
    } finally {
      validating.value = false
    }
  }

  function remake () {
    router.push({ path: '/professional/new-test', query: { patientId: test.value.patientId, source: test.value.id } })
  }
</script>

<template>
  <div class="page">
    <div v-if="loading" class="py-16"><v-progress-linear aria-label="Carregando avaliação" indeterminate /></div>
    <template v-else-if="error">
      <PageHeader :back="back" title="Resultado do teste" />
      <v-alert role="alert" type="error">{{ error }}</v-alert>
    </template>

    <template v-else-if="details">
      <PageHeader
        :back="back"
        :back-label="actions ? 'Paciente' : 'Histórico'"
        :subtitle="subtitle"
        :title="`Teste de ${details.seconds}s`"
      >
        <template #badge><StatusChip :status="details.status" /></template>
        <template v-if="actions" #actions>
          <v-btn variant="outlined" @click="remake"><RotateCcw class="mr-2" :size="16" />Refazer</v-btn>
          <v-btn
            color="primary"
            :disabled="details.status === 'validated'"
            :loading="validating"
            @click="validate"
          ><Check class="mr-2" :size="16" />{{ details.status === 'validated' ? 'Validado' : 'Validar teste' }}</v-btn>
        </template>
      </PageHeader>

      <v-alert
        v-if="actionMessage.text"
        class="mb-4"
        closable
        :role="actionMessage.type === 'error' ? 'alert' : 'status'"
        :type="actionMessage.type"
        @click:close="actionMessage = { type: '', text: '' }"
      >{{ actionMessage.text }}</v-alert>

      <div class="stats">
        <StatTile :icon="Activity" label="Pico de contração" unit="N" :value="summary ? summary.peak.toFixed(1) : '—'" />
        <StatTile :icon="Timer" label="Tempo até o pico" unit="s" :value="summary ? summary.peakTime.toFixed(2) : '—'" />
        <StatTile :icon="Clock" label="Duração" unit="s" :value="details.seconds ?? '—'" />
        <StatTile :icon="Hand" label="Mão testada" :value="details.arm || '—'" />
      </div>

      <div class="result-grid">
        <ForceTimeChart :samples="samples" :seconds="Number(test.seconds)" />
        <TestInfoCard compact :editable="actions" :test="details" />
      </div>
    </template>

    <template v-else>
      <PageHeader :back="back" title="Resultado do teste" />
      <v-alert type="info">Nenhum registro disponível.</v-alert>
    </template>
  </div>
</template>

<style scoped>
.stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 24px; }
.result-grid { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 24px; align-items: start; }
@media (max-width: 1099px) { .result-grid { grid-template-columns: minmax(0, 1fr); } }
@media (max-width: 799px) { .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-bottom: 16px; } }
</style>
