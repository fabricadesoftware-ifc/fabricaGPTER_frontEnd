<template>
  <v-container
    class="h-100"
    :class="{ 'd-flex flex-column align-center justify-center': smAndDown }"
  >
    <SubpageTitle v-if="smAndDown" title="Cadastrar pacientes" />
    <PageTitle v-else justify="justify-center" title="Cadastrar pacientes" />

    <v-row justify="center" align="center" class="h-full w-100">
      <v-col class="pa-0" cols="12" md="8">
        <PatientForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import SubpageTitle from "@/components/SubpageTitle.vue";
import PatientForm from "@/components/PatientForm.vue";
import { useDisplay } from "vuetify";

const { mdAndUp, smAndDown, xs } = useDisplay();
</script>
