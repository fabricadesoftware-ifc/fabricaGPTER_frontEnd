<script setup>
  import { testDetails, testResult } from '@/mocks';
  import SubpageTitle from '@/components/SubpageTitle.vue';
  import PatientDetails from '@/components/PatientDetails.vue';
  import DiagnosticDetails from '@/components/DiagnosticDetails.vue';

  import { useDisplay } from 'vuetify';

  const { smAndDown } = useDisplay();

</script>

<template>
  <v-container>
    <SubpageTitle :title="testDetails.time" />
    <main
      class="d-flex ga-8 mt-8"
      :class="smAndDown ? 'flex-column' : 'flex-row'"
    >
      <PatientDetails :patient="testDetails" />
      <!-- <TestGraph /> -->
      <DiagnosticDetails :patient="testResult" />
    </main>
  </v-container>
</template>
