<script setup>
  import { testDetails, testResult } from '@/mocks';
  import SubpageTitle from '@/components/ui/SubpageTitle.vue';
  import PatientDetails from '@/components/tests/PatientDetails.vue';
  import DiagnosticDetails from '@/components/tests/DiagnosticDetails.vue';

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

      <PatientDetails buttons :patient="testDetails" />
      <!-- <TestGraph /> -->
      <DiagnosticDetails :patient="testResult" />
    </main>
  </v-container>
</template>
