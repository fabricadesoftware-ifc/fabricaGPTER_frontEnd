<script setup>
  import { useTest } from '@/composables/useTest'
  const { test, details: testDetails, data } = useTest(['running'])
  function cancel () {
    if (!test.value) return
    try { data.updateTest(test.value.id, 'cancelled') } catch (error) { alert(error.message) }
  }

  import SubpageTitle from '@/components/ui/SubpageTitle.vue';
  import PatientDetails from '@/components/tests/PatientDetails.vue';

</script>

<template>
  <v-container v-if="testDetails">
    <SubpageTitle class="mb-2" title="Teste em progresso" />
    <p class="text-subtitle-1 font-weight-bold text-grey-darken-1">{{ testDetails.name }}</p>

    <main class="d-flex flex-column align-center ga-8 mt-8">
      <PatientDetails :patient="testDetails" />
      <v-row class="w-100" justify="center">
        <v-col class="w-100 px-12" cols="auto">
          <CancelButton text="Cancelar teste" @click="cancel" />
        </v-col>
      </v-row>
    </main>
  </v-container>
  <v-container v-else>
    <SubpageTitle title="Teste em progresso" />
    <p class="text-subtitle-1 text-grey-darken-1 mt-4">Nenhum registro disponível.</p>
  </v-container>
</template>
