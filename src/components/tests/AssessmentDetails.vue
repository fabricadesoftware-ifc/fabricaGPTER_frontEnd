<script setup>
  import { computed, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useDataStore } from '@/stores/data'
  import { useSessionStore } from '@/stores/auth'
  import { formatLocalDateTime } from '@/utils/date'
  import { fetchPatient } from '@/services/patients'
  import { ArrowRight, Calendar, Clock, Hand, Hash, User } from 'lucide-vue-next'
  import PageHeader from '@/components/ui/PageHeader.vue'
  import StatusChip from '@/components/ui/StatusChip.vue'

  const route = useRoute()
  const data = useDataStore()
  const session = useSessionStore()
  const assessment = ref(null)
  const loading = ref(false)
  const error = ref('')
  const loadedPatientName = ref('')
  const professional = computed(() => session.user?.profile === 'profissional')
  const history = computed(() => professional.value
    ? (assessment.value?.patientId || route.query.patientId
      ? { path: '/professional/patient-details', query: { id: assessment.value?.patientId || route.query.patientId } }
      : { path: '/professional/patients' })
    : { path: '/patient/test-history' })
  const patientName = computed(() => assessment.value?.patientName || loadedPatientName.value ||
    data.patients.find(patient => String(patient.id) === String(assessment.value?.patientId))?.name ||
    (String(data.currentPatient?.id) === String(assessment.value?.patientId) ? data.currentPatient?.name : '') ||
    (!professional.value ? session.user?.displayName : '') || 'Não informado')
  const startedAt = computed(() => formatLocalDateTime(assessment.value?.startedAt))
  let requestId = 0

  async function load () {
    const id = route.query.id
    const currentRequest = ++requestId
    assessment.value = null
    loadedPatientName.value = ''
    error.value = ''
    loading.value = Boolean(id)
    if (!id) return
    try {
      const record = await data.loadTest(id)
      if (currentRequest !== requestId) return
      if (record && !professional.value && String(record.patientId) !== String(session.user?.profileId)) {
        error.value = 'Você não tem permissão para acessar esta avaliação.'
        return
      }
      assessment.value = record
      if (professional.value && record?.patientId && !record.patientName) {
        try {
          const patient = await fetchPatient(session.request, record.patientId)
          if (currentRequest === requestId) loadedPatientName.value = patient.name
        } catch { /* Assessment details remain available when patient data cannot be loaded. */ }
      }
    } catch (failure) {
      if (currentRequest === requestId) error.value = failure.message || 'Não foi possível carregar a avaliação.'
    } finally {
      if (currentRequest === requestId) loading.value = false
    }
  }
  watch(() => route.query.id, load, { immediate: true })
</script>

<template>
  <div class="page page--narrow">
    <PageHeader
      :back="history"
      :back-label="professional ? 'Paciente' : 'Histórico'"
      :subtitle="assessment ? patientName : ''"
      :title="assessment ? `Avaliação #${assessment.id}` : 'Detalhes da avaliação'"
    >
      <template v-if="assessment" #badge><StatusChip :status="assessment.status" /></template>
    </PageHeader>

    <v-progress-linear v-if="loading" aria-label="Carregando avaliação" indeterminate />
    <v-alert
      v-else-if="error"
      role="alert"
      type="error"
    >
      {{ error }}
      <template #append>
        <v-btn size="small" variant="outlined" @click="load">Tentar novamente</v-btn>
      </template>
    </v-alert>
    <v-alert v-else-if="!assessment" type="info">Nenhuma avaliação disponível.</v-alert>

    <v-card v-else>
      <div class="card-section">
        <dl class="info-list">
          <div><dt><User :size="14" />Paciente</dt><dd>{{ patientName }}</dd></div>
          <div><dt><Hash :size="14" />Identificação do paciente</dt><dd>{{ assessment.patientId ?? 'Não informada' }}</dd></div>
          <div><dt><Calendar :size="14" />Início</dt><dd>{{ startedAt || 'Não informado' }}</dd></div>
          <div><dt><Clock :size="14" />Duração</dt><dd>{{ assessment.seconds != null ? `${assessment.seconds} segundos` : 'Não informada' }}</dd></div>
          <div><dt><Hand :size="14" />Mão testada</dt><dd>{{ assessment.arm || 'Não informada' }}</dd></div>
        </dl>
      </div>
      <v-divider />
      <div class="card-section">
        <h2 class="notes-title">Observações</h2>
        <p class="notes" :class="{ 'text-subtle': !assessment.observations }">{{ assessment.observations || 'Nenhuma observação registrada.' }}</p>
      </div>
      <template v-if="['finished', 'validated'].includes(assessment.status) || (professional && assessment.status === 'running')">
        <v-divider />
        <div class="d-flex justify-end pa-4">
          <v-btn
            v-if="['finished', 'validated'].includes(assessment.status)"
            color="primary"
            :to="{ path: professional ? '/professional/test-result' : '/patient/test-result', query: { id: assessment.id } }"
          >Ver resultado<ArrowRight class="ml-2" :size="16" /></v-btn>
          <v-btn
            v-else
            color="primary"
            :to="{ path: '/professional/test-progress', query: { id: assessment.id } }"
          >Continuar teste<ArrowRight class="ml-2" :size="16" /></v-btn>
        </div>
      </template>
    </v-card>
  </div>
</template>

<style scoped>
.notes-title { font-size: 0.875rem; font-weight: 600; margin: 0 0 8px; }
.notes { white-space: pre-wrap; overflow-wrap: anywhere; margin: 0; }
</style>
