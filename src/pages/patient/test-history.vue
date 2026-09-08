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

<script setup>
  import { computed, ref } from 'vue'
  import PageTitle from '@/components/PageTitle.vue';
  import PatientPatientsList from '@/components/PatientPatientsList.vue';
  import { useDisplay } from 'vuetify';

  const { xs, mdAndUp } = useDisplay();
  const currentPage = ref(1);
  const clientePorPagina = 9;
  const patients = ref([
    {
      id: 1,
      tempo: 'Isometria 60s',
      data: '01/06/2019',
    },
    {
      id: 2,
      tempo: 'Isometria 120s',
      data: '02/06/2019',
    },
    {
      id: 3,
      tempo: 'Isometria 60s',
      data: '01/06/2019',
    },
    {
      id: 4,
      tempo: 'Isometria 120s',
      data: '02/06/2019',
    },
    {
      id: 5,
      tempo: 'Isometria 60s',
      data: '01/06/2019',
    },
    {
      id: 6,
      tempo: 'Isometria 120s',
      data: '02/06/2019',
    },
    {
      id: 7,
      tempo: 'Isometria 60s',
      data: '01/06/2019',
    },
    {
      id: 8,
      tempo: 'Isometria 120s',
      data: '02/06/2019',
    },
    {
      id: 9,
      tempo: 'Isometria 120s',
      data: '02/06/2020',
    },
    {
      id: 10,
      tempo: 'Isometria 120s',
      data: '02/06/2026',
    },
  ]);

  const PacientesPaginados = computed(() => {
    const inicio = (currentPage.value - 1) * clientePorPagina
    return patients.value.slice(inicio, inicio + clientePorPagina)
  })

  //quando for integrar com o backend, trocar *patients.value.length pelo total retornado pela API
  const totalPaginas = computed(() => Math.ceil(patients.value.length / clientePorPagina))
</script>
