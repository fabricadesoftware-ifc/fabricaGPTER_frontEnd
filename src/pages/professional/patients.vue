<script setup>
  import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
  import { useDataStore } from '@/stores/data'
  import { useDisplay } from 'vuetify'
  import { useRouter } from 'vue-router'

  import PageTitle from '@/components/ui/PageTitle.vue'
  import PatientsList from '@/components/patients/PatientsList.vue'

  import { CirclePlus } from 'lucide-vue-next'

  const data = useDataStore()
  const router = useRouter()
  const { mdAndUp, xs } = useDisplay()

  const search = ref(data.patientsSearch)
  const currentPage = ref(data.patientsPage)
  let searchTimer

  function reload () {
    return data.loadPatients({ page: currentPage.value, search: search.value.trim() })
  }

  watch(search, () => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      if (currentPage.value !== 1) {
        currentPage.value = 1
        return
      }
      reload()
    }, 350)
  })

  watch(currentPage, page => {
    if (page === data.patientsPage) return
    data.loadPatients({ page, search: search.value.trim() })
  })

  watch(() => data.patientsPage, page => {
    if (page !== currentPage.value) currentPage.value = page
  })

  onMounted(reload)
  onBeforeUnmount(() => clearTimeout(searchTimer))
</script>

<template>
  <v-container :class="{ 'px-8 mt-6': mdAndUp }" max-width="none">
    <v-row align="start" class="w-full" justify="space-between">
      <v-col class="py-0 d-flex flex-column aligin-start">
        <PageTitle :class="{ 'mb-7': xs }" title="Pacientes" />
        <p
          v-if="xs"
          class="text-subtitle-1 font-weigh-medium"
        >Lista de pacientes</p>
      </v-col>
      <v-col align-self="end" class="text-right d-flex justify-end align-end py-0 mb-2">
        <v-btn
          v-if="xs"
          aria-label="Registrar paciente"
          class="d-flex align-center"
          icon
          variant="text"
          @click="router.push('/professional/register-patient')"
        ><CirclePlus :size="24" /></v-btn>
        <v-btn
          v-else
          class="text-none rounded-xl border border-md"
          flat
          height="60"
          width="160"
          @click="router.push('/professional/register-patient')"
        >Registrar paciente</v-btn>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col v-if="mdAndUp" cols="auto">
        <v-text-field
          v-model="search"
          class="mb-3"
          label="Buscar paciente"
          prepend-inner-icon="mdi-magnify"
          rounded="xl"
          variant="outlined"
          width="200"
        />
      </v-col>
      <v-col>
        <v-alert
          v-if="data.patientsError"
          class="mb-4"
          role="alert"
          type="error"
          variant="tonal"
        >
          <div class="d-flex flex-column ga-3">
            <span>{{ data.patientsError }}</span>
            <v-btn size="small" variant="outlined" @click="reload">Tentar novamente</v-btn>
          </div>
        </v-alert>

        <v-progress-linear
          v-if="data.patientsLoading"
          aria-label="Carregando pacientes"
          class="mb-3"
          indeterminate
          rounded
        />

        <PatientsList v-if="data.patients.length" :patients="data.patients" />

        <v-alert
          v-else-if="!data.patientsLoading && !data.patientsError"
          type="info"
          variant="tonal"
        >Nenhum paciente encontrado.</v-alert>

        <div v-if="!data.patientsLoading && !data.patientsError && data.patientsTotal > 0" class="text-caption text-grey-darken-1 mt-2">
          {{ data.patientsTotal }} {{ data.patientsTotal === 1 ? 'paciente' : 'pacientes' }}
        </div>

        <v-pagination
          v-if="data.patientsTotalPages > 1"
          v-model="currentPage"
          class="mt-3"
          :length="data.patientsTotalPages"
        />
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center align-center" />
  </v-container>
</template>
