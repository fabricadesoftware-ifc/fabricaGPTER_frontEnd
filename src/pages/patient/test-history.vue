<template>
  <v-container max-width="none" :class="{ 'px-8 mt-6': mdAndUp }">
    <v-row align="start" justify="space-between" class="w-full">
      <v-col class="py-0 d-flex flex-column aligin-start">
        <PageTitle title="Historico de testes" :class="{ 'mb-7': xs }" />
        <p v-if="xs" class="text-subtitle-1 font-weight-bold"
          >Teste Realizados</p
        >
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <PatientPatientsList :patients="patients" />
        <v-pagination :length="3" v-model="currentPage"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify";


import PageTitle from "@/components/PageTitle.vue";

const { mdAndUp, xs } = useDisplay();

const currentPage = ref(1);

const patients = ref([
  {
    id: 1,
    tempo: "Isometria 60s",
    data: '01/06/2019',
  },
  {
    id: 2,
    tempo: "Isometria 120s",
    data: '02/06/2019',
  },
  {
    id: 3,
    tempo: "Isometria 60s",
    data: '01/06/2019',
  },
  {
    id: 4,
    tempo: "Isometria 120s",
    data: '02/06/2019',
  },
  {
    id: 5,
    tempo: "Isometria 60s",
    data: '01/06/2019',
  },
  {
    id: 6,
    tempo: "Isometria 120s",
    data: '02/06/2019',
  },
  {
    id: 7,
    tempo: "Isometria 60s",
    data: '01/06/2019',
  },
  {
    id: 8,
    tempo: "Isometria 120s",
    data: '02/06/2019',
  },
]);

const goToRoute = (route) => {
  router.push(`/${route}`);
};
</script>
