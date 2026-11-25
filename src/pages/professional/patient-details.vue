<script setup>
  import { computed, onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { Pencil, Play } from 'lucide-vue-next'
  import { useDataStore } from '@/stores/data'
  import { formatPatientAddress } from '@/services/patients'
  import { isInactivePatient } from '@/utils/patient'
  import PageHeader from '@/components/ui/PageHeader.vue'
  import StatusChip from '@/components/ui/StatusChip.vue'
  import InfoCard from '@/components/patients/InfoCard.vue'
  import TestsList from '@/components/tests/TestsList.vue'

  const data = useDataStore()
  const route = useRoute()

  const patientId = computed(() => route.query.id ?? '')
  const patient = computed(() => {
    if (!data.currentPatient) return null
    return String(data.currentPatient.id ?? '') === String(patientId.value) ? data.currentPatient : null
  })
  const address = computed(() => formatPatientAddress(patient.value))
  const subtitle = computed(() => [patient.value?.username && `@${patient.value.username}`, patient.value?.email].filter(Boolean).join(' · '))

  function load () {
    return data.loadPatient(patientId.value, { force: true })
  }

  onMounted(load)
  watch(patientId, load)
</script>

<template>
  <div class="page">
    <div v-if="data.patientLoading && !patient" class="d-flex flex-column align-center ga-3 py-16">
      <v-progress-circular aria-label="Carregando paciente" color="primary" indeterminate />
      <span class="text-body-2 text-muted">Carregando dados do paciente…</span>
    </div>

    <template v-else-if="data.patientError">
      <PageHeader back="/professional/patients" back-label="Pacientes" title="Paciente" />
      <v-alert role="alert" type="error">
        {{ data.patientError }}
        <template #append>
          <v-btn size="small" variant="outlined" @click="load">Tentar novamente</v-btn>
        </template>
      </v-alert>
    </template>

    <template v-else-if="patient">
      <PageHeader
        back="/professional/patients"
        back-label="Pacientes"
        :subtitle="subtitle"
        :title="patient.name || 'Paciente'"
      >
        <template #badge><StatusChip kind="patient" :status="patient.status" /></template>
        <template #actions>
          <v-btn :to="{ path: '/professional/edit-patient', query: { id: patient.id } }" variant="outlined">
            <Pencil class="mr-2" :size="16" />Editar
          </v-btn>
          <v-btn
            color="primary"
            :disabled="isInactivePatient(patient)"
            :to="{ path: '/professional/new-test', query: { patientId: patient.id } }"
          >
            <Play class="mr-2" :size="16" />Iniciar teste
          </v-btn>
        </template>
      </PageHeader>

      <div class="page-grid">
        <InfoCard
          :address="address"
          :birth-date="patient.birthDate"
          :cpf="patient.cpf"
          :dominant-hand="patient.dominant_hand"
          :phone="patient.phone"
        />
        <TestsList :patient-id="patient.id" />
      </div>
    </template>

    <template v-else>
      <PageHeader back="/professional/patients" back-label="Pacientes" title="Paciente" />
      <v-alert type="info">Nenhum registro disponível</v-alert>
    </template>
  </div>
</template>
