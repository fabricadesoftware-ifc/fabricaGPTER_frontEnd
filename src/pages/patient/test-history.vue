<script setup>
  import { useDataStore } from '@/stores/data'
  import { useSessionStore } from '@/stores/auth'
  const data = useDataStore()
  const session = useSessionStore()
  const patients = computed(() => data.tests.filter(test => String(test.patientId) === String(session.user?.profileId) && ['finished', 'validated'].includes(test.status)).sort((a, b) => b.date.localeCompare(a.date) || String(b.id).localeCompare(String(a.id))))
  import { computed, ref, watch } from 'vue'
  import PageTitle from '@/components/ui/PageTitle.vue';
  import PatientPatientsList from '@/components/tests/PatientPatientsList.vue';
  import { useDisplay } from 'vuetify';

  const { xs, mdAndUp } = useDisplay();
  const currentPage = ref(1);
  const clientePorPagina = 9;

  const PacientesPaginados = computed(() => {
    const inicio = (currentPage.value - 1) * clientePorPagina
    return patients.value.slice(inicio, inicio + clientePorPagina)
  })

  //quando for integrar com o backend, trocar *patients.value.length pelo total retornado pela API
  const totalPaginas = computed(() =>
    Math.max(1, Math.ceil(patients.value.length / clientePorPagina))
  )
  const loading = ref(false)
  const error = ref('')
  watch(() => session.user?.profileId, async (id, _, onCleanup) => {
    let active = true
    onCleanup(() => { active = false })
    error.value = ''
    loading.value = Boolean(id)
    if (!id) return
    try {
      await data.loadTests(id)
    } catch (failure) {
      if (active) error.value = failure.message
    } finally {
      if (active) loading.value = false
    }
  }, { immediate: true })
</script>

<template>
  <v-container :class="{ 'px-8 mt-6': mdAndUp }" max-width="none">
    <v-row align="start" class="w-full" justify="space-between">
      <v-col class="py-0 d-flex flex-column aligin-start">
        <PageTitle :class="{ 'mb-7': xs }" title="Historico de testes" />
        <p
          v-if="xs"
          class="text-subtitle-1 font-weight-bold"
        >Teste Realizados</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
      <v-progress-linear v-if="loading" aria-label="Carregando avaliações" indeterminate />
      <v-alert v-else-if="error" role="alert" type="error">{{ error }}</v-alert>
        <PatientPatientsList v-else :patients="PacientesPaginados" />
        <v-pagination v-model="currentPage" :length="totalPaginas" />
      </v-col>
    </v-row>
  </v-container>
</template>
