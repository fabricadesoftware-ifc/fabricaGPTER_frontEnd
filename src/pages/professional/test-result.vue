<script setup>
  import { useTest } from '@/composables/useTest'
  const { loading, error, test: testResult, details: testDetails } = useTest(['finished', 'validated'])
  import SubpageTitle from '@/components/ui/SubpageTitle.vue';
  import PatientDetails from '@/components/tests/PatientDetails.vue';
  import DiagnosticDetails from '@/components/tests/DiagnosticDetails.vue';

</script>

<template>
  <v-container v-if="loading"><v-progress-linear aria-label="Carregando avaliação" indeterminate /></v-container>
  <v-container v-else-if="error"><v-alert role="alert" type="error">{{ error }}</v-alert></v-container>
  <v-container v-else-if="testDetails">
    <SubpageTitle :title="`${testDetails.name} - teste ${testDetails.id}`" />
    <main class="result-layout">
      <PatientDetails buttons :patient="testDetails" />
      <div class="result-panels">
        <v-card class="rounded-lg elevation-2">
          <ForceTimeChart :samples="testResult.measurements || []" :seconds="Number(testResult.seconds)" />
        </v-card>
        <DiagnosticDetails :patient="testResult" />
      </div>
    </main>
  </v-container>
  <v-container v-else>
    <SubpageTitle title="Resultado do teste" />
    <p class="text-subtitle-1 text-grey-darken-1 mt-4">Nenhum registro disponível.</p>
  </v-container>
</template>

<style scoped src="@/styles/test-result.css"></style>
