<script setup>
  import { testHistory as patients } from '@/mocks';
  import { computed, ref } from 'vue'
  import PageTitle from '@/components/PageTitle.vue';
  import PatientPatientsList from '@/components/PatientPatientsList.vue';
  import { useDisplay } from 'vuetify';

  const { xs, mdAndUp } = useDisplay();
  const currentPage = ref(1);
  const clientePorPagina = 9;

  const PacientesPaginados = computed(() => {
    const inicio = (currentPage.value - 1) * clientePorPagina
    return patients.slice(inicio, inicio + clientePorPagina)
  })

  //quando for integrar com o backend, trocar *patients.value.length pelo total retornado pela API
  const totalPaginas = computed(() =>
    Math.ceil(patients.length / clientePorPagina)
  )
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
        <PatientPatientsList :patients="PacientesPaginados" />
        <v-pagination v-model="currentPage" :length="totalPaginas" />
      </v-col>
    </v-row>
  </v-container>
</template>
