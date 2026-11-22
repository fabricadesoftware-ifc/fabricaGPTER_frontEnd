<script setup>
  import { computed, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useDataStore } from '@/stores/data'
  import { useSessionStore } from '@/stores/auth'
  import { formatLocalDateTime } from '@/utils/date'
  import { fetchPatient } from '@/services/patients'
  import SubpageTitle from '@/components/ui/SubpageTitle.vue'

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
  const statusLabels = { running: 'Em andamento', finished: 'Finalizada', validated: 'Validada', cancelled: 'Cancelada' }
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
  <v-container class="py-6" style="max-width: 960px">
    <v-btn
      class="mb-4 text-none"
      prepend-icon="mdi-arrow-left"
      :to="history"
      variant="text"
    >Voltar ao histórico</v-btn>
    <SubpageTitle title="Detalhes da avaliação" />
    <v-progress-linear v-if="loading" aria-label="Carregando avaliação" class="mt-4" indeterminate />
    <v-alert
      v-else-if="error"
      class="mt-4"
      role="alert"
      type="error"
      variant="tonal"
    >
      <div>{{ error }}</div>
      <v-btn class="mt-2 text-none" size="small" variant="outlined" @click="load">Tentar novamente</v-btn>
    </v-alert>
    <v-alert v-else-if="!assessment" class="mt-4" type="info" variant="tonal">Nenhuma avaliação disponível.</v-alert>
    <v-card v-else class="mt-4 pa-5 rounded-xl" elevation="2">
      <v-card-title class="pa-0 mb-4">Avaliação {{ assessment.id }}</v-card-title>
      <v-divider class="mb-4" />
      <dl class="assessment-details">
        <div><dt>Paciente</dt><dd>{{ patientName }}</dd></div>
        <div><dt>Identificação do paciente</dt><dd>{{ assessment.patientId ?? 'Não informada' }}</dd></div>
        <div><dt>Profissional</dt><dd>{{ assessment.professional_name || assessment.profissional || assessment.professional?.name || 'Não informado' }}</dd></div>
        <div><dt>Início</dt><dd>{{ startedAt || 'Não informado' }}</dd></div>
        <div><dt>Situação</dt><dd>{{ statusLabels[assessment.status] || assessment.status || 'Não informada' }}</dd></div>
        <div><dt>Duração</dt><dd>{{ assessment.seconds != null ? `${assessment.seconds} segundos` : 'Não informada' }}</dd></div>
        <div><dt>Mão testada</dt><dd>{{ assessment.arm || 'Não informada' }}</dd></div>
      </dl>
      <div class="mt-5"><strong>Observações</strong><p class="observations mt-1">{{ assessment.observations || 'Nenhuma observação registrada.' }}</p></div>
      <v-btn v-if="['finished', 'validated'].includes(assessment.status)" class="mt-5 text-none" color="primary" :to="{ path: professional ? '/professional/test-result' : '/patient/test-result', query: { id: assessment.id } }">Ver resultados disponíveis</v-btn>
      <v-btn v-else-if="professional && assessment.status === 'running'" class="mt-5 text-none" color="primary" :to="{ path: '/professional/test-progress', query: { id: assessment.id } }">Acessar teste em andamento</v-btn>
    </v-card>
  </v-container>
</template>

<style scoped>
.assessment-details { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr)); gap: 1rem; }
.assessment-details dt { font-weight: 600; }
.assessment-details dd { margin: 0; overflow-wrap: anywhere; }
.observations { white-space: pre-wrap; overflow-wrap: anywhere; }
</style>
