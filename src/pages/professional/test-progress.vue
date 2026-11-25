<script setup>
  import { computed, reactive, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { X } from 'lucide-vue-next'
  import { useTest } from '@/composables/useTest'
  import { useMeasurementSave } from '@/composables/useMeasurementSave'
  import { useSessionStore } from '@/stores/auth'
  import DynamometerPanel from '@/components/tests/DynamometerPanel.vue'
  import PageHeader from '@/components/ui/PageHeader.vue'
  import StatusChip from '@/components/ui/StatusChip.vue'
  import TestInfoCard from '@/components/tests/TestInfoCard.vue'

  const { loading, error, test, details: testDetails, data, router } = useTest(['running'])
  const route = useRoute()
  const session = useSessionStore()
  const panel = ref(null)
  const cancelling = ref(false)
  const cancelError = ref('')
  const confirmCancel = ref(false)
  const back = computed(() => test.value?.patientId
    ? { path: '/professional/patient-details', query: { id: test.value.patientId } }
    : '/professional/patients')

  const submission = reactive(useMeasurementSave(data.updateTest, id => {
    if (route.path === '/professional/test-progress' && String(route.query.id) === String(id)) {
      router.replace({ path: '/professional/test-finished', query: { id } })
    }
  }))

  function complete (samples) {
    if (!cancelling.value && test.value) submission.finish(test.value.id, samples)
  }

  async function cancel () {
    if (!test.value || cancelling.value || submission.saving) return
    const { id, patientId } = test.value
    cancelling.value = true
    cancelError.value = ''
    try {
      await panel.value?.disconnect()
      await data.updateTest(id, 'cancelled')
      confirmCancel.value = false
      session.notice = 'Teste cancelado'
      await router.replace(patientId
        ? { path: '/professional/patient-details', query: { id: patientId } }
        : { path: '/professional/patients' })
    } catch (failure) {
      cancelError.value = failure.message || 'Não foi possível cancelar o teste.'
    } finally {
      cancelling.value = false
    }
  }
</script>

<template>
  <div class="page">
    <div v-if="loading" class="py-16"><v-progress-linear aria-label="Carregando avaliação" indeterminate /></div>
    <template v-else-if="error">
      <PageHeader back="/professional/patients" title="Teste em andamento" />
      <v-alert role="alert" type="error">{{ error }}</v-alert>
    </template>

    <template v-else-if="testDetails">
      <PageHeader
        :back="back"
        back-label="Paciente"
        :subtitle="[testDetails.name, `${testDetails.seconds} s`, `mão ${(testDetails.arm || '').toLowerCase()}`].filter(Boolean).join(' · ')"
        title="Teste em andamento"
      >
        <template #badge><StatusChip :status="testDetails.status" /></template>
        <template #actions>
          <v-btn
            color="error"
            :disabled="cancelling || submission.saving"
            variant="text"
            @click="confirmCancel = true"
          ><X class="mr-1" :size="16" />Cancelar teste</v-btn>
        </template>
      </PageHeader>

      <v-alert
        v-if="submission.saving"
        class="mb-4"
        role="status"
        type="info"
      >Salvando medições…</v-alert>
      <v-alert
        v-else-if="submission.error"
        class="mb-4"
        role="alert"
        type="error"
      >
        {{ submission.error }}
        <template #append>
          <v-btn :disabled="cancelling" size="small" variant="outlined" @click="submission.retry()">Tentar salvar novamente</v-btn>
        </template>
      </v-alert>

      <div class="progress-grid">
        <div class="stack">
          <DynamometerPanel
            :key="testDetails.id"
            ref="panel"
            :locked="cancelling || submission.saving || Boolean(submission.error)"
            :seconds="Number(testDetails.seconds)"
            :test-id="testDetails.id"
            @complete="complete"
          />
        </div>
        <TestInfoCard editable :test="testDetails" />
      </div>
    </template>

    <template v-else>
      <PageHeader back="/professional/patients" title="Teste em andamento" />
      <v-alert type="info">Nenhum registro disponível</v-alert>
    </template>

    <v-dialog v-model="confirmCancel" max-width="420">
      <v-card class="pa-2">
        <v-card-title class="text-h6">Cancelar teste?</v-card-title>
        <v-card-text>
          A coleta em andamento será interrompida e o teste ficará marcado como cancelado.
          <v-alert
            v-if="cancelError"
            class="mt-3"
            density="compact"
            role="alert"
            type="error"
          >{{ cancelError }}</v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn :disabled="cancelling" variant="text" @click="confirmCancel = false">Voltar</v-btn>
          <v-btn
            color="error"
            :loading="cancelling"
            variant="flat"
            @click="cancel"
          >Cancelar teste</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.progress-grid { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 24px; align-items: start; }
@media (max-width: 1099px) { .progress-grid { grid-template-columns: minmax(0, 1fr); } }
</style>
