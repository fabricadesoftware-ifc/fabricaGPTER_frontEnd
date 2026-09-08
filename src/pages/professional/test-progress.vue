<template>
  <v-container>
    <SubpageTitle class="mb-2" title="Teste em progresso" />
    <p class="text-subtitle-1 font-weight-bold text-grey-darken-1">Roberto Santos</p>

    <main class="d-flex flex-column align-center ga-8 mt-8">
      <PatientDetails :patient="Details[0]" />
      <v-row class="w-100" justify="center">
        <v-col class="w-100 px-12" cols="auto">
          <CancelButton text="Cancelar teste" />
        </v-col>
      </v-row>
    </main>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue';
  import SubpageTitle from '@/components/SubpageTitle.vue';
  import PatientDetails from '@/components/PatientDetails.vue';

  const Details = ref([
    {
      id: 1,
      name: 'Roberto Santos',
      type: '60s',
      reps: 6,
      arm: 'Direito',
      date: '04/07/2025',
    },
  ]);
</script>
