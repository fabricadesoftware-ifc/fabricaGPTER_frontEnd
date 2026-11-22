<route lang="json">
{ "meta": { "publicRegistration": true } }
</route>

<script setup>
  import { ref } from 'vue'
  import PatientForm from '@/components/patients/PatientForm.vue'

  const registered = ref(false)
</script>

<template>
  <v-container class="py-6" max-width="600">
    <img alt="GPTER" class="mb-4" src="@/assets/logo-gpter-wo-bg.png" width="120">
    <h1 class="text-h5 font-weight-bold mb-4">Cadastro de paciente</h1>
    <v-alert v-if="registered" role="status" type="success" variant="tonal">
      Cadastro concluído com sucesso. Você já pode fechar esta página.
    </v-alert>
    <PatientForm v-else public-registration @registered="registered = true" />
  </v-container>
</template>
