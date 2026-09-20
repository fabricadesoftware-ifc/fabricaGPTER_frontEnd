<script setup>
  import { testDetails } from '@/mocks';
  import SubpageTitle from '@/components/ui/SubpageTitle.vue';
  import PatientDetails from '@/components/tests/PatientDetails.vue';

</script>

<template>
  <v-container>
    <SubpageTitle class="mb-2" title="Teste em progresso" />
    <p class="text-subtitle-1 font-weight-bold text-grey-darken-1">{{ testDetails.name }}</p>

    <main class="d-flex flex-column align-center ga-8 mt-8">
      <PatientDetails :patient="testDetails" />
      <v-row class="w-100" justify="center">
        <v-col class="w-100 px-12" cols="auto">
          <CancelButton text="Cancelar teste" />
        </v-col>
      </v-row>
    </main>
  </v-container>
</template>
