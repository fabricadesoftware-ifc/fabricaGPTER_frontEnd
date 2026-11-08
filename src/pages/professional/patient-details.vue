<script setup>
  import { computed, onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useDataStore } from '@/stores/data'
  import { ChevronLeft, Play } from 'lucide-vue-next'
  import SubpageTitle from '@/components/ui/SubpageTitle.vue'
  import InfoCard from '@/components/patients/InfoCard.vue'
  import { formatPatientAddress } from '@/services/patients'
  import { useDisplay } from 'vuetify'

  const data = useDataStore()
  const route = useRoute()
  const { mdAndUp, smAndDown } = useDisplay()

  const patientId = computed(() => route.query.id ?? '')
  const patient = computed(() => {
    if (!data.currentPatient) return null
    return String(data.currentPatient.id ?? '') === String(patientId.value) ? data.currentPatient : null
  })
  const address = computed(() => formatPatientAddress(patient.value))

  function load () {
    return data.loadPatient(patientId.value, { force: true })
  }

  onMounted(load)
  watch(patientId, load)
</script>

<template>
  <v-container v-if="data.patientLoading">
    <div class="d-flex flex-column align-center ga-3 py-8">
      <v-progress-circular aria-label="Carregando paciente" indeterminate />
      <span class="text-body-2 text-grey-darken-1">Carregando dados do paciente...</span>
    </div>
  </v-container>

  <v-container v-else-if="data.patientError">
    <SubpageTitle title="Informações do paciente" />
    <v-alert
      class="mt-4"
      role="alert"
      type="error"
      variant="tonal"
    >
      <div class="d-flex flex-column ga-3">
        <span>{{ data.patientError }}</span>
        <div class="d-flex ga-2">
          <v-btn size="small" variant="outlined" @click="load">Tentar novamente</v-btn>
          <v-btn size="small" variant="text" @click="$router.push('/professional/patients')">Voltar para pacientes</v-btn>
        </div>
      </div>
    </v-alert>
  </v-container>

  <v-container v-else-if="patient">
    <div class="d-flex align-center mb-4">
      <v-btn aria-label="Voltar" class="d-flex align-center" variant="text" @click="$router.back()">
        <ChevronLeft class="opacity-70 mr-2" />
      </v-btn>

      <SubpageTitle :title="patient.name || 'Paciente'" />
    </div>
    <p v-if="mdAndUp" class="opacity-50 pr-0">Informações do paciente</p>
    <div
      class="d-flex ga-8 justify-center align-end"
      :class="smAndDown ? 'flex-column' : 'flex-row'"
    >
      <InfoCard
        :address="address"
        :birth-date="patient.birthDate"
        class="d-flex flex-column ga-2"
        :cpf="patient.cpf"
        :email="patient.email"
        :phone="patient.phone"
        :status="patient.status"
        :username="patient.username"
      />

      <v-card
        class="pa-4 pa-md-6 rounded-xl elevation-2 mx-auto"
        max-width="550"
        :min-height="mdAndUp ? '349' : '300'"
      >
        <v-card-title class="text-h6 text-md-h5 font-weight-medium pa-0 mb-3 mb-md-6">
          Histórico de testes
        </v-card-title>
        <v-divider color="grey-darken-4" length="100%" />
        <v-card-text class="pa-0 mt-4 mt-md-6">
          <p class="text-body-1 text-grey-darken-1">
            O histórico de testes deste paciente ainda não está integrado a esta versão.
          </p>
        </v-card-text>
      </v-card>

      <div v-if="smAndDown">
        <v-btn
          class="darken-blue-gradient text-white"
          height="50px"
          rounded="lg"
          :to="{ path: '/professional/new-test', query: { patientId: patient.id } }"
          width="90vw"
        >
          <div class="d-flex flex-row justify-center align-center ga-2">
            <span><Play /></span>
            <span>Iniciar teste</span>
          </div>
        </v-btn>
      </div>
    </div>
    <div v-if="mdAndUp" class="d-flex justify-end">
      <v-btn
        class="darken-blue-gradient text-white d-flex"
        height="50px"
        rounded="lg"
        style="position: relative; margin-top: 20px;"
        :to="{ path: '/professional/new-test', query: { patientId: patient.id } }"
        width="300px"
      >
        <div class="d-flex flex-row justify-center align-center ga-2">
          <span><Play /></span>
          <span>Iniciar teste</span>
        </div>
      </v-btn>
    </div>
  </v-container>

  <v-container v-else>
    <SubpageTitle title="Informações do paciente" />
    <p class="text-subtitle-1 text-grey-darken-1 mt-4">Nenhum registro disponível.</p>
  </v-container>
</template>

<style>
.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
