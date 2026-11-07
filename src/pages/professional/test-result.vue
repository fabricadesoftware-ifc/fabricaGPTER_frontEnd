<script setup>
  import { useTest } from '@/composables/useTest'
  const { test: testResult, details: testDetails } = useTest(['finished', 'validated'])
  import SubpageTitle from '@/components/ui/SubpageTitle.vue';
  import PatientDetails from '@/components/tests/PatientDetails.vue';
  import DiagnosticDetails from '@/components/tests/DiagnosticDetails.vue';

  import { useDisplay } from 'vuetify';

  const { smAndDown } = useDisplay();

</script>

<template>
  <v-container v-if="testDetails">
    <SubpageTitle :title="testDetails.name" />
    <main
      class="d-flex ga-8 mt-8"
      :class="smAndDown ? 'flex-column' : 'flex-row'"
    >

      <PatientDetails buttons :patient="testDetails" />
      <!-- <TestGraph /> -->
      <DiagnosticDetails :patient="testResult" />
    </main>
  </v-container>
  <v-container v-else>
    <SubpageTitle title="Resultado do teste" />
    <p class="text-subtitle-1 text-grey-darken-1 mt-4">Nenhum registro disponível.</p>
  </v-container>
</template>
