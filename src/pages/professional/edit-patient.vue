<script setup>
  import SubpageTitle from '@/components/SubpageTitle.vue';
  import PatientForm from '@/components/PatientForm.vue';
  import { useDisplay } from 'vuetify';

  const { smAndDown } = useDisplay();
</script>

<template>
  <v-container :class="{ 'd-flex flex-column align-center justify-center': smAndDown }">
    <SubpageTitle v-if="smAndDown" title="Editar pacientes" />
    <PageTitle v-else justify="justify-center" title="Editar pacientes" />
    <div class="w-100 mb-8 text-grey-darken-2">
      <p v-if="smAndDown" class="text-subtitle-1">Mudar informações de pacientes.</p>
    </div>

    <v-row align="center" class="w-100" justify="center">
      <v-col class="pa-0" cols="12" md="8">
        <PatientForm />
      </v-col>
    </v-row>
  </v-container>
</template>
